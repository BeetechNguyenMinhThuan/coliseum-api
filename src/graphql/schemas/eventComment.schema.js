const {gql} = require("graphql-tag");
const eventCommentSchema = gql`
    type EventComment {
        event_comment_id: ID!
        user_id: Int!
        event_id: Int!
        comment: String
        score: Int
        is_official_allow: Boolean
        response_comment_id: Int
        created_at: String
        updated_at: String
        deleted_at: String
    }

    type Query {
        getEventComment: [EventComment]
        getEventCommentById(novel_comment_id: ID!): EventComment,
    }

    input EventCommentInputCreate {
        user_id: Int!
        event_id: Int!
        comment: String
        score: Int
        is_official_allow: Boolean
        response_comment_id: Int
    }

    input EventCommentInputUpdate {
        user_id: Int!
        event_id: Int!
        comment: String
        score: Int
        is_official_allow: Boolean
        response_comment_id: Int
    }

    type Mutation {
        createEventComment(input:EventCommentInputCreate):EventComment
        updateEventComment(event_comment_id:Int, input: EventCommentInputUpdate!): EventComment
        deleteEventComment(event_comment_id: ID!):String
    }
`

module.exports = {
    eventCommentSchema
};