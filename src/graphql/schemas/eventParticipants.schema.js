const {gql} = require("graphql-tag");

const eventParticipantSchema = gql`
    type EventParticipant {
        event_id: Int,
        novel_id: Int,
        user_id: Int,
        created_at: DateTime
        updated_at: DateTime
        deleted_at: DateTime
    }

    extend type Query {
        getEventParticipant: [EventParticipant]
    }

    extend type Mutation {
        createEventParticipant(event_id:Int, novel_id:Int): EventParticipant
        deleteEventParticipant(event_id:Int, novel_id:Int): String
    }
`;

module.exports = {
    eventParticipantSchema,
};
