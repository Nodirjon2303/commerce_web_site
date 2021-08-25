from django.urls import path
from .views import *

urlpatterns = [
    path('',index,name='index_moderator'),
    path('orders/',orders,name='orders'),
    path('order_details/<int:order>',order_details,name='order_details'),
    path('set_employee/',set_employee,name='set_employee'),
]
