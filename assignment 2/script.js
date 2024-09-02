const dino = document.getElementById('dino');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');
let isJumping = false;
let score = 0;

document.addEventListener('keydown', (event) => {
    if (event.key === ' ') {
        jump();
    }
});

function jump() {
    if (isJumping) return;
    isJumping = true;
    let jumpHeight = 0;
    const upInterval = setInterval(() => {
        if (jumpHeight >= 150) {
            clearInterval(upInterval);
            const downInterval = setInterval(() => {
                if (jumpHeight <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    jumpHeight -= 5;
                    dino.style.bottom = jumpHeight + 'px';
                }
            }, 20);
        } else {
            jumpHeight += 5;
            dino.style.bottom = jumpHeight + 'px';
        }
    }, 20);
}

function checkCollision() {
    const dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue('bottom'));
    const obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));

    if (obstacleLeft > 50 && obstacleLeft < 90 && dinoBottom <= 40) {
        alert('Game Over! Your score: ' + score);
        location.reload();
    }
}

function updateScore() {
    score += 1;
    scoreDisplay.textContent = 'Score: ' + score;
}

setInterval(checkCollision, 10);
setInterval(updateScore, 200);
