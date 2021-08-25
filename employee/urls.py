from django.urls import path
from .views import *

urlpatterns = [
    path('',index,name='index_employee'),
    path('list/',get_employees,name='employee_list'),
    path('order/',get_e_orders,name='orderby_emp'),
    path('get_region/',get_region,name='get_region'),
    path('get_territorie/<int:id>/',get_territorie,name='get_territorie'),
]
