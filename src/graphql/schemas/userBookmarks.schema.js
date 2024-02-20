const {gql} = require("graphql-tag");

const userBookmarkSchema = gql`
    type UserBookmark {
        user_id: Int,
        novel_id: Int,
        created_at: DateTime
        updated_at: DateTime
        deleted_at: DateTime
    }

    extend type Query {
        getUserBookmark: [UserBookmark]
    }

    extend type Mutation {
        createUserBookmark(user_id:Int, novel_id:Int): UserBookmark
        deleteUserBookmark(user_id:Int, novel_id:Int): String
    }
`;

module.exports = {
    userBookmarkSchema,
};
