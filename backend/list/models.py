# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from groceries.models import Grocery

# Create your models here.
class List(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    groceries = models.ManyToManyField(Grocery, blank=True, null=True)

    def __str__(self):
        return self.title
    