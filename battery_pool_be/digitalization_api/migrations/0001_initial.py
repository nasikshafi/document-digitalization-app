# Generated by Django 4.2 on 2023-06-01 08:50

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Pdf_upload',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(upload_to='pdf_files/')),
                ('status', models.CharField(max_length=255, unique=True)),
            ],
        ),
    ]