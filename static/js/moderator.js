function employee_list() {
    url = '/employee/list/'
  return fetch(url)
    .then(response => {
      if (response.ok) {

        return response.json().then(response => ({
            response
        }
        )

      )
          console.log(response.employees)
      }

      return response.json().then(error => ({ error }));
    })
  ;
}
function render_orders(category){
    console.log('ishladi..')
    url = '/moderator/orders/'
    fetch(url)
    .then((response)=>{
    response.json().then((data) => {
        console.log(data)
        html = ''
        for(i=0;i<data.data.length;i++){
            console.log(data.data[i].employee)
            if (data.data[i].employee){
                selected = ''
            }
            else{
                selected = 'selected'
            }
            select = `<select id="s${data.data[i].id}" onchange="select_employee(${data.data[i].id})" class="form-select" aria-label="Default select example">
            <option ${selected} value="0">Yatkazib beruvchini tanlang!</option>`
            data1 = employee_list()
            console.log(data1)
            data1 =  [
                {
                    "id": 1,
                    "username": "empl1"
                },
                {
                    "id": 2,
                    "username": "empl2"
                },
                {
                    "id": 3,
                    "username": "empl3"
                }
            ]
            for(let j=0;j<data1.length;j++){
                if (data.data[i].employee == data1[j].id){
                        selected = 'selected'
                    }
                    else{
                        selected = ''
                    }
                select += `<option ${selected} value="${data1[j].id}">${data1[j].username}</option>`
            }
            select += `</select>`
            html += `
    <tr>
      <th scope="row">${data.data[i].id}</th>
      <td>${data.data[i].customer}</td>
      <td>${data.data[i].ordered_date}</td>
      <td>${data.data[i].status}</td>
      <td>${select}</td>
      <td>
        <button onclick="render_order_details(${data.data[i].id})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          batafsil
        </button>
    </td>
    </tr>
            `
        }
        document.getElementById('tbody').innerHTML = html
       })
    })
}
function render_order_details(id) {
    console.log('ishladi..',id)
    url = `/moderator/order_details/${id}`
    fetch(url)
    .then((response)=>{
    response.json().then((data) => {
        console.log(data)
        html = ''
        for(i=0;i<data.data.length;i++){
            html += `
    <tr>
      <th scope="row">${data.data[i].id}</th>
      <td>${data.data[i].product}</td>
      <td>${data.data[i].price}</td>
      <td>${data.data[i].quantity}</td>
    </tr>
            `
        }
        document.getElementById('modalbody').innerHTML = html
       })
    })

}
function select_employee(id) {

    sid = `s${id}`
    select = document.getElementById(sid)
    emp = select.options[select.selectedIndex].value
    console.log('selected: ',id,emp)
    url = '/moderator/set_employee/'
    fetch(url,{
    method:'POST',
    headers:{
        'Content-Type':'application/json',
        'X-CSRFToken':csrftoken,
    },
    body:JSON.stringify({
        'order':id,
        'emp':emp
    })
    })
    .then((response)=>{
    response.json().then((data) => {

    })
    })
}
