/* Import Dependencies */
const detectCharEnc = require("detect-character-encoding");
const fs = require("fs");
const iconv = require("iconv-lite");

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
        console.log(`e =>`, e);
    }
} catch (e) {
    console.error(e);

    process.exit(-1);
}



