from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('pokemon', views.PokemonList.as_view()),
    path('pokemon/<int:pk>', views.PokemonDetails.as_view()),
]