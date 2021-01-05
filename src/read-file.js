import fs from 'fs';

export default function readInputFile(filename) {
    if (!filename) {
        throw new Error('Filename is required');
    }
    const countryStrings = [];
    const lines = fs.readFileSync(filename).toString().split('\n').map((line) => line.replace('\r', ''));

    let lineIndex = 0;
    const eofLines = 2; // 0 as a end of file line and last array index
    while (lineIndex < lines.length - eofLines) {
        const countryNumber = parseInt(lines[lineIndex]);
        if (countryNumber) {
            lineIndex += 1;
            const countries = [];
            for (let countryLineIndex = lineIndex; countryLineIndex < countryNumber + lineIndex; countryLineIndex++) {
                countries.push(lines[countryLineIndex]);
            }
            lineIndex += countryNumber;
            countryStrings.push(countries);
        } else {
            throw new Error(`Error at line '${lines[lineIndex]}'. Expected a number of countries`);
        }
    }

    if (lines[lines.length - 1] !== '0') {
        throw new Error("Input file must end with '0' line");
    }

    return countryStrings;
}

