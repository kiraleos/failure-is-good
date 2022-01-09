// TODO:
// 0) Bug: you can spam pause/unpause to get out of gameover screen
// 1) You should be able to restart after you collide. (replace noLoop())
// 2) Implement a "boost" mechanic.
//   -> Actual Mechanic
//   -> Boost UI bar
// 3) UI
//   -> Menu
//   -> Game Over screen
// 	 -> Music options 
// 4) Audio effects (howler.js)
// 5) Less randomness (add levels instead?)

const OBSTACLE_SPACING = 250
const OBSTACLE_ACCELERATION = 0.01
const HERO_SPEED = 5;
let OBSTACLE_SPEED = 5;
let h;
let score = 0;
let obstacles = [];
let obstacle_array_size = 6
let last_obstacle;
let obstacle_speed_flag = true
let song;
let pause_flag = true

function setup() {
	createCanvas(540, 960);
	song = loadSound('assets/music/so_what.mp3', () => {
		song.loop()
	})
	h = new Hero(width / 2 - 20, 100, 40, 40);
	for (var i = 0; i < obstacle_array_size; i++) {
		obstacles.push(new Obstacle(height + i * OBSTACLE_SPACING))
	}
}



function draw() {
	background(52)
	h.update()
	h.forces()
	h.display()
	for (var i = 0; i < obstacle_array_size; i++) {
		obstacles[i].simpleMove(createVector(0, -OBSTACLE_SPEED))
		obstacles[i].display()
		if (collides(h, obstacles[i])) {
			textSize(32)
			text('failure is good', width / 2, height / 2)
			noLoop()
		}
		score_increased(h)
	}

	if (obstacles[0].location.y <= - hero_h) {
		obstacles.splice(0, 1)
		obstacles.push(new Obstacle(obstacle_array_size * OBSTACLE_SPACING - hero_h))
	}

	if (obstacle_speed_flag) {
		OBSTACLE_SPEED -= -OBSTACLE_ACCELERATION
		obstacle_speed_flag = false
	}

	keypress_handler()
	textSize(32)
	fill(255)
	text(score.toString(), 20, 40)
}


function collides(hero, obstacle) {
	hero_x = hero.location.x
	hero_y = hero.location.y
	hero_w = hero.width
	hero_h = hero.height

	obs_width_1 = obstacle.width_1
	obs_width_2 = obstacle.width_2
	obs_y = obstacle.location.y
	obs_space = obstacle.space

	if (obs_y <= hero_y + hero_h && obs_y >= hero_y) {
		last_obstacle = obstacle // used for scoring
		if (hero_x <= obs_width_1 || hero_x + hero_w >= obs_width_1 + obs_space) {
			return true
		}
	}
	return false

}


function score_increased(hero) {
	if (last_obstacle != null && hero.location.y > last_obstacle.location.y) {
		score++
		last_obstacle = null
		obstacle_speed_flag = true
	}
}

function reset() {
	h = new Hero(width / 2 - 20, 100, 40, 40);
	obstacles = []
	for (var i = 0; i < obstacle_array_size; i++) {
		obstacles.push(new Obstacle(height + i * OBSTACLE_SPACING))
	}
	score = 0;
	obstacle_array_size = 6
	last_obstacle = null;
	obstacle_speed_flag = true
}

function keypress_handler() {
	if (keyIsDown(65)) { // 'A' LEFT
		left = createVector(-HERO_SPEED, 0)
		h.simpleMove(left)
		h.velocity = createVector(0, 0)
	}

	if (keyIsDown(68)) { // 'D' RIGHT
		right = createVector(HERO_SPEED, 0)
		h.simpleMove(right)
	}
	if (keyIsDown(83)) { // 'S' DOWN
		down = createVector(0, HERO_SPEED)
		h.simpleMove(down)
	}
	if (keyIsDown(87)) { // 'W' UP
		up = createVector(0, -HERO_SPEED)
		h.simpleMove(up)
	}
}

function keyPressed() {
	if (keyCode == 82) {
		reset()
		loop()
	}
	if (keyCode == 32) {
		if (pause_flag) {
			noLoop()
			pause_flag = false
		} else {
			loop()
			pause_flag = true
		}
	}
}



function randRange(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}