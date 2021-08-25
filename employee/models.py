from django.db import models
from django.contrib.auth.models import User

class Employee(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    phone = models.CharField(max_length=20,null=True)
    image = models.ImageField(null=True)
    address = models.CharField(max_length=200,null=True)
    @property
    def imageURL(self):
        try:
            return self.image.url
        except:
            return ''
    @property
    def full_name(self):
        return self.user.first_name + ' ' + self.user.last_name
    def __str__(self):
        return self.user.username

class Region(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name
class Territorie(models.Model):
    region  = models.ForeignKey(Region,on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    longitute = models.IntegerField(null=True,blank=True)
    latitute = models.IntegerField(null=True,blank=True)
    description = models.TextField(null=True,blank=True)
    def __str__(self):
        return self.name
