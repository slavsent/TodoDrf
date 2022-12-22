from django.contrib.auth.models import User
from django.core.management.base import BaseCommand
from django.utils.crypto import get_random_string


class Command(BaseCommand):
    help = 'Создает случайных пользователей'

    def add_arguments(self, parser):
        parser.add_argument('total', type=int, help='Указывает сколько пользователей необходимо создать')

        parser.add_argument('-A', '--admin', action='store_true', help='Дать пользователю права администратора')

    def handle(self, *args, **kwargs):
        total = kwargs['total']
        admin = kwargs['admin']

        for i in range(total):
            if admin:
                User.objects.create_superuser(username=get_random_string(7), email='', password='1234567890')
            else:
                User.objects.create_user(username=get_random_string(7), email=f'userauto{i}@mail.ru', password='12345')
