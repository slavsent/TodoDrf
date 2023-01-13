from django_filters import rest_framework as filters
from .models import User, Project, TODO


class TodoFilter(filters.FilterSet):
    text = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = TODO
        fields = ['text', 'project', 'user',
                  'is_active', 'date_create', 'date_update']


class ProjectFilter(filters.FilterSet):
    name_project = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name_project', 'link_project']


class UserFilter(filters.FilterSet):
    class Meta:
        model = User
        fields = ['username', 'firstname', 'lastname', 'email']
