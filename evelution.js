class Evolution {
    constructor() {
    }

    static randomColor(){
        const r = Math.floor(random(256)).toString(16).padStart(2, '0');
        const g = Math.floor(random(256)).toString(16).padStart(2, '0');
        const b = Math.floor(random(256)).toString(16).padStart(2, '0');
        return `#${r}${g}${b}`;
    }

    static evolute(ant) {
        const newAnt = new Ant(ant.color, ant.x, ant.y, ant.size, ant.angle);
        const randomValue = random(1);

        // proceed a chance for mutation
        if (randomValue < ant.mutationRate) {            
            newAnt.color = this.randomColor();
            const rp = Math.floor(random(patterns.length));
            const newPattern = patterns[rp];
            // add new pattern to the genes if it's not already there
            if (!newAnt.genes.find(g => g.name === newPattern.name)) {
                if (newPattern.name !== "default") newAnt.genes.push(newPattern);                
            } else {
                // if the pattern is already in the genes, increase the score
                newAnt.genes.find(g => g.name === newPattern.name).score += newPattern.score;
            }
        }

        // calculate the total score of all genes
        const totalScore = newAnt.genes.reduce((acc, g) => acc + g.score, 0);
        // create a new random value for evolution
        const r = random(totalScore);
        let s = 0;
        let selectedPattern = null;
        // select a pattern based on the score
        newAnt.genes.forEach(g => {
            s += g.score;
            if (s >= r && selectedPattern === null) {
                selectedPattern = g;
            }
        });
        // if there is a selected pattern, set it as the current pattern
        if (selectedPattern !== null) {
            newAnt.pattern = selectedPattern.pattern;
        }        

        return newAnt;
    }
    
}