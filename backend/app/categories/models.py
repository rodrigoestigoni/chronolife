from django.db import models
from django.conf import settings

class Category(models.Model):
    name = models.CharField(max_length=100)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='categories')

    def __str__(self):
        return self.name
