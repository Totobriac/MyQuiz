from rest_framework import serializers
from .models import Picture, Tags

 
class PictureSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Picture
        fields = ('id', 'author_name',
                  'stock_name', 'tag',
                  'lowUrl', 'highUrl')
                  

class TagsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tags
        fields = ['tag']