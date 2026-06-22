const apiUrl = 'https://jsonplaceholder.typicode.com/users/';
let usersArray = [];

async function fetchUsers() {
    try {
        const response = await fetch(apiUrl);
        usersArray = await response.json();
        renderTable();
    } catch (error) {
        console.error('Data fetch failure:', error);
    }
}

function renderTable() {
    const tbody = document.getElementById('userTableBody');
    tbody.innerHTML = '';

    usersArray.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><span class="id-badge">#${user.id}</span></td>
            <td class="fw-medium">${user.name}</td>
            <td class="text-muted">@${user.username}</td>
            <td>${user.email}</td>
            <td class="text-end">
                <button class="btn btn-outline-primary btn-custom me-2" onclick="editUser(${user.id})">Edit</button>
                <button class="btn btn-outline-danger btn-custom" onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function deleteUser(id) {
    usersArray = usersArray.filter(user => user.id !== id);
    renderTable();
}

function editUser(id) {
    const user = usersArray.find(u => u.id === id);
    if (!user) return;

    document.getElementById('editId').value = user.id;
    document.getElementById('editName').value = user.name;
    document.getElementById('editUsername').value = user.username;
    document.getElementById('editEmail').value = user.email;

    document.getElementById('editFormContainer').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function saveEdit() {
    const id = parseInt(document.getElementById('editId').value);
    const index = usersArray.findIndex(u => u.id === id);

    if (index !== -1) {
        usersArray[index].name = document.getElementById('editName').value;
        usersArray[index].username = document.getElementById('editUsername').value;
        usersArray[index].email = document.getElementById('editEmail').value;

        renderTable();
        cancelEdit();
    }
}

function cancelEdit() {
    document.getElementById('editFormContainer').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', fetchUsers);