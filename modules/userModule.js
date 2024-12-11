//This module contains user related CRUD actions.

import { api } from './apiModule.js';
import { ui } from './uiModule.js';

export const userModule = {
    currentPage: 1,
    totalPages: 1,

    async fetchUsers(page) {
        try {
            const data = await api.fetchAPI(`users?page=${page}`);

            this.currentPage = data.page;
            this.totalPages = data.total_pages;
            ui.renderPageButtons(this.totalPages, this.currentPage, (page) => this.fetchUsers(page));
            ui.updatePageInfo(this.currentPage, this.totalPages);
            ui.renderUsersTable(data.data, this.updateUser.bind(this), this.deleteUser.bind(this));
        } catch (error) {
            alert(`Error fetching user data: ${error.message}`);
        }
    },

    async createUser() {
        const name = document.getElementById('newUserName').value;
        const job = document.getElementById('newUserJob').value;

        if (!name || !job) {
            alert('Enter all details.');
            return;
        }

        try {
            const newUser = await api.fetchAPI('users', 'POST', { name, job });
            alert(`User created. Name: ${newUser.name}, Job: ${newUser.job}, ID: ${newUser.id}, created at: ${newUser.createdAt}`);

            document.getElementById('newUserName').value = '';
            document.getElementById('newUserJob').value = '';
            ui.createUserModal.hide();
        } catch (error) {
            alert(`Error creating user. ${error.message}`);
        }
    },

    //REQRES will not save the changes in backend, so only server response is shown in the user update feature! No requirement for using a persistent backend has been presented.
    //User list will not reflect the updates, but server responses are received as expected.
    async updateUser(user) {
        const newFirstName = prompt("Enter new first name:", user.first_name);
        const newLastName = prompt("Enter new last name:", user.last_name);

        if (!newFirstName || !newLastName) {
            alert("Update cancelled. All fields are required.");
            return;
        }

        try {
            const updatedUser = await api.fetchAPI(`users/${user.id}`, 'PUT', {
                first_name: newFirstName,
                last_name: newLastName
            });

            alert(`User updated successfully: ${updatedUser.first_name} ${updatedUser.last_name}`);
            await this.fetchUsers(this.currentPage);
        
        } catch (error) {
            alert(`Error updating user. Error code: ${error.message}`);
        }
    },

    async deleteUser(userId, row) {
        const confirmation = confirm("Are you sure you want to delete this user?");
        if (!confirmation) return;

        try {
            await api.fetchAPI(`users/${userId}`, 'DELETE');
            alert("User deleted successfully.");
            row.remove();
        } catch (error) {
            alert(`Error deleting user. Error code: ${error.message}`);
        }
    },

    async register(){
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        if(!email || !password){
            alert('Enter valid email and password');
            return;
        }

        try{
            const data = await api.fetchAPI('register', 'POST', {email, password});
            alert(`Registration successful! ID:${data.id}, token: ${data.token}`);
            document.getElementById('registerEmail').value = '';
            document.getElementById('registerPassword').value = '';
            ui.registerModal.hide();
        }
        
        catch(error){
            alert(`Error in registration, try again later. Error code: ${error.message}`);
        }
    },

    async login() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        if(!email || !password){
            alert("Enter valid email and password.");
            return
        }

        try{
            const data = await api.fetchAPI('login', 'POST', {email, password});
            alert(`Login succesful! Token: ${data.token}`);
            ui.elements.loggedInAs.textContent = `You are logged in as ${email}`;
            ui.buttons.loginBtn.classList.add('d-none');
            ui.buttons.logoutBtn.classList.remove('d-none');
            ui.loginModal.hide();

        }catch(error){
            alert(`Login failed: ${error.message}`);
            ui.buttons.loginBtn.classList.remove('d-none');
            ui.buttons.logoutBtn.classList.add('d-none');
        }
    }
};