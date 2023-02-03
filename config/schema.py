import graphene
from graphene_django import DjangoObjectType
from mainapp.models import User, Project, TODO


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class TodoType(DjangoObjectType):
    class Meta:
        model = TODO
        fields = '__all__'


class Query(graphene.ObjectType):
    all_todos = graphene.List(TodoType)
    all_users = graphene.List(UserType)
    all_projects = graphene.List(ProjectType)
    user_by_username = graphene.Field(
        UserType, username=graphene.String(required=True))
    projects_by_username = graphene.List(
        ProjectType, username=graphene.String(required=False))
    todos_by_username = graphene.List(
        TodoType, username=graphene.String(required=False))
    todos_by_name_project = graphene.List(
        TodoType, name=graphene.String(required=False))

    def resolve_all_todos(root, info):
        return TODO.objects.all()

    def resolve_all_users(root, info):
        return User.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_user_by_username(root, info, username):
        try:
            return User.objects.get(username=username)
        except User.DoesNotExist:
            return None

    def resolve_projects_by_username(self, info, username=None):
        projectes = Project.objects.all()
        if username:
            projectes = projectes.filter(users__username=username)
        return projectes

    def resolve_todos_by_username(self, info, username=None):
        todos = TODO.objects.all()
        if username:
            todos = todos.filter(user__username=username)
        return todos

    def resolve_todos_by_name_project(self, info, name=None):
        todos = TODO.objects.all()
        if name:
            todos = todos.filter(project__name_project=name)
        return todos


schema = graphene.Schema(query=Query)
