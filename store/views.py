from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login, logout
from employee.models import Region
# from django.
from .models import *
import json


def index(request):
    category = Category.objects.all()
    return render(request, 'store/index.html', {'category': category, 'user': request.user})


def category(request):
    if request.method == 'POST':
        print(request.body)
        data = json.loads(request.body)
        print(data)
        products = Product.objects.filter(category=data['category'])
        print(products)
        datas = []
        for product in products:
            d = {
                'id': product.id,
                'name': product.name,
                'price': product.price,
                'image': product.imageURL
            }
            datas.append(d)
        print(datas)
        return JsonResponse({'datas': datas})
    return JsonResponse({'status': 'not POST'})


def order_detail(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)
        product = Product.objects.get(id=data['product'])
        customer, created = Customer.objects.get_or_create(user=request.user)
        order, created = Order.objects.get_or_create(customer=customer)
        order_detail, created = Order_details.objects.get_or_create(order=order, product=product)
        if data['action'] == 'add':
            order_detail.add
        elif data['action'] == 'sub':
            order_detail.sub
        else:
            order_detail.remove()
        details = []
        order_details = Order_details.objects.filter(order=order)
        print(order_details)
        for od in order_details:
            d = {
                'pid': od.product.id,
                'id': od.id,
                'name': od.product.name,
                'price': od.product.price,
                'image': od.product.imageURL,
                'quantity': od.quantity
            }
            details.append(d)
    return JsonResponse({'details': details}, status=200)


def cart(request):
    customer, created = Customer.objects.get_or_create(user=request.user)
    order, created = Order.objects.get_or_create(customer=customer)
    order_detail = Order_details.objects.filter(order=order)
    context = {
        'items': order_detail
    }
    return render(request, 'store/cart.html', context=context)


def checkout(request):
    regions = Region.objects.all()
    return render(request, 'store/checkout.html', {'regions': regions})


def log_in(request):
    print(request.body)
    data = json.loads(request.body.decode('utf8'))
    print(request.user)
    username = data['username']
    password = data['password']
    if request.user.username == '':
        user = authenticate(request=request, username=username, password=password)
        if user:
            login(request, user)
            return JsonResponse({'status': 'OK'})
    else:
        return JsonResponse({'info': 'OnotherUserLogged'})
    return JsonResponse({'status': 'None'})


def log_out(request):
    user = request.user
    if user:
        logout(request)
    return redirect('index')


def start_order(request):
    data = json.loads(request.body)
    print(data)
    customer = Customer.objects.get(user=request.user)
    order = Order.objects.get(customer=customer)
    customer.user.email = data['email'] if data['email'] else None
    customer.phone = data['phone'] if data['phone'] else None
    order.territory = Territorie.objects.get(id=data['teritory'])
    customer.phone = data['phone'] if data['phone'] else None
    order.payment_type = data['payment']['type'] if data['payment']['type'] else None
    if order.payment_type == 'naqd':
        order.status = "START"
    elif data['payment']['card'] and data['payment']['card_date']:
        customer.card = data['payment']['card']
        customer.card_date = data['payment']['card_date']
        order.status = "START"
    order.zipcode = data['zip'] if data['zip'] else None
    order.description = data['description'] if data['description'] else None
    return JsonResponse({'status': 'OK'})
