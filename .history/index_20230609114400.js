const canvas = document.querySelector('#canvas');
const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

// Player class

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
		c.save();
		c.translate(
			this.position.x + this.width / 2,
			this.position.y + this.height / 2,
		);
		c.rotate(this.rotation);
		c.translate(
			-player.position.x - player.width / 2,
			-player.position.y - player.height / 2,
		);
		c.drawImage(
			this.image,
			this.position.x,
			this.position.y,
			this.width,
			this.height,
		);
		c.restore();
	}
	update() {
		if (this.image) {
			this.draw();
			this.position.x += this.velocity.x;
		}
	}
}
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
	constructor({ position }) {
		this.velocity = { x: 0, y: 0 };
		this.rotation = 0;
		const image = new Image();
		image.src = './assets/invader.png';
		image.onload = () => {
			this.width = image.width;
			this.image = image;
			this.height = image.height;
			this.position = {
				x: position.x,
				y: position.y,
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
	update({ velocity }) {
		if (this.image) {
			this.draw();
			this.position.x += velocity.x;
			this.position.y += velocity.y;
		}
	}
}

// Grid classes
class Grid {
	constructor() {
		this.position = { x: 0, y: 0 };
		this.velocity = { x: 3, y: 0 };
		this.invaders = [];

		const rows = Math.floor(Math.random() * 5 + 2);
		const cols = Math.floor(Math.random() * 10 + 5);
		this.width = cols * 30;
		for (let x = 0; x < cols; x++) {
			for (let y = 0; y < rows; y++) {
				this.invaders.push(
					new Invader({ position: { x: x * 30, y: y * 30 } }),
				);
			}
		}
		console.log(this.invaders);
	}
	update() {
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
		this.velocity.y = 0;
		if (
			this.position.x + this.width >= canvas.width ||
			this.position.x <= 0
		) {
			this.velocity.x = -this.velocity.x;
			this.velocity.y = 30;
		}
	}
}

const player = new Player();

const projectiles = [];
const keys = {
	a: { pressed: false },
	d: { pressed: false },
	' ': { pressed: false },
};
const grids = [];
let frames = 0;
let rand = Math.floor(Math.random() * 500 + 500);
function animate() {
	requestAnimationFrame(animate);
	c.fillStyle = 'black';
	c.fillRect(0, 0, canvas.width, canvas.height);

	player.update();

	projectiles.forEach((projectile, index) => {
		if (projectile.position.y + projectile.radius <= 0) {
			setTimeout(() => {
				projectiles.splice(index, 1);
			}, 0);
		} else {
			projectile.update();
		}
	});

	grids.forEach((grid, index) => {
		grid.update();
		grid.invaders.forEach((invader, index) => {
			invader.update({ velocity: grid.velocity });
			projectiles.forEach((projectile, j) => {
				if (
					//checks that the projectiles top part is below the invader top part
					projectile.position.y - projectile.radius <=
						invader.position.y + invader.height &&
					//
					// check that the bottom part of the projectile is below the invader
					projectile.position.x + projectile.radius >=
						// invader bottom part	//
						invader.position.x &&
					//
					projectile.position.x - projectile.radius <=
						invader.position.x + invader.width &&
					projectile.position.y + projectile.radius >=
						invader.position.y
				) {
					setTimeout(() => {
						const invaderfound = grid.invaders.find(
							(inv) => inv === invader,
						);
						const projfind = projectiles.find(
							(proj2) => proj2 === projectile,
						);
						if (invaderfound && projfind) {
							grid.invaders.splice(index, 1);
							projectiles.splice(j, 1);
						}
					}, 0);
				}
			});
		});
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

	if (frames % rand === 0) {
		rand = Math.floor(Math.random() * 500 + 500);
		grids.push(new Grid());
		frames = 0;
		console.log(rand);
	}
	frames++;
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
