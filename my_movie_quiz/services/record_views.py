import requests
from django.http import HttpResponse
from django.views import View
from rest_framework.decorators import api_view
from django.http import JsonResponse
import subprocess
import os
from threading import Thread
import json
import boto3
from dotenv import load_dotenv, find_dotenv
import string
import random


class Record(View):

    def get(self, request,  *args, **kwargs):
        load_dotenv()
        AWS_KEY_ID = os.environ.get("AWS_ACCESS_KEY_ID")
        AWS_ACCESS_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY")  
        music_details = json.loads(request.GET.get('json'))
        print(music_details)
        url = music_details['url']
        start =  music_details['start']
        duration = music_details['duration']
        rate =  music_details['rate']
        volume =  music_details['volume']

        sample_pipe = []

        for i in range(len(url)):
            sample_pipe.append(subprocess.run(["ffmpeg","-y","-stream_loop", "-1", "-i", \
                                    url[i], \
                                    "-af","volume=" + str(volume[i])+ ", adelay="+ str(start[i]) +"|"+ str(start[i])+", atempo=" + str(rate[i]),\
                                    "-t", duration[i], "-f", "mp3", "pipe:"], stdout=subprocess.PIPE).stdout)
            i += 1    

        pipe_name = []
        for i in range(len(sample_pipe)):
            pipe_name.append("audio_pip" + str(i))
            os.mkfifo(pipe_name[i])

        if len(sample_pipe) == 1:
            process = subprocess.Popen(["ffmpeg", "-y", '-f', 'mp3',
                                        "-i", pipe_name[0],                                        
                                        "best_hit_ever.mp3"],                               
                                        stdin=subprocess.PIPE)

            
        elif len(sample_pipe) == 2:            
            process = subprocess.Popen(["ffmpeg", "-y", '-f', 'mp3',
                                        "-i", pipe_name[0],
                                        "-i", pipe_name[1],                                
                                        "-filter_complex", "amix=inputs=2:duration=longest", "best_hit_ever.mp3"],                               
                                        stdin=subprocess.PIPE)           
        
        elif len(sample_pipe) == 3:
            process = subprocess.Popen(["ffmpeg", "-y", '-f', 'mp3',
                                        "-i", pipe_name[0],
                                        "-i", pipe_name[1],
                                        "-i", pipe_name[2],
                                        "-filter_complex", "amix=inputs=3:duration=longest", "best_hit_ever.mp3"],                               
                                        stdin=subprocess.PIPE)

        elif len(sample_pipe) == 4:
            process = subprocess.Popen(["ffmpeg", "-y", '-f', 'mp3',
                                        "-i", pipe_name[0],
                                        "-i", pipe_name[1],
                                        "-i", pipe_name[2],
                                        "-i", pipe_name[3],
                                        "-filter_complex", "amix=inputs=4:duration=longest", "best_hit_ever.mp3"],                               
                                        stdin=subprocess.PIPE)

        elif len(sample_pipe) == 5:
            process = subprocess.Popen(["ffmpeg", "-y", '-f', 'mp3',
                                        "-i", pipe_name[0],
                                        "-i", pipe_name[1],
                                        "-i", pipe_name[2],
                                        "-i", pipe_name[3],
                                        "-i", pipe_name[4],
                                        "-filter_complex", "amix=inputs=5:duration=longest", "best_hit_ever.mp3"],                               
                                        stdin=subprocess.PIPE)

            
        threads = []
        for i in range(len(sample_pipe)):
            threads.append(Thread(target=writer, args=(sample_pipe[i], pipe_name[i], 1024)) )
        for thread in threads:    
            thread.start()
        for thread in threads:    
            thread.join()   
        
        process.wait()
        
        for i in range(len(sample_pipe)):
            os.unlink(pipe_name[i])

        client = boto3.client('s3',
                                aws_access_key_id = AWS_KEY_ID,
                                aws_secret_access_key = AWS_ACCESS_KEY)
        file_id = id_generator()        
        file_path = "music/" + "best_mix_ever_{}.mp3".format(file_id)
        f = open('/home/totobriac/quiz/MyQuiz/my_movie_quiz/best_hit_ever.mp3', 'rb')
        client.put_object(Body= f, Bucket="moviepictures", Key= file_path, ContentType='audio/mpeg')
        os.unlink("best_hit_ever.mp3")
        return JsonResponse({'url': file_path})


def writer(data, pipe_name, chunk_size):    
    fd_pipe = os.open(pipe_name, os.O_WRONLY)  
    for i in range(0, len(data), chunk_size):       
        os.write(fd_pipe, data[i:chunk_size+i])     
    os.close(fd_pipe)

def id_generator(size=4, chars=string.digits):
    return ''.join(random.choice(chars) for x in range(size))
