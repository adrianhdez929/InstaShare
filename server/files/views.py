from requests import request
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status

from .models import File
from .serializers import FileSerializer


class FilesViewset(ModelViewSet):
    serializer_class = FileSerializer
    parser_classes = (MultiPartParser, FormParser)
    model = File

    def get_queryset(self):
        return self.model.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class FileViewSet(ModelViewSet):
    serializer_class = FileSerializer
    model = File

    def get_object(self):
        return self.model.objects.get(id=self.kwargs.get('pk'))
