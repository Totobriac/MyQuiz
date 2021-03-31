from django.urls import include, path
from services import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'picture', views.PictureViewSet)
router.register(r'tags', views.TagsViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('search_movies/<str:movie>', views.MoviesSearch.as_view(), name='movies_search'),
    path('search_actors/<str:actors>', views.ActorsSearch.as_view(), name='actors_search'),
    path('search_trailer/<str:title>/<str:date>', views.TrailerSearch.as_view(), name='trailer_search'),
    path('scrapbook/<str:video>/<str:timestamps>', views.CreateScrapBook.as_view()),
    path('picturetag/<str:tag>/', views.TagPicsListAPIView.as_view()),
]