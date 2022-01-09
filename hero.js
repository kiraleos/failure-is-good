class Hero {

    constructor(x, y, width, height) {
        this.location = createVector(x, y)
        this.velocity = createVector(0, 0)
        this.acceleration = createVector(0, 0)

        this.width = width
        this.height = height
    }

    display() {
        // noStroke()
        fill(99, 255, 71)
        rect(this.location.x, this.location.y, this.width, this.height)
    }

    applyForce(force) {
        this.acceleration.add(force)
    }

    simpleMove(vector) {
        this.location.add(vector)
    }

    update() {
        this.velocity.add(this.acceleration)
        this.location.add(this.velocity)
        this.acceleration.mult(0)

        this.velocity.limit(100)
    }


    forces() {

        let delta = 0.1

        // Handle display edges
        if (this.location.x > width - this.width + delta || this.location.x > width - this.width - delta) { // RIGHT
            this.location.x = width - this.width
            this.velocity.x *= -0.5
        }
        if (this.location.y > height - this.height + delta || this.location.y > height - this.height - delta) { // ΒΟΤΤΟΜ
            this.location.y = height - this.height
            this.velocity.y *= -0.5
        }
        if (this.location.x < 0 + delta || this.location.x < 0 - delta) { // LEFT
            this.location.x = 0
            this.velocity.x *= -0.5
        }
        if (this.location.y < 0 + delta || this.location.y < 0 - delta) { // TOP
            this.location.y = 0
            this.velocity.y *= -0.5
        }

        // Gravity
        // let gravity = createVector(0, 0.5)
        // this.applyForce(gravity)

        // Counteracting forces
        // if (abs(this.velocity.x) > 0 || abs(this.velocity.y) > 0) {
        //     let drag_coef = 0.001
        //     let friction_coef = 0.05
        //     let friction = createVector(-this.velocity.x * friction_coef, 0)
        //     let drag = createVector(0, -this.velocity.y * drag_coef)
        //     this.applyForce(friction)
        //     this.applyForce(drag)
        // }
    }

    reset() {
        this.location = createVector(width / 2 - 20, 100)
        this.velocity = createVector(0, 0)
        this.acceleration = createVector(0, 0)
    }
}