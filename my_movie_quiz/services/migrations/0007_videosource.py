# Generated by Django 3.1.5 on 2021-04-01 07:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0006_auto_20210318_0819'),
    ]

    operations = [
        migrations.CreateModel(
            name='VideoSource',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('video_src', models.TextField()),
            ],
        ),
    ]
