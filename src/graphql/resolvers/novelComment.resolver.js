const {GraphQLError} = require("graphql/index");
const {Match, sequelize, NovelComment} = require('../../models');
const { QueryTypes } = require('sequelize');

const novelCommentResolver = {
    Query: {
        getNovelComment: async (parent, args, context) => {
            try {
                return await NovelComment.findAll();
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
        getNovelCommentById: async (parent, {novel_comment_id}, context) => {
            try {
                return await NovelComment.findOne({
                    where: {novel_comment_id: novel_comment_id}
                });
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
    },
    Mutation: {
        createNovelComment: async (parent, args, context) => {
            const transaction = await sequelize.transaction();
            try {
                const {user_id, 
                    novel_id, 
                    episode_id, 
                    comment, 
                    score, 
                    is_official_allow,
                    is_publish,
                    response_comment_id,
                } = args;
                const novel_comment = await NovelComment.create(
                    {
                        user_id, 
                        novel_id, 
                        episode_id, 
                        comment, 
                        score, 
                        is_official_allow,
                        is_publish,
                        response_comment_id,
                    }
                )
                await transaction.commit();
                return novel_comment
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
        updateNovelComment: async (parent, args, context) => {
            const transaction = await sequelize.transaction();
            try {
                const {updates} = args;
                for (const update of updates) {
                    const { novel_comment_id, ...updateFields } = update;
                    const updatedCount = await NovelComment.update(updateFields, {
                        where: { novel_comment_id: novel_comment_id },
                        transaction: transaction
                    });
        
                    if (!updatedCount) {
                        throw new Error(`Không có bản ghi nào được cập nhật cho novel_comment_id: ${novel_comment_id}.`);
                    }
                }
                await transaction.commit();
        
                // Lấy lại các bản ghi sau khi cập nhật
                const novel_comment_ids = updates.map(update => update.novel_comment_id);
                const updatedMatches = await NovelComment.findAll({
                    where: { novel_comment_id: novel_comment_ids },
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
        deleteNovelComment: async (parent, {novel_comment_id}, context) => {
            try {
                await NovelComment.destroy({
                    where: {novel_comment_id:novel_comment_id}
                });
                return "OK"
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
    }
}

module.exports = {
    novelCommentResolver,
};