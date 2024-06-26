class CompareQuestion {
    constructor(speller) {
        this.speller = speller;
    }

    generateQuestion() {
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

        let dummyResult = result;
        if (Math.random() < 0.5) {
            dummyResult = result + Math.floor(Math.random() * 5) - 1;
        }

        let question = `${this.speller.spell(a)} ${this.speller.spell(
            op
        )} ${this.speller.spell(b)} = ${dummyResult} ${this.speller.spell(
            "isCorrect"
        )}`;

        let dummyResults = [
            this.speller.spell("True"),
            this.speller.spell("False"),
            this.speller.spell("Not sure"),
        ];
        let correct = this.speller.spell("False");
        if (result === dummyResult) {
            correct = this.speller.spell("True");
        }

        return [question, correct, dummyResults];
    }
}
