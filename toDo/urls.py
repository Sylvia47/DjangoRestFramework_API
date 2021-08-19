from django.conf.urls import include
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet

router = DefaultRouter()
router.register(r'task', TaskViewSet)


urlpatterns = [
    path(r'api/', include(router.urls)),
]
