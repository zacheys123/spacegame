const canvas = document.querySelector('#canvas');
const c = canvas.getc('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

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
		};
	}
	draw() {
		c.save();
		c.translate(
			player.position.x + player.width / 2,
			player.position.y + player.height / 2,
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

const player = new Player();
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
		case ' ':
			break;
	}
});
