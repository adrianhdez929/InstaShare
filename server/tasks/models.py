from operator import mod
from django.db import models
from django.contrib.auth import get_user_model


class Task(models.Model):
    owner = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    content = models.CharField(max_length=255, blank=False)
