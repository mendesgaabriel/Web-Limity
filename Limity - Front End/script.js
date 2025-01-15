// validando formulário de cadastro
document.getElementById('cadastroForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // obtendo os valores dos campos do form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // verificando senha e confirmação de senha
    if (password !== confirmPassword) {
        alert("As senhas não coincidem. Tente novamente.");
        return;
    }

    // armazena nome de usuário no localstorage
    const user = { name, email };
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user); // empurrando novo usuário para lista
    localStorage.setItem('users', JSON.stringify(users));

    alert("Cadastro realizado com sucesso!");

    displayUsers();

    // obtendo localização 
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            document.getElementById('location').innerHTML = `Sua localização: Latitude ${latitude}, Longitude ${longitude}`;
        }, function(error) {
            document.getElementById('location').innerHTML = "Não foi possível obter sua localização.";
        });
    }
});

// exibindo usuários cadastrados
function displayUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || []; 
    const userList = document.getElementById('userList');
    userList.innerHTML = ''; //limpando a lista antes de inserir novos usuários

    // mapeando os usuários e criando uma lista
    const userItems = users.map(user => {
        const li = document.createElement('li');
        li.textContent = `${user.name} (${user.email})`;
        return li;
    });


    userItems.forEach(li => userList.appendChild(li));

    // exibe o total de usuários usando reduce
    const totalUsers = users.reduce((count, user) => count + 1, 0);
    document.getElementById('userCount').textContent = `Total de usuários cadastrados: ${totalUsers}`;
}

// exibe os usuários cadastrados ao carregar a página (se houver)
document.addEventListener('DOMContentLoaded', displayUsers);

