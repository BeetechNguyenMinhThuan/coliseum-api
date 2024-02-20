const {gql} = require("graphql-tag");

const userLikeSchema = gql`
    type UserLike {
        user_id: Int!,
        novel_id: Int!
        created_at: DateTime
        updated_at: DateTime
        deleted_at: DateTime
    }
    
    type UserLikeNovel{
        user_id: Int!,
        novel_id: [Int]!
    }

    extend type Query {
        getUserLike: [UserLike]
    }

    extend type Mutation {
        createUserLike(user_id:Int, novel_id:[Int]): UserLike
        deleteUserLike(user_id:Int, novel_id:[Int]): String
    }
`;

module.exports = {
    userLikeSchema,
};
