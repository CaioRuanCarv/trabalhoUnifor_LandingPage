const UrlBase = 'https://plataforma-web-back.onrender.com/users';

const listUsers = async () => {
  const list = await axios.get(UrlBase);
  
  return list.data;
};

const userLogin = async (email, password) => {
  const user = await axios.post(`${UrlBase}/sign-in`, {
    email,
    password
  });
  
  if (!user) {
    throw new Error('Usuario ou senha invalida');
  }

  return 200
};

const userRegister = async (name, email, password) => {
  const user = await axios.post(`${UrlBase}`, {
    name,
    email,
    password
  });
  
  if (!user) {
    throw new Error('Email já cadastrado!');
  }

  return 200
};

const deleteUser = async(id) => {
  
  const user = await axios.delete(`${UrlBase}/${id}`);

  if (!user) {
    throw new Error('User Não existe.');
  }

  return 200
}

const updateUser = async (id, name) => {
  const user = await axios.put(`${UrlBase}/${id}`, {
    name
  });

  if (!user) {
    throw new Error('');
  }

  return 200
}


export const userServices = {
    listUsers,
    userLogin,
    userRegister,
    deleteUser,
    updateUser
};
