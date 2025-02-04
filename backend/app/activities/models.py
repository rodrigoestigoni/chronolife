from django.db import models
from django.conf import settings
from categories.models import Category

class Activity(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='activities')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='activities')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    completed = models.BooleanField(default=False)
    goal = models.IntegerField(null=True, blank=True)  # Ex: 100 treinos no ano
    unit = models.CharField(max_length=50, null=True, blank=True)  # Ex: "vezes", "litros"

    def __str__(self):
        return self.title
