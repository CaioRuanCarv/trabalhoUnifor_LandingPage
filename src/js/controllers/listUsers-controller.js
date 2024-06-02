import { userServices } from '../services/user-service.js';

(() => {
  async function renderUsers() {
    const users = await userServices.listUsers();
    
    const listConsoles = document.querySelector('.table-group-divider');
    listConsoles.innerHTML = '';

    users.forEach((e, index) => {
      listConsoles.appendChild(newUser(e.name, e.email, index + 1, e._id));
    });
  }

  const newUser = (name, email, index, id) => {
    const user = document.createElement('tr');
    
    const content = `
      <th scope="row" class="text-center">${index}</th>
      <td>${name}</td>
      <td>${email}</td>
      <td>
        <span role="button">
          <ion-icon name="trash-outline" class="delete-icon"></ion-icon>
        </span>
      </td>
      <td>
        <span role="button">
          <ion-icon name="create-outline" class="edit-icon"></ion-icon>
        </span>
      </td>
    `;
    user.innerHTML = content;

    const trashIcon = user.querySelector('.delete-icon');
    trashIcon.addEventListener('click', async () => {
      await deleteUser(id);
      renderUsers();
    });

    const editIcon = user.querySelector('.edit-icon');
    editIcon.addEventListener('click', async () => {
      editUser(id, name);
    });

    return user;
  };

  const deleteUser = async (id) => {
    try {
      const response = await userServices.deleteUser(id);
      if (response.status !== 200) {
        alert("User does not exist.");
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const editUser = (id, name) => {
    const editUserName = document.getElementById('editUserName');
    editUserName.value = name;

    const saveButton = document.getElementById('saveUserButton');
    const editUserModal = new bootstrap.Modal(document.getElementById('editUserModal'));

    const handleSaveClick = async () => {
      const updatedName = editUserName.value;
      try {
        await userServices.updateUser(id, updatedName);
        renderUsers(); // Re-renderiza a lista após a atualização
        editUserName.value = '';
        editUserModal.hide(); // Fecha o modal após salvar
      } catch (error) {
        console.error('Failed to update user:', error);
      }
    };

    // Remover o ouvinte de evento anterior
    saveButton.removeEventListener('click', saveButton.saveHandler);
    
    // Adicionar o novo ouvinte de evento
    saveButton.addEventListener('click', handleSaveClick);
    saveButton.saveHandler = handleSaveClick;

    editUserModal.show();
  };

  renderUsers();
})();
