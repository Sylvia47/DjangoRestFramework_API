# Generated by Django 3.2.5 on 2021-08-29 05:08

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('content', models.TextField(null=True)),
                ('completed', models.BooleanField(blank=True, default=False, null=True)),
            ],
            options={
                'db_table': 'Tasks',
            },
        ),
    ]
