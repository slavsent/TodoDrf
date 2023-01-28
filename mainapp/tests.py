import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from django.contrib.auth.models import User
from .views import UserModelViewSet, ProjectModelViewSet, TODOModelViewSet
from .models import User as Us, Project, TODO
from mixer.backend.django import mixer


class TestUserViewSet(TestCase):

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = UserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_user(self):
        factory = APIRequestFactory()
        request = factory.post('/api/users/', {
            'username': 'user_10',
            'firstname': 'Stas',
            'lastname': 'Pavlov',
            'email': 'user10@mail.ru'}, format='json')
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post('/api/users/', {
            'username': 'user_10',
            'firstname': 'Stas',
            'lastname': 'Pavlov',
            'email': 'user10@mail.ru'}, format='json')
        admin = User.objects.create_superuser(
            'slav', 'slav@admin.com', 'admin')
        # admin = {'username': 'admin', 'password': 'space'}
        force_authenticate(request, admin)
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self):
        user = Us.objects.create(username='user_10',
                                 firstname='Stas',
                                 lastname='Pavlov',
                                 email='user10@mail.ru')
        client = APIClient()
        response = client.get(f'/api/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_detail(self):
        user = Us.objects.create(username='user_10',
                                 firstname='Stas',
                                 lastname='Pavlov',
                                 email='user10@mail.ru')
        client = APIClient()
        response = client.put(f'/api/users/{user.id}/', {
            'username': 'user_10',
            'firstname': 'Alex',
            'lastname': 'Pavlov',
            'email': 'user10@mail.ru'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        user = Us.objects.create(username='user_10',
                                 firstname='Stas',
                                 lastname='Pavlov',
                                 email='user10@mail.ru')
        client = APIClient()
        admin = User.objects.create_superuser(
            'slav', 'slav@admin.com', 'admin')
        client.login(username='slav', password='admin')
        response = client.put(f'/api/users/{user.id}/', {
            'username': 'user_10',
            'firstname': 'Alex',
            'lastname': 'Pavlov',
            'email': 'user10@mail.ru'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user = Us.objects.get(id=user.id)
        self.assertEqual(user.firstname, 'Alex')
        client.logout()


class TestTodoViewSet(TestCase):

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/project/')
        view = TODOModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestProjectViewSet(APITestCase):

    def test_get_list(self):
        response = self.client.get('/api/project/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_mixer(self):
        my_user = mixer.blend(Us)
        project = mixer.blend(Project, users=my_user)
        admin = User.objects.create_superuser(
            'slav', 'slav@admin.com', 'admin')
        self.client.login(username='slav', password='admin')
        response = self.client.put(f'/api/project/{project.id}/', {
            'name_project': 'Food',
            'link_project': 'www.fastfood.com',
            'users': [my_user.id]
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(id=project.id)
        self.assertEqual(project.name_project, 'Food')

    def test_create_project_admin(self):
        my_user = Us.objects.create(username='user_10',
                                    firstname='Stas',
                                    lastname='Pavlov',
                                    email='user10@mail.ru')
        admin = User.objects.create_superuser(
            'slav', 'slav@admin.com', 'admin')
        self.client.login(username='slav', password='admin')
        response = self.client.post('/api/project/', {
            'name_project': 'Food',
            'link_project': 'www.fastfood.com',
            'users': [my_user.id]
        })

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_edit_project_admin(self):
        my_user = Us.objects.create(username='user_10',
                                    firstname='Stas',
                                    lastname='Pavlov',
                                    email='user10@mail.ru')

        project = Project.objects.create(name_project='FasFood',
                                         link_project='www.fastfood.com'

                                         )
        project.users.add(my_user.id)
        admin = User.objects.create_superuser(
            'slav', 'slav@admin.com', 'admin')
        self.client.login(username='slav', password='admin')
        response = self.client.put(f'/api/project/{project.id}/', {
            'name_project': 'Food',
            'link_project': 'www.fastfood.com',
            'users': [my_user.id]
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(id=project.id)
        self.assertEqual(project.name_project, 'Food')
