const canvas = document.querySelector('#canvas');
const score = document.querySelector('#score');
const button = document.querySelector('.button');
const scoreboard = document.querySelector('#scoreboard');
const fullscore = document.querySelector('#fullscore');
const startboard = document.querySelector('#startboard');
const canv = document.querySelector('#canv');
const canvasbody = document.querySelector('#canvasbody');
const info = document.querySelector('#info');
const mybutton = document.querySelectorAll('button');
const c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 768;

let game = {
	over: false,
	active: true,
	score: false,
	start: false,
	begin: false,
};
let levels = {
	invaderspeed: 3,
	inv_projectile: 5,
};
button.addEventListener('click', restart);
// Player class
document.addEventListener('DOMContentLoaded', () => {
	parseInt(localStorage.setItem('score', 0), 10);
	canv.style.display = 'none';
	canvasbody.style.display = 'flex';
	startboard.style.display = 'block';
});
function restart() {
	localStorage.removeItem('score');
	setTimeout(() => {
		game.start = true;
		if (game.start) {
			window.location.reload();

			scoreboard.style.display = 'none';
		}
	}, 3000);
	info.textContent = 'Loading Game...';
}

addEventListener('keydown', ({ key }) => {
	if (key === 'Enter') {
		localStorage.removeItem('score');
		setTimeout(() => {
			game.start = true;
			if (game.start) {
				window.location.reload();

				scoreboard.style.display = 'none';
			}
		}, 3000);
		info.textContent = 'Loading Game...';
		console.log(key);
	}
});

mybutton.forEach((button) => {
	button.addEventListener('click', (e) => {
		switch (e.target.textContent) {
			case 'Easy':
				levels.invaderspeed = 3;
				levels.inv_projectile = 3;

				canv.style.display = 'block';

				startboard.style.display = 'none';
				canvasbody.style.display = 'flex';
				game.begin = true;
				break;
			case 'Intermediate':
				console.log('Intermediate');
				break;
			case 'Hard':
				break;
		}
	});
});

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
		this.opacity = 1;
	}
	draw() {
		c.save();
		c.globalAlpha = this.opacity;
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

// Invader Projectiles
class InvaderProjectile {
	constructor({ position, velocity }) {
		this.position = position;
		this.velocity = velocity;
		this.width = 3;
		this.height = 10;
	}
	draw() {
		c.fillStyle = 'white';
		c.fillRect(
			this.position.x,
			this.position.y,
			this.width,
			this.height,
		);
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
	shoot(invproj) {
		let val = 5;
		invproj.push(
			new InvaderProjectile({
				position: {
					x: this.position.x + this.width / 2,
					y: this.position.y + this.height,
				},
				velocity: {
					x: 0,
					y: val + Math.random() * val * levels.inv_projectile,
				},
			}),
		);
	}
}

// Grid classes
class Grid {
	constructor() {
		this.position = { x: 0, y: 0 };
		this.velocity = { x: levels.invaderspeed, y: 0 };
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

// Particle
class Particles {
	constructor({ position, velocity, radius, color, fades }) {
		this.position = position;
		this.velocity = velocity;
		this.radius = radius;
		this.color = color;
		this.opacity = 1;
		this.fades = fades;
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

		c.fill();
		c.fillStyle = this.color || 'red';

		c.save();
		c.globalAlpha = this.opacity;
		c.closePath();
		c.restore();
	}
	update() {
		this.draw();
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
		if (this.fades) this.opacity -= 0.01;
	}
}

const player = new Player();

const projectiles = [];
const invaderprojectiles = [];
const particles = [];
const keys = {
	a: { pressed: false },
	d: { pressed: false },
	' ': { pressed: false },
};
const grids = [];
let frames = 0;
let rand = Math.floor(Math.random() * 500 + 500);

let scoreEl = 0;
for (let i = 0; i < 100; i++) {
	particles.push(
		new Particles({
			position: {
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
			},
			velocity: {
				x: 0,

				y: 0.4,
			},
			radius: Math.random() * 2,
			color: 'white',
		}),
	);
}

const createparticles = ({
	object,
	color,
	rad,
	velx,
	vely,
	fades,
}) => {
	for (let i = 0; i < 15; i++) {
		particles.push(
			new Particles({
				position: {
					x: object.position.x + object.width / 2,
					y: object.position.y + object.height / 2,
				},
				velocity: {
					x: Math.random() - 0.5 * velx,

					y: (Math.random() - 0.5) * vely,
				},
				radius: Math.random() * rad,
				color: color,
				fades,
			}),
		);
	}
};

function animate() {
	if (game.active && game.begin) {
		requestAnimationFrame(animate);
		c.fillStyle = 'black';
		c.fillRect(0, 0, canvas.width, canvas.height);

		player.update();
		particles.forEach((particle, ind) => {
			if (particle.position.y - particle.radius >= canvas.height) {
				particle.position.x = Math.random() * canvas.width;
				particle.position.y = particle.radius;
			}
			if (particle.opacity <= 0) {
				setTimeout(() => {
					particles.splice(ind, 1);
				}, 30);
			}
			particle.update();
		});
		invaderprojectiles.forEach((invaderprojectile, ind) => {
			// projectiles.forEach((projectile, id) => {
			if (
				invaderprojectile.position.y + invaderprojectile.height >=
				canvas.height
			) {
				setTimeout(() => {
					invaderprojectiles.splice(ind, 1);
				}, 0);
			} else {
				invaderprojectile.update();
			}
			if (
				// bottom of projectile is greater than the top of player
				invaderprojectile.position.y + invaderprojectile.height >=
					player.position.y &&
				// right side of projectile is greater than left side of player
				invaderprojectile.position.x + invaderprojectile.width >=
					player.position.x &&
				// left side of projectile is greater than right side of player
				invaderprojectile.position.x <=
					player.position.x + player.width
			) {
				setTimeout(() => {
					invaderprojectiles.splice(ind, 1);
					player.opacity = 0;
					game.over = true;
				}, 0);
				setTimeout(() => {
					game.score = true;

					if (game.score) {
						scoreboard.style.display = 'flex';
						canvas.style.display = 'none';

						const scorestorage = JSON.parse(
							localStorage.getItem('newrecord'),
						);
						if (parseInt(scoreEl) > scorestorage) {
							localStorage.setItem('newrecord', parseInt(scoreEl));
							fullscore.textContent =
								'New Record Set ' + parseInt(scoreEl);
						} else {
							localStorage.setItem('score', parseInt(scoreEl));
							fullscore.textContent = scoreEl;
						}
					}
				}, 4000);
				setTimeout(() => {
					game.active = false;
				}, 2000);
				createparticles({
					object: player,
					color: 'yellowgreen',
					rad: 5,
					velx: 5,
					vely: 5,
					fades: true,
				});
			}
		});
		// });
		projectiles.forEach((projectile, index) => {
			if (projectile.position.y + projectile.radius <= 0) {
				setTimeout(() => {
					projectiles.splice(index, 1);
				}, 0);
			} else {
				projectile.update();
			}
		});

		// remove invader and projectile
		grids.forEach((grid, gridindex) => {
			grid.update();

			// spawning new invader projectiles
			if (frames % 100 === 0 && grid.invaders.length > 0) {
				grid.invaders[
					Math.floor(Math.random() * grid.invaders.length)
				].shoot(invaderprojectiles);
			}
			grid.invaders.forEach((invader, index) => {
				invader.update({ velocity: grid.velocity });
				projectiles.forEach((projectile, j) => {
					if (
						//checks that the projectiles top part is below the invader top part

						// top of projectile
						//
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
								scoreEl += 100;
								score.innerHTML = scoreEl;
								createparticles({
									object: invader,
									color: '#BAA0DE',
									rad: 3,
									velx: 2,
									vely: 2,
									fades: true,
								});
								grid.invaders.splice(index, 1);
								projectiles.splice(j, 1);
								if (grid.invaders.length > 0) {
									const firstinvader = grid.invaders[0];
									const lastinvader =
										grid.invaders[grid.invaders.length - 1];
									grid.width =
										lastinvader.position.x -
										firstinvader.position.x +
										lastinvader.width;
									grid.position.x = firstinvader.position.x;
								} else {
									grid.invaders.splice(gridindex, 1);
								}
							}
						}, 0);
					}
				});
			});
		});
		player.rotation = 0;
		if (keys.a.pressed && player.position.x >= 0) {
			player.rotation = -0.15;
			player.velocity.x = -12;
		} else if (
			keys.d.pressed &&
			player.position.x + player.width <= canvas.width
		) {
			player.rotation = 0.15;

			player.velocity.x = 12;
		} else {
			player.velocity.x = 0;
		}

		// spawning enemies(creating new enemies after frames)
		if (frames % rand === 0) {
			rand = Math.floor(Math.random() * 500 + 500);
			grids.push(new Grid());
			frames = 0;
			console.log(rand);
		}

		frames++;
	} else {
		return;
	}
}

animate();
addEventListener('keydown', ({ key }) => {
	if (game.over) return;
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
					velocity: { x: 0, y: -20 },
				}),
			);
			console.log(projectiles);
			break;
	}
});
addEventListener('keyup', ({ key }) => {
	if (game.over) return;
	switch (key) {
		case 'a':
			keys.a.pressed = false;
			break;
		case 'd':
			keys.d.pressed = false;
			break;

		case ' ':
			projectiles.push(
				new Projectiles({
					position: {
						x: player.position.x + player.width / 2,
						y: player.position.y,
					},
					velocity: { x: 0, y: -20 },
				}),
			);
			console.log(projectiles);
			break;
	}
});

/*   
// when projectiles are circles

projectile.position.y = middle of projectile
{
A= projectile.position.y - projectile.radius == top of projectile

B= invader.position.y + invader.height === bottom of invader

REMOVE INVADER WHEN 
A <= B
},

{
A=projectile.position.x + projectile.radius==projectiles left side
B=invader.position.x==left side of enemy/invader

REMOVE INVADER WHEN 
A >= B
}
A=projectile.position.x - projectile.radius==projectiles right side
B=invader.position.x==left side of enemy/invader

REMOVE INVADER WHEN 
A <= B

A=projectile.position.y + projectile.radius==projectiles bottom side
B=invader.position.y==bottom side of enemy/invader

REMOVE INVADER WHEN 
A <= B


// Getting the middle of a player

player.position.x == left side

player.position.x + player.width == right side of a player
player.position.x + player.width / 2 == middle of a player
*/
