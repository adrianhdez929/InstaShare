from django.urls import path

from . import views


urlpatterns = [
    path('', views.ListUserTasksView.as_view()),
    path('new/', views.CreateTaskView.as_view())
]