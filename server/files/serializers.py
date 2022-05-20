from pkg_resources import require
from rest_framework import serializers

from .models import File


class FileSerializer(serializers.ModelSerializer):
    file = serializers.FileField(use_url=False, required=False)
    owner = serializers.ReadOnlyField(source='owner.username')
    size = serializers.ReadOnlyField(source='file.size')
    url = serializers.ReadOnlyField(source='file.url')

    class Meta:
        model = File
        fields = ['pk', 'owner', 'name', 'file', 'size', 'url']

    # def create(self, validated_data):
    #     request = self.context.get('request')

    #     if request and hasattr(request, 'user'):
    #         validated_data['owner'] = request.user
    #     return super().create(validated_data)