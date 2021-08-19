from django.contrib import admin
from .models import Article


# Register your models here.

class articleAdmin(admin.ModelAdmin):
    pass


admin.site.register(Article)
