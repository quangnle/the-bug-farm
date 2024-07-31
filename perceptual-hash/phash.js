class PHash {
    constructor(size = 32) {
        this.size = size;
    }
   
    // Zoom the image to the size of the hash and grayscale it
    zoomAndGrayscale(imageData) {
        const data = [];
        // fill data with zeros columns and rows
        for (let i = 0; i < this.size; i++) {
            data.push(new Array(this.size).fill(0));
        }
        
        const nRows = imageData.height;
        const nCols = imageData.width;
        const rowRatio = nRows / this.size;
        const colRatio = nCols / this.size;
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                const row = Math.floor(i * rowRatio);
                const col = Math.floor(j * colRatio);
                const idx = (row * nCols + col) * 4;
                const r = imageData.data[idx];
                const g = imageData.data[idx + 1];
                const b = imageData.data[idx + 2];
                if (r > 0 || g > 0 || b > 0) {
                    let x = 1;
                }
                data[i][j] = Math.floor((r+g+b)/3);
            }
        }

        return data;
    }

    getBrightestCornerIndex(data) {
        const nRows = this.size >> 1;
        const nCols = this.height >> 1;
        let maxBrightness = 0;
        let maxIdx = 0;
        for (let i = 0; i < 4; i++) {
            let brightness = 0;
            for (let row = 0; row < nRows; row++) {
                for (let col = 0; col < nCols; col++) {
                    brightness +=
                        data[(i % 2) * nRows + row][(i / 2) * nCols + col];
                }
            }
            if (brightness > maxBrightness) {
                maxBrightness = brightness;
                maxIdx = i;
            }
        }
        return maxIdx;
    }

    flip(data, ntimes) {
        const flippedData = [];
        // clone data
        for (let i = 0; i < this.size; i++) {
            flippedData.push([...data[i]]);
        }

        for (let t = 0; t < ntimes; t++) {
            for (let i = 0; i < this.size; i++) {
                for (let j = 0; j < this.size; j++) {
                    flippedData[i][j] = data[this.size - i - 1][j];
                }
            }
        }

        return flippedData;
    }

    hash(imageData) {
        const grayscaleData = this.zoomAndGrayscale(imageData);
        const brightestCornerIndex = this.getBrightestCornerIndex(grayscaleData);
        const flippedData = this.flip(grayscaleData, brightestCornerIndex);
        // get byte array data of the flippedData
        const bytes = new Uint8Array(this.size * this.size);
        for (let i = 0; i < this.size * this.size; i++) {
            bytes[i] = flippedData[i % this.size][Math.floor(i / this.size)];
        }
        return bytes;
    }

    distance(hash1, hash2) {
        const maxDiff = hash1.length * 255;
        let distance = 0;        
        for (let i = 0; i < hash1.length; i++) {
            distance += Math.abs(hash1[i] - hash2[i]);
        }
        return distance / maxDiff;
    }
}