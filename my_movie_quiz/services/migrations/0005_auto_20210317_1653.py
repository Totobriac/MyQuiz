# Generated by Django 3.1.5 on 2021-03-17 16:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0004_auto_20210214_0912'),
    ]

    operations = [
        migrations.AlterField(
            model_name='picture',
            name='id',
            field=models.CharField(max_length=3, primary_key=True, serialize=False, unique=True),
        ),
    ]
