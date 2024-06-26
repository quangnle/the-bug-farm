class Speller {
    constructor(language) {
        this.language = language;

        this.en_dict = new Map();
        this.en_dict.set(0, "zero");
        this.en_dict.set(1, "one");
        this.en_dict.set(2, "two");
        this.en_dict.set(3, "three");
        this.en_dict.set(4, "four");
        this.en_dict.set(5, "five");
        this.en_dict.set(6, "six");
        this.en_dict.set(7, "seven");
        this.en_dict.set(8, "eight");
        this.en_dict.set(9, "nine");
        this.en_dict.set(10, "ten");
        this.en_dict.set("isEqualTo", "is?");
        this.en_dict.set("isCorrect", "is right or wrong?");
        this.en_dict.set("True", "True");
        this.en_dict.set("False", "False");
        this.en_dict.set("Not sure", "Not sure");
        this.en_dict.set("+", "plus");
        this.en_dict.set("-", "minus");
        this.en_dict.set("*", "times");

        this.vn_dict = new Map();
        this.vn_dict.set(0, "không");
        this.vn_dict.set(1, "một");
        this.vn_dict.set(2, "hai");
        this.vn_dict.set(3, "ba");
        this.vn_dict.set(4, "bốn");
        this.vn_dict.set(5, "năm");
        this.vn_dict.set(6, "sáu");
        this.vn_dict.set(7, "bảy");
        this.vn_dict.set(8, "tám");
        this.vn_dict.set(9, "chín");
        this.vn_dict.set(10, "mười");
        this.vn_dict.set("isEqualTo", "bằng ?");
        this.vn_dict.set("isCorrect", "đúng hay sai?");
        this.vn_dict.set("True", "Đúng");
        this.vn_dict.set("False", "Sai");
        this.vn_dict.set("Not sure", "Không chắc chắn");
        this.vn_dict.set("+", "cộng");
        this.vn_dict.set("-", "trừ");
        this.vn_dict.set("*", "nhân");
    }

    spell(value) {
        if (this.language === "en") {
            return this.en_dict.get(value);
        } else if (this.language === "vn") {
            return this.vn_dict.get(value);
        }
    }
}
