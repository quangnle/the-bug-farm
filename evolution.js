class Evolution {
    constructor() {
    }

    static evolute(bug, newColor) {
        const newBug = new Bug(newColor, bug.x, bug.y, bug.size, bug.angle);
        // copy all the genes from the parent
        newBug.genes = [...bug.genes];

        // create a random value for mutation
        const randomValue = random(1);

        // proceed a chance for mutation
        if (randomValue < bug.mutationRate) {            
            const rp = Math.floor(random(patterns.length));
            const newPattern = patterns[rp];
            // add new pattern to the genes if it's not already there
            const existingPattern = newBug.genes.find(g => g.name === newPattern.name);
            if (!existingPattern) {
            newBug.genes.push(newPattern);                
            } else {
                // if the pattern is already in the genes, increase the score                 
                if (newPattern.name !== "default"){
                    existingPattern.score += newPattern.score;
                }                
            }
        }

        // calculate the total score of all genes
        const totalScore = newBug.genes.reduce((acc, g) => acc + g.score, 0);
        // create a new random value for evolution
        const r = random(totalScore);
        let s = 0;
        let selectedPattern = null;
        // select a pattern based on the score
        newBug.genes.forEach(g => {
            s += g.score;
            if (s >= r && selectedPattern === null) {
                selectedPattern = g;
            }
        });
        // if there is a selected pattern, set it as the current pattern
        if (selectedPattern !== null) {
            newBug.appearance = selectedPattern;
        }        

        return newBug;
    }
    
}