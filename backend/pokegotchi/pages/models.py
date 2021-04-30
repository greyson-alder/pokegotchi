from django.db import models

# Create your models here.
class Pokemon(models.Model):
    id=models.IntegerField(primary_key=True)
    name = models.CharField(max_length=200, null=True)
    age = models.DecimalField(decimal_places=2, max_digits=10)
    pokemon = models.CharField(max_length=200)
    happiness = models.DecimalField(decimal_places=2, max_digits=10)
    hunger = models.DecimalField(decimal_places=2, max_digits=10)

    def __str__(self):
        return f'{self.name} is a {self.pokemon}'