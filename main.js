import csv from 'csv-parser';
import fs from 'fs';

const results = [];

fs.createReadStream('lung_cancer_arkformat.csv')
    .pipe(csv({}))
    .on('data', (data) => results.push(data))
    .on('end', () => {
        console.log(results);
    });
