from django.urls import path
from django.conf.urls import url
from rest_framework_swagger.views import get_swagger_view
#from rest_framework.schemas import get_schema_view
from . import views

from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.views.generic import TemplateView
# from rest_framework_jwt.views import obtain_jwt_token

schema_view = get_schema_view(
    openapi.Info(
        title="teamfinderr",
        default_version="v1",
        description="teamfinderr API",
    ),
    public=True,
)

urlpatterns = [
    path('', views.index),
    path('api/pokemon', views.PokemonList.as_view()),
    path('api/pokemon/<int:pk>', views.PokemonDetails.as_view()),
    path('api/user', views.UserList.as_view()),
    path('api/user/<int:pk>', views.UserDetails.as_view()),
    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    #path('swagger/', schema_view),
    #path('swagger/', ),
    

]