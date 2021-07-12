
import boto3
from rest_framework.response import Response
from django.views import View
import os
from dotenv import load_dotenv, find_dotenv
from django.http import JsonResponse


class GenerateAwsSignature(View):

    def get(self, request, object_name):
        bucket_name = "moviepictures"
        presigned_url = create_presigned_url(bucket_name, object_name)        
        return JsonResponse({"presigned_url": presigned_url})


def create_presigned_url(bucket_name, object_name,
                         fields=None, conditions=None, expiration=3600):

    load_dotenv()
    AWS_KEY_ID = os.environ.get("AWS_ACCESS_KEY_ID")
    AWS_ACCESS_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY")

    s3_client = boto3.client('s3',
                             aws_access_key_id=AWS_KEY_ID,
                             aws_secret_access_key=AWS_ACCESS_KEY)
    response = s3_client.generate_presigned_post(bucket_name,
                                                 object_name,
                                                 Fields=fields,
                                                 Conditions=conditions,
                                                 ExpiresIn=expiration)
    return response
