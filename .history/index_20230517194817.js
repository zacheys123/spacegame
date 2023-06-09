const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

class Player {
	constructor() {
		this.velocity = { x: 0, y: 0 };

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
		context.drawImage(
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
	context.fillStyle = 'black';
	context.fillRect(0, 0, canvas.width, canvas.height);

	player.update();
}
animate();
addEventListener('keydown', ({ key }) => {
	switch (key) {
		case 'a':
			player.velocity.x = -5;
			break;
		case 'd':
			player.velocity.x = -5;
			break;
		case ' ':
			console.log('space  ');
			break;
	}
});
