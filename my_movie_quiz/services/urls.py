from django.urls import path
from services import views 

urlpatterns = [
    path('search_movies/<str:movie>', views.MoviesSearch.as_view(), name='movies_search'),
    path('search_movie/<int:movieId>', views.MovieSearch.as_view(), name='movie_search'),
    path('search_actors/<str:actors>', views.ActorsSearch.as_view(), name='actors_search'),
    path('search_trailer/<str:trailer_id>', views.TrailerSearch.as_view(), name='trailer_search')
]