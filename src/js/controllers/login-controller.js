import { userServices } from '../services/user-service.js';

const formLogin = document.querySelector('[data-login]');
const errorMessage = document.getElementById('error');

formLogin.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = e.target.querySelector('[data-email]').value;
  const password = e.target.querySelector('[data-password]').value;  

  try {
    const userConfirm = await userServices.userLogin(email, password);
    
    if (userConfirm === 200) {
        window.location.href = './admin.html';
    }

  } catch (err) {
      errorMessage.textContent = 'Email or password incorrect';
      setTimeout(() => {
        errorMessage.textContent = '';
      } , 1500)
      console.log(err);
  }
});
