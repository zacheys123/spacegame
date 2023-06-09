const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

class Player {
	constructor() {
		this.position = { x: canvas.width / 2 - this.width / 2, y: 200 };
		this.velocity = { x: 0, y: 0 };

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
		if (this.image)
			context.drawImage(
				this.image,
				this.position.x,
				this.position.y,
				this.width,
				this.height,
			);
	}
}
const player = new Player();
function animate() {
	requestAnimationFrame(animate);
	context.fillStyle = 'black';
	context.fillRect(0, 0, canvas.width, canvas.height);

	player.draw();
}
animate();