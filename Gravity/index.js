const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = ["#0A4D68", "088395", "#05BFDB", "#00FFCA", "#B9EDDD", "#87CBB9", "#569DAA", "#577D860"];

const randomNumber = (min, max) => {
    return Math.random() * (max - min + 1) + min;
}

const randomColor = () => {
    const indexColor = Math.floor(Math.random() * colors.length);

    return colors[indexColor];
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init()
})

function Circle(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = dx;
    this.dy = dy;

    this.maxY = y;

    this.draw = function() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    this.update = function() {
        if(this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if(this.y + this.radius > canvas.height) {
            this.dy = -this.dy * 0.9;
        } else {
            this.dy += 1;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw()
    }
}

let circleArr;
const init = () => {
    circleArr = [];

    for(let i = 0; i < 500; i++) {
        const x = randomNumber(0, canvas.width);
        const y = randomNumber(0, canvas.height);
        const dx = Math.round(Math.random() * 3);
        const dy = Math.round(Math.random() * 3);
        const radius = randomNumber(10, 50);
        const color = randomColor()

        circleArr.push(new Circle(x, y, dx, dy, radius, color))
    }
}

const animate = () =>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate)

   for(let i = 0; i < circleArr.length; i++) {
        circleArr[i].update()
   }
}

init()
animate()