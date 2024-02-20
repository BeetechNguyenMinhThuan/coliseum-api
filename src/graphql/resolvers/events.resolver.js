const {GraphQLError} = require("graphql");
const {Event} = require('../../models');

const eventResolver = {
    Query: {
        events: async (parent, args, context) => {
            try {
                return await Event.findAll();
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
        event: async (parent, args, context) => {
            try {
                const {event_id} = args;

                return await Event.findOne({
                    where: {event_id: event_id}
                });
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
    },
    Mutation: {
        createEvent: async (parent, args, context) => {
            try {
                const data = {
                    event_ulid,
                    event_name,
                    tag_id,
                    s3_url,
                    event_1_url,
                    event_2_url,
                    event_3_url,
                    event_4_url,
                    event_5_url,
                    event_type,
                    is_anonymous,
                    is_multiple,
                    is_comment,
                    is_comment_publish,
                    min_participants,
                    max_participants,
                    decision_type,
                    registration_start_at,
                    registration_finish_at,
                    event_start_at,
                    event_finish_at,
                    event_content,
                    event_lp_url,
                    current_round_id,
                    current_round_name,
                    current_round_order,
                    max_round_order,
                } = args.input;
                return await Event.create(data)
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
        updateEvent: async (parent, args, context) => {
            try {
                const event_id = args.event_id
                const data = {
                    event_ulid,
                    event_name,
                    tag_id,
                    s3_url,
                    event_1_url,
                    event_2_url,
                    event_3_url,
                    event_4_url,
                    event_5_url,
                    event_type,
                    is_anonymous,
                    is_multiple,
                    is_comment,
                    is_comment_publish,
                    min_participants,
                    max_participants,
                    decision_type,
                    registration_start_at,
                    registration_finish_at,
                    event_start_at,
                    event_finish_at,
                    event_content,
                    event_lp_url,
                    current_round_id,
                    current_round_name,
                    current_round_order,
                    max_round_order,
                } = args.input;
                await Event.update(data, {
                    where: {
                        event_id: event_id,
                    }
                })
                return Event.findOne({
                    where: {
                        event_id: event_id,
                    }
                })
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
        deleteEvent: async (parent, args, context) => {
            try {
                const event_id = args.event_id
                await Event.destroy({
                    where: {event_id: event_id}
                });
                return "OK"
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
    }
}

module.exports = {
    eventResolver,
};