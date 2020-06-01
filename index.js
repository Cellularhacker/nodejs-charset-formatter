/* Import Dependencies */
const detectCharEnc = require("detect-character-encoding");
const fs = require("fs");
const iconv = require("iconv-lite");
const path = require("path");

// MARK: Check arguments
const argvs = process.argv;
if (!Array.isArray(argvs) || argvs.length < 3 || !fs.lstatSync(argvs[2]).isDirectory()) {
    console.error(`Use: ${argvs[0]} ${argvs[1]} [DIRECTORY_PATH]`);
    process.exit(-1);
}

const tDirPath = argvs[2];

try {
    const tFiles = fs.readdirSync(tDirPath);
    for (let i = 0; i < tFiles.length; i++) {
        const e = tFiles[i];
        if (!e.match(/(.+)\.(smi|ass)$/gi)) continue;
        const cFilePath = path.join(tDirPath, e);
        const content = fs.readFileSync(cFilePath);
        const cEncoding = detectCharEnc(content).encoding.toLocaleLowerCase();

        // MARK: Only convert non-utf16le
        if (cEncoding === 'utf-16le') continue;
        const contentUtf8 = iconv.decode(content, cEncoding);
        const contentUtf16le = iconv.encode(contentUtf8, 'utf-16le');
        fs.writeFileSync(cFilePath, contentUtf16le, {encoding: 'utf16le'});
    }
} catch (e) {
    console.error(e);

    process.exit(-1);
}



