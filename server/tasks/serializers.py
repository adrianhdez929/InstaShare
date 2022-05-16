from attr import field
from requests import request
from rest_framework.serializers import ModelSerializer

from .models import Task


class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = ['content']
    
    def create(self, validated_data):
        request = self.context.get('request')

        if request and hasattr(request, 'user'):
            validated_data['owner'] = request.user
        return super().create(validated_data)
