import * as fs from 'fs';
import * as csv from 'csvtojson';
import {
    CSV_FILE_PATH,
    OUTPUT_FILE_PATH,
    keysToLowerCase,
} from './helper';

module.exports = () => {
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