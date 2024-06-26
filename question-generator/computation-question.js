class ComputationQuestion {
    constructor(speller) {
        this.speller = speller;
    }

    generateRaw(nDummies = 3) {
        let a = Math.floor(Math.random() * 11);
        let b = Math.floor(Math.random() * 11);
        let ops = ["+", "-", "*"];
        let op = ops[Math.floor(Math.random() * ops.length)];
        let result = 0;
        switch (op) {
            case "+":
                result = a + b;
                break;
            case "-":
                result = a - b;
                break;
            case "*":
                result = a * b;
                break;
        }
        let dummyResults = [result];

        while (dummyResults.length < nDummies) {
            const dummy = result + Math.floor(Math.random() * (3 * nDummies));
            console.log(dummy, result);
            if (dummy !== result && !dummyResults.includes(dummy)) {
                dummyResults.push(dummy);
            }
        }

        //shuffle dummy results
        for (let i = dummyResults.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [dummyResults[i], dummyResults[j]] = [
                dummyResults[j],
                dummyResults[i],
            ];
        }

        return [a, b, op, result, dummyResults];
    }

    generateQuestion() {
        let [a, b, op, result, dummyResults] = this.generateRaw();
        let question = `${this.speller.spell(a)} ${this.speller.spell(
            op
        )} ${this.speller.spell(b)} ${this.speller.spell("isEqualTo")}`;
        return [question, result, dummyResults];
    }
}
