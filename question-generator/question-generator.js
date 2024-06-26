class QuestionGenerator {
    constructor(language) {
        this.questionTypes = [];
        this.speller = new Speller(language);
    }

    addQuestionType(questionType) {
        this.questionTypes.push(questionType);
    }

    generateQuestion() {
        let questionType =
            this.questionTypes[
                Math.floor(Math.random() * this.questionTypes.length)
            ];
        return questionType.generateQuestion();
    }
}
