from django.urls import path
from . import views
from django.urls import include

urlpatterns = [
    path('', include(('todoFrontend.urls', 'todoFrontend'), namespace='todo-frontend')),
    path(r'task-overview/', views.taskOverview, name='task-overview'),
    path(r'task-list/', views.taskList, name='task-list'),
    path(r'task-detail/<str:pk>/', views.taskDetail, name='task-detail'),
    path(r'task-create/', views.taskCreate, name='task-create'),
    path(r'task-update/<str:pk>/', views.taskUpdate, name='task-update'),
    path(r'task-delete/<str:pk>/', views.taskDelete, name='task-delete')
]
