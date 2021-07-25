from django.urls import include, path
from rest_framework import routers

from services import actors_views, record_views, trailer_views, views, presigned_url

router = routers.DefaultRouter()
router.register(r'picture', views.PictureViewSet)
router.register(r'tags', views.TagsViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('search_movies/<int:movie_id>',
         views.MoviesSearch.as_view(), name='movies_search'),
    path('search_person/<int:person_id>/<str:dpt>',
         views.PersonSearch.as_view(), name='movies_search'),
    path('autocomplete/', views.EmptyAutocomplete.as_view(), name='autocomplete'),
    path('autocomplete/<str:movie>',
         views.Autocomplete.as_view(), name='autocomplete'),
    path('discover', views.Discover.as_view(), name='discover'),
    path('peopleautocomplete/<str:people>',
         views.PeopleAutocomplete.as_view(), name='people_autocomplete'),
    path('peopleautocomplete/',
         views.EmptyAutocomplete.as_view(), name='autocomplete'),
    path('search_actors/<str:actor>/<str:profile_path>',
         actors_views.ActorsSearch.as_view(), name='actors_search'),
    path('add_picture/<str:actor>',
         actors_views.AddPicture.as_view(), name='actors_search'),
    path('video_src/<str:video>',
         trailer_views.RetreiveSrc.as_view(), name='video_src'),
    path('search_trailer/<str:title>/<str:date>',
         trailer_views.TrailerSearch.as_view(), name='trailer_search'),
    path('scrapbook/<str:video_src_id>/<str:timestamps>',
         trailer_views.CreateScrapBook.as_view()),
    path('gif/<str:video_src_id>/<str:timestamps>/<str:duration>',
         trailer_views.CreateGif.as_view()),
    path('picturetag/<str:tag>/', views.TagPicsListAPIView.as_view()),
    path('album/<str:movie_name>/<str:year>/<str:composer>',
         views.AlbumSearch.as_view(), name='album_search'),
    path('tracks/<str:music_id>/<str:format>',
         views.TrackSearch.as_view(), name='track_search'),
    path('sample/<str:query>', views.SampleSearch.as_view(), name='sample_search'),
    path('record', record_views.Record.as_view(), name='record'),
    path('presigned_url/<str:object_name>',
         presigned_url.GenerateAwsSignature.as_view(), name='presigned_url'),
]
