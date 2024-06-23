class Evolution {
    constructor() {
    }

    /*
    * @param bug: the bug to evolute
    * @param newColor: the new color of the bug
    * @returns a new bug
    * 
    * Main flow of the evolute method:
    * Create a new bug class called newBug with the provided newColor, and copy the x, y, size, and angle properties from the parent bug.
    * Copy all the genes from the parent bug to the newBug.
    * Generate a random value between 0 and 1 to determine whether a mutation should occur.
    * Check if the random value is less than the mutationRate property of the bug. If it is, proceed with the mutation logic.
    * Generate a random index (rp) to select a pattern from the patterns array.
    * Retrieve the pattern at the randomly selected index from the patterns array and assign it to the newPattern variable.
    * Check if the newPattern is not already present in the newBug's genes. If it is not present, add the newPattern to the newBug's genes.
    * If the newPattern is already present in the newBug's genes, check if its name is not equal to "default". 
    * If it's not equal to "default", increase the score property of the existing pattern in the newBug's genes by the score of the newPattern.
    * Calculate the total score of all the genes in the newBug by using the reduce method on the genes array. This is done by summing up the score property of each gene.
    * Generate a new random value (r) between 0 and the totalScore calculated in the previous step.
    * Initialize variables s and selectedPattern to keep track of the accumulated score and the selected pattern, respectively.
    * Iterate over each gene in the newBug's genes. For each gene, add its score to s. If s is greater than or equal to r and selectedPattern is still null, assign the current gene to selectedPattern.
    * If a selectedPattern is found (i.e., it is not null), assign it to the appearance property of the newBug.
    * Finally, return the newBug with potentially mutated genes.
    * 
    */
    static evolute(bug, newColor) {
        const newBug = new Bug(newColor, bug.x, bug.y, bug.size, bug.angle);
        // copy all the genes from the parent
        newBug.genes = [patterns[0]];
        // calculate the total score of all genes of the parent
        const totalScoreParent = bug.genes.reduce((acc, g) => acc + g.score, 0);  

        // select a gene based on the score
        bug.genes.forEach( g => {
            // check if the gene is selected in the new bug
            const r = random(totalScoreParent);
            if (r < g.score && g.name !== "default") {
                // add the gene to the new bug
                newBug.genes.push({...g});
            }
        });

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