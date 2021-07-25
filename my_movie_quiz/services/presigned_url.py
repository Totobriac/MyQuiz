
import logging
import os

import boto3
from botocore.config import Config
from botocore.exceptions import ClientError
from django.http import JsonResponse
from django.views import View
from dotenv import find_dotenv, load_dotenv
from rest_framework.response import Response

my_config = Config(
    region_name='eu-west-3',
    signature_version='s3v4',
    retries={
        'max_attempts': 10,
        'mode': 'standard'
    }
)


class GenerateAwsSignature(View):

    def get(self, request, object_name):
        response = create_presigned_url("moviepictures", object_name)
        return JsonResponse({'url': response})


def create_presigned_url(bucket_name, object_name, expiration=3600):

    load_dotenv()
    AWS_KEY_ID = os.environ.get("AWS_ACCESS_KEY_ID")
    AWS_ACCESS_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY")
    s3_client = boto3.client('s3',
                             aws_access_key_id=AWS_KEY_ID,
                             aws_secret_access_key=AWS_ACCESS_KEY,
                             config=my_config)
    try:
        response = s3_client.generate_presigned_url('put_object',
                                                    Params={'Bucket': bucket_name,
                                                            'Key': object_name,
                                                            "ContentType": "image/jpeg"},
                                                    ExpiresIn=expiration)
    except ClientError as e:
        logging.error(e)
        return None
    return(response)
