# Generated by Django 3.1.5 on 2021-03-18 08:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0005_auto_20210317_1653'),
    ]

    operations = [
        migrations.AlterField(
            model_name='picture',
            name='id',
            field=models.IntegerField(primary_key=True, serialize=False, unique=True),
        ),
    ]
