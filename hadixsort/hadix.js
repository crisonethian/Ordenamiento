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

// Función para obtener el dígito en una posición específica
function getDigit(num, place) {
    return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}

// Algoritmo Radix Sort (LSD)
async function radixSort(arr) {
    const maxNum = Math.max(...arr); // Encontrar el número máximo para saber el número de dígitos
    const digits = Math.floor(Math.log10(maxNum)) + 1; // Calcular el número de dígitos

    for (let place = 0; place < digits; place++) {
        // Inicializar los contenedores para cada dígito (0-9)
        const buckets = Array.from({ length: 10 }, () => []);
        
        // Colocar los números en sus respectivos contenedores
        for (let num of arr) {
            const digit = getDigit(num, place);
            buckets[digit].push(num);
        }

        // Volver a juntar los números en el arreglo original
        let index = 0;
        for (let bucket of buckets) {
            for (let num of bucket) {
                arr[index] = num;
                index++;
                dibujarBarras(arr); // Actualizar visualización
                beep.currentTime = 0; // Reiniciar sonido
                beep.play(); // Reproducir sonido en cada movimiento
                await delay(50); // Esperar para visualizar el movimiento
            }
        }
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
    await radixSort(numeros);
    await finalizarOrdenamiento(numeros); // Llamar a la función de finalización
});

// Generar y mostrar los números al cargar
const numerosIniciales = generarNumerosAleatorios(100);
dibujarBarras(numerosIniciales);
