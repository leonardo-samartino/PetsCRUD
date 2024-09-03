const cadastro = () => {
    const inputName = document.querySelector('input[type="text"]');
    const inputEmail = document.querySelector('input[type="email"]');
    const inputPassword = document.querySelector('input[type="password"]');
    const submitButton = document.querySelector('.registerBtn');

    if (submitButton) {
        submitButton.addEventListener('click', (event) => {
            event.preventDefault();

            if (!inputName.value || !inputEmail.value || !inputPassword.value) {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            fetch('https://back-login.vercel.app/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: '',
                    nome: inputName.value,
                    email: inputEmail.value,
                    senha: inputPassword.value
                })
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Falha na operação');
                    }
                })
                .then((data) => {

                    alert('Registro concluído com sucesso');
                    location.href = 'login.html'
                })
                .catch((error) => {
                    alert('Falha na operação. Por favor, tente novamente.');
                    console.error('Erro:', error);
                });
        });
    }
};

window.onload = cadastro;
