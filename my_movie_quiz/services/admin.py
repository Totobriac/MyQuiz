from django.contrib import admin
from .models import Picture, Tags, VideoSource

admin.site.register(Tags)
admin.site.register(Picture)
admin.site.register(VideoSource)