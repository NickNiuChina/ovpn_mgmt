from django.db import models

# Create your models here.

class OvpnClients(models.Model):
    storename = models.CharField(max_length=100, default="Unnamed")
    cn = models.CharField(max_length=50)
    ip = models.CharField(max_length=30)
    changedate = models.DateField(auto_now=True)
    expiredate = models.DateField(default="1970-1-1")
    status = models.BooleanField(default=False)