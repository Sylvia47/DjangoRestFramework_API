from django.conf.urls import include
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ArticleViewSet

router = DefaultRouter()
router.register(r'article', ArticleViewSet)


urlpatterns = [
    path(r'api/', include(router.urls)),
]
