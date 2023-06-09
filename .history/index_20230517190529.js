const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

class Player {
	constructor() {
		this.position = { x: 200, y: 200 };
		this.velocity = { x: 0, y: 0 };
		this.width = 100;
		this.height = 100;
	}
	draw() {
		c.fillStyle = 'red';
		c.fillRect(
			this.position.x,
			this.position.y,
			this.width,
			this.height,
		);
	}
}
