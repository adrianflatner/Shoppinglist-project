# Generated by Django 2.1.7 on 2019-03-27 09:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('list', '0008_profile'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='user',
        ),
        migrations.DeleteModel(
            name='Profile',
        ),
    ]