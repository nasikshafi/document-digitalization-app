from django.db import models

# Create your models here.
class Pdf_upload(models.Model):
    file = models.FileField(upload_to='pdf_files/')
    status = models.CharField(max_length=255)
    name = models.CharField(max_length=255,default= "unnamed")