class Bug {
    constructor(color, x, y, size, angle) {
        this.color = color;
        this.size = size;
        this.angle = angle;

        // position
        this.x = x;
        this.y = y;

        // velocity
        this.dx = Math.cos(this.angle);
        this.dy = Math.sin(this.angle);
        // acceleration
        this.ax = 0;
        this.ay = 0;
        this.hunger = 100;
        this.mutationRate = 0.1;
        this.appearance = {
            name: "default",
            pattern: pattern_default,
            score: 90,
        };
        this.genes = [];
        this.foodSenseDistance = 250;
        // add the default pattern
        this.genes.push({
            name: "default",
            pattern: pattern_default,
            score: 90,
        });
        this.target = null;
    }

    getBoundingBox() {
        return {
            left: this.x - this.size / 2,
            right: this.x + this.size / 2,
            top: this.y - this.size / 2,
            bottom: this.y + this.size / 2,
        };
    }

    randomDirection(boundaries) {
        // split the region into 4 parts by the bug's position
        const topleft = {
            x1: boundaries.left,
            y1: boundaries.top,
            x2: this.x,
            y2: this.y,
        };
        const topright = {
            x1: this.x,
            y1: boundaries.top,
            x2: boundaries.right,
            y2: this.y,
        };
        const bottomleft = {
            x1: boundaries.left,
            y1: this.y,
            x2: this.x,
            y2: boundaries.bottom,
        };
        const bottomright = {
            x1: this.x,
            y1: this.y,
            x2: boundaries.right,
            y2: boundaries.bottom,
        };

        // calculate the surface of each region
        const surfaces = [topleft, topright, bottomleft, bottomright]
            .map((region) => {
                const dx = region.x2 - region.x1;
                const dy = region.y2 - region.y1;
                region.s = dx * dy;
                return region;
            })
            .sort((a, b) => a.s - b.s);

        // sum of surfaces
        const sumSurfaces =
            (boundaries.right - boundaries.left) *
            (boundaries.bottom - boundaries.top);
        // select a region based on the surface proportion
        const r = random(1) * sumSurfaces;
        let s = 0;
        let selectedRegion = null;
        surfaces.forEach((region) => {
            s += region.s;
            if (s >= r && selectedRegion === null) {
                selectedRegion = region;
            }
        });

        // choose a random point in the selected region
        const x = random(selectedRegion.x1, selectedRegion.x2);
        const y = random(selectedRegion.y1, selectedRegion.y2);

        //const d = min(dist(this.x, this.y, x, y), this.size * 10);
        //const angle = atan2(y - this.y, x - this.x);
        return { x, y };
    }

    findAvailableFood(foods) {
        return foods.find(
            (food) =>
                dist(this.x, this.y, food.x, food.y) < this.foodSenseDistance
        );
    }

    findATarget(boundaries, routes) {
        if (routes) {
            let routeIdx = routes.flowers.findIndex(
                (route) =>
                    route.x === this.target.x && route.y === this.target.y
            );
            if (routeIdx < 0) return routes.flowers[0];
            else {
                return routes.flowers[(routeIdx + 1) % routes.flowers.length];
            }
        } else {
            return this.randomDirection(boundaries);
        }
    }

    findDirection(foods, boundaries, routes) {
        const food = this.findAvailableFood(foods);
        if (this.hunger <= 0 && food && !routes) {
            this.target = food;
        }

        if (this.target == null)
            this.target = this.findATarget(boundaries, routes);
        else {
            const d = dist(this.x, this.y, this.target.x, this.target.y);
            if (d < 5) {
                this.target = this.findATarget(boundaries, routes);
            }
        }

        this.seek(this.target);
    }

    pushedBy(otherBug) {
        // calculate the angle between the two bugs
        const angle = atan2(this.y - otherBug.y, this.x - otherBug.x);
        // set this bug's position away from the other bug 1 time the size of the bug
        this.x += cos(angle);
        this.y += sin(angle);
    }

    applyForce(force) {
        this.ax += force.x;
        this.ay += force.y;
    }

    seek(target) {
        const desired = createVector(target.x - this.x, target.y - this.y);
        desired.setMag(1);
        const steer = createVector(desired.x - this.dx, desired.y - this.dy);
        steer.limit(0.01);
        this.applyForce(steer);
    }

    update() {
        // decrease the hungry counter
        this.hunger--;

        // apply acceleration to the velocity
        this.dx += this.ax;
        this.dy += this.ay;
        this.angle = atan2(this.dy, this.dx);

        // update position
        this.x += this.dx;
        this.y += this.dy;

        // reset acceleration
        this.ax = 0;
        this.ay = 0;
    }

    draw(isSelected) {
        push();
        // draw the bug
        translate(this.x, this.y);
        rotate(this.angle + PI / 2 + 0.1 * sinValues[Math.floor(frameCount * 0.1) % 360]);

        // draw the head
        fill(50);
        ellipse(0, this.size * -0.4, this.size * 0.5, this.size * 0.5);

        // draw two antennae on the head end with two dots
        stroke(0);
        line(
            -this.size * 0.0,
            this.size * -0.4,
            -this.size * 0.1,
            this.size * -0.8
        );
        line(
            this.size * 0.0,
            this.size * -0.4,
            this.size * 0.1,
            this.size * -0.8
        );
        ellipse(-this.size * 0.1, this.size * -0.8, 2, 2);
        ellipse(this.size * 0.1, this.size * -0.8, 2, 2);

        // draw 2 dots on the head to represent eyes
        stroke(255);
        point(-this.size * 0.1, -this.size * 0.6);
        point(this.size * 0.1, -this.size * 0.6);

        // draw the lower body
        stroke(0);
        fill(this.color);
        ellipse(0, 0, this.size, this.size);

        // draw the pattern
        stroke(0);
        //strokeWeight(1.5);
        for (let i = 0; i < this.appearance.pattern.length; i++) {
            for (let j = 0; j < this.appearance.pattern.length; j++) {
                if (
                    this.appearance.pattern[j][i] !== -1 &&
                    this.appearance.pattern[j][i] !== 0
                ) {
                    if (this.appearance.pattern[j][i][0] === "@") {
                        const red = parseInt(
                            this.appearance.pattern[j][i].substring(1, 3),
                            16
                        );
                        const green = parseInt(
                            this.appearance.pattern[j][i].substring(3, 5),
                            16
                        );
                        const blue = parseInt(
                            this.appearance.pattern[j][i].substring(5, 7),
                            16
                        );

                        stroke(
                            Math.floor(red * sinValues[Math.floor(frameCount * 0.1) % 360]),
                            Math.floor(green * sinValues[Math.floor(frameCount * 0.1) % 360]),
                            Math.floor(blue * sinValues[Math.floor(frameCount * 0.1) % 360])
                        );
                    } else {
                        if (pallete[this.appearance.pattern[j][i]]) {
                            stroke(pallete[this.appearance.pattern[j][i]]);
                        }
                    }
                    point(i - this.size / 2, j - this.size / 2);
                }
            }
        }

        //draw the shadow
        fill(0, 0, 0, 60);
        noStroke();
        ellipse(0, 0, this.size * 1.2, this.size * 1.2);

        pop();

        if (isSelected) {
            // draw the bounding box
            noFill();
            stroke("#000");
            const size = this.size * 1.5 + sinValues[Math.floor(frameCount * 0.1) % 360] * 5;
            ellipse(this.x, this.y, size, size);
        }
    }

    drawIcon(ctx, x, y) {
        const size = this.size / 2;

        ctx.save();
        ctx.translate(x, y);
        // draw the head
        ctx.fillStyle = "#333";
        ctx.beginPath();
        ctx.ellipse(
            0,
            2 * size * -0.4,
            size * 0.5,
            size * 0.5,
            0,
            0,
            Math.PI * 2
        );
        ctx.fill();

        //// draw two antennae on the head end with two dots
        ctx.strokeStyle = "#000";
        ctx.beginPath();
        ctx.moveTo(-size * 0.0, 2 * size * -0.4);
        ctx.lineTo(-size * 0.1, 2 * size * -0.8);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(size * 0.0, 2 * size * -0.4);
        ctx.lineTo(size * 0.1, 2 * size * -0.8);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(-size * 0.1, 2 * size * -0.8, 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(size * 0.1, 2 * size * -0.8, 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // draw 2 dots on the head to represent eyes
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(-size * 0.2, -2 * size * 0.6, 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(size * 0.2, -2 * size * 0.6, 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // draw the lower body
        ctx.strokeStyle = "#000";
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, size, size, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // draw the pattern
        ctx.strokeStyle = "#000";
        //ctx.strokeWeight = 1.5;
        for (let i = 0; i < this.appearance.pattern.length; i++) {
            for (let j = 0; j < this.appearance.pattern.length; j++) {
                if (
                    this.appearance.pattern[j][i] !== -1 &&
                    this.appearance.pattern[j][i] !== 0
                ) {
                    ctx.strokeStyle = this.appearance.pattern[j][i];
                    ctx.beginPath();
                    ctx.moveTo(i - size, j - size);
                    ctx.lineTo(i - size + 1, j - size + 1);
                    ctx.stroke();
                }
            }
        }
        ctx.restore();
    }

    // draw the pattern of the selected bug on the bug-color-canvas
    drawBugPatternCanvas(ctx, width, height) {
        ctx.clearRect(0, 0, width, height);
        let pattern = this.appearance.pattern;
        let size = 50 / pattern.length;
        for (let i = 0; i < pattern.length; i++) {
            for (let j = 0; j < pattern[i].length; j++) {
                if (pattern[i][j] === 0) {
                    ctx.fillStyle = this.color;
                } else {
                    ctx.fillStyle = "black";
                }
                ctx.fillRect(j * size, i * size, size, size);
            }
        }
    }

    rarityScore() {
        let score = 0;
        this.genes.forEach((g) => {
            // find the gene with the name of g in the patterns            
            const baseScore = patterns.find((p) => p.name === g.name).score;
            score += (91 - baseScore) ** 2 + (g.score - baseScore) ** 2;
        });

        const appScore = patterns.find(p => p.name === this.appearance.name).score;
        score += (91 - appScore)**3;
        return score;
    }

    infoString() {
        let info = `Rarity score: ${this.rarityScore()} \nAppearance: ${
            this.appearance.name
        } \n\nList of genes: \n--------------\n`;
        // total score
        const totalScore = this.genes.reduce((acc, g) => acc + g.score, 0);
        this.genes.forEach((g) => {
            info += `${g.name} : $(${Math.round(
                (g.score / totalScore) * 100
            )}%) \n`;
        });
        return info;
    }
}
