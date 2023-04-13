const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const minRadius = 4;
const maxRadius = 40;
const distance = 1;

const colors = [
    "#BFD7ED",
    "#60A3D9",
    "#0074B7",
    "#003B73",
    "#41729F",
    "#5885AF",
    "#274472",
    "#C3E0E5",
  ];  

const mouse = {
  x: null,
  y: null,
};

window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function Circle(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;

  this.update = function () {
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius += distance;
      }
    } else if (this.radius > minRadius) {
      this.radius -= distance;
    }

    this.draw();
  };

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  };
}

function init() {
  arrCircle = [];

  for (let i = 0; i < 500; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const dx = Math.round(Math.random() * 5);
    const dy = Math.round(Math.random() * 5);
    const radius = Math.random() * 40;
    const color = Math.round(Math.random() * colors.length)

    arrCircle.push(new Circle(x, y, dx, dy, radius, colors[color]));
  }
}

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);

  for (let i = 0; i < arrCircle.length; i++) {
    arrCircle[i].update();
  }
};

init();
animate();
