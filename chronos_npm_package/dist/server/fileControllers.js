// import { Parser } from '@json2csv/plainjs';
// import fs from 'fs';
// import { convertArrayToCSV } from 'convert-array-to-csv';
// import converter from 'convert-array-to-csv';
// const fileControllers = {};
// fileControllers.saveCSV = (req, res, next) => {
//     console.log('saveCSV endpoint hit');
//     const data = res.locals.data;
//     try {
//         // const parser = new Parser();
//         // const csv = parser.parse(data);
//         const csv = convertArrayToCSV(data);
//         console.log(csv);
//         fs.writeFile('./output.csv', csv, (err) => {
//             if (err) {
//                 console.log('error: ', err);
//                 return res.status(500).send('Error');
//             }
//             console.log('data saved');
//             next();
//         })
//     } catch (err) {
//         console.log('error: ', err);
//         return next(err);
//     };
// }
// export default fileControllers;
// fileControllers.ts
// import { Parser } from '@json2csv/plainjs'; // Only needed if you plan to use Parser
import fs from 'fs';
import { convertArrayToCSV } from 'convert-array-to-csv';
// Option 1: Declare fileControllers as type 'any'
const fileControllers = {};
// Option 2: Alternatively, define an interface:
// interface FileControllers {
//   saveCSV: (req: any, res: any, next: any) => void;
// }
// const fileControllers: FileControllers = {};
// Define the saveCSV controller method
fileControllers.saveCSV = (req, res, next) => {
    console.log('saveCSV endpoint hit');
    const data = res.locals.data;
    try {
        // You can use Parser if needed:
        // const parser = new Parser();
        // const csv = parser.parse(data);
        // In this example, we use convertArrayToCSV:
        const csv = convertArrayToCSV(data);
        console.log(csv);
        fs.writeFile('./output.csv', csv, (err) => {
            if (err) {
                console.log('error: ', err);
                return res.status(500).send('Error');
            }
            console.log('data saved');
            next();
        });
    }
    catch (err) {
        console.log('error: ', err);
        return next(err);
    }
};
export default fileControllers;
//# sourceMappingURL=fileControllers.js.map