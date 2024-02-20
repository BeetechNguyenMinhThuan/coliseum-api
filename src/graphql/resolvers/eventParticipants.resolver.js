const {GraphQLError} = require("graphql");
const {Event, Novel, EventParticipant} = require("../../models");
const eventParticipantResolver = {
    Query: {
        getEventParticipant: async (parent, args, context) => {
            try {
                const users = await EventParticipant.findAll();
                console.log(users)
                return users
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },

    },
    Mutation: {
        createEventParticipant: async (parent, args, context) => {
            try {
                const {event_id, novel_id} = args;
                const event = await Event.findOne({
                    where: {event_id: event_id}
                });

                const novel = await Novel.findOne({
                    where: {novel_id: novel_id}
                });
                await EventParticipant.create({event_id: event.event_id, novel_id: novel.novel_id,user_id:1});
            } catch (error) {
                console.log(error)
                throw new GraphQLError(error.message);
            }
        },

        deleteEventParticipant: async (parent, args, context) => {
            try {
                const {event_id, novel_id} = args;
                await EventParticipant.destroy({
                    where: {event_id, novel_id}
                });
                return "OK"
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
    }
}

module.exports = {
    eventParticipantResolver,
};