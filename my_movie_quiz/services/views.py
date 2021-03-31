import requests
from django.http import HttpResponse
from django.views import View
from rest_framework.decorators import api_view
from django.http import JsonResponse
import subprocess
import json
import urllib.parse
import boto3
from .models import Tags, Picture
from .serializers import PictureSerializer, TagsSerializer
from rest_framework.decorators import api_view
from rest_framework import generics, viewsets
import os
from dotenv import load_dotenv, find_dotenv


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


class CreateScrapBook(View):

    def get(self, request, *args, **kwargs):
        load_dotenv()
        AWS_KEY_ID = os.environ.get("AWS_ACCESS_KEY_ID")
        AWS_ACCESS_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY")
        print(AWS_ACCESS_KEY, AWS_KEY_ID)
        i = 1
        stdouts = []
        urls = []       
        video_id = kwargs.get('video')
        timestamps = kwargs.get('timestamps')
        video_src = getSrc(video_id)
        for timestamp in timestamps.split(","):           
            video = subprocess.run(["ffmpeg", "-y", "-ss", timestamp, "-i", video_src, "-f", "image2", "-vframes", "1", "-"], stdout=subprocess.PIPE)
            stdouts.append(video.stdout)

        client = boto3.client('s3',
                              aws_access_key_id = AWS_KEY_ID,
                              aws_secret_access_key = AWS_ACCESS_KEY)

        for stdout in stdouts:
            file_path = "screenshot/" + "{}_pic_{}.jpeg".format(video_id, i)
            client.put_object(Body=stdout, Bucket="moviepictures", Key= file_path, ContentType='image/JPEG')
            urls.append({"url" : file_path})
            i += 1

        return JsonResponse(urls, safe=False)


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