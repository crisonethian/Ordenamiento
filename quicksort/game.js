const container = document.getElementById('container');
const beep = new Audio('../beep.wav'); // Cargar el archivo de sonido .wav
beep.volume = 0.1; // Ajustar el volumen a un 20%

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

// Función de intercambio de elementos en el array
function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
    dibujarBarras(arr); // Actualizar visualización de barras
}

// Partición de Quicksort
async function partition(arr, low, high) {
    let pivot = arr[high]; // Elegir el último elemento como pivote
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr, i, j); // Intercambiar elementos
            beep.currentTime = 0; // Reiniciar sonido
            beep.play(); // Reproducir sonido en cada intercambio
            await delay(50); // Esperar para visualizar el intercambio
        }
    }
    swap(arr, i + 1, high); // Mover el pivote a su lugar correcto
    beep.currentTime = 0;
    beep.play();
    await delay(50); // Esperar para visualizar el intercambio final
    return i + 1; // Retornar el índice del pivote
}

// Algoritmo Quicksort
async function quickSort(arr, low, high) {
    if (low < high) {
        let pi = await partition(arr, low, high); // Particionar el array
        await quickSort(arr, low, pi - 1); // Ordenar subarray izquierdo
        await quickSort(arr, pi + 1, high); // Ordenar subarray derecho
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
        beep.play(); // Reproducir sonido de finalización
        await delay(50); // Esperar 50 ms antes de continuar
    }
}

// Manejo del evento del botón
document.getElementById('ordenar').addEventListener('click', async () => {
    const cantidad = 80; // Cambia esto para más o menos barras
    const numeros = generarNumerosAleatorios(cantidad);
    dibujarBarras(numeros);
    await quickSort(numeros, 0, numeros.length - 1);
    await finalizarOrdenamiento(numeros); // Llamar a la función de finalización
});

// Generar y mostrar los números al cargar
const numerosIniciales = generarNumerosAleatorios(80);
dibujarBarras(numerosIniciales);
