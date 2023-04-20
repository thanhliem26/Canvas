const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height
}

const distance = (x1, y1, rad1, x2, y2, rad2) => {
    return rad1 + rad2 >= Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 -y1, 2))
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
})

function Circle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;

  this.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  };

  this.update = function () {
    this.x = mouse.x;
    this.y = mouse.y;

    this.draw();
  };
}

const circle = new Circle(50, 100, 50, "blue");

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);

  const x = canvas.width / 2;
  const y = canvas.height / 2;
  const radius = 100;
  let color = "red";

  const innerCircle = distance(circle.x, circle.y, circle.radius, x, y, radius)
  if(innerCircle) color = "blue";

  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();

  circle.update();
};

animate();
