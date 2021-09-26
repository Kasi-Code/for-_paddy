const submitBtm = document.getElementById("submitBtm");

const id_numberV = document.getElementById("id_number");
const locationV = document.getElementById("location");

let selectedRow = null

// WHEN CLICKED DELETE BUTTON

$('tbody').on('click', '.deleteBtn', function(e){
    onDelete(e.target.dataset.id)
})

// WHEN CLICKED EDIT BUTTON

$('tbody').on('click', '.editBtn', function(e){

    $("#submitBtm").css("display", "none")
    $("#editBtnForm").css("display", "block")

    onEdit(this, e.target.dataset.id)

    $('#cancelBtm').on('click', () => {
        location.reload()
    })
})

const formSubmit = ()=> {
        const formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
}

const insertNewRecord = (data)=> {

    var table = document.getElementById("list").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.id_number;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.first_name;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.last_name;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.email;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.department;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = data.location;
    cell7 = newRow.insertCell(6);
    cell7.innerHTML = `<button class="editDeleteBtm editBtn" data-id="${data.id_number}" id="editBtn-${data.id_number}">Edit</button>
                       <button class="editDeleteBtm deleteBtn" data-id="${data.id_number}" id="deleteBtn-${data.id_number}">Delete</button>`;


    cell1.setAttribute("class", "tableBody");
    cell2.setAttribute("class", "tableBody");
    cell3.setAttribute("class", "tableBody");
    cell4.setAttribute("class", "tableBody");
    cell5.setAttribute("class", "tableBody");
    cell6.setAttribute("class", "tableBody");
    cell7.setAttribute("class", "tableBody");
}

const resetForm = ()=> {
    // document.getElementById("id_number").value = "";
    document.getElementById("first_name").value = "";
    document.getElementById("last_name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("department").value = "";
    document.getElementById("location").value = "";
    selectedRow = null;
}
const updateRecord = (formData)=> {
    selectedRow.cells[0].innerHTML = formData.id_number;
    selectedRow.cells[1].innerHTML = formData.first_name;
    selectedRow.cells[2].innerHTML = formData.last_name;
    selectedRow.cells[3].innerHTML = formData.email;
    selectedRow.cells[4].innerHTML = formData.department;
    selectedRow.cells[5].innerHTML = formData.location;
}

$('#submitBtm').on('click', onSubmit = () => {

    const first_nameV = document.getElementById("first_name").value;
    const last_nameV = document.getElementById("last_name").value;
    const emailV = document.getElementById("email").value;
    const departmentV = document.getElementById("department").value;
        
        $.ajax({
            type: "POST",
            url: `companydirectory/libs/php/insertAll.php?first_name=${first_nameV}&last_name=${last_nameV}&email=${emailV}&departmentID=${departmentV}`,
            success: function(data) {

                // return data
            
                // console.log(data)
            },
            error:  function(request,error) {
                console.log(request)                                   
            }
        })
})

const onDelete = (id)=> {

    if (confirm('Are you sure to delete this record ?')) {            

        var deletePersonnel = ()=> {
        
            $.ajax({
                type: "GET",
                url: `companydirectory/libs/php/deletePersonnelByID.php?id=${id}`,
                success: function(data) {
    
                    return data
                
                    console.log(data)
                },
                error:  function(request,error) {
                    console.log(request)                                   
                }
            })
        }
        deletePersonnel()

        window.location.reload();
    }
}

const onEdit = (td, id)=> {

    selectedRow = td.parentElement.parentElement;

    // document.getElementById("id_number").value = selectedRow.cells[0].innerHTML;
    document.getElementById("first_name").value = selectedRow.cells[1].innerHTML;
    document.getElementById("last_name").value = selectedRow.cells[2].innerHTML;
    document.getElementById("email").value = selectedRow.cells[3].innerHTML;
    document.getElementById("department").value = selectedRow.cells[4].innerHTML;
    document.getElementById("location").value = selectedRow.cells[5].innerHTML;

    $('#doneBtm').on('click', onSubmit = () => {
    
        const first_nameV = document.getElementById("first_name").value;
        const last_nameV = document.getElementById("last_name").value;
        const emailV = document.getElementById("email").value;
        const departmentV = document.getElementById("department").value;
            
            $.ajax({
                type: "POST",
                url: `companydirectory/libs/php/updatePersonnelByID.php?first_name=${first_nameV}&last_name=${last_nameV}&email=${emailV}&departmentID=${departmentV}&id=${id}`,
                success: function(data) {

                },
                error:  function(request,error) {
                    console.log(request)                                   
                }
            })
    })
}

window.onload = function () {

    // let departmentArr = []
    // let locationArr = []

    // console.log(locationArr)

    $.ajax({
        url: "companydirectory/libs/php/getAll.php",
        type: "GET",
        dataType: "json",
        success: function(result) {
            // console.log(result)

            let personal = result.data
            let formData = {}

            // console.log(personal)

            personal.forEach(data => {

            formData["id_number"] = data.id
            formData["first_name"] = data.firstName
            formData["last_name"] = data.lastName
            formData["email"] = data.email
            formData["department"] = data.department
            formData["location"] = data.location

            insertNewRecord(formData)
            })
        },
    })

    $.ajax({
        url: "companydirectory/libs/php/getAllDepartments.php",
        type: "GET",
        dataType: "json",
        success: function(result) {

            // console.log(result)

            result["data"].forEach(department => {
                
                $(".department").append(`<option value="${department["id"]}">${department["name"]}</option>`);
                // $(".deptEdit").html(`<option value="${department["id"]}">${department["name"]}</option>`);

                // departmentArr.push({
                //     id: department.id, 
                //     name: department.name})
            })
        },
    })
    $.ajax({
        url: "companydirectory/libs/php/getAllLocations.php",
        type: "GET",
        dataType: "json",
        success: function(result) {

            // console.log(result)

            result.data.forEach(location => {
                
                $(".location").append(`<option value="${location.id}">${location.name}</option>`);

                // locationArr.push({
                //     id: location.id, 
                //     name: location.name})
            })
        },
    })
}