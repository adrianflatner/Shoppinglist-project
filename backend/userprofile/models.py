from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import User

class Userprofile(models.Model):
    bio = models.TextField(blank=True)
    allergies = models.TextField(blank=True)
    user = models.ForeignKey(User, blank=True, null=True, on_delete=models.DO_NOTHING, related_name='us')

    def __str__(self):
        """A string representation of the model."""
        return self.user.username



