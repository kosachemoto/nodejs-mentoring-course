const fs = require('fs');
const csv = require('csvtojson');
const {
    CSV_FILE_PATH,
    OUTPUT_FILE_PATH,
    keysToLowerCase,
} = require('./helper');

export = () => {
    const converter = csv({
        colParser: {
            "amount": "omit",
            "price": "number",
        }
    }).preFileLine(keysToLowerCase);

    const readStream = fs.createReadStream(CSV_FILE_PATH);
    const writeStream = fs.createWriteStream(OUTPUT_FILE_PATH);

    readStream.pipe(converter).pipe(writeStream);
};