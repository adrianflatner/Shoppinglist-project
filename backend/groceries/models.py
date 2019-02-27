from django.db import models
from django.contrib.contenttypes.models import ContentType

class Grocery(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=False)
    completed = models.BooleanField(blank=False, default=False)

    def __str__(self):
        """A string representation of the model."""
        return self.title



