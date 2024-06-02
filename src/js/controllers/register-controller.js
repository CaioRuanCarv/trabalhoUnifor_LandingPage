import { userServices } from '../services/user-service.js';

const formLogin = document.querySelector('[data-form]');
const errorMessage = document.getElementById('error');

formLogin.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = e.target.querySelector('[data-name]').value;
  const email = e.target.querySelector('[data-email]').value;
  const password = e.target.querySelector('[data-password]').value;

  try {
    const userCreate = await userServices.userRegister(name, email, password);
    if (userCreate === 200) {
      errorMessage.classList = 'sucess-message';
      errorMessage.textContent = 'Usuario Registrado!';
      setTimeout(() => window.location.href = './login.html', 800)
      setTimeout(() => formLogin.reset(), 800)

    }
  } catch (err) {
    errorMessage.textContent = 'Email já ultilizado!';
    setTimeout(() => {
      errorMessage.textContent = '';
    } , 1500)
    
    console.log(err);
  }
});
