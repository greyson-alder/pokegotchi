from django.http import HttpResponse, Http404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
def index(req):
    return HttpResponse("Pokegotchi!")