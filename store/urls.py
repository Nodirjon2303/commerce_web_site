from django.urls import path
from .views import *

urlpatterns = [
    path('',index,name='index'),
    path('category/',category,name='category'),
    path('order_detail/',order_detail,name='order_detail'),
    path('cart/',cart,name='cart'),
    path('checkout/',checkout,name='checkout'),
    path('login/',log_in,name='login'),
    path('logout/',log_out,name='logout'),
    path('start_order/', start_order, name = 'start_order')
    # path('checkout/',checkout,name='checkout')
]
