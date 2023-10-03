from django.db import models
from datetime import date 

class User(models.Model):
    firstname = models.CharField(max_length=100, default="Juan")  # Set a default value, e.g., "John"
    lastname = models.CharField(max_length=100, default="De la Cruz")
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)  
    
    ROLE_CHOICES = [
        ('administrator', 'Administrator'),
        ('user', 'User'),
    ]
    
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')
    
    date = models.DateField(default=date.today) 

class Task(models.Model):
    task_name = models.CharField(max_length=255)
    due_date = models.DateField()
    due_time = models.TimeField()
    description = models.TextField()
    is_done = models.BooleanField(default=False)