import os, tempfile
from statistics import mode
from pyexpat import model
from zipfile import ZipFile
from django.db import models
from django.contrib.auth import get_user_model
from datetime import datetime
from django.conf import settings
from django.dispatch import receiver
from django.core.files import File as DjangoFile


class File(models.Model):
    owner = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    file = models.FileField(upload_to='', blank=False, null=True)
    name = models.CharField(max_length=128, default=id)
    #hash = models.CharField(unique=True, max_length=256, blank=False)
    
    #uploaded = models.DateTimeField(default=datetime.now())
    #updated = models.DateTimeField(default=datetime.now())

    def __str__(self) -> str:
        return self.name

@receiver(models.signals.post_save, sender=File)
def zip_file(sender, instance, **kwargs):
    if (kwargs.get("created", False)):
        filepath = os.path.join(settings.MEDIA_ROOT, instance.file.name)
        zip_filename = f'{instance.file.name.split(".")[0]}.zip'
        temp_file = tempfile.NamedTemporaryFile()

        with ZipFile(temp_file, 'w') as zip_file:
            zip_file.write(filepath, arcname=os.path.basename(filepath))

        instance.file.save(zip_filename, DjangoFile(temp_file))
        os.remove(filepath)

@receiver(models.signals.post_delete, sender=File)
def clean_fs(sender, instance, **kwargs):
    filepath = os.path.join(settings.MEDIA_ROOT, instance.file.name)
    os.remove(filepath)
