const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

class Player {
	constructor() {
		this.position = { x: 200, y: 200 };
		this.velocity = { x: 0, y: 0 };

		const image = new Image();
		image.src = './assets/spaceship.png';
		image.onload = () => {
			this.width = image.width;
			this.height = image.height;
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
