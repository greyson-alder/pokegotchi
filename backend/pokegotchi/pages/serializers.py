from rest_framework import serializers

from .models import Pokemon, User

class PokemonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pokemon
        fields = (
            #'pokemon_id',
            'name',
            'age',
            'pokemon',
            'happiness',
            'hunger',
            'user'
        )

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'username',
            'id'
        )