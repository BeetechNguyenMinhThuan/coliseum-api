const {GraphQLError} = require("graphql/index");
const {Match, sequelize} = require('../../models');
const { QueryTypes } = require('sequelize');

const matchResolver = {
    Query: {
        getAllMatches: async (parent, args, context) => {
            try {
                return await Match.findAll();
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
        getMatchById: async (parent, {match_id}, context) => {
            try {
                return await Match.findOne({
                    where: {match_id: match_id}
                });
            } catch (error) {
                throw new GraphQLError(error.message);
            }

            // try {
            //     const match = await sequelize.query(`SELECT * FROM matches WHERE match_id = ${match_id}`, 
            //         { 
            //             // replacements: [''],
            //             type: QueryTypes.SELECT 
            //         }
            //     );
            //     console.log(match);
            //     return match;
            // } catch (error) {
            //     throw new GraphQLError(error.message);
            // }
        },
    },
    Mutation: {
        createMatch: async (parent, args, context) => {
            try {
                const {round_id, match_uuid, match_name, winner_type} = args;
                return await Match.create({round_id, match_uuid, match_name, winner_type})
            } catch (error) {
                throw new GraphQLError(error.message);
            }

            // try {
            //     const {round_id, match_uuid, match_name, winner_type} = args;
            //     // return await Match.create({round_id, match_uuid, match_name, winner_type})
            //     const unsafeQuery = `INSERT INTO matches (round_id, match_uuid, match_name, winner_type) VALUES ('${round_id}', '${match_uuid}', '${match_name}', '${winner_type}')`;
            //     await sequelize.query(unsafeQuery);
            // } catch (error) {
            //     throw new GraphQLError(error.message);
            // }
        },
        updateMatch: async (parent, args, context) => {
            const transaction = await sequelize.transaction();
            try {
                const {updates} = args;
                for (const update of updates) {
                    const { match_id, ...updateFields } = update;
                    const updatedCount = await Match.update(updateFields, {
                        where: { match_id: match_id },
                        transaction: transaction
                    });
        
                    if (!updatedCount) {
                        throw new Error(`Không có bản ghi nào được cập nhật cho match_id: ${match_id}.`);
                    }
                }
                await transaction.commit();
        
                // Lấy lại các bản ghi sau khi cập nhật
                const match_ids = updates.map(update => update.match_id);
                const updatedMatches = await Match.findAll({
                    where: { match_id: match_ids },
                    limit: 10
                });
        
                if (!updatedMatches.length) {
                    throw new Error('Không tìm thấy bản ghi sau khi cập nhật.');
                }
                return updatedMatches;
            } catch (error) {
                await transaction.rollback();
                throw new GraphQLError(error.message);
            }
        },
        deleteMatch: async (parent, {match_id}, context) => {
            try {
                await Match.destroy({
                    where: {match_id:match_id}
                });
                //injection
                // const unsafeQuery = `DELETE FROM matches WHERE match_id = ${match_id}`;
                // await sequelize.query(unsafeQuery);
                return "OK"
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
    }
}

module.exports = {
    matchResolver,
};