from rest_framework.viewsets import ModelViewSet
from .models import User, Project, TODO
from .serializers import UserModelSerializer, ProjectModelSerializer, TODOModelSerializer
from rest_framework.pagination import LimitOffsetPagination
from .filters import TodoFilter, UserFilter, ProjectFilter


class UserLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 2


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class TodoimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class UserModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    pagination_class = UserLimitOffsetPagination
    filterset_class = UserFilter


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter


class TODOModelViewSet(ModelViewSet):
    queryset = TODO.objects.all()
    serializer_class = TODOModelSerializer
    pagination_class = TodoimitOffsetPagination
    filterset_class = TodoFilter
