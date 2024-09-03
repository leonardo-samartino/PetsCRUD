const login = async () => {
    const inputEmail = document.querySelector('input[type="email"]')
    const inputPassword = document.querySelector('input[type="password"]')
    const submitButton = document.querySelector('.loginBtn')

    if (submitButton) {
        submitButton.addEventListener('click', async (event) => {
            event.preventDefault()
            const loginList = await getLoginData(); // Obter os dados de login
            // console.log(loginList)
            let loginValido = false;
            for (let i in loginList) {
                if (inputEmail.value === loginList[i].email && inputPassword.value === loginList[i].senha) {                    
                    loginValido = true; // Marca o login como válido
                    break; // Sai do loop, pois já encontrou um login válido
                }
            }
            if (!loginValido) {
                alert('Erro: Email ou senha incorretos');
            }else{location.href = 'pets.html'}
        })
    }
}

const getLoginData = async function () {
    const loginData = 'https://back-login.vercel.app/usuarios'
    const response = await fetch(loginData)
    const loginList = await response.json()
    return loginList
}

window.onload = login
