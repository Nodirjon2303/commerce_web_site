from django.shortcuts import render
from django.http.response import JsonResponse
from .models import *
from store.models import Order
def get_employees(request):
    emps = Employee.objects.all()
    employees = []
    for emp in emps:
        d = {
            'id':emp.id,
            'username':emp.user.username
        }
        employees.append(d)
    return JsonResponse({'employees':employees})
def index(request):

    return render(request,'employee/employee_panel.html',{})
def get_e_orders(request):
    employee = Employee.objects.get(user=request.user)
    orders = Order.objects.filter(employee=employee)
    data = []
    for order in orders:
        d = {
            'order':order.id,
            'customer':order.customer.user.username,
            'address':order.customer.address
        }
        data.append(d)
    return JsonResponse({'data':data})
def get_territorie(request,id):
    territories = Territorie.objects.filter(region_id=id)
    data = []
    for t in territories:
        d = {
            'name':t.name,
            'id':t.id
        }
        data.append(d)
    return JsonResponse({'data':data})
def get_region(request):
    regions = Region.objects.all()
    data = []
    for region in regions:
        d = {
            'name': region.name,
            'id': region.id
        }
        data.append(d)
    return JsonResponse({'data': data})
