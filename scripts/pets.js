let petList = []

//Search bar
const search = document.getElementById("search")
search.addEventListener('keyup', (e) => {
    const searchString = e.target.value
    const filteredPets = petList.filter((Pet) => {
        return Pet.nomePet.includes(searchString)
    })
    console.log(filteredPets)
})


// Função para consumir os dados da API 
const getPetData = async function () {
    let petData = `https://back-login.vercel.app/usuarios`
    const response = await fetch(petData)
    petList = await response.json()
    return petList
}

// Função para criar os Cards
const CreateCards = async function (petListJSON, searchTerm = '') {
    let divCard = document.getElementById('divCard')

    //propriedade para limpar a div container durante o filtro
    divCard.innerHTML = ''

    let filteredPets = petListJSON
    if (searchTerm !== '') {
        filteredPets = filteredPets(petListJSON, searchTerm)
    }

    //forEach para criação automatizada dos cards
    petListJSON.forEach(function (Pet) {
        if (Pet.nomePet == undefined || Pet.nomePet == ''){
            return;
        } 
        // Div corpo do card
        let divCardBox = document.createElement('div')

        // Containers
        let imageBox = document.createElement('figure')
        let textBox = document.createElement('div')
        let buttonBox = document.createElement('div')

        // Elementos filho 
        let image = document.createElement('img')
        let nameBox = document.createElement('h1')
        let breedBox = document.createElement('p')
        let colorBox = document.createElement('p')
        let btnEditar = document.createElement('button')
        let btnExcluir = document.createElement('button')

        //texto
        let name = document.createTextNode(Pet.nomePet)
        let breed = document.createTextNode(Pet.raca)
        let color = document.createTextNode(Pet.cor)
        let editar = document.createTextNode('Editar')
        let excluir = document.createTextNode('Excluir')

        //Adicionando atributos no HTML
        divCardBox.setAttribute('class', 'card_box')
        imageBox.setAttribute('class', 'img_box')
        image.setAttribute('src', Pet.image)
        textBox.setAttribute('class', 'text_box')
        nameBox.setAttribute('class', 'name_box')
        breedBox.setAttribute('class', 'breed_box')
        colorBox.setAttribute('class', 'color_box')
        buttonBox.setAttribute('class', 'button_box')
        btnExcluir.setAttribute('id', 'excluir')
        btnExcluir.setAttribute('idPet', Pet.id)
        btnEditar.setAttribute('id', 'editar')
        btnEditar.setAttribute('idPet', Pet.id)


        // Alocando as divs dentro dos respectivos containers
        divCard.appendChild(divCardBox)
        divCardBox.appendChild(imageBox)
        imageBox.appendChild(image)
        divCardBox.appendChild(textBox)
        textBox.appendChild(nameBox)
        nameBox.appendChild(name)
        textBox.appendChild(breedBox)
        breedBox.appendChild(breed)
        textBox.appendChild(colorBox)
        colorBox.appendChild(color)
        divCardBox.appendChild(buttonBox)
        buttonBox.appendChild(btnEditar)
        btnEditar.appendChild(editar)
        buttonBox.appendChild(btnExcluir)
        btnExcluir.appendChild(excluir)

        // atribuindo o chamado da função deletePet ao click do botão excluir
        btnExcluir.addEventListener('click', function () {
            deletePet(btnExcluir.getAttribute('idPet'))
        })
        // atribuindo o chamado da função de abrir o popup de editar ao click do botão editar
        btnEditar.addEventListener('click', function () {
            //quando clicar, chama outra funçao de get por id do objeto  
            openEditPopup(Pet)

        })

    })
}

// Função para exibir o popup de editar card
async function openEditPopup(Pet) {
    var editPopup = document.getElementById("editPopup")

    editPopup.style.display = "block"

    document.getElementById("pet_name_edit").value = Pet.nomePet
    document.getElementById("pet_color_edit").value = Pet.cor
    document.getElementById("pet_img_edit").value = Pet.image
    document.getElementById("pet_breed_edit").value = Pet.raca

    const editButton = document.getElementById("editar_Card_Btn")
    
    editButton.addEventListener('click',(event) => {event.preventDefault()
    saveChanges(Pet.id)})
};



async function saveChanges(id) {

    const name = document.getElementById("pet_name_edit").value
    const color = document.getElementById("pet_color_edit").value
    const img = document.getElementById("pet_img_edit").value
    const breed = document.getElementById("pet_breed_edit").value

    const updatedPet = {
        
        nomePet: name,
        cor: color,
        image: img,
        raca: breed,
    }

    const url = `https://back-login.vercel.app/usuarios/${id}`

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPet)

    })
    if (response.status == 200) {
        alert('Card atualizado com sucesso')
        location.reload()
        
    } else {
        alert('Não foi possível atualizar o card')
    }
}

// Função para deletar um pet na API
const deletePet = async function (id) {
    let url = `https://back-login.vercel.app/usuarios/${id}`

    let response = await fetch(url, {
        method: 'DELETE',
        mode: 'cors'
    })

    if (response.status == 200) {
        alert('Card excluido com sucesso')
        location.reload()
    }
    else
        alert('Não foi possível excluir o resgistro')
}
// Atribuindo a um objeto o id do botao de criar card
let ButtonCreateCard = document.getElementById('CriarCard_btn')

// Atribuindo ao click o chamado da funçao de mostrar o popup
ButtonCreateCard.addEventListener('click', function () {
    openPopupCreateCard()
})
// Função para exibir o popup de criar card
async function openPopupCreateCard() {
    var popup = document.getElementById("popup")

    popup.style.display = "block";
}
// Função para fechar o popup quando o usuário clicar fora dele
window.onclick = function (event) {
    var popup = document.getElementById("popup");
    if (event.target == popup) {
        popup.style.display = "none"
    }
}


// Função de callback para criar os cards quando a janela carregar
window.addEventListener('load', async function () {
    const petListJSON = await getPetData()
    await CreateCards(Object.values(petListJSON))

    //evento de imput na barra de pesquisa
    const searchBar = document.getElementById('search')
    searchBar.addEventListener('input', function () {
        const searchTerm = searchBar.value.toLowerCase()
        const filteredPets = Object.values(petListJSON).filter(Pet => {
            return Pet.nomePet && Pet.nomePet.toLowerCase().includes(searchTerm)
        })
        CreateCards(filteredPets)
    })
})