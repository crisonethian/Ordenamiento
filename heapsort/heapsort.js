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

// Función para hacer heap (montículo)
async function heapify(arr, n, i) {
    let largest = i; // Inicializar el mayor como raíz
    const left = 2 * i + 1; // Hijo izquierdo
    const right = 2 * i + 2; // Hijo derecho

    // Si el hijo izquierdo es mayor que la raíz
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    // Si el hijo derecho es mayor que el mayor hasta ahora
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    // Si el mayor no es la raíz
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]]; // Intercambiar

        dibujarBarras(arr); // Actualizar visualización
        beep.currentTime = 0; // Reiniciar sonido
        beep.play(); // Reproducir sonido al mover
        await delay(50); // Esperar para visualizar el movimiento

        // Llamar recursivamente a heapify en el subárbol afectado
        await heapify(arr, n, largest);
    }
}

// Algoritmo Heap Sort
async function heapSort(arr) {
    const n = arr.length;

    // Construir el montículo (heap)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(arr, n, i);
    }

    // Extraer elementos uno por uno del montículo
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]]; // Intercambiar

        dibujarBarras(arr); // Actualizar visualización
        beep.currentTime = 0; // Reiniciar sonido
        beep.play(); // Reproducir sonido al mover
        await delay(50); // Esperar para visualizar el movimiento

        await heapify(arr, i, 0);
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
    await heapSort(numeros);
    await finalizarOrdenamiento(numeros); // Llamar a la función de finalización
});

// Generar y mostrar los números al cargar
const numerosIniciales = generarNumerosAleatorios(100);
dibujarBarras(numerosIniciales);
