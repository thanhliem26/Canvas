const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
})

function Square(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color =

  this.draw = function () {
    ctx.beginPath();
    // ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };

  this.update = function() {

    this.x = mouse.x - this.width / 2;
    this.y = mouse.y - this.width / 2;

    this.draw();
  }
}

const square = new Square(canvas.width / 2, canvas.height / 2, 100, 100);

const animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.fillRect(canvas.width / 2, canvas.height / 2, 200, 100);

  let color = "blue";

  if(mouse.x + 100 / 2 >= canvas.width / 2 && 
    canvas.width / 2 + 200 >= mouse.x - 50 &&
    mouse.y + 100 / 2 >= canvas.height / 2 &&
    canvas.height / 2 + 100 >= mouse.y - 50) {   
    color = "yellow"
  }

  ctx.fillStyle = color;
  square.update();
};

animate();
