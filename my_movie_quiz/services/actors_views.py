import os
import uuid

import boto3
import requests
from django.http import JsonResponse
from django.views import View
from dotenv import find_dotenv, load_dotenv


class ActorsSearch(View):

    def get(self, request, actor, profile_path):

        movie_db_url = "https://www.themoviedb.org/t/p/w185/" + profile_path
        load_dotenv()
        SERP_KEY = os.environ.get("SERP_KEY")
        AWS_KEY_ID = os.environ.get("AWS_ACCESS_KEY_ID")
        AWS_ACCESS_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY")
        s3 = boto3.client('s3',
                          aws_access_key_id=AWS_KEY_ID,
                          aws_secret_access_key=AWS_ACCESS_KEY,
                          )
        url_list = []
        split_name = actor.split(" ")
        actor_name = "_".join(split_name)
        r = requests.get(
            "https://moviepictures.s3.eu-west-3.amazonaws.com/actors/" + actor_name + "/")

        if r.status_code == 200:
            objects = s3.list_objects_v2(Bucket="moviepictures",
                                                Prefix="actors/" + actor_name + "/")
            i = -1
            for obj in objects["Contents"]:
                url_list.append(
                    {"index": i, "url": "https://moviepictures.s3.eu-west-3.amazonaws.com/" + obj["Key"]})
                i += 1
            return JsonResponse(url_list[1:], safe=False)

        else:
            bucket_name = "moviepictures"
            folder_name = "actors/" + actor_name
            s3.put_object(Bucket=bucket_name, Key=(folder_name+'/'))

            headers = {'X-API-KEY': SERP_KEY}

            payload = {
                "query": actor + " actor portrait -gettyimages -shutterstock -alamyimages -alamy -fr.depositphotos",
                "gl": "FR",
                "hl": "en_US",
                "device": "desktop",
                "duration": "10y",
                "autocorrect": 0,
                "page": 1,
                "uule": "string",
                "pages": 1,
                "size": "medium",
                "license": "any",
                "color": "any",
                "type": "any"
            }

            r = requests.post(
                'https://api.serpsbot.com/v2/google/images', json=payload, headers=headers)

            urls = r.json().get("data").get("results")
            if (profile_path != "none"):
                urls.insert(0, movie_db_url)
            i = 0
            for url in urls[:3]:
                session = boto3.Session(
                    aws_access_key_id=AWS_KEY_ID,
                    aws_secret_access_key=AWS_ACCESS_KEY)
                file_key = "actors/" + actor_name + "/" + "{}".format(u())
                s3_object = session.resource('s3').Object(
                    'moviepictures', file_key)

                with requests.get(url, stream=True) as r:
                    s3_object.put(Body=r.content, ContentType="image/jpeg")
                    url_list.append(
                        {"index": i, "url": "https://moviepictures.s3.eu-west-3.amazonaws.com/" + file_key})
                    i += 1

        return JsonResponse(url_list, safe=False)


class AddPicture(View):

    def get(self, request, actor):
        load_dotenv()
        SERP_KEY = os.environ.get("SERP_KEY")
        AWS_KEY_ID = os.environ.get("AWS_ACCESS_KEY_ID")
        AWS_ACCESS_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY")
        s3 = boto3.client('s3',
                          aws_access_key_id=AWS_KEY_ID,
                          aws_secret_access_key=AWS_ACCESS_KEY,
                          )
        url_list = []
        split_name = actor.split(" ")
        actor_name = "_".join(split_name)

        r = requests.get(
            "https://moviepictures.s3.eu-west-3.amazonaws.com/actors/" + actor_name + "/")

        objects = s3.list_objects_v2(Bucket="moviepictures",
                                     Prefix="actors/" + actor_name + "/")
        pics_nb = len(objects["Contents"])

        headers = {'X-API-KEY': SERP_KEY}

        payload = {
            "query": actor + " portrait -gettyimages -shutterstock -alamyimages -alamy -fr.depositphotos",
            "gl": "FR",
            "hl": "en_US",
            "device": "desktop",
            "duration": "10y",
            "autocorrect": 0,
            "page": 1,
            "uule": "string",
            "pages": 1,
            "size": "medium",
            "license": "any",
            "color": "any",
            "type": "any"
        }

        r = requests.post(
            'https://api.serpsbot.com/v2/google/images', json=payload, headers=headers)

        urls = r.json().get("data").get("results")
        bucket_name = "moviepictures"

        i = pics_nb-1
        for url in urls[i:i+3]:
            session = boto3.Session(
                aws_access_key_id=AWS_KEY_ID,
                aws_secret_access_key=AWS_ACCESS_KEY)
            file_key = "actors/" + actor_name + "/" + "{}".format(u())
            s3_object = session.resource('s3').Object(
                'moviepictures', file_key)

            with requests.get(url, stream=True) as r:
                s3_object.put(Body=r.content, ContentType="image/jpeg")
                url_list.append(
                    {"index": i, "url": "https://moviepictures.s3.eu-west-3.amazonaws.com/" + file_key})
                i += 1

        return JsonResponse(url_list, safe=False)


def u():
    return str(uuid.uuid4())
