export class Player {
	constructor(c) {
		this.c = c;
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
		this.c.save();
		this.c.translate(
			this.position.x + this.width / 2,
			this.position.y + this.height / 2,
		);
		this.c.rotate(this.rotation);
		this.c.translate(
			-player.position.x - player.width / 2,
			-player.position.y - player.height / 2,
		);
		this.c.drawImage(
			this.image,
			this.position.x,
			this.position.y,
			this.width,
			this.height,
		);
		this.c.restore();
	}
	update() {
		if (this.image) {
			this.draw();
			this.position.x += this.velocity.x;
		}
	}
}
