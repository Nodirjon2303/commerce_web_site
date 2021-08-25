from django.db import models
from django.contrib.auth.models import User
from employee.models import Employee , Territorie


class Category(models.Model):
    category = models.CharField(max_length=200, null=True)
    description = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.category


class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, null=True)
    price = models.FloatField(blank=False)
    view = models.IntegerField(default=0)
    image = models.ImageField(upload_to='images', null=True)
    rating = models.IntegerField(default=0)
    discount = models.FloatField(default=0)
    description = models.CharField(max_length=200, null=True, blank=True)

    @property
    def imageURL(self):
        try:
            return self.image.url
        except:
            return ''

    def __str__(self):
        return self.name


class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=15, null=True)
    image = models.ImageField(null=True)
    post_code = models.CharField(max_length=10, null=True)
    address = models.CharField(max_length=200, null=True)
    card = models.CharField(max_length=16, null=True, blank=True)
    card_date = models.CharField(max_length=5, null=True)

    @property
    def imageURL(self):
        try:
            return self.image.url
        except:
            return ''

    @property
    def full_name(self):
        return self.user.first_name + ' ' + self.user.last_name

    def __str__(self):
        return self.full_name


class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    ordered_date = models.DateTimeField(auto_now_add=True)
    required_date = models.DateField(null=True)
    shipped_date = models.DateField(null=True)
    status = models.CharField(default='NONE', max_length=10)
    employee = models.ForeignKey(Employee, on_delete=models.SET_NULL, null=True)
    territory = models.ForeignKey(Territorie, on_delete=models.SET_NULL, null=True)
    description = models.CharField(max_length=200, null=True)
    payment_type = models.CharField(max_length=21, null=True)
    zipcode = models.CharField(max_length=20, null=True)
    def __str__(self):
        return self.customer.user.username + ' ' + str(self.id)


class Order_details(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    @property
    def add(self):
        self.quantity += 1
        self.save()

    @property
    def sub(self):
        if self.quantity > 0:
            self.quantity -= 1
            self.save()
        if self.quantity == 0:
            self.remove()

    def __str__(self):
        return f"{self.product.name} {self.order.id} {self.quantity}"
