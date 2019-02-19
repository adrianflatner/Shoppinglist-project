from rest_framework import serializers
from .models import Grocery


class GrocerySerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'title',
            'description',
            'completed',
        )
        model = Grocery