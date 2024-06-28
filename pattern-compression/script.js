function compress(content){
    let stCompression = '';
    content += '*';
    for (let i=0; i<content.length; i++){
        if(dict[content[i]] !== undefined){
            stCompression += dict[content[i]];
        }
    }
    let padding = 8 - stCompression.length % 8;
    for (let i=0; i<padding; i++){
        stCompression += '0';
    }
    return stCompression;
}

function binaryString2Hex(str){
    let hex = '';
    for (let i=0; i<str.length; i+=8){
        // take each 8 characters and convert to integer value
        let byte = parseInt(str.substr(i, 8), 2);
        // get ascii value of the byte
        hex += String.fromCharCode(byte);
    }
    return hex;
}

function asciiToBinaryString(asciiStr){
    let str = '';
    for (let i=0; i<asciiStr.length; i++){
        str += asciiStr.charCodeAt(i).toString(2).padStart(8, '0');
    }
    return str;
}

function decompress(binaryStr){
    let content = '';
    let tmpStr = '';  
    for (let i=0; i<=binaryStr.length; i++){              
        tmpStr += binaryStr[i];
        let key = lookUpDict(tmpStr, dict);
        if (key !== undefined){
            if (key === '*') break;
            content += key;
            tmpStr = '';
        }
    }
    return content;
}

function lookUpDict(str, dic){
    for (let key in dic){
        if (dic[key] === str){
            return key;
        }
    }
}

function compressData(content){
    let compressed = compress(content);
    let hex = binaryString2Hex(compressed);
    return hex;
}

function decompressData(content){
    let binaryStr = asciiToBinaryString(content);
    let decompressed = decompress(binaryStr);
    return decompressed;
}