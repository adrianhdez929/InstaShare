from requests import request
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from rest_framework.permissions import AllowAny

from .models import File
from .serializers import EditFileSerializer, FileSerializer


class FilesViewset(ModelViewSet):
    serializer_class = FileSerializer
    parser_classes = (MultiPartParser, FormParser)
    model = File

    def get_queryset(self):
        return self.model.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class FileViewSet(ModelViewSet):
    model = File
    permission_classes = [AllowAny] 

    def get_serializer_class(self, *args, **kwargs):
        if self.request.method == 'PATCH':
            return EditFileSerializer

        return FileSerializer

    def get_object(self):
        return self.model.objects.get(id=self.kwargs.get('pk'))
