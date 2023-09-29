from django.db import models


class User(models.Model):
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)  # In practice, passwords should be securely hashed and stored.
    ROLE_CHOICES = [
        ('administrator', 'Administrator'),
        ('user', 'User'),
    ]

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')

class Task(models.Model):
    task_name = models.CharField(max_length=255)
    due_date = models.DateField()
    due_time = models.TimeField()
    description = models.TextField()
    is_done = models.BooleanField(default=False)