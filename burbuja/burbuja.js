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

// Algoritmo Bubble Sort con sonido al mover el mayor valor a la derecha
async function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let swapped = false; // Para verificar si hubo intercambios en esta iteración
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Intercambiar
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true; // Hubo intercambio
                dibujarBarras(arr); // Actualizar visualización
                await delay(5); // Esperar un poco para ver el movimiento
            }
        }
        // Reproducir sonido solo si el mayor valor fue movido al final
        if (swapped) {
            beep.currentTime = 0; // Reiniciar el sonido
            beep.play(); // Reproducir sonido
        }
    }
    dibujarBarras(arr); // Mostrar el resultado final
}

// Función para pausar la ejecución
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Manejo del evento del botón
document.getElementById('ordenar').addEventListener('click', async () => {
    const cantidad = 80; // Cambia esto para más o menos barras
    const numeros = generarNumerosAleatorios(cantidad);
    dibujarBarras(numeros);
    await bubbleSort(numeros);
});

// Generar y mostrar los números al cargar
const numerosIniciales = generarNumerosAleatorios(80);
dibujarBarras(numerosIniciales);
