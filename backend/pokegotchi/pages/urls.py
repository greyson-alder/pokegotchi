from django.urls import path
from django.conf.urls import url
from rest_framework import permissions
from rest_framework_swagger.views import get_swagger_view
from rest_framework.schemas import get_schema_view
from . import views

from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.views.generic import TemplateView

schema_view = get_schema_view(
    openapi.Info(
        title="pokegotchi",
        default_version="v1",
        description="pokegotchi API",
    ),
    public=True,

)

pokemon_list = views.PokemonList.as_view({
    'get': 'list',
    'post': 'create'
})

pokemon_detail = views.PokemonDetails.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy',
})

pokemon_hunger = views.PokemonDetails.as_view({
    'post': 'add_hunger',
})

pokemon_happiness = views.PokemonDetails.as_view({
    'post': 'add_happiness',
})

urlpatterns = [
    path('', views.index),
    path('api/pokemon', pokemon_list),
    path('api/pokemon/<int:pk>', pokemon_detail),
    path('api/pokemon/<int:pk>/hunger', pokemon_hunger),
    path('api/pokemon/<int:pk>/happiness', pokemon_happiness),
    path('api/user', views.UserList.as_view()),
    path('api/user/<int:pk>', views.UserDetails.as_view()),
    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("gameupdate/<int:pk>", views.GameUpdate.as_view()),
    path('api/pokemon/user/<int:pk>', views.UsersPokemon.as_view())


]
