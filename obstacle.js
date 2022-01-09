class Obstacle {

    constructor(h) {
        this.location = createVector(0, h)
        this.velocity = createVector(0, 0)
        this.acceleration = createVector(0, 0)

        this.height = 20
        this.space = 100
        this.width_1 = randRange(20, width - this.space)
        this.width_2 = width - this.width_1
    }

    display() {
        // noStroke()
        fill(255, 99, 71)
        rect(0, this.location.y, this.width_1, this.height)
        rect(this.width_1 + this.space, this.location.y, this.width_2, this.height)
    }


    simpleMove(vector) {
        this.location.add(vector)
    }


    /* not used */
    update() {
        this.velocity.add(this.acceleration)
        this.location.add(this.velocity)
        this.acceleration.mult(0)

        this.velocity.limit(100)
    }
    applyForce(force) {
        this.acceleration.add(force)
    }

}