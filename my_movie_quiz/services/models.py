from django.db import models

class Tags (models.Model):
    tag = models.CharField(max_length = 20)

    def __str__(self):
        return self.tag


class Picture (models.Model):
    id = models.IntegerField(primary_key=True, unique=True)
    author_name = models.CharField(max_length = 40)
    stock_name = models.CharField(max_length = 20)
    tag = models.ManyToManyField('Tags')
    lowUrl = models.URLField(max_length = 200)
    highUrl = models.URLField(max_length = 200)

class VideoSource (models.Model):
    video_src = models.TextField()