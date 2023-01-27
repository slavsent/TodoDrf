from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.response import Response
from .models import User, Project, TODO
from .serializers import UserModelSerializer, ProjectModelSerializer, TODOModelSerializer
from rest_framework.pagination import LimitOffsetPagination
from .filters import TodoFilter, UserFilter, ProjectFilter
from rest_framework import mixins
from rest_framework import status


class UserLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 2


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class TodoimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


# class UserModelViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, GenericViewSet):
class UserModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
#    pagination_class = UserLimitOffsetPagination
#    filterset_class = UserFilter


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
 #   pagination_class = ProjectLimitOffsetPagination
 #   filterset_class = ProjectFilter

 #   def get_serializer_class(self):
 #       if self.request.method in ['GET']:
 #           return ProjectModelSerializerAny
 #       return ProjectModelSerializer


class TODOModelViewSet(ModelViewSet):
    queryset = TODO.objects.all()
    serializer_class = TODOModelSerializer
 #   pagination_class = TodoimitOffsetPagination
    filterset_class = TodoFilter

    def destroy(self, request, pk=None, *args, **kwargs):
        todo = self.get_object()
        if not todo.is_active:
            self.perform_destroy(todo)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            todo.is_active = False
            todo.save()
            serializer = self.serializer_class(
                instance=todo, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(data=serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
