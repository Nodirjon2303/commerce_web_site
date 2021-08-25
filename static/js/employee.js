function render_e_orders(category){
    console.log('ishladi..')
    url = '/employee/order/'
    fetch(url)
    .then((response)=>{
    response.json().then((data) => {
        console.log(data)
        html = ''
        for(i=0;i<data.data.length;i++){
            console.log(data.data[i].employee)
            html += `
    <tr>
      <th scope="row">${data.data[i].order}</th>
      <td>${data.data[i].customer}</td>
      <td>${data.data[i].address}</td>
      <td>
        <button onclick="render_order_details(${data.data[i].order})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          batafsil
        </button>
    </td>
    </tr>
            `
        }
        document.getElementById('etbody').innerHTML = html
       })
    })
}
