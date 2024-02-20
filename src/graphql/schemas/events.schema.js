const {gql} = require("graphql-tag");
const eventSchema = gql`
    type Event {
        event_id: Int
        event_ulid: String
        event_name: String
        tag_id: Int
        s3_url: String
        event_1_url: String
        event_2_url: String
        event_3_url: String
        event_4_url: String
        event_5_url: String
        event_type: Int
        is_anonymous: Boolean
        is_multiple: Boolean
        is_comment: Boolean
        is_comment_publish: Boolean
        min_participants: Int
        max_participants: Int
        decision_type: Int,
        registration_start_at: DateTime
        registration_finish_at: DateTime
        event_start_at: DateTime
        event_finish_at: DateTime
        event_content: String
        event_lp_url: String
        current_round_id: Int
        current_round_name: String
        current_round_order: Int
        max_round_order: Int
        created_at: DateTime
        updated_at: DateTime
        deleted_at: DateTime
    }
    input EventInput {
        event_ulid: String
        event_name: String
        tag_id: Int
        s3_url: String
        event_1_url: String
        event_2_url: String
        event_3_url: String
        event_4_url: String
        event_5_url: String
        event_type: Int
        is_anonymous: Boolean
        is_multiple: Boolean
        is_comment: Boolean
        is_comment_publish: Boolean
        min_participants: Int
        max_participants: Int
        decision_type: Int,
        registration_start_at: DateTime
        registration_finish_at: DateTime
        event_start_at: DateTime
        event_finish_at: DateTime
        event_content: String
        event_lp_url: String
        current_round_id: Int
        current_round_name: String
        current_round_order: Int
        max_round_order: Int
    }
    type Query {
        event(event_id: Int!): Event
        events: [Event]
    }

    type Mutation {
        createEvent(input: EventInput!): Event
        updateEvent(event_id: Int!, input: EventInput!): Event
        deleteEvent(event_id: Int!): String
    }

`;

module.exports = {
    eventSchema,
};