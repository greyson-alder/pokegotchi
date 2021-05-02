from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser

#print("auth model is " + settings.AUTH_USER_MODEL)

class User(AbstractUser):
    def __str__(self):
        return f'user_id:{self.id}'

# Create your models here.
class Pokemon(models.Model):
    pokemon_id=models.IntegerField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, null=True)
    age = models.DecimalField(decimal_places=2, max_digits=10, default=0)
    pokemon = models.CharField(max_length=200, default="Pikachu")
    happiness = models.DecimalField(decimal_places=2, max_digits=10, default=100)
    hunger = models.DecimalField(decimal_places=2, max_digits=10, default=100)

    def __str__(self):
        return f'{self.name} is a {self.pokemon}'