function displayUsers(users) {
  const usersList = document.getElementById('users-list');
  usersList.innerHTML = '';

  if (Array.isArray(users)) {
    users.forEach(user => {
      const userDiv = document.createElement('div');
      userDiv.className = 'card p-3 m-2';
      userDiv.innerHTML = `<h5>Name: ${user.name}</h5><p>Email: ${user.email}</p>`;
      usersList.appendChild(userDiv);
    });
  } else {
    usersList.innerHTML = '<p class="text-warning">Foydalanuvchilar ro‘yxati topilmadi!</p>';
    console.error('displayUsers: users massiv emas:', users);
  }
}

export default displayUsers ;