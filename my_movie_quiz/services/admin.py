from django.contrib import admin
from .models import Picture, Tags

admin.site.register(Tags)
admin.site.register(Picture)