const container = document.getElementById('container');
const beep = new Audio('../beep.wav'); // Cargar el archivo de sonido .wav
beep.volume = 0.2; // Ajustar el volumen a un 20%

// Cola para manejar la reproducción de sonido
let audioQueue = [];

// Generar números aleatorios y mostrarlos
function generarNumerosAleatorios(cantidad) {
    const numeros = [];
    for (let i = 0; i < cantidad; i++) {
        numeros.push(Math.floor(Math.random() * 100));
    }
    return numeros;
}

// Dibujar las barras en el contenedor
function dibujarBarras(numeros) {
    container.innerHTML = ''; // Limpiar el contenedor
    numeros.forEach(num => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${num * 3}px`; // Ajustar la altura
        container.appendChild(bar);
    });
}

// Función para manejar la cola de audio
async function playSound() {
    if (audioQueue.length > 0) {
        const nextSound = audioQueue.shift(); // Obtener el siguiente sonido
        beep.currentTime = 0; // Reiniciar sonido
        await beep.play(); // Reproducir sonido
        // Esperar hasta que el sonido termine
        await new Promise(resolve => {
            beep.onended = resolve; // Resolver cuando el sonido termine
        });
    }
}

// Algoritmo Cocktail Shaker Sort
async function cocktailShakerSort(arr) {
    let swapped = true;
    let start = 0;
    let end = arr.length - 1;

    while (swapped) {
        swapped = false;

        // Recorrer de izquierda a derecha
        for (let i = start; i < end; i++) {
            if (arr[i] > arr[i + 1]) {
                // Intercambiar
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true; // Hubo intercambio
                dibujarBarras(arr); // Actualizar visualización
                audioQueue.push(); // Agregar a la cola de sonido
                await playSound(); // Reproducir sonido
                await delay(5); // Esperar 10 ms para visualizar el movimiento
            }
        }

        // Si no hubo intercambios, salimos
        if (!swapped) break;

        // Reducir el final del rango
        end--;

        swapped = false;

        // Recorrer de derecha a izquierda
        for (let i = end; i > start; i--) {
            if (arr[i] < arr[i - 1]) {
                // Intercambiar
                [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
                swapped = true; // Hubo intercambio
                dibujarBarras(arr); // Actualizar visualización
                audioQueue.push(); // Agregar a la cola de sonido
                await playSound(); // Reproducir sonido
                await delay(5); // Esperar 10 ms para visualizar el movimiento
            }
        }

        // Aumentar el inicio del rango
        start++;
    }
}

// Función para pausar la ejecución
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Función para indicar que se ha terminado el ordenamiento
async function finalizarOrdenamiento(arr) {
    const bars = document.querySelectorAll('.bar'); // Seleccionar todas las barras
    for (let i = 0; i < bars.length; i++) {
        bars[i].style.backgroundColor = 'green'; // Cambiar color a verde
        beep.currentTime = 0; // Reiniciar sonido
        await beep.play(); // Reproducir sonido de finalización
        await delay(5); // Esperar 10 ms antes de continuar
    }
}

// Manejo del evento del botón
document.getElementById('ordenar').addEventListener('click', async () => {
    const cantidad = 80; // Cambia esto para más o menos barras
    const numeros = generarNumerosAleatorios(cantidad);
    dibujarBarras(numeros);
    await cocktailShakerSort(numeros);
    await finalizarOrdenamiento(numeros); // Llamar a la función de finalización
});

// Generar y mostrar los números al cargar
const numerosIniciales = generarNumerosAleatorios(80);
dibujarBarras(numerosIniciales);
