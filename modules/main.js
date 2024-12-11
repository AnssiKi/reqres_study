//This is the main entry point for the application

import { ui } from './uiModule.js';
import { userModule } from './userModule.js';

document.addEventListener('DOMContentLoaded', function () {
    ui.initializePageElements();

    ui.buttons.registerBtn.addEventListener('click', () => ui.registerModal.show());
    ui.buttons.loginBtn.addEventListener('click', () => ui.loginModal.show());
    ui.buttons.createUserBtn.addEventListener('click', () => ui.createUserModal.show());
    ui.buttons.logoutBtn.addEventListener('click', () => {
        ui.buttons.loginBtn.classList.remove('d-none');
        ui.buttons.logoutBtn.classList.add('d-none');
        ui.elements.loggedInAs.textContent = "You are not logged in.";
    });

    ui.buttons.loadUsersBtn.addEventListener('click', () => userModule.fetchUsers(1));
    ui.buttons.createConfirm.addEventListener('click', () => userModule.createUser());
    ui.buttons.registerConfirm.addEventListener('click', () => userModule.register());
    ui.buttons.loginConfirm.addEventListener('click', () => userModule.login());

    userModule.fetchUsers(1);
});
