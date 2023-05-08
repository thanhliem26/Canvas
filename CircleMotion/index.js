const canvas = document.querySelector('#canvas');
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = ["#FEFF86", "#B0DAFF", "#19A7CE", "#146C94"];

const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init()
})

const randomNumber = (min, max) => {
    return Math.random() * (max - min + 1) - 1 + min;
}

const randomColor = (colors) => {
    const index = Math.floor(Math.random() * colors.length);

    return colors[index];
}

function Circle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius,
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.05;
    this.distance = randomNumber(50, 120);
    this.lastMousePointer = {x: x, y: y};

    this.draw = function (lastMouse) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.radius;
        ctx.moveTo(lastMouse.x, lastMouse.y);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        ctx.closePath();
    }

    this.update = function () {
        const lastMouse = { x: this.x, y: this.y };
        this.lastMousePointer.x += (mouse.x - this.lastMousePointer.x) * 0.05;
        this.lastMousePointer.y += (mouse.y - this.lastMousePointer.y) * 0.05;
        this.radians += this.velocity;

        this.x = this.lastMousePointer.x + Math.cos(this.radians) * this.distance;
        this.y = this.lastMousePointer.y + Math.sin(this.radians) * this.distance;

        this.draw(lastMouse);
    }
}

let circleArr;

function init() {
    circleArr = [];

    for (let i = 0; i < 50; i++) {
        const radius = Math.random() * 2 + 1;

        circleArr.push(new Circle(canvas.width / 2, canvas.height / 2, radius, randomColor(colors)))
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < circleArr.length; i++) {
        circleArr[i].update()
    }
}

init();
animate();