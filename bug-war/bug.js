class Bug {
    constructor(color, x, y, size = 20, angle = 0) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.size = size;
        this.angle = angle;
        this.speed = 1;
        this.velocity = createVector(cos(this.angle) * this.speed, sin(this.angle) * this.speed);
        this.acceleration = createVector(0, 0);
        this.target = null;

        // equipments and attributes
        this.horn = null;
        this.armor = null;        
        this.level = -1;
        this.levelUp();
    }    

    addHorn(horn) {
        this.horn = horn;
    }

    addArmor(armor) {
        this.armor = armor;
    }

    levelUp() {
        this.level++;
        this.hp = TroopLevels[this.level].hp;
        this.hpLeft = TroopLevels[this.level].hp;
        this.atk = TroopLevels[this.level].atk;
        this.def = TroopLevels[this.level].def;
    }

    update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.speed);
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.angle = this.velocity.heading();
        this.acceleration.mult(0);
    } 

    addForce(force) {
        this.acceleration.add(force);
    }

    seek(target) {
        const desired = p5.Vector.sub(createVector(target.x, target.y), createVector(this.x, this.y));
        desired.setMag(this.speed);
        const steer = p5.Vector.sub(desired, this.velocity);
        this.addForce(steer.mult(0.1));        
    }

    draw() {
        push();
        
        translate(this.x, this.y);
        rotate(this.angle);

        // draw head
        fill(0);
        ellipse(this.size >> 1, 0, this.size >> 1, this.size >> 1);

        // draw eyes
        fill("#f00");
        ellipse((this.size >> 1) + (this.size >> 3), -this.size >> 3, 3, 3);
        ellipse((this.size >> 1) + (this.size >> 3), this.size >> 3, 3, 3);

        // draw body
        fill(this.color);
        ellipse(0, 0, this.size, this.size);
        line(-this.size >> 1, 0, this.size >> 1, 0);

        // draw hp bar
        fill(0);
        rect((-this.size >> 1) - 5, -this.size >> 1, 3, this.size);
        fill("#f00");
        rect((-this.size >> 1) - 5, -this.size >> 1, 3, this.size * this.hpLeft / this.hp);

        // draw horn
        push();
        translate(this.size>>1, 0);
        if (this.horn != null) {
            this.horn.draw();
        }
        pop();

        // // draw a line to target
        // if (this.target != null) {
        //     stroke(0);
        //     line(0, 0, this.target.x - this.x, this.target.y - this.y);
        // }
        
        pop();        

    }
}