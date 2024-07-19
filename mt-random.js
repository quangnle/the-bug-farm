// a wrapper of Mersenne Twister random number generator
class MTRandom {
    constructor(seed = 282828) {
        this.seed = seed;
    }

    next() {
        let y;
        const magicValues = [0x9908b0df, 0x9d2c5680, 0xefc60000, 1812433253];
        if (this.mt === undefined) {
            this.mt = [];
            this.mt[0] = this.seed >>> 0;
            for (this.mti = 1; this.mti < 624; this.mti++) {
                y = (this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30)) * magicValues[3];
                this.mt[this.mti] = y + this.mti;
            }
        }
        for (let i = 0; i < 624; i++) {
            y = (this.mt[i] & 0x80000000) | (this.mt[(i + 1) % 624] & 0x7fffffff);
            this.mt[i] = this.mt[(i + 397) % 624] ^ (y >>> 1);
            if ((y % 2) !== 0) {
                this.mt[i] ^= magicValues[0];
            }
        }
        y = this.mt[this.mti];
        this.mti = (this.mti + 1) % 624;
        y ^= y >>> 11;
        y ^= (y << 7) & magicValues[1];
        y ^= (y << 15) & magicValues[2];
        y ^= y >>> 18;
        return y >>> 0;
    }

    nextInt(n) {
        return this.next() % n;
    }

    nextFloat() {
        return this.next() / 0x100000000;
    }

    nextBoolean() {
        return this.next() % 2 === 0;
    }

    nextBytes(bytes) {
        for (let i = 0; i < bytes.length; i++) {
            bytes[i] = this.next() & 0xff;
        }
    }

    nextIntRange(min, max) {
        return this.nextInt(max - min) + min;
    }

    nextFloatRange(min, max) {
        return this.nextFloat() * (max - min) + min;
    }

    nextElement(array) {
        return array[this.nextInt(array.length)];
    }

    nextShuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = this.nextInt(i + 1);
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    nextString(length) {
        const chars = [];
        for (let i = 0; i < length; i++) {
            chars.push(String.fromCharCode(this.nextIntRange(32, 127)));
        }
        return chars.join('');
    }

    nextColor() {
        return `#${this.next().toString(16).padStart(6, '0')}`;
    }

    nextElementWithProbability(array, probabilities) {
        const r = this.nextFloat();
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum += probabilities[i];
            if (r < sum) {
                return array[i];
            }
        }
        return array[array.length - 1];
    }

    nextIntWithProbability(min, max, probabilities) {
        return this.nextElementWithProbability(Array.from({length: max - min}, (_, i) => i + min), probabilities);
    }

    nextFloatWithProbability(min, max, probabilities) {
        return this.nextElementWithProbability([min, max], probabilities);
    }

    nextColorWithProbability(probabilities) {
        return this.nextElementWithProbability(['#000000', '#ffffff'], probabilities);
    }

    nextElementWithReplacement(array, n) {
        return Array.from({length: n}, () => this.nextElement(array));
    }    
}