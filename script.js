'use strict';

/**
 * Obtiene la URL de la imagen de un personaje aleatorio de la API de Rick and Morty.
 * @returns {Promise<string>} Una promesa que se resuelve con la URL de la imagen del personaje aleatorio.
 */
function get_random_character() {
    return fetch('https://rickandmortyapi.com/api/character')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const randomIndex = Math.floor(Math.random() * data.results.length);
            return data.results[randomIndex].image;
        });
}

/**
 * Cambia la imagen de las tarjetas cuando se hace clic en el enlace "About".
 * Selecciona aleatoriamente una imagen de un personaje y la coloca en una tarjeta aleatoria.
 * Además, agrega un modal que muestra la imagen en tamaño completo al hacer clic en ella.
 */
function change_image() {
    get_random_character()
        .then(imageUrl => {
            const cardContainers = document.querySelectorAll('.container2__card');

            // Eliminar todas las imágenes existentes
            cardContainers.forEach(card => {
                const characterImage = card.querySelector('.container2__card-img img');
                if (characterImage) {
                    characterImage.remove();
                }
            });

            // Seleccionar un contenedor de tarjeta aleatoriamente
            const randomIndex = Math.floor(Math.random() * cardContainers.length);
            const randomCardContainer = cardContainers[randomIndex];

            // Crear un elemento de imagen y establecer su atributo src con la URL aleatoria
            const newImage = document.createElement('img');
            newImage.src = imageUrl;

            // Agregar la nueva imagen al contenedor de tarjeta seleccionado aleatoriamente
            const imageContainer = randomCardContainer.querySelector('.container2__card-img');
            imageContainer.appendChild(newImage);

            // Agregar manejador de eventos de clic a la imagen para mostrar el modal
            newImage.addEventListener('click', function () {
                //Crear fondo modal
                const containerModal = document.createElement('div');
                containerModal.classList.add('containerModal');

                // Crear el modal
                const modal = document.createElement('div');
                modal.classList.add('containerModal__modal');
                
                // Crear la imagen en el modal
                const modalImg = document.createElement('img');
                modalImg.src = newImage.src;
                modalImg.classList.add('modal__img');

                //Crear el fondo del boton
                const btnContainer = document.createElement('div');
                btnContainer.classList.add('btnContainer');

                // Botón para cerrar el modal
                const closeModalBtn = document.createElement('span');
                closeModalBtn.textContent = 'X';
                closeModalBtn.classList.add('close__modal-btn');

                // Agregar la imagen y el botón al modal
                containerModal.appendChild(modal);
                modal.appendChild(modalImg);
                btnContainer.appendChild(closeModalBtn);
                modal.appendChild(btnContainer);

                // Agregar el modal al cuerpo del documento
                document.body.appendChild(containerModal);

                // Agregar manejador de eventos de clic al botón de cerrar modal
                closeModalBtn.addEventListener('click', function () {
                    // Remover el modal al hacer clic en el botón de cerrar
                    containerModal.remove();
                });
            });
        });
}

// Agrega un evento de clic al enlace "About" para cambiar la imagen
document.addEventListener('click', function () {
    const aboutLink = document.querySelector('nav ul li:first-child h3');
    aboutLink.addEventListener('click', change_image);
});
