const petRegister = () => {
    const inputName = document.getElementById('pet_name');
    const inputColor = document.getElementById('pet_color');
    const inputImage = document.getElementById('pet_img');
    const inputBreed = document.getElementById('pet_breed')
    const submitButton = document.querySelector('.enviarCardBtn');

    if (submitButton) {
        submitButton.addEventListener('click', (event) => {
            event.preventDefault();

            if (!inputName.value || !inputColor.value || !inputImage.value || !inputBreed.value) {
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
                    nomePet: inputName.value,
                    cor: inputColor.value,
                    image: inputImage.value,
                    raca: inputBreed.value
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

                    alert('Card criado com sucesso!');
                    location.href = 'pets.html'
                })
                .catch((error) => {
                    alert('Falha na operação. Por favor, tente novamente.');
                    console.error('Erro:', error);
                });
        });
    }
};

window.onload = petRegister;
