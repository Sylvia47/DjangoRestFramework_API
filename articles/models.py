from django.db import models


# Create your models here.

class Article(models.Model):
    title = models.CharField(max_length=20)
    content = models.TextField()
    create_day = models.DateTimeField(auto_now_add=True)
    modify_day = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Article'
