const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const destination = (x1, y1, rad1, x2, y2, rad2) => {
    return rad1 + rad2 >= Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function rotate(velocity, angle) {
    const rotatedVelocities = {
      x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
      y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    }
  
    return rotatedVelocities;
  }

function resolveCollision(particel, otherPartical) {
    const xVelocityDiff = particel.velocity.x - otherPartical.velocity.x;
    const yVelocityDiff = particel.velocity.y - otherPartical.velocity.y;
  
    const xDist = otherPartical.x - particel.x;
    const yDist = otherPartical.y - particel.y;
  
    if(xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
      const angle = -Math.atan2(otherPartical.y - particel.y, otherPartical.x - particel.x);
   
      const m1 = particel.mass;
      const m2 = otherPartical.mass;
  
      const u1 = rotate(particel.velocity, angle);
      const u2 = rotate(otherPartical.velocity, angle);
  
      const v1 = {x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y};
      const v2 = {x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y};
  
      const vFinal1 = rotate(v1, -angle);
      const vFinal2 = rotate(v2, -angle);
  
      particel.velocity.x =vFinal1.x;
      particel.velocity.y = vFinal1.y;
  
      otherPartical.velocity.x = vFinal2.x;
      otherPartical.velocity.y = vFinal2.y;
     }
}

function Circle(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.draw = function() {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke()
    }

    this.update = function(arrCircle) {

        this.draw(arrCircle);
    }
}

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) - 1 + min);
}

let arrCircle;

const init = () => {
    arrCircle = [];

    arrCircle.push(new Circle(500, 500, 2, 2, 100, 'red'))
    arrCircle.push(new Circle(600, 600, 2, 2, 100, 'red'))

    // for(let i = 0; i < 10; i++) {
    //     let x = randomNumber(0, canvas.width);
    //     let y = randomNumber(0, canvas.height);
    //     let dx = randomNumber(0, 3);
    //     let dy = randomNumber(0, 3);
    //     let rad = randomNumber(30, 50);

    //     for(let j = 0; j < arrCircle.length; j++) {
    //        if(i === 0) break;

    //         if(destination(x, y, rad, arrCircle[j].x, arrCircle[j].y, arrCircle[j].radius)) {
    //             x = randomNumber(0, canvas.width);
    //             y = randomNumber(0, canvas.height);
    //             dx = randomNumber(0, 3);
    //             dy = randomNumber(0, 3);
    //             rad = randomNumber(30, 50);

    //             j = -1;
    //         }
    //     }
        
    //     arrCircle.push(new Circle(x, y, dx, dy, rad, 'red'))
    // }
}

const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
   
    for(let i = 0; i < arrCircle.length; i++) {
        arrCircle[i].update()
    }

    // if(arrCircle.length == 2) {
    //     resolveCollision(arrCircle[0], arrCircle[1])
    // }
    
}

init();
animate()