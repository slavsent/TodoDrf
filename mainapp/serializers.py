from rest_framework.serializers import HyperlinkedModelSerializer, ValidationError, ModelSerializer
from .models import User, Project, TODO


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        # fields = ('username', 'firstname', 'lastname', 'email',)


class ProjectModelSerializer(ModelSerializer):
    # users = UserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class TODOModelSerializer(HyperlinkedModelSerializer):
    # user = UserModelSerializer()
    # project = ProjectModelSerializer()

    class Meta:
        model = TODO
        fields = '__all__'
