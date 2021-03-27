import requests
from django.http import HttpResponse
from django.views import View
from rest_framework.decorators import api_view
from django.http import JsonResponse
import subprocess
import json
import urllib.parse
from .models import Tags, Picture
from .serializers import PictureSerializer, TagsSerializer
from rest_framework.decorators import api_view
from rest_framework import generics, viewsets

class MoviesSearch(View):

    def get(self, request, movie):
        movies_list = []
        index = 1
        isSearching = True
        while isSearching == True:
            search_url = "https://api.themoviedb.org/3/search/movie?api_key=137e8b3a07e487eeeaa6f211207f674a&language=en-US&query=" + movie + "&page=" + str(index) + "&include_adult=false"
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
        title = kwargs.get('title')
        date = kwargs.get('date').split("-")[0]
        params = urllib.parse.quote(title + " hd trailer " + date)        
        search_url = "https://youtube.googleapis.com/youtube/v3/search?part=id&maxResults=1&q=" + params  + "&key=AIzaSyDdU8fgEmwuJP-eL3v_HxNv2AogCmC7wYA"
        response = requests.get(search_url)
        json_data = json.loads(response.text)
        yt_id = json_data["items"][0]["id"]["videoId"]

        return JsonResponse({'trailer_id': yt_id}, safe=False)


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