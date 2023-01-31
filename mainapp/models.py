from django.db import models
from uuid import uuid4


class User(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True)
    username = models.CharField(max_length=30)
    firstname = models.CharField(max_length=64)
    lastname = models.CharField(max_length=64)
    email = models.EmailField(max_length=64, unique=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)


class Project(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True)
    name_project = models.CharField(max_length=64)
    link_project = models.CharField(max_length=64)
    users = models.ManyToManyField(User)


class TODO(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True)

    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    date_create = models.DateTimeField(auto_now_add=True)
    date_update = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
