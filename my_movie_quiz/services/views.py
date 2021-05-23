import requests
from django.http import HttpResponse
from django.views import View
from rest_framework.decorators import api_view
from django.http import JsonResponse
import subprocess
import json
import boto3
from .models import Tags, Picture, VideoSource
from .serializers import PictureSerializer, TagsSerializer, VideoSourceSerializer
from rest_framework.decorators import api_view
from rest_framework import generics, viewsets
import os
from dotenv import load_dotenv, find_dotenv
import string
import random
import base64

def id_generator(size=4, chars=string.digits):
    return ''.join(random.choice(chars) for x in range(size))


class Autocomplete(View):

    def get(self, request, movie):
        results = []
        load_dotenv()
        API_KEY = os.environ.get("IMDB_KEY")
        for i in range(1,5):
            search_url = "https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY +"&language=en-US&query=" + movie + "&page=" + str(i)
            response = requests.get(search_url)
            if response.status_code == 200:
                json_data = json.loads(response.text)["results"]
                results.append(json_data)
            else: break
        flat_results = [item for sublist in results for item in sublist]
        return JsonResponse(flat_results, safe=False)


class PeopleAutocomplete(View):

    def get(self, request, people):
        results = []
        load_dotenv()
        API_KEY = os.environ.get("IMDB_KEY")
        for i in range(1,5):
            search_url = "https://api.themoviedb.org/3/search/person?api_key=" + API_KEY +"&language=en-US&query=" + people + "&page=" + str(i)
            response = requests.get(search_url)
            if response.status_code == 200:
                json_data = json.loads(response.text)["results"]
                results.append(json_data)
            else: break
        flat_results = [item for sublist in results for item in sublist]
        return JsonResponse(flat_results, safe=False)


class EmptyAutocomplete(View):

    def get(self, request):
        return JsonResponse([], safe=False)


class MoviesSearch(View):

    def get(self, request, movie_id):
        load_dotenv()
        API_KEY = os.environ.get("IMDB_KEY")
        search_url = "https://api.themoviedb.org/3/movie/" + str(movie_id) +"/credits?api_key=" + API_KEY
        response = requests.get(search_url)
        json_data = json.loads(response.text)
        cast = json_data['cast'][:4]
        composers = []
        for j in json_data["crew"]:
            if j["department"] == "Sound" and (j["job"] == "Music" or j["job"] == "Original Music Composer"):
                composers.append(j['name'])
        return JsonResponse({"cast": cast, "composers": composers}, safe=False)


class Discover(View):

    def get(self, request):
        results = []
        load_dotenv()
        API_KEY = os.environ.get("IMDB_KEY")
        for i in range(1,5):
            search_url = "https://api.themoviedb.org/3/discover/movie?api_key=" + API_KEY + "&page=" + str(i)
            response = requests.get(search_url)
            if response.status_code == 200:
                json_data = json.loads(response.text)
                print(json_data["results"])
                results.append(json_data["results"])
            else: break
        flat_results = [item for sublist in results for item in sublist]
        return JsonResponse(flat_results, safe=False)


class PersonSearch(View):

    def get(self, request, person_id, dpt):
        print(dpt)
        results = []
        load_dotenv()
        API_KEY = os.environ.get("IMDB_KEY")
        search_url = "https://api.themoviedb.org/3/person/" + str(person_id) +"/movie_credits?api_key=" + API_KEY
        response = requests.get(search_url)
        if response.status_code == 200:
            if dpt == "Acting":
                json_data = json.loads(response.text)["cast"]
            else: json_data = json.loads(response.text)["crew"]
            results.append(json_data)        
        flat_results = [item for sublist in results for item in sublist]
        return JsonResponse(flat_results, safe=False)


class TrailerSearch(View):

    def get(self, request, *args, **kwargs):
        title = kwargs.get('title')
        date = kwargs.get('date').split("-")[0]
        query = title + " hd trailer " + date

        r = requests.get("https://api.qwant.com/api/search/videos",
            params={
                'count': 1,
                'q': query,
                't': 'videos',
                'source': 'youtube',
                'safesearch': 1,
                'locale': 'en_US',
                'uiv': 4
            },             
            headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
            }
        )
        print(r)
        response = r.json().get('data').get('result').get('items')
        urls = [r.get('url') for r in response]
        yt_id = urls[0].split('=')[1]
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
        load_dotenv()
        AWS_KEY_ID = os.environ.get("AWS_ACCESS_KEY_ID")
        AWS_ACCESS_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY")    
        session = boto3.Session(
            aws_access_key_id=AWS_KEY_ID,
            aws_secret_access_key=AWS_ACCESS_KEY,
        )
        actorPicUrl = []
        actors_list = actors.split('$')              
        for actor in actors_list:
            r = requests.get("https://api.qwant.com/api/search/images",
                params={
                    'count': 6,
                    'q': actor + " actor",
                    't': 'images',
                    'safesearch': 1,
                    'locale': 'en_US',
                    'uiv': 4,
                    'size': 'medium',
                },             
                headers={
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
                }
            )
            url_list = []
            response = r.json().get('data').get('result').get('items')
            urls = [r.get('media') for r in response]
            i = 1
            for url in urls:
                print(url)
                file_key = "actors/" + "{}.{}".format(actor, i)
                s3_object = session.resource('s3').Object('moviepictures', file_key )

                with requests.get(url, stream=True) as r:
                    s3_object.put(Body=r.content, ContentType="image/jpeg")
                    if len(actors_list) == 1 :
                        url_list.append({"index": i-1, "url": "https://moviepictures.s3.eu-west-3.amazonaws.com/" + file_key})
                    else: url_list.append({"index": i, "url": "https://moviepictures.s3.eu-west-3.amazonaws.com/" + file_key})
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
