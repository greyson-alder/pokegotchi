from django.http import HttpResponse, Http404
from rest_framework import status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, GenericAPIView
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from decimal import Decimal

from datetime import datetime
import json
import random

from .models import Pokemon, User
from .serializers import PokemonSerializer, UserSerializer

# Create your views here.

#Simple test view
def index(req):
    return HttpResponse("Pokegotchi!")

class PokemonList(viewsets.ModelViewSet):
    """
    List all Pokemon
    """
    queryset = Pokemon.objects.all()
    serializer_class = PokemonSerializer

    # def get(self, request, format=None):
    #     pokemon = Pokemon.objects.all()
    #     serializer = PokemonSerializer(pokemon, many=True)
    #     return Response(serializer.data)

    # def post(self, request, format=None):
    #     serializer = PokemonSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PokemonDetails(viewsets.ModelViewSet):
    """
    Lists details about a Pokemon
    """
    #permission_classes = [IsAuthenticated]
    queryset = Pokemon.objects.all()
    serializer_class = PokemonSerializer


    def get_pokemon(self, pk):
        try:
            return Pokemon.objects.get(pk=pk)
        except Pokemon.DoesNotExist:
            raise Http404

    # def get(self, request, pk, format=None):
    #     pokemon = self.get_pokemon(pk)
    #     serializer = PokemonSerializer(pokemon)
    #     return Response(serializer.data)
    
    # update pokemon hunger by giving json body to be {"add_hunger": "value","user": pk}
    @action(detail=True, methods=['post'])
    def add_hunger(self, request, pk, format=None):
        pokemon = self.get_pokemon(pk)

        print('data is ' + str(request.data))
        print(f'pokemon hunger is {pokemon.hunger}')
 
        data = request.data['add_hunger']
        pokemon.add_to_hunger(Decimal(data))
        serializer = PokemonSerializer(pokemon, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def add_happiness(self, request, pk, format=None):
        pokemon = self.get_pokemon(pk)

        print('data is ' + str(request.data))
        print(f'pokemon happiness is {pokemon.happiness}')
 
        data = request.data['add_happiness']
        pokemon.add_to_happiness(Decimal(data))
        serializer = PokemonSerializer(pokemon, data=request.data, partial=True)

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
    




class UserList(GenericAPIView):
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

class UserDetails(GenericAPIView):
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

class GameUpdate(APIView):

    def get_pokemon(self, pokemon_id):
        try:
            return Pokemon.objects.get(pk=pokemon_id)
        except Pokemon.DoesNotExist:
            raise Http404

    def increase_age(self, pk):
        age = self.get_pokemon(pk).age
        age += 1
        print("The pokemon's age is: ", age)
        return age

    def update_hunger(self, pk):
        hunger = self.get_pokemon(pk).hunger
        hunger_chance = random.randint(0, 1)
        if hunger_chance:
            hunger -= 10
            print("HUNGER ================================= (hunger decreasing by 1)")
        return hunger

    def update_happiness(self, pk):
        hunger = self.get_pokemon(pk).hunger
        happiness = self.get_pokemon(pk).happiness
        happiness_chance = random.randint(1, 102)
        if (happiness_chance < (100-hunger)):
            happiness -= 10
            print("HAPPINESS ================================= (happiness decreasing by 1)")
        return happiness

    def update_alive(self, pk, new_hunger):
        age = self.get_pokemon(pk).age
        alive = self.get_pokemon(pk).alive
        alive_chance = random.randint(1, 101)
        if ((alive_chance + 30) < age) or (new_hunger < 1):
            alive = False
        return alive

    def check_alive(self, isAlive):
        if isAlive == False:
            print("YOUR POKEMON DIED ===============================================================")

    def get(self, request, pk, format=None):
        
        #PokemonDetails.add_hunger(pk=1, request=-1)

        new_age = self.increase_age(pk)
        new_hunger = self.update_hunger(pk)
        new_happiness = self.update_happiness(pk)
        update_alive = self.update_alive(pk, new_hunger)

        self.check_alive(update_alive)

        pokemon_data = self.get_pokemon(pk)
        user = pokemon_data.user.id
        print(type(user))
        print(pokemon_data)
        
        time_now = datetime.now()
        #time_now = time_now.isoformat()
        #time_now = json.dumps(time_now)

        serializer = PokemonSerializer(
            pokemon_data, 
            data={
                "func_time": time_now,
                "age": new_age,
                "hunger": new_hunger,
                "happiness": new_happiness,
                "alive": update_alive,
                "user": user
                }
        )
        
        if serializer.is_valid():
            print("valid")
            serializer.save()
            print(pokemon_data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        print(pokemon_data)
        testData = "Hello Everyone!"
        return Response(testData)

    
class UsersPokemon(APIView):
    def get_pokemon(self, pk):
        try:
            return Pokemon.objects.get(user=pk)
        except Pokemon.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        pokemon = self.get_pokemon(pk)
        serializer = PokemonSerializer(pokemon)
        return Response(serializer.data)