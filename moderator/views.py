from django.shortcuts import render
from django.http.response import JsonResponse
from store.models import Order,Order_details
from employee.models import Employee
import json
def index(request):
    return render(request,'moderator/moderator_panel.html',{})
def orders(request):
    orders = Order.objects.all()
    data = []
    for order in orders:
        d = {
            'id':order.id,
            'customer':order.customer.user.username,
            'ordered_date':order.ordered_date,
            'status':order.status,
            'employee':order.employee.id
        }
        data.append(d)
    return JsonResponse({'data':data})
def order_details(request,order):
    orderds = Order_details.objects.filter(order=order)
    data = []
    for od in orderds:
        d = {
            'id':od.id,
            'product':od.product.name,
            'price':od.product.price,
            'quantity':od.quantity,
        }
        data.append(d)
    return JsonResponse({'data':data})
def set_employee(request):
    data = json.loads(request.body)
    order = Order.objects.get(id=data['order'])
    print('set employee....')
    if data['emp']==0:
        order.employee = None
    else:
        e = Employee.objects.get(id=data['emp'])
        print(e)
        order.employee = e
    order.save()
    return JsonResponse({'status':200})
