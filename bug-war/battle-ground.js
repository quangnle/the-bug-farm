class BattleGround {
    constructor(x, y, width, height, nTroops){ 
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;       
        this.nTroops = nTroops;
        
        const stepSize = this.width / (nTroops + 1);
        this.startpos1 = [];
        this.startpos2 = [];
        // init start positions of bugs
        for (let i = 0; i < nTroops; i++) {
            this.startpos1.push(createVector(stepSize * (i + 1), 20));
            this.startpos2.push(createVector(stepSize * (i + 1), this.height - 20));
        }

        this.team1 = [];
        this.team2 = [];

        this.collideEffects = [];
    }

    addBug(bug, team = 1) {
        if (team === 1) {
            this.team1.push(bug);
            bug.x = this.startpos1[this.team1.length - 1].x;
            bug.y = this.startpos1[this.team1.length - 1].y;
        } else {
            this.team2.push(bug);
            bug.x = this.startpos2[this.team2.length - 1].x;
            bug.y = this.startpos2[this.team2.length - 1].y;
        }
    }

    initTargets(){
        for (let i = 0; i < this.team1.length; i++) {
            if (this.team2.length > 0) {
                const randomBug = this.team2[MTRNG.nextInt(this.team2.length)];
                this.team1[i].target = randomBug;
            }
        }

        for (let i = 0; i < this.team2.length; i++) {
            if (this.team1.length > 0) {
                const randomBug = this.team1[MTRNG.nextInt(this.team1.length)];
                this.team2[i].target = randomBug;
            }
        }
    }

    battleProcess() {
        const battles = [];

        // combine all bugs in team1 and team2 to check collision and overlapping
        const allBugs = [...this.team1, ...this.team2];
        for (let i = 0; i < allBugs.length; i++) {
            for (let j = i + 1; j < allBugs.length; j++) {
                const d = dist(allBugs[i].x, allBugs[i].y, allBugs[j].x, allBugs[j].y);
                const collideDist = allBugs[i].size / 2 + allBugs[j].size / 2;
                if (d < collideDist) {
                    if (allBugs[i].color !== allBugs[j].color) {
                        battles.push([allBugs[i], allBugs[j]]);
                    }
                    // adjust the position of the bugs to avoid overlapping
                    const diff = p5.Vector.sub(createVector(allBugs[j].x, allBugs[j].y), createVector(allBugs[i].x, allBugs[i].y));
                    diff.setMag(3);
                    allBugs[i].x -= diff.x;
                    allBugs[i].y -= diff.y;
                    allBugs[j].x += diff.x;
                    allBugs[j].y += diff.y;
                }
            }
        }

        for (let i = 0; i < battles.length; i++) {
            const bug1 = battles[i][0];
            const bug2 = battles[i][1];
            if (bug1.target === bug2) {
                bug2.hpLeft -= (0.5 + MTRNG.nextFloat()) * (bug1.atk/(bug2.def + 1));
                this.collideEffects.push(new CollideEffect(bug2.x, bug2.y, bugSize/2, bug2.color));
            }
            if (bug2.target === bug1) {
                bug1.hpLeft -= (0.5 + MTRNG.nextFloat()) * (bug2.atk/(bug1.def + 1));                
                this.collideEffects.push(new CollideEffect(bug1.x, bug1.y, bugSize/2, bug1.color));
            }
        }

        this.team1 = this.team1.filter(bug => bug.hpLeft > 0);
        this.team2 = this.team2.filter(bug => bug.hpLeft > 0);
    }

    draw(){
        this.battleProcess();

        push();
        translate(this.x, this.y);

        if (this.team1.length == 0 && this.team2.length == 0) {
            return;
        } else if (this.team1.length == 0) {
            // set all bugs in team2 to stop
            this.team2.forEach(bug => {
                bug.velocity = createVector(0, 0)
                bug.draw();
            });
        } 
        else if (this.team2.length == 0) {
            // set all bugs in team1 to stop
            this.team1.forEach(bug => {
                bug.velocity = createVector(0, 0)
                bug.draw();
            });
        } else {
            this.team1.forEach(bug => {
                if (bug.target === null || bug.target.hpLeft <= 0) {
                    bug.target = this.team2[MTRNG.nextInt(this.team2.length)];
                }
                bug.seek(bug.target);
                bug.update();
                bug.draw();
            });

            this.team2.forEach(bug => {
                if (bug.target === null || bug.target.hpLeft <= 0) {
                    bug.target = this.team1[MTRNG.nextInt(this.team1.length)];
                }
                bug.seek(bug.target);
                bug.update();
                bug.draw();
            });
        }

        pop();

        // draw collide effects
        this.collideEffects.forEach(effect => {
            effect.update();
            effect.draw();
        });

        this.collideEffects = this.collideEffects.filter(effect => effect.alpha > 0);
    }
}