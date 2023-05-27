const gridContainer = document.getElementById("signos");
const modal = document.getElementById("mi-modal");
const botonAbrir = document.getElementById("boton-abrir");
const botonCerrar = document.getElementById("boton-cerrar");
const contenedorFondo = document.getElementById("fondo");

// Función para mostrar los detalles del signo seleccionado en el modal
mostrarDetalle = (signo, data, backgroundColor) => {
  modal.style.display = "block";
  modal.innerHTML = `
    <div class="modalContenido" style="background:${backgroundColor}">
      <div class="signoModal" data-signo="${signo}">
        <h1 class="nombreSignoModal">${signo}</h1>
      </div>
      <div class="modalTextos">
        <p class="fecha">${data[signo].fecha}</p>
        <div class="descAmorTraba">
          <p class="descripcion">${data[signo].descripcion}</p>
          <p class="amor">${data[signo].amor}</p>
          <p class="trabajo">${data[signo].trabajo}</p>
        </div>
      </div>
    </div>
  `;
  requestAnimationFrame(function () {
    document.querySelector('.modalContenido').classList.add('anchoCompleto');
    document.querySelector('.signoModal').classList.add('anchoCompleto');
    document.querySelector('.modalTextos').classList.add('anchoCompleto');
  });
}

// Obtener el archivo JSON y crear el HTML de los signos
fetch('package.json')
  .then(response => response.json())
  .then(data => {

    // Crear el HTML de cada signo utilizando map
    const signosHtml = Object.keys(data).map(signo => `
      <div class="signo" data-signo="${signo}">
        <img class="imgSignos" src="${data[signo].img}">
        <h1 class="nombreSigno">${signo}</h1>
      </div>
    `).join('');

    // Agregar el HTML de los signos al grid container
    gridContainer.innerHTML = signosHtml;

    // Escuchar el click en el grid container y mostrar los detalles del signo seleccionado en el modal
    gridContainer.addEventListener('click', (event) => {
      const clickedElement = event.target;
      if (clickedElement.classList.contains("signo") || clickedElement.classList.contains("imgSignos") || clickedElement.classList.contains("nombreSigno")) {
        const selectedSigno = clickedElement.closest(".signo").dataset.signo;
        const selecSignoColor = clickedElement.closest(".signo");
        const backgroundColor = getComputedStyle(selecSignoColor).getPropertyValue("background");
        mostrarDetalle(selectedSigno, data, backgroundColor);
      }
    });
    

    const imagenes = Object.keys(data).map(signo => `
    <img id="fondoImg" src="${data[signo].img}">
    <img id="fondoImg" src="${data[signo].img}">
    `).join('');

    contenedorFondo.innerHTML = imagenes;

    // Seleccionamos todas las imágenes
    const imagene = document.querySelectorAll("#fondoImg");

    // Animamos cada imagen con una animación diferente
    imagene.forEach((imagen, index) => {
      // Configuramos la animación de entrada
      const entrada = new TimelineMax({ paused: true });
      entrada.to(imagen, 0.1, {
        opacity: 1,
        scale: 1,
        ease: Power2.easeInOut
      });

      // Configuramos la animación de salida
      const salida = new TimelineMax({ paused: true });
      salida.to(imagen, 0.1, {
        opacity: 0,
        scale: 0.5,
        ease: Power2.easeInOut
      });

      // Configuramos el evento hover para cada imagen
      imagen.addEventListener("mouseenter", () => {
        entrada.play();
      });
      imagen.addEventListener("mouseleave", () => {
        salida.play();
      });

      // Configuramos la posición inicial y la transición
      TweenMax.set(imagen, { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight });
      TweenMax.to(imagen, 10, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        ease: Power1.easeInOut,
        repeat: -1,
        yoyo: true,
        delay: index * 0.3
      });
    });

  });

// Cerrar el modal cuando se hace clic en el botón de cerrar
window.addEventListener('click', function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    const selecSignoColor = document.querySelector(".seleccionado");
    if (selecSignoColor) {
      selecSignoColor.classList.remove("seleccionado");
    }
  }
});



