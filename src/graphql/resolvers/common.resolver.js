const {exportCSV} = require("../common/csvExport");
const commonResolver = {
    Mutation: {
        exportCSV: async (_, {modelName}, context) => {
            return await exportCSV(modelName, context);

        },
    },
}

module.exports = {
    commonResolver,
};