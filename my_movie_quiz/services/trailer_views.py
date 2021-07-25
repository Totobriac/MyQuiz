import base64
import os
import random
import string
import subprocess

import boto3
import requests
from django.http import HttpResponse, JsonResponse
from django.views import View
from dotenv import find_dotenv, load_dotenv

from .models import VideoSource
from .serializers import VideoSourceSerializer


class TrailerSearch(View):

    def get(self, request, *args, **kwargs):
        title = kwargs.get('title')
        date = kwargs.get('date').split("-")[0]
        query = title + " hd trailer " + date + ":youtube"
        load_dotenv()
        SERP_KEY = os.environ.get("SERP_KEY")

        headers = {'X-API-KEY': SERP_KEY}

        payload = {
            "query": query,
            "gl": "US",
            "hl": "en_US",
            "device": "desktop",
            "duration": "y",
            "autocorrect": 0,
            "page": 1,
            "uule": "string",
            "pages": 1,
            "length": "any",
            "quality": "any",
            "caption": "any"
        }

        r = requests.post('https://api.serpsbot.com/v2/google/videos',
                          json=payload, headers=headers)
        print(r.json())
        urls = r.json().get("data").get("results")
        yt_id = urls[0].get("url").split('=')[1]

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
        video_src = VideoSource.objects.get(pk=video_src_id)
        video = subprocess.run(["ffmpeg", "-y", "-ss", timestamp, "-i", video_src.video_src, "-f",
                               "image2", "-vframes", "1", "-filter:v", "scale='720:-1'", "-"], stdout=subprocess.PIPE)

        client = boto3.client('s3',
                              aws_access_key_id=AWS_KEY_ID,
                              aws_secret_access_key=AWS_ACCESS_KEY)
        file_id = id_generator()
        file_path = "screenshot/" + \
            "{}_pic_{}.jpeg".format(file_id, video_src_id)
        client.put_object(Body=video.stdout, Bucket="moviepictures",
                          Key=file_path, ContentType='image/JPEG')

        return JsonResponse({'url': file_path})


class CreateGif(View):

    def get(self, request, *args, **kwargs):
        load_dotenv()
        AWS_KEY_ID = os.environ.get("AWS_ACCESS_KEY_ID")
        AWS_ACCESS_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY")
        video_src_id = kwargs.get('video_src_id')
        timestamp = kwargs.get('timestamps')
        duration = kwargs.get('duration')
        video_src = VideoSource.objects.get(pk=video_src_id)
        gif = subprocess.run(["ffmpeg", "-y", "-ss", timestamp, "-t", duration, "-i", video_src.video_src, "-f", "gif", "-filter_complex",
                             "[0:v] fps=5,scale=480:-1,split [a][b];[a] palettegen [p];[b][p] paletteuse", "-"], stdout=subprocess.PIPE)

        client = boto3.client('s3',
                              aws_access_key_id=AWS_KEY_ID,
                              aws_secret_access_key=AWS_ACCESS_KEY)
        file_id = id_generator()
        file_path = "gif/" + "{}_pic_{}.gif".format(file_id, video_src_id)
        client.put_object(Body=gif.stdout, Bucket="moviepictures",
                          Key=file_path, ContentType='image/gif')

        return JsonResponse({'url': file_path})


def getSrc(video_id):
    video_src = subprocess.run(["youtube-dl", "-g", "https://www.youtube.com/watch?v=" +
                               video_id], encoding='utf-8', stdout=subprocess.PIPE)
    return(video_src.stdout.splitlines()[0])


def id_generator(size=4, chars=string.digits):
    return ''.join(random.choice(chars) for x in range(size))
