const canvas = document.querySelector('#canvas');
const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

// Projectiles
class Projectiles {
	constructor({ position, velocity }) {
		this.position = position;
		this.velocity = velocity;
		this.radius = 3;
	}
	draw() {
		c.beginPath();
		c.arc(
			this.position.x,
			this.position.y,
			this.radius,
			0,
			Math.PI * 2,
		);
		c.fillStyle = 'red';
		c.fill();
		c.closePath();
	}
	update() {
		this.draw();
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
	}
}

// invader class
class Invader {
	constructor() {
		this.velocity = { x: 0, y: 0 };
		this.rotation = 0;
		const image = new Image();
		image.src = './assets/invader.png';
		image.onload = () => {
			this.width = image.width;
			this.image = image;
			this.height = image.height;
			this.position = {
				x: canvas.width / 2 - this.width / 2,
				y: canvas.height / 2,
			};
		};
	}
	draw() {
		c.drawImage(
			this.image,
			this.position.x,
			this.position.y,
			this.width,
			this.height,
		);
	}
	update() {
		if (this.image) {
			this.draw();
			this.position.x += this.velocity.x;
			this.position.y += this.velocity.y;
		}
	}
}
class Player {
	constructor() {
		this.velocity = { x: 0, y: 0 };
		this.rotation = 0;
		const image = new Image();
		image.src = './assets/spaceship.png';
		image.onload = () => {
			const scale = 0.15;

			this.width = image.width * scale;
			this.height = image.height * scale;

			this.image = image;
			this.position = {
				x: canvas.width / 2 - this.width / 2,
				y: canvas.height - this.height - 20,
			};
		};
	}
	draw() {
		this.save();
		this.translate(
			this.position.x + this.width / 2,
			this.position.y + this.height / 2,
		);
		thi.rotate(this.rotation);
		this.translate(
			-player.position.x - player.width / 2,
			-player.position.y - player.height / 2,
		);
		this.drawImage(
			this.image,
			this.position.x,
			this.position.y,
			this.width,
			this.height,
		);
		this.restore();
	}
	update() {
		if (this.image) {
			this.draw();
			this.position.x += this.velocity.x;
		}
	}
}

const player = new Player();
const invader = new Invader();
const projectiles = [];
const keys = {
	a: { pressed: false },
	d: { pressed: false },
	' ': { pressed: false },
};
function animate() {
	requestAnimationFrame(animate);
	c.fillStyle = 'black';
	c.fillRect(0, 0, canvas.width, canvas.height);

	player.update();
	invader.update();

	projectiles.forEach((projectile, index) => {
		if (projectile.position.y + projectile.radius <= 0) {
			setTimeout(() => {
				projectiles.splice(index, 1);
			}, 0);
		} else {
			projectile.update();
		}
	});
	player.rotation = 0;
	if (keys.a.pressed && player.position.x >= 0) {
		player.rotation = -0.15;
		player.velocity.x = -10;
	} else if (
		keys.d.pressed &&
		player.position.x + player.width <= canvas.width
	) {
		player.rotation = 0.15;

		player.velocity.x = 10;
	} else {
		player.velocity.x = 0;
	}
}

animate();
addEventListener('keydown', ({ key }) => {
	switch (key) {
		case 'a':
			keys.a.pressed = true;
			break;
		case 'd':
			keys.d.pressed = true;
			break;
		case ' ':
			projectiles.push(
				new Projectiles({
					position: {
						x: player.position.x + player.width / 2,
						y: player.position.y,
					},
					velocity: { x: 0, y: -15 },
				}),
			);
			console.log(projectiles);
			break;
	}
});
addEventListener('keyup', ({ key }) => {
	switch (key) {
		case 'a':
			keys.a.pressed = false;
			break;
		case 'd':
			keys.d.pressed = false;
			break;
	}
});
