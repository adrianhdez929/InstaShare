from rest_framework.generics import CreateAPIView, ListAPIView
from .models import Task

from .serializers import TaskSerializer


class CreateTaskView(CreateAPIView):
    serializer_class = TaskSerializer

class ListUserTasksView(ListAPIView):
    serializer_class = TaskSerializer
    
    def get_queryset(self):
        return Task.objects.filter(owner=self.request.user)
