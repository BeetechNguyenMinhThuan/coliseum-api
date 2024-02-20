const {sequelize} = require("../../models");
const fastCsv = require('fast-csv');
const exportCSV = async (modelName, {res}) => {
    try {
        if (!sequelize.isDefined(modelName)) {
            throw new Error(`Model '${modelName}' does not exist.`);
        }

        const Model = sequelize.model(modelName);

        const records = await Model.findAll();
        const fileName = `${modelName.toLowerCase()}_export.csv`;

        const csvString = await new Promise((resolve, reject) => {
            const csvData = [];
            const csvStream = fastCsv.format({headers: true});
            // res.set('Content-Disposition', 'attachment; filename=output.csv');
            csvStream
                .transform((row, next) => {
                    next(null, row.dataValues);
                })
                .on('data', data => csvData.push(data))
                .on('end', () => resolve(csvData.join('\n')))
                .on('error', error => reject(error));

            records.forEach(row => csvStream.write(row));

            csvStream.end();
        });
        return {
            csvString: csvString,
            fileName: fileName,
        };

    } catch (error) {
        throw new Error(`Error exporting CSV for model '${modelName}': ${error.message}`);
    }

};

module.exports = {
    exportCSV
};
