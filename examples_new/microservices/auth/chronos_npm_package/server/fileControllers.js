const { Parser } = require('@json2csv/plainjs');
const fs = require('fs');
const { convertArrayToCSV } = require('convert-array-to-csv');
const converter = require('convert-array-to-csv');

const fileControllers = {};

fileControllers.saveCSV = (req, res, next) => {
    console.log('saveCSV endpoint hit');
    const data = res.locals.data;

    try {
        // const parser = new Parser();
        // const csv = parser.parse(data);
        const csv = convertArrayToCSV(data);
        console.log(csv);

        fs.writeFile('./output.csv', csv, (err) => {
            if (err) {
                console.log('error: ', err);
                return res.status(500).send('Error');
            }
            console.log('data saved');
            next();

        })
    } catch (err) {
        console.log('error: ', err);
        return next(err);
    };
}



module.exports = fileControllers;