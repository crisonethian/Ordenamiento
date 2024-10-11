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

// Función para fusionar dos subarrays de manera estable
async function merge(arr, left, mid, right) {
    const n1 = mid - left + 1; // Tamaño del subarray izquierdo
    const n2 = right - mid; // Tamaño del subarray derecho

    // Crear arreglos temporales
    const L = new Array(n1);
    const R = new Array(n2);

    // Copiar datos a los arreglos temporales
    for (let i = 0; i < n1; i++) L[i] = arr[left + i];
    for (let j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];

    let i = 0; // Índice inicial del subarray izquierdo
    let j = 0; // Índice inicial del subarray derecho
    let k = left; // Índice inicial de la fusión

    // Fusionar los arreglos temporales
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        dibujarBarras(arr); // Actualizar visualización
        beep.currentTime = 0; // Reiniciar sonido
        beep.play(); // Reproducir sonido en cada movimiento
        await delay(50); // Esperar para visualizar el movimiento
        k++;
    }

    // Copiar los elementos restantes de L[] si hay alguno
    while (i < n1) {
        arr[k] = L[i];
        dibujarBarras(arr); // Actualizar visualización
        beep.currentTime = 0; // Reiniciar sonido
        beep.play(); // Reproducir sonido en cada movimiento
        await delay(50); // Esperar para visualizar el movimiento
        i++;
        k++;
    }

    // Copiar los elementos restantes de R[] si hay alguno
    while (j < n2) {
        arr[k] = R[j];
        dibujarBarras(arr); // Actualizar visualización
        beep.currentTime = 0; // Reiniciar sonido
        beep.play(); // Reproducir sonido en cada movimiento
        await delay(50); // Esperar para visualizar el movimiento
        j++;
        k++;
    }
}

// Algoritmo Merge Sort estable
async function stableMergeSort(arr, left, right) {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);

        // Ordenar la primera y la segunda mitad
        await stableMergeSort(arr, left, mid);
        await stableMergeSort(arr, mid + 1, right);
        await merge(arr, left, mid, right);
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
    const cantidad = 100; // Cambia esto para más o menos barras
    const numeros = generarNumerosAleatorios(cantidad);
    dibujarBarras(numeros);
    await stableMergeSort(numeros, 0, numeros.length - 1);
    await finalizarOrdenamiento(numeros); // Llamar a la función de finalización
});

// Generar y mostrar los números al cargar
const numerosIniciales = generarNumerosAleatorios(100);
dibujarBarras(numerosIniciales);
