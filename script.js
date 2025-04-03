let selectedRow = null;
document.getElementById('studentForm').addEventListener('submit', onformsubmit);

function onformsubmit(e) {
    e.preventDefault();
    const formData = readFormData();
    if (selectedRow === null) {
        insertNewRecord(formData);
    } else {
        updateRecord(formData);
    }
    resetForm();
}

function readFormData() {
    return {
        StudentID: document.getElementById('StudentID').value,
        Name: document.getElementById('Name').value,
        Class: document.getElementById('Class').value,
        DesignAnalysis: parseInt(document.getElementById('DesignAnalysis').value) || 0,
        AdvancedArchitecture: parseInt(document.getElementById('AdvancedArchitecture').value) || 0,
        FullstackDevelopment: parseInt(document.getElementById('FullstackDevelopment').value) || 0,
        LinuxOS: parseInt(document.getElementById('LinuxOS').value) || 0,
        ProfessionalCommunication: parseInt(document.getElementById('ProfessionalCommunication').value) || 0,
    };
}

function insertNewRecord(data) {
    const table = document.querySelector('#storeList tbody');
    const newRow = table.insertRow();
    const total = Object.values(data).slice(3).reduce((a, b) => a + b, 0);
    const percentage = ((total / 500) * 100).toFixed(2);

    newRow.innerHTML = `
        <td>${data.StudentID}</td>
        <td>${data.Name}</td>
        <td>${data.Class}</td>
        <td>${data.DesignAnalysis}</td>
        <td>${data.AdvancedArchitecture}</td>
        <td>${data.FullstackDevelopment}</td>
        <td>${data.LinuxOS}</td>
        <td>${data.ProfessionalCommunication}</td>
        <td>${total}</td>
        <td>${percentage}%</td>
        <td>
            <button onclick="onEdit(this)">Edit</button>
            <button onclick="onDelete(this)">Delete</button>
        </td>
    `;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById('StudentID').value = selectedRow.cells[0].innerHTML;
    document.getElementById('Name').value = selectedRow.cells[1].innerHTML;
    document.getElementById('Class').value = selectedRow.cells[2].innerHTML;
    document.getElementById('DesignAnalysis').value = selectedRow.cells[3].innerHTML;
    document.getElementById('AdvancedArchitecture').value = selectedRow.cells[4].innerHTML;
    document.getElementById('FullstackDevelopment').value = selectedRow.cells[5].innerHTML;
    document.getElementById('LinuxOS').value = selectedRow.cells[6].innerHTML;
    document.getElementById('ProfessionalCommunication').value = selectedRow.cells[7].innerHTML;
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.StudentID;
    selectedRow.cells[1].innerHTML = formData.Name;
    selectedRow.cells[2].innerHTML = formData.Class;
    selectedRow.cells[3].innerHTML = formData.DesignAnalysis;
    selectedRow.cells[4].innerHTML = formData.AdvancedArchitecture;
    selectedRow.cells[5].innerHTML = formData.FullstackDevelopment;
    selectedRow.cells[6].innerHTML = formData.LinuxOS;
    selectedRow.cells[7].innerHTML = formData.ProfessionalCommunication;
    const total = Object.values(formData).slice(3).reduce((a, b) => a + b, 0);
    selectedRow.cells[8].innerHTML = total;
    selectedRow.cells[9].innerHTML = ((total / 500) * 100).toFixed(2) + '%';
    selectedRow = null;
}

function onDelete(td) {
    if (confirm('Are you sure you want to delete this record?')) {
        const row = td.parentElement.parentElement;
        document.getElementById('storeList').deleteRow(row.rowIndex);
        resetForm();
    }
}

function resetForm() {
    document.getElementById('studentForm').reset();
    selectedRow = null;
}
