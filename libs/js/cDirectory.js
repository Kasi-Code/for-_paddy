const submitBtm = document.getElementById("submitBtm");

let selectedRow = null

// submitBtm.addEventListener('click', function(){
    
//     formSubmit()

//     event.preventDefault();

// })

const formSubmit = ()=> {
    // if (validate()) {
        const formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    // }
}

const readFormData = ()=> {
    let formData = {};
    
    formData["id_number"] = document.getElementById("id_number").value;
    formData["first_name"] = document.getElementById("first_name").value;
    formData["last_name"] = document.getElementById("last_name").value;
    formData["department"] = document.getElementById("department").value;
    formData["location"] = document.getElementById("location").value;
    return formData;
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
    cell4.innerHTML = data.department;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.location;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = `<button class="editDeleteBtm editBtn" onClick="onEdit(this)">Edit</button>
                       <button class="editDeleteBtm deleteBtn" onClick="onDelete(this)">Delete</button>`;


    cell1.setAttribute("class", "tableBody");
    cell2.setAttribute("class", "tableBody");
    cell3.setAttribute("class", "tableBody");
    cell4.setAttribute("class", "tableBody");
    cell5.setAttribute("class", "tableBody");
    cell6.setAttribute("class", "tableBody");
}

const resetForm = ()=> {
    document.getElementById("id_number").value = "";
    document.getElementById("first_name").value = "";
    document.getElementById("last_name").value = "";
    document.getElementById("department").value = "";
    document.getElementById("location").value = "";
    selectedRow = null;
}

const onEdit = (td)=> {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("id_number").value = selectedRow.cells[0].innerHTML;
    document.getElementById("first_name").value = selectedRow.cells[1].innerHTML;
    document.getElementById("last_name").value = selectedRow.cells[2].innerHTML;
    document.getElementById("department").value = selectedRow.cells[3].innerHTML;
    document.getElementById("location").value = selectedRow.cells[4].innerHTML;
}
const updateRecord = (formData)=> {
    selectedRow.cells[0].innerHTML = formData.id_number;
    selectedRow.cells[0].innerHTML = formData.first_name;
    selectedRow.cells[1].innerHTML = formData.last_name;
    selectedRow.cells[2].innerHTML = formData.department;
    selectedRow.cells[3].innerHTML = formData.location;
}

const onDelete = (td)=> {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("list").deleteRow(row.rowIndex);
        resetForm();
    }
}
// function validate() {
//     isValid = true;
//     if (document.getElementById("name").value == "") {
//         isValid = false;
//         document.getElementById("fullNameValidationError").classList.remove("hide");
//     } else {
//         isValid = true;
//         if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
//             document.getElementById("fullNameValidationError").classList.add("hide");
//     }
//     return isValid;
// }

$(window).on("load", () => {
    $.ajax({
        url: "companydirectory/libs/php/getAllDepartments.php",
        type: "GET",
        dataType: "json",
        success: function(result) {
            result["data"].forEach(department => {

                console.log(department)
                // $("#deptSearch").append(`<option value="${department["id"]}">${department["name"]}</option>`);
                // $(".deptEdit").append(`<option value="${department["id"]}">${department["name"]}</option>`);
            })
        }
    })
})