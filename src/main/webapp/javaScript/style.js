$(document).ready(function(){
    // Activate tooltip
    $('[data-toggle="tooltip"]').tooltip();

    // Select/Deselect checkboxes
    var checkbox = $('table tbody input[type="checkbox"]');
    $("#selectAll").click(function(){
        if(this.checked){
            checkbox.each(function(){
                this.checked = true;
            });
        } else{
            checkbox.each(function(){
                this.checked = false;
            });
        }
    });
    checkbox.click(function(){
        if(!this.checked){
            $("#selectAll").prop("checked", false);
        }
    });
});

function save(){
    let name = $('#name').val();
    let email = $('#email').val();
    let address = $('#address').val();
    let customer = {name: name, email: email, address: {id:address}};
    $.ajax({
        url:"api/customers",
        data:JSON.stringify(customer),
        type:"POST",
        headers:{
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        success: getHome
    })
    $('#addNewCustomer').modal('hide');
    event.preventDefault();
}
function getHome(){
    $.ajax({
        type: "GET",
        url: "api/customers",
        success : function (data){
            let content = "";
            for (let i = 0; i < data.content.length; i++){

                content += '<tr><td>' +
                    '<span class="custom-checkbox">'+
                    '<input type="checkbox" id="checkbox1" name="options[]" value="1">'+
                    '<label  for="checkbox1"></label>'+
                    '</span>'+
                    '</td>'+
                    getCustomer(data.content[i])
            }
            document.getElementById('customer').innerHTML = content;
            document.getElementById('page').innerHTML = getPage(data);

        }
    })
}
function getCustomer(customer){
    return `<td>${customer.name}</td>`+
        `<td>${customer.email}</td>`+
        `<td >${customer.address.name}</td>`+
        `<td>`+
        `<a href="#formEditCustomer" class="edit" onclick="editForm(this)" id="${customer.id}" data-toggle="modal">`+
        `<i class="material-icons"  data-toggle="tooltip" title="Edit">&#xE254;</i>`+
        `</a>`+
        `<a href="#deleteCustomer" onclick="getFormDelete(this)" class="delete" id="${customer.id}" data-toggle="modal">`+
        `<i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>`+
        `</a>`+
        `</td></tr>`;
}
// $(document).ready (function (){
//     $('.delete').click(function (event){
//         let a = $(this);
//         let id = a.attr("href");
//         $.ajax({
//             type:"DELETE",
//             url:"api/customers/" + id,
//             success:function (){
//                 a.parent().parent().remove();
//             }
//         })
//     })
//     event.preventDefault();
// })
function getFormDelete(a){
    let id = a.getAttribute("id");
    let content = `<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">`+
        `<input type="submit" href="` +id+ `" onclick="deleteCustomer(this)" class="btn btn-danger" value="Delete">`
    document.getElementById('delete').innerHTML = content;
}
function deleteCustomer(a){
    let id = a.getAttribute("href");
    $.ajax({
        type:"DELETE",
        url:"api/customers/" + id,
        headers:{
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        success:getHome

    })
    $('#deleteCustomer').modal('hide');
    event.preventDefault();
}
function editForm(a){
    let id = a.getAttribute("id");
    $.ajax({
        type:"GET",
        url: "api/customers/findOne/"+ id,
        headers:{
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        success:function (data){
            document.getElementById('editCustomer').innerHTML= customerEdit(data);
        },

    })

}
function customerEdit(customer){
    return `<div class="modal-header">`+
        `<h4 class="modal-title">Edit</h4>`+
        `<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>`+
        `</div>`+
        `<div class="modal-body">`+
        `<div class="form-group" hidden>`+
        `<label>id</label>`+
        `<input type="text" value="${customer.id}" class="form-control" required id="customerId">`+
        `</div>`+
        `<div class="form-group">`+
        `<label>Name</label>`+
        `<input type="text" class="form-control" required id="name2" value="${customer.name}">`+
        `</div>`+
        `<div class="form-group">`+
        `<label>Email</label>`+
        `<input type="text" class="form-control" required id="email2" value="${customer.email}">`+
        `</div>`+
        `<div class="form-group">`+
        `<label>Address</label>`+
        `<select id="address2">`+
        getAddress()+
        `</select>`+

        `</div>`+
        `</div>`+
        `<div class="modal-footer">`+
        `<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">`+
        `<input type="submit" class="btn btn-success" onclick="edit()" value="save">`+
        `</div>`
}
function getAddress(){
    let content =  document.getElementById('address').innerHTML
    return content;
}
function edit(){
    let id = $('#customerId').val();
    let name = $('#name2').val();
    let email = $('#email2').val();
    let address = $('#address2').val();
    let customer = {id: id,name: name, email: email, address: {id:address}};
    $.ajax({
        type:"PUT",
        url:"api/customers/edit/" + id,
        data:JSON.stringify(customer),

        headers:{
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        success: getHome,


    })
    $('#formEditCustomer').modal('hide');
    event.preventDefault();


}
function getPage(page){
        return `<ul class="pagination">`+
            `<li class="page-item disabled">`+
            `<a href="/customers?page=${page.pageable.pageNumber - 1}" >Previous</a>`+
            `</li>`+
            `<li class="page-item"><span>${page.pageable.pageNumber + 1}</span>/`+
            `<span>${page.totalPages}</span>`+
            `</li>`+
            `<li class="page-item"><a href="/customers?page=${page.pageable.pageNumber + 1}"class="page-link">Next</a>`+
            `</li>`+
            `</ul>`



}