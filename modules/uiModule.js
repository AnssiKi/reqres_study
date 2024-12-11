//This module contains the element logic of the user interface

export const ui = {
    registerModal: new bootstrap.Modal(document.getElementById('registerModal')),
    loginModal: new bootstrap.Modal(document.getElementById('loginModal')),
    createUserModal: new bootstrap.Modal(document.getElementById('createUserModal')),

    buttons: {
        registerBtn: document.getElementById('registerBtn'),
        registerConfirm: document.getElementById('registerConfirm'),
        loginBtn: document.getElementById('loginBtn'),
        loginConfirm: document.getElementById('loginConfirm'),
        logoutBtn: document.getElementById('logoutBtn'),
        loadUsersBtn: document.getElementById('loadUsersBtn'),
        createUserBtn: document.getElementById('createUserBtn'),
        createConfirm: document.getElementById('createConfirm')
    },

    elements: {
        loggedInAs: document.getElementById('loggedInAs'),
        usersTable: document.getElementById('users'),
        pageButtonsContainer: document.createElement('div'),
        totalPagesInfo: document.createElement('p'),
    },

    initializePageElements() {
        this.elements.totalPagesInfo.className = "totalPages text-center mt-3";
        this.elements.pageButtonsContainer.className = "pageButtons text-center mt-3";
        document.body.appendChild(this.elements.pageButtonsContainer);
        document.body.appendChild(this.elements.totalPagesInfo);
    },

    renderUsersTable(users, updateCallback, deleteCallback) {
        const usersTable = this.elements.usersTable;
        const tableRows = usersTable.querySelectorAll("tr:not(:first-child)");
        tableRows.forEach(row => row.remove());

        users.forEach(user => {
            const row = usersTable.insertRow();
            row.innerHTML = `<td>${user.id}</td>
                <td><img src="${user.avatar}" alt="${user.first_name}" width="50"></td>
                <td>${user.email}</td>
                <td>${user.first_name}</td>
                <td>${user.last_name}</td>
                <td>
                    <button class="updateUser btn btn-success btn-sm">Update</button>
                    <button class="deleteUser btn btn-danger btn-sm">Delete</button>
                </td>`;

            row.querySelector('.updateUser').addEventListener('click', () => updateCallback(user));
            row.querySelector('.deleteUser').addEventListener('click', () => deleteCallback(user.id, row));
        });
    },

    updatePageInfo(currentPage, totalPages) {
        this.elements.totalPagesInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    },

    renderPageButtons(totalPages, currentPage, fetchUsersCallback) {
        const pageButtonsContainer = this.elements.pageButtonsContainer;
        pageButtonsContainer.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.className = "btn btn-primary mx-1";
            button.disabled = i === currentPage;
            button.addEventListener('click', () => {
                fetchUsersCallback(i);
            });
            pageButtonsContainer.appendChild(button);
        }
    }
};