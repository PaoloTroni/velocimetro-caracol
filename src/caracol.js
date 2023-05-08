// Importamos la función speakText que pondrá "voz" al GPS de los caracoles

import { speakText } from "./speakText.js";

("use strict");

//Generamos un valor random entre 1 y 300 y lo asignamos como profundidad del pozo.

// El proceso de generacion de ese número está "desglosado".
// Lo óptimo sería hacerlo todo en una sola línea tal como descrito abajo:
// const profundidadPozo = Math.floor(Math.random() * 301 + 1);

const soloRandom = Math.random();
console.log(soloRandom);

const randomMult301 = soloRandom * 301;
console.log(randomMult301);

const floorPlus1 = Math.floor(randomMult301) + 1;
console.log(floorPlus1);

let profundidadPozo = floorPlus1;

// ################################################################################

// Operaciones con el DOM para actualizar los datos que aparecen en la página

// Seleccionamos el elemento HTML en donde debe aparecer la profundidad del Pozo
const profRandom = document.querySelector("main #profRandom");

// Pintamos la profundidad del pozo en su sitio, en el HTML
profRandom.textContent = `${profundidadPozo}`;

// Seleccionamos el formulario y lo guardamos en una const
const inputProfundidad = document.querySelector("#profundidadPozo");

// Pintamos el valor de la profundidad del pozo en el placeholder
inputProfundidad.placeholder = `${profundidadPozo}`;

// Construimos la lógica del boton para recoger el valor que está en el input del formulario (si el usuario no lo ha modificado será el valor que se ha generado aleatoriamente, en caso contrario, será el valor insertado por el usuario).

const button = document.querySelector("button");

button.addEventListener("click", () => {
  // Iniciamos las variables
  let numDia = 0;

  let pasos = 0;

  if (!inputProfundidad.value) {
    // Si no existe el valor de value en el formulario entoces asignamos el valor del .placeholder al .value
    inputProfundidad.value = inputProfundidad.placeholder;
  }
  // Si existe un valor en el formulario (insertado por el usuario) entonces, asignamos ese valor a profundidadPozo. Es necesario poner un parseInt para que transforme el valor en número.
  else {
    profundidadPozo = parseInt(inputProfundidad.value);
  }
  //Pasamos el valor por el control para que solo entre los valores aceptados
  if (
    isNaN(profundidadPozo) ||
    profundidadPozo < 1 ||
    profundidadPozo > 300 ||
    !Number.isInteger(profundidadPozo)
  ) {
    // En el caso se pase un valor que no sea un número entero entre 1 y 300 (incluídos) se pintará un mensaje de error.
    // Seleccionamos el <p id="error>" y pintamos el mensaje de error. En ese caso, un return corta el código.
    const pError = document.querySelector("#error");
    pError.textContent =
      "La profundidad del pozo tiene que ser un número entero entre 1 y 300";
    return;
  } else {
    // en caso de que esté todo correcto no se pinta el mensaje de error y vaciamos el <p> en caso hubiera quedado el  mensaje de error de otra vez.

    const pError = document.querySelector("#error");
    pError.textContent = "";
  }
  // Iniciamos el do-while para contar los pasos hasta que el caracol salga del pozo
  do {
    pasos = pasos + 7;
    numDia = numDia + 1;
    if (pasos < profundidadPozo) {
      pasos = pasos - 2;
    }
  } while (pasos < profundidadPozo);

  // Seleccionamos el elemento html con id "resultadoNumDia" y lo pintamos en el sitio correspondiente.
  const resultadoNumDia = document.querySelector("#resultadoNumDia");

  resultadoNumDia.textContent = `Considerando que el pozo tiene una profundidad de ${profundidadPozo} pasos, el caracol
  tardará ${numDia}
  día(s) para subir el pozo.`;

  // Pasaremos el mensaje de la sigueinte constante a la voz del nuestro "GPS"
  const tiempoEstimadoViaje = `El tiempo estimado de tu viaje es de ${
    numDia * 24
  } horas.`;
  //llamamos a la función de "voz de GPS"
  speakText(tiempoEstimadoViaje);

  // Despejamos el valor del input
  inputProfundidad.value = "";
  inputProfundidad.placeholder = "";
});
