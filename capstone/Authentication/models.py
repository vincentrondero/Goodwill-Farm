from django.db import models
from datetime import date 

class User(models.Model):
    firstname = models.CharField(max_length=100, default="Juan") 
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

class Pig(models.Model):
    pig_id = models.CharField(max_length=255)
    dam = models.CharField(max_length=255)
    dob = models.DateField()
    sire = models.CharField(max_length=255)
    pig_class = models.CharField(max_length=255)
    
    SEX_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
    ]
    sex = models.CharField(max_length=10, choices=SEX_CHOICES)
    
    count = models.PositiveIntegerField()
    weight = models.DecimalField(max_digits=5, decimal_places=2)
    remarks = models.TextField()
    
    verif_by = models.CharField(max_length=255)
    date = models.DateField(default=date.today) 

class Sow(models.Model):
    pig_id = models.CharField(max_length=255, null=True)
    dam = models.CharField(max_length=20)
    dob = models.DateField()
    sire = models.CharField(max_length=20)
    pig_class = models.CharField(max_length=20)
    sex = models.CharField(max_length=10)
    count = models.IntegerField()
    weight = models.FloatField()
    remarks = models.TextField()
    verif_by = models.CharField(max_length=50)
    date = models.DateField()