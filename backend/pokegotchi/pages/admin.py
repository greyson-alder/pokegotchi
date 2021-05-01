from django.contrib import admin
from .models import Pokemon
from django.contrib.auth.admin import UserAdmin
from .models import User

# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(Pokemon)