# Generated by Django 3.2.5 on 2021-07-26 06:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('employee', '0001_initial'),
        ('store', '0003_customer_order_order_details'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='employee',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='employee.employee'),
        ),
    ]