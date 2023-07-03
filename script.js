const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function getRandomInt(min, max) {
	return Math.round(Math.random() * (max - min)) + min;
}

class Particle {
	constructor() {
		this.speed = 3;
		this.maxDistance = Math.round((canvas.width + canvas.height) * 0.018);
		this.hue = 0;
		this.reset();
	}

	reset() {
		this.x = Math.round(canvas.width * 0.5);
		this.y = Math.round(canvas.height * 0.5);
		this.sx = this.x;
		this.sy = this.y;
		this.angle = 60 * getRandomInt(0, 5);
		this.size = 1;
		this.radian = (Math.PI / 180) * (this.angle + 90);
		this.time = 0;
		this.ttl = getRandomInt(180, 300);
		this.hue = (this.hue + getRandomInt(0, 12)) % 360;
	}

	draw() {
		ctx.save();
		ctx.beginPath();		
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
		ctx.shadowColor = `hsl(${this.hue}, 100%, 50%)`;
		ctx.shadowBlur = 5;
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	}

	update() {
		let dx = this.sx - this.x;
		let dy = this.sy - this.y;
		let distance = Math.sqrt(dx * dx + dy * dy);

		if (distance >= this.maxDistance) {
			if (getRandomInt(0, 1)) {
				this.angle += 60;
			} else {
				this.angle -= 60;
			}

			this.radian = (Math.PI / 180) * (this.angle + 90);
			this.sx = this.x;
			this.sy = this.y; 
		}

		this.x += this.speed * Math.sin(this.radian);
		this.y += this.speed * Math.cos(this.radian);
		
		if (this.time >= this.ttl || this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
			this.reset();
		}

		this.time++;
	}
} 

class init {
  constructor() {
	this.animate = this.animate.bind(this);
    	this.units = [];
    	this.unitCount = Math.floor(canvas.width * 0.72);
	
    	this.createUnits();
    	this.resize();
    	this.animate();
  }

  createUnits() {
	for (let i = 0; i < this.unitCount; i++) {
		setTimeout(() => {
			this.units.push(new Particle());
		}, i * 300);
	}
  }

  resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
	ctx.fillStyle = "#222";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  animate() {
	ctx.fillStyle = "rgba(0, 0, 0, .05)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	for (let i = 0; i < this.units.length; i++) {
		this.units[i].update();
		this.units[i].draw();
	}

	requestAnimationFrame(this.animate);
  }
}

const animation = new init();

window.addEventListener('resize',
  function () {
    animation.resize();
})
