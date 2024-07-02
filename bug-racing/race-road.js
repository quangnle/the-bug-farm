class RaceRoad {
    constructor(x, y, raceLength, interval = 30) {
        this.x = x;
        this.y = y;
        this.raceLength = raceLength;
        this.interval = interval;

        this.counter = 0; 
        this.state = "ready";    
        this.bugs = [];
        this.ranks = [];
    }
    
    addBug(bug) {
        this.bugs.push(bug);
        // place the bug at the starting line
        bug.x = this.x;
        bug.y = this.y + this.bugs.length * 30;    
    }
    
    removeBug(bug) {
        this.bugs = this.bugs.filter(b => b !== bug);
    }    

    draw() {        
        const laneWidth = 30;
        const nLanes = this.bugs.length;

        // draw the lanes
        for (let i = 0; i < nLanes; i++) {
            stroke(0);
            strokeWeight(2);
            fill(255);
            rect(this.x, this.y + i * laneWidth, this.raceLength, laneWidth);
            strokeWeight(1);
        }
        
        // draw the final crossing line
        stroke(0);
        strokeWeight(2);
        line(this.x + this.raceLength, this.y, this.x + this.raceLength, this.y + nLanes * laneWidth);
        strokeWeight(1);
        
        // draw the final black white stripes
        for (let i = 0; i < nLanes; i++) {
            if (i % 2 === 0) {
                fill(0);
            } else {
                fill(255);
            }
            rect(this.x + this.raceLength, this.y + i * laneWidth, 10, laneWidth);
        }   
        
        // draw the starting line
        stroke(0);
        strokeWeight(2);
        line(this.x, this.y, this.x, this.y + nLanes * laneWidth);
        strokeWeight(1);

        if(this.state === "ready") {
            // place the bugs at the starting line
            this.bugs.forEach((bug, index) => {
                bug.x = this.x + 10;
                bug.y = this.y + index * laneWidth + laneWidth / 2;
            });

            // fill the array of ranks with zeroes
            this.ranks = Array(this.bugs.length).fill(0);
        } else {
            // move the bugs
            this.bugs.forEach(bug => bug.update());
        }
        
        // draw the bugs
        this.bugs.forEach(bug => bug.draw());

        if (this.counter % this.interval === 0) {   
            this.state = "running";        
            // calculate sum of rarity scores
            const sum = this.bugs.reduce((acc, bug) => acc + bug.rarityScore(), 0);                      
            // apply forces to the bugs
            this.bugs.forEach(bug => {
                bug.dx = 0;
                bug.dy = 0;
                if (bug.x >= this.x + this.raceLength) return;
                const force = Math.random() * (Math.log(bug.rarityScore())/Math.log(sum));
                bug.applyForce({x: force, y:0});
            });
        }

        // check if a bug has reached the finish line
        let currentRank = max(this.ranks) + 1;
        this.bugs.forEach(bug => {
            if (bug.x >= this.x + this.raceLength && this.ranks[this.bugs.indexOf(bug)] === 0){
                this.ranks[this.bugs.indexOf(bug)] = currentRank;
            }
        });

        // draw the ranks
        this.bugs.forEach((bug, index) => {
            fill(0);
            text("" + this.ranks[index], this.x + this.raceLength + 40, this.y + index * laneWidth + laneWidth / 2);
        });

        this.counter++;
    }
}  