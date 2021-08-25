// for add to cart action
var pay_type = 'naqd'
console.log(pay_type)

function render_cart(category) {
    var url = '/store/category/'
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
            'category': category
        })
    })
        .then((response) => {
            response.json().then((data) => {
                console.log(data)
                html = ''
                for (i = 0; i < data.datas.length; i++) {
                    html += `
            <div class="col-xl-3 col-lg-4 col-md-4 col-12">
                                                    <div class="single-product">
                                                        <div class="product-img">
                                                            <a href="product-details.html">
                                                                <img class="default-img" src="${data.datas[i].image}" alt="#">
                                                                <img class="hover-img" src="${data.datas[i].image}" alt="#">
                                                            </a>
                                                            <div class="button-head">
                                                                <div data-action = 'add' data-product_id='2' data-price='29' class="product-action">
                                                                    <a data-toggle="modal" data-target="#exampleModal" title="Quick View" href="#"><i class=" ti-eye"></i><span>Quick Shop</span></a>
                                                                    <a title="Wishlist" href=""><i class=" ti-heart "></i><span>Add to Wishlist</span></a>
                                                                    <a title="Compare" href=""><i class="ti-bar-chart-alt"></i><span>Add to Compare</span></a>
                                                                </div>
                                                                <div data-product_id='2' data-price='29'  class="product-action-2" onclick="order_detail(${data.datas[i].id},'add')">
                                                                    <a title="Add to cart" >Add to cart</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="product-content">
                                                            <h3><a href="product-details.html">${data.datas[i].name}</a></h3>
                                                            <div class="product-price">
                                                                <span>$${data.datas[i].price}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
            `
                }
                document.getElementById('products').innerHTML = html
                hovermodals = document.getElementsByClassName('product-action-2')

            })
        })
}

//render_cart(1)
hovermodals = document.getElementsByClassName('product-action-2')
console.log(hovermodals)
for (i = 0; i < hovermodals.length; i++) {
    hovermodals[i].addEventListener('click', function () {
        console.log(this.dataset.product_id, this.dataset.price, this.dataset.action)

    })
}

function order_detail(product, action) {
    console.log(product, action)
    url = '/store/order_detail/'
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
            'product': product,
            'action': action
        })
    })
        .then((response) => {
            response.json().then((data) => {
                console.log(data)
                bag = document.getElementById('cart-bag')
                total_summ = bag.getElementsByClassName('total-amount')[0]
                itms = bag.getElementsByClassName('items')[0]
                total_count = bag.getElementsByClassName('total-count')[0]
                html = ''
                total_count.innerHTML = data.details.length
                itms.innerHTML = `${data.details.length} Items`
                let summ = 0
                for (let i = 0; i < data.details.length; i++) {
                    qp = data.details[i].price * data.details[i].quantity
                    summ += qp
                    html += `
            <li>
                <a href="#" class="remove" title="Remove this item"><i class="fa fa-remove"></i></a>
                <a class="cart-img" href="#"><img src="${data.details[i].image}" alt="#"></a>
                <h4><a href="#">${data.details[i].name}</a></h4>
                <p class="quantity">${data.details[i].quantity}x - <span class="amount">$${qp}</span></p>
            </li>
            `
                }
                total_summ.innerHTML = `$${summ}`
                document.getElementById('hover_cart').innerHTML = html
            })
        })
}

function order_detail_cart(product, action) {
    console.log(product, action)
    url = '/store/order_detail/'
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
            'product': product,
            'action': action
        })
    })
        .then((response) => {
            response.json().then((data) => {
                console.log(data)
                c_id = 'itm' + product
                item = document.getElementById(c_id)
                bag = document.getElementById('cart-bag')
                quant = item.getElementsByClassName('input-number')[0]
                total = item.getElementsByClassName('total-amount')[0]
                total_summ = bag.getElementsByClassName('total-amount')[0]
                itms = bag.getElementsByClassName('items')[0]
                total_count = bag.getElementsByClassName('total-count')[0]
                html = ''
                total_count.innerHTML = data.details.length
                itms.innerHTML = `${data.details.length} Items`
                let summ = 0
                for (let i = 0; i < data.details.length; i++) {
                    if (data.details[i].pid == product) {
                        quant.value = data.details[i].quantity
                        total.innerHTML = data.details[i].price * data.details[i].quantity
                    }
                    qp = data.details[i].price * data.details[i].quantity
                    summ += qp
                    html += `
            <li>
                <a href="#" class="remove" title="Remove this item"><i class="fa fa-remove"></i></a>
                <a class="cart-img" href="#"><img src="${data.details[i].image}" alt="#"></a>
                <h4><a href="#">${data.details[i].name}</a></h4>
                <p class="quantity">${data.details[i].quantity}x - <span class="amount">$${qp}</span></p>
            </li>
            `
                }
                total_summ.innerHTML = `$${summ}`
                document.getElementById('summ_checout').innerHTML = `$${summ}`
                document.getElementById('summ_payment').innerHTML = `$${summ}`
                document.getElementById('hover_cart').innerHTML = html
            })
        })
}

function order_quantity(product, action) {
    console.log(product, action)
    url = '/store/order_detail/'
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
            'product': product,
            'action': action
        })
    })
        .then((response) => {
            response.json().then((data) => {
                console.log(data)
                c_id = 'itm' + product
                item = document.getElementById(c_id)
                quant = item.getElementsByClassName('input-number')[0]

                total = item.getElementsByClassName('total-amount')[0]
                html = ''
                for (let i = 0; i < data.details.length; i++) {
                    if (data.details[i].pid == product) {
                        quant.value = data.details[i].quantity
                        total.innerHTML = data.details[i].price * data.details[i].quantity
                    }

                    html += `
            <li>
                <a href="#" class="remove" title="Remove this item"><i class="fa fa-remove"></i></a>
                <a class="cart-img" href="#"><img src="${data.details[i].image}" alt="#"></a>
                <h4><a href="#">${data.details[i].name}</a></h4>
                <p class="quantity">${data.details[i].quantity}x - <span class="amount">$${data.details[i].price * data.details[i].quantity}</span></p>
            </li>
            `
                }
                document.getElementById('hover_cart').innerHTML = html
            })
        })
}

function login_method() {
    // modal = document.getElementById('id01')
    username = document.getElementById('username').value
    password = document.getElementById('password').value
    console.log(username, password)
    url = '/store/login/'
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
            'username': username,
            'password': password
        })
    })
        .then((response) => {
            response.json().then((data) => {
                console.log(data)
                location.reload()
            })
        })
}

function select_region() {
    select = document.getElementById('validationCustom03')
    option = select.options[select.selectedIndex].value
    fetch(`/employee/get_territorie/${option}`)
        .then((response) => {
            response.json().then((data) => {
                console.log(data)
                ops = ''
                for (i = 0; i < data.data.length; i++) {
                    console.log(data.data[i].name)
                    ops += `<option value="${data.data[i].id}">${data.data[i].name}</option>`
                }
                console.log(ops)
                mySelect = document.getElementById('validationCustom04')
                mySelect.innerHTML = ops
                mySelect.style.display = 'block'
                document.getElementsByClassName('nice-select')[1].style.display = 'none'

            })
        })
}

function get_region() {
    fetch(`/employee/get_region/`)
        .then((response) => {
            response.json().then((data) => {
                console.log(data)
                ops = ''
                for (i = 0; i < data.data.length; i++) {
                    console.log(data.data[i].name)
                    ops += `<option value="${data.data[i].id}">${data.data[i].name}</option>`
                }
                console.log(ops)
                mySelect = document.getElementById('validationCustom03')
                mySelect.innerHTML = ops
                mySelect.style.display = 'block'
                document.getElementsByClassName('nice-select')[0].style.display = 'none'


            })
        })
}

function show_pay() {
    pay_type = 'card'
    document.getElementById('pay').style.display = 'inline-block'
}

function hide_pay() {
    pay_type = 'naqd'
    document.getElementById('pay').style.display = 'none'
}

function start_order() {
    selectr = document.getElementById('validationCustom03')
    selectt = document.getElementById('validationCustom04')
    if (pay_type == 'naqd') {
        payment = {
            'type': 'naqd'
        }
    } else {
        payment = {
            'type': 'card',
            'card': document.getElementById('card_num').value,
            'card_date': document.getElementById('card_date').value
        }
    }
    data = {
        'email': document.getElementById('validationCustomEmail').value,
        'phone': document.getElementById('validationCustomPhone').value,
        'region': selectr.options[selectr.selectedIndex].value,
        'teritory': selectt.options[selectt.selectedIndex].value,
        'description': document.getElementById('description').value,
        'zip': document.getElementById('zip').value,
        'payment': payment
    }
    console.log(data)
    var url = '/store/start_order/'
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(data
        )
    })
        .then((response) => {
            response.json().then((data) => {
            console.log(data)
            })
        })
}

function check() {
    // Get the checkbox
    var checkBox = document.getElementById("invalidCheck");
    btn = document.getElementById('ordbtn')
    // If the checkbox is checked, display the output text
    if (checkBox.checked == true) {
        btn.disabled = false
    } else {
        btn.disabled = true
    }
}


