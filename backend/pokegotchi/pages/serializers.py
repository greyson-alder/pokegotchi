from rest_framework import serializers

from .models import Pokemon, User

class PokemonSerializer(serializers.ModelSerializer):
    return_pokemon_id = serializers.SerializerMethodField()
    class Meta:
        model = Pokemon
        fields = (
            'return_pokemon_id',
            'name',
            'age',
            'pokemon',
            'happiness',
            'hunger',
            'user',
            'func_time',
        )

    def get_return_pokemon_id(self, obj):
        return obj.pokemon_id

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'username',
            'id'
        )