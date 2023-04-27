const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = ["#F1F6F9", "#394867", "#212A3E", "#9BA4B5", "#3C486B", "#F0F0F0", "#F9D949", "#F45050"];

const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();;
})

const getRandomColor = () => {
    const index = Math.floor(Math.random() * colors.length);

    return colors[index]
}

const destination = (x1, y1, rad1, x2, y2, rad2) => {
    return rad1 + rad2 >= Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function rotate(velocity, angle) {
    const rotateVelocity = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    }

    return rotateVelocity;
}

function resolveCollision(praticel, otherPraticel) {
    const xVelocityDiff = praticel.velocity.x - otherPraticel.velocity.x;
    const yVelocityDiff = praticel.velocity.y - otherPraticel.velocity.y;

    const xDist = otherPraticel.x - praticel.x;
    const yDist = otherPraticel.y - praticel.y;

    if(xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
        const angle = Math.atan2(yDist, xDist);

        const m1 = praticel.mass;
        const m2 = otherPraticel.mass;

        const u1 = rotate(praticel.velocity, -angle);
        const u2 = rotate(otherPraticel.velocity, -angle);

        const v1 = {x: (((m1 - m2) * u1.x) + 2 * m2 * u2.x / (m1 + m2)), y: u1.y};
        const v2 = {x: ((2 * m1 * u1.x + (m2 - m1) * u2.x)  / (m1 + m2)), y: u2.y};

        const v1Final = rotate(v1, angle);
        const v2Final = rotate(v2, angle);

        praticel.velocity.x =v1Final.x;
        praticel.velocity.y = v1Final.y;

        otherPraticel.velocity.x = v2Final.x;
        otherPraticel.velocity.y = v2Final.y;
    }
}

function Circle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.mass = 1;
    this.opacity = 0;
    this.velocity = {
        x: (Math.random() - 0.5) * 5,
        y: (Math.random() - 0.5) * 5,
    }

    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
        ctx.strokeStyle = this.color; 
        ctx.stroke()
    }

    this.update = function(arrCircle) {
        for(let i = 0; i < arrCircle.length; i++) {
            if(this === arrCircle[i]) continue;

            if(destination(this.x, this.y, this.radius, arrCircle[i].x, arrCircle[i].y, arrCircle[i].radius)) {
                resolveCollision(this, arrCircle[i])
            }
        }

        if(this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.velocity.x = -this.velocity.x;
        }

        if(this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.velocity.y = -this.velocity.y;
        }

        if(destination(mouse.x, mouse.y, 60, this.x, this.y, 60) && this.opacity < 1) {
            this.opacity += 0.02;
        } else if(this.opacity > 0) {
            this.opacity -= 0.02;

            this.opacity = Math.max(0, this.opacity)
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        this.draw();
    }
}

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) - 1 + min);
}

let arrCircle;

const init = () => {
    arrCircle = [];

    for(let i = 0; i < 200; i++) {
        let x = randomNumber(0, canvas.width);
        let y = randomNumber(0, canvas.height);
        let rad = 20;
        const color = getRandomColor();

        for(let j = 0; j < arrCircle.length; j++) {
           if(i === 0) break;

            if(destination(x, y, rad, arrCircle[j].x, arrCircle[j].y, arrCircle[j].radius)) {
                x = randomNumber(0, canvas.width);
                y = randomNumber(0, canvas.height);

                j = -1;
            }
        }
        
        arrCircle.push(new Circle(x, y, rad, color))
    }
}

const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
   
    for(let i = 0; i < arrCircle.length; i++) {
        arrCircle[i].update(arrCircle)
    }
    
}

init();
animate()