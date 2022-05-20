from django.urls import path

from . import views

files_router = views.FilesViewset.as_view({
    'get': 'list',
    'post': 'create',
})

file_router = views.FileViewSet.as_view({
    'get': 'retrieve',
    'path': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = [
    path('', files_router),
    path('<int:pk>/', file_router)
]

