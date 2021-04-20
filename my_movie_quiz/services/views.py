import requests
from django.http import HttpResponse
from django.views import View
from rest_framework.decorators import api_view
from django.http import JsonResponse
import subprocess
import json
import urllib.parse
import boto3
from .models import Tags, Picture, VideoSource
from .serializers import PictureSerializer, TagsSerializer, VideoSourceSerializer
from rest_framework.decorators import api_view
from rest_framework import generics, viewsets
import os
from dotenv import load_dotenv, find_dotenv
# import spotipy
# from spotipy.oauth2 import SpotifyClientCredentials
import string
import random

def id_generator(size=4, chars=string.digits):
    return ''.join(random.choice(chars) for x in range(size))

class MoviesSearch(View):

    def get(self, request, movie):
        load_dotenv()
        API_KEY = os.environ.get("IMDB_KEY")
        movies_list = []
        index = 1
        isSearching = True
        while isSearching == True:
            search_url = "https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY +"&language=en-US&query=" + movie + "&page=" + str(index) + "&include_adult=false"
            response = requests.get(search_url)
            json_data = json.loads(response.text)
            for i in json_data["results"]:
                if any(j in i["genre_ids"] for j in [16, 99, 10402, 10770]) or i["vote_count"] < 150:
                    pass
                else: movies_list.append({"id": i["id"],
                                          "poster":i["poster_path"],
                                          "title":i["original_title"],
                                          "backdrop":i["backdrop_path"],
                                          "year":i["release_date"],
                                          "plot":i["overview"],
                                          "trailer":""})

            if len(json_data["results"]) < 20:
                isSearching = False
            else: index += 1
        for i in movies_list:
            search_url = "https://api.themoviedb.org/3/movie/" + str(i['id']) +"/credits?api_key=137e8b3a07e487eeeaa6f211207f674a&language=en-US"
            response = requests.get(search_url)
            json_data = json.loads(response.text)
            i['cast'] = json_data['cast'][:4]
            composers = []
            for j in json_data["crew"]:
                if j["department"] == "Sound" and (j["job"] == "Music" or j["job"] == "Original Music Composer"):
                    composers.append(j['name'])
                i['music_composer'] = composers
        return JsonResponse(movies_list, safe=False)


class TrailerSearch(View):

    def get(self, request, *args, **kwargs):
        load_dotenv()
        API_KEY = os.environ.get("YT_KEY")
        title = kwargs.get('title')
        date = kwargs.get('date').split("-")[0]
        params = urllib.parse.quote(title + " hd trailer " + date)        
        search_url = "https://youtube.googleapis.com/youtube/v3/search?part=id&maxResults=1&q=" + params  + "&key=" + API_KEY
        response = requests.get(search_url)
        json_data = json.loads(response.text)
        yt_id = json_data["items"][0]["id"]["videoId"]

        return JsonResponse({'trailer_id': yt_id}, safe=False)


class RetreiveSrc(View):

    def get(self, request, video):
        video_src = getSrc(video)
        serializer = VideoSourceSerializer(data={'video_src': video_src})
        if serializer.is_valid():
            source = serializer.save()
        return JsonResponse({'id': source.id})

        
class CreateScrapBook(View):

    def get(self, request, *args, **kwargs):
        load_dotenv()
        AWS_KEY_ID = os.environ.get("AWS_ACCESS_KEY_ID")
        AWS_ACCESS_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY")        
        video_src_id = kwargs.get('video_src_id')
        timestamp = kwargs.get('timestamps')
        video_src = VideoSource.objects.get(pk = video_src_id)
        video = subprocess.run(["ffmpeg", "-y", "-ss", timestamp, "-i", video_src.video_src, "-f", "image2", "-vframes", "1", "-filter:v", "scale='720:-1'", "-"], stdout=subprocess.PIPE)

        client = boto3.client('s3',
                              aws_access_key_id = AWS_KEY_ID,
                              aws_secret_access_key = AWS_ACCESS_KEY)
        file_id = id_generator()
        file_path = "screenshot/" + "{}_pic_{}.jpeg".format(file_id, video_src_id)
        client.put_object(Body=video.stdout, Bucket="moviepictures", Key= file_path, ContentType='image/JPEG')

        return JsonResponse({'url': file_path})


class CreateGif(View):

    def get(self, request, *args, **kwargs):
        load_dotenv()
        AWS_KEY_ID = os.environ.get("AWS_ACCESS_KEY_ID")
        AWS_ACCESS_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY")    
        video_src_id = kwargs.get('video_src_id')
        timestamp = kwargs.get('timestamps')
        duration = kwargs.get('duration')
        video_src = VideoSource.objects.get(pk = video_src_id)
        gif = subprocess.run(["ffmpeg","-y", "-ss", timestamp, "-t", duration, "-i", video_src.video_src, "-f", "gif", "-filter_complex", "[0:v] fps=5,scale=480:-1,split [a][b];[a] palettegen [p];[b][p] paletteuse", "-"], stdout=subprocess.PIPE)

        client = boto3.client('s3',
                              aws_access_key_id = AWS_KEY_ID,
                              aws_secret_access_key = AWS_ACCESS_KEY)
        file_id = id_generator()
        file_path = "gif/" + "{}_pic_{}.gif".format(file_id, video_src_id)
        client.put_object(Body=gif.stdout, Bucket="moviepictures", Key= file_path, ContentType='image/gif')

        return JsonResponse({'url': file_path})


class ActorsSearch(View):

    def get(self, request, actors):
        actorPicUrl = []
        actors_list = actors.split('$')              
        subscription_key = "9dc015a3a15c45abb05f88bcea641c2d"
        search_url = "https://api.bing.microsoft.com/v7.0/images/search"
        headers = {"Ocp-Apim-Subscription-Key" : subscription_key}
        for actor in actors_list:
            i = 0
            url_list = []
            response = requests.get(search_url, headers=headers, params={"q": actor + " actor", "count": "10"})
            search_results = response.json()
            for val in search_results["value"]:
                url_list.append({'index': i ,'url': val["thumbnailUrl"]})
                i += 1
            actorPicUrl.append(url_list)
        return JsonResponse(actorPicUrl, safe=False)

class AlbumSearch(View):

    def get(self, request, *args, **kwargs):
        albums_id = []
        albums_list = []
        movie_name = kwargs.get('movie_name')
        movie = movie_name.replace("&", "and")
        composers = kwargs.get('composer')
        base_url = "https://api.deezer.com/search?q="
        for composer in composers.split(','):
            response = requests.get(base_url + movie + " " + composer + "&limit=6")
            results = response.json()
            for result in results["data"]:
                if result["album"]["id"] not in albums_id:
                    albums_id.append(result["album"]["id"])
                    albums_list.append({'id': result["album"]["id"], "cover_url": result["album"]["cover_medium"], "type": "album"})
                else: pass

        base_url = "https://api.deezer.com/search/playlist?q="
        response = requests.get(base_url + movie +" soundtrack" + "&limit=6")
        results = response.json()
        for result in results["data"]:
            if result["id"] not in albums_id:
                albums_id.append(result["id"])
                albums_list.append({'id': result["id"], "cover_url": result["picture_medium"], "type": "playlist"})
            else: pass

        return JsonResponse(albums_list, safe=False)


class TrackSearch(View):

    def get(self, request, music_id, format):
        if format != "track":
            response = requests.get(
                "https://api.deezer.com/" + format + "/" + music_id + "/tracks")
            results = response.json()
            return JsonResponse(results['data'], safe=False)
        else:
            response = requests.get("https://api.deezer.com/track/" + music_id)
            results = response.json()
            return JsonResponse(results, safe=False)


class SampleSearch(View):

    def get(self, request, query):
        load_dotenv()
        SOUND_TOKEN = os.environ.get("SOUND_TOKEN")
        response = requests.get("https://freesound.org/apiv2/search/text/?query=" + query + "&fields=name,previews,duration&page_size=30&filter=duration:[1 TO 30]&token=" + SOUND_TOKEN)
        results = response.json()
        return JsonResponse(results, safe=False)


class PictureViewSet(viewsets.ModelViewSet):   

    queryset = Picture.objects.all()
    serializer_class = PictureSerializer
    

class TagsViewSet(viewsets.ModelViewSet):

    queryset = Tags.objects.all()
    serializer_class = TagsSerializer


class TagPicsListAPIView(generics.ListAPIView):

    serializer_class = PictureSerializer

    def get_queryset(self):
        kwarg_tag = self.kwargs.get('tag')
        return Picture.objects.filter(tag=kwarg_tag)


def getSrc(video_id):
    video_src = subprocess.run(["youtube-dl", "-g", "https://www.youtube.com/watch?v=" + video_id], encoding='utf-8', stdout=subprocess.PIPE)
    return(video_src.stdout.splitlines()[0])
