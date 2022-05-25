import os, tempfile
from statistics import mode
from pyexpat import model
from venv import create
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
    name = models.CharField(max_length=128, default="")
    #hash = models.CharField(unique=True, max_length=256, blank=False)
    
    #uploaded = models.DateTimeField(default=datetime.now())
    #updated = models.DateTimeField(default=datetime.now())

    def __str__(self) -> str:
        return self.name

@receiver(models.signals.post_save, sender=File)
def add_zip_file(sender, instance, created, **kwargs):
    models.signals.post_save.disconnect(add_zip_file, sender=sender)

    if created:
        filepath = os.path.join(settings.MEDIA_ROOT, instance.file.name)
        filename = instance.file.name.split(".")[0]
        zip_filename = f'{filename}.zip'
        temp_file = tempfile.NamedTemporaryFile()

        with ZipFile(temp_file, 'w') as zip_file:
            zip_file.write(filepath, arcname=os.path.basename(filepath))

        instance.name = filename
        instance.file.save(zip_filename, DjangoFile(temp_file))
        os.remove(filepath)

    else:
        print('edited')
        filepath = os.path.join(settings.MEDIA_ROOT, instance.file.name)
        new_filename = ""
        zip_filename = ""
        temp_file = tempfile.NamedTemporaryFile()

        with ZipFile(filepath, "r") as zip_file:
            filename = zip_file.namelist()[0]
            new_filename = f'{instance.name}.{filename.split(".")[1]}'
            zip_filename = f'{instance.name}.zip'
            zip_file.extract(filename, settings.MEDIA_ROOT)
            os.rename(os.path.join(settings.MEDIA_ROOT, filename), os.path.join(settings.MEDIA_ROOT, new_filename))
        
        with ZipFile(temp_file, "w") as zip_file:
            zip_file.write(os.path.join(settings.MEDIA_ROOT, new_filename))
        
        instance.file.save(zip_filename, DjangoFile(temp_file))
        os.remove(filepath)
        os.remove(os.path.join(settings.MEDIA_ROOT, new_filename))
    
    models.signals.post_save.connect(add_zip_file, sender=sender)

@receiver(models.signals.post_delete, sender=File)
def clean_fs(sender, instance, **kwargs):
    filepath = os.path.join(settings.MEDIA_ROOT, instance.file.name)
    os.remove(filepath)
