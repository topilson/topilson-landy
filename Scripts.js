const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Tamanho do canvas
canvas.width = 800;
canvas.height = 400;

// Posição inicial do cão
let dogX = 50;
const dogY = canvas.height / 2;

// Variáveis para controlar os objetos que vêm contra o cão
let objects = [];
let objectSpeed = 5;

// Variáveis para controlar o jogo
let isGameOver = false;
let score = 0;

// Função para desenhar o cão
function drawDog() {
    ctx.fillStyle = 'brown';
    ctx.fillRect(dogX, dogY, 50, 30);
}

// Função para desenhar os objetos que vêm contra o cão
function drawObjects() {
    ctx.fillStyle = 'red';
    objects.forEach(object => {
        ctx.fillRect(object.x, object.y, 20, 20);
    });
}

// Função para atualizar a posição dos objetos
function updateObjects() {
    objects.forEach(object => {
        object.x -= objectSpeed;
    });

    // Remover objetos que saem do canvas
    objects = objects.filter(object => object.x > 0);
}

// Função para verificar colisões entre o cão e os objetos
function checkCollisions() {
    objects.forEach(object => {
        if (
            dogX < object.x + 20 &&
            dogX + 50 > object.x &&
            dogY < object.y + 20 &&
            dogY + 30 > object.y
        ) {
            isGameOver = true;
        }
    });
}

// Função para animar o jogo
function animate() {
    if (!isGameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawDog();
        drawObjects();
        updateObjects();
        checkCollisions();
        score++;
        requestAnimationFrame(animate);
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';
        ctx.font = '30px Arial';
        ctx.fillText('Topilson Landy Perdeu', 250, 200);
    }
}

// Função para adicionar um objeto aleatório à lista de objetos
function addRandomObject() {
    const randomY = Math.random() * canvas.height;
    objects.push({ x: canvas.width, y: randomY });
}

// Evento para salvar os objetos (chamado pelo botão "Salvar")
document.getElementById('saveButton').addEventListener('click', () => {
    objectSpeed += 1;
});

// Evento para quebrar o jogo (chamado pelo botão "Quebrar")
document.getElementById('breakButton').addEventListener('click', () => {
    isGameOver = true;
});

// Iniciar o jogo
animate();

// Adicionar objetos aleatórios a cada 1 segundo
setInterval(addRandomObject, 1000);
