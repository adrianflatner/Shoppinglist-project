from django.db import models

class Grocery(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    completed = models.BooleanField(blank=False, default=False)

    def __str__(self):
        """A string representation of the model."""
        return self.title
