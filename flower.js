const maxPollens = 10;
const spawnningDuration = 100;

class Flower {
    constructor(
        x,
        y,
        pistilSize,
        pistilColor,
        petalWidth,
        petalHeight,
        petalColor,
        petalNumber
    ) {
        this.x = x;
        this.y = y;
        this.pistilSize = pistilSize;
        this.pistilColor = pistilColor;
        this.petalWidth = petalWidth;
        this.petalHeight = petalHeight;
        this.petalColor = petalColor;
        this.petalNumber = petalNumber;
        this.hasPollen = false;
        this.numberOfPollens = maxPollens;
        this.spawnningTime = 0;
        this.angle = 0;

        // get bounding box of the flower contains both pistil and petals
        const radius = this.pistilSize + this.petalSize / 2;
        this.boundaries = {
            left: this.x - radius,
            right: this.x + radius,
            top: this.y - radius,
            bottom: this.y + radius,
        };
    }

    draw(isSelected) {
        // draw the leaves
        if (this.numberOfPollens > 0) {
            fill("#009900");
            const leafSize = this.pistilSize * 1.5;
            const leafAngle = PI / 4;
            for (let i = 0; i < 8; i++) {
                push();
                translate(this.x, this.y);
                rotate(leafAngle * i);
                rect(0, 0, leafSize, leafSize);
                pop();
            }
        }

        // draw the petals
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        const angle = TWO_PI / this.petalNumber;
        for (let i = 0; i < this.petalNumber; i++) {
            const x = cos(angle * i) * this.pistilSize;
            const y = sin(angle * i) * this.pistilSize;
            push();
            translate(x, y);
            rotate(angle * i);
            fill(this.petalColor);
            ellipse(0, 0, this.petalHeight, this.petalWidth);
            pop();
        }

        // draw the pistil
        fill(this.pistilColor);
        ellipse(0, 0, this.pistilSize, this.pistilSize);
        pop();

        // update pollen status
        if (!this.hasPollen) {
            this.spawnningTime += 1;
            this.angle = 0;
        } else {
            this.angle += 0.1;
        }

        if (this.spawnningTime > spawnningDuration) {
            this.hasPollen = true;
            this.spawnningTime = 0;
            this.numberOfPollens--;
            if (this.numberOfPollens <= 0) {
                this.pistilSize = 4;
                this.petalSize = 4;
            }
        }

        if (isSelected) {
            // draw the bounding box
            noFill();
            stroke("#000");
            const size =
                (this.pistilSize + this.petalHeight) * 2 +
                sinValues[Math.floor(frameCount * 0.1) % 360] * 5;
            ellipse(this.x, this.y, size, this.size);
        }
    }

    infoString() {
        return `Time to spawn: ${Math.max(
            spawnningDuration - this.spawnningTime,
            0
        )} / ${spawnningDuration}\nNumber of pollens left: ${Math.max(
            this.numberOfPollens,
            0
        )} / ${maxPollens}`;
    }

    drawIcon(ctx, x, y) {
        const pistilSize = this.pistilSize / 2;
        const petalSize = this.petalSize / 2;

        if (this.numberOfPollens > 0) {
            const leafSize = this.pistilSize * 1.5;
            const leafAngle = PI / 4;

            for (let i = 0; i < 8; i++) {
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(leafAngle * i);
                ctx.fillStyle = "#009900";
                ctx.fillRect(0, 0, leafSize, leafSize);
                ctx.restore();
            }
        }

        ctx.save();
        ctx.translate(x, y);

        ctx.fillStyle = this.petalColor;
        //draw the petals
        const angle = Math.PI * 2 / this.petalNumber;
        for (let i = 0; i < this.petalNumber; i++) {
            const x = Math.cos(angle * i) * this.pistilSize;
            const y = Math.sin(angle * i) * this.pistilSize;
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle * i);
            ctx.beginPath();
            ctx.ellipse(0, 0, this.petalHeight/2, this.petalWidth/2, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        }

        ctx.fillStyle = this.pistilColor;
        ctx.beginPath();
        ctx.arc(0, 0, pistilSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        ctx.restore();
    }
}
