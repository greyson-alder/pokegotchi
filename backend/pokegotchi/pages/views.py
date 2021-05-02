from django.http import HttpResponse, Http404
from rest_framework import status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView

from .models import Pokemon, User
from .serializers import PokemonSerializer, UserSerializer

# Create your views here.

#Simple test view
def index(req):
    return HttpResponse("Pokegotchi!")

class PokemonList(ListAPIView):
    """
    List all Pokemon
    """
    queryset = Pokemon.objects.all()
    serializer_class = PokemonSerializer

    def get(self, request, format=None):
        pokemon = Pokemon.objects.all()
        serializer = PokemonSerializer(pokemon, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = PokemonSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PokemonDetails(ListAPIView):
    """
    Lists details about a Pokemon
    """
    queryset = Pokemon.objects.all()
    serializer_class = PokemonSerializer

    def get_pokemon(self, pk):
        try:
            return Pokemon.objects.get(pk=pk)
        except Pokemon.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        pokemon = self.get_pokemon(pk)
        serializer = PokemonSerializer(pokemon)
        return Response(serializer.data)
    
    def put(self, request, pk, format=None):
        pokemon = self.get_pokemon(pk)
        serializer = PokemonSerializer(pokemon, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # def put(self, request, pk, format=None):
    #     pokemon = self.get_pokemon(pk)
    #     serializer = PokemonSerializer(pokemon, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    




class UserList(ListAPIView):
    """
    List all Users
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request, format=None):
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDetails(ListAPIView):
    """
    Lists details about a user
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_user(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        user = self.get_user(pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)
