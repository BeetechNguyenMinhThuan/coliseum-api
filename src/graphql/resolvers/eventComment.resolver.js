const {GraphQLError} = require("graphql/index");
const {Match, sequelize, EventComment, MatchVote} = require('../../models');
const {QueryTypes} = require('sequelize');

const eventCommentResolver = {
    Query: {
        getEventComment: async (parent, args, context) => {
            try {
                return await EventComment.findAll();
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
        getEventCommentById: async (parent, {novel_comment_id}, context) => {
            try {
                return await EventComment.findOne({
                    where: {novel_comment_id: novel_comment_id}
                });
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
    },
    Mutation: {
        createEventComment: async (parent, args, context) => {
            const transaction = await sequelize.transaction();
            try {
                const data = {
                    event_comment_id,
                    user_id,
                    event_id,
                    comment,
                    score,
                    is_official_allow,
                    response_comment_id,
                    created_at,
                    updated_at,
                    deleted_at,
                } = args.input;
                const novel_comment = await EventComment.create(data)
                await transaction.commit();
                return novel_comment
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
        updateEventComment: async (parent, args, context) => {
            const transaction = await sequelize.transaction();
            try {
                const {
                    user_id,
                    event_id,
                    comment,
                    score,
                    is_official_allow,
                    response_comment_id,
                } = args.input;
                const updatedValues = {
                    user_id,
                    event_id,
                    comment,
                    score,
                    is_official_allow,
                    response_comment_id,
                }
                await EventComment.update(updatedValues, {
                    where: {
                        event_comment_id: args.event_comment_id
                    },
                });
            } catch (error) {
                await transaction.rollback();
                throw new GraphQLError(error.message);
            }
        },
        deleteEventComment: async (parent, {event_comment_id}, context) => {
            try {
                await EventComment.destroy({
                    where: {event_comment_id: event_comment_id}
                });
                return "OK"
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
    }
}

module.exports = {
    eventCommentResolver,
};