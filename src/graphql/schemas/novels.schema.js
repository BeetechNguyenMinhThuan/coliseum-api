const { gql } = require("graphql-tag");

const novelSchema = gql`
  type Novel {
    novel_id: Int
    novel_ulid: String
    user_id: Int
    user: User
    author: String
    title: String
    synopsis: String
    cover_picture_url: String
    foreword_url: String
    afterword_url: String
    setting_url: String
    note_url: String
    dictionary_url: String
    is_anonymous: Boolean
    is_publish: Boolean
    is_ranking_visible: Boolean
    is_completed: Boolean
    is_comment: Boolean
    is_comment_publish: Boolean
    tags: [OfficialTag]
    novel_badges: [OfficialBadge]
    novel_comments: [NovelComment]
    first_novel_publish_at: DateTime
    first_name_publish_at: DateTime
    first_completed_at: DateTime
    likes: Int
    badges: Int
    bookmarks: Int
    comments: Int
    episode_count: Int
    episodes: [Episode]
    user_like: [Int]
    user_bookmarks: [Int]
    rank: Rank
    created_at: DateTime
    updated_at: DateTime
    deleted_at: DateTime
  }
  type Rank {
    hot: Int
    daily: Int
    weekly: Int
    monthly: Int
    quarterly: Int
    yearly: Int
    cumulative: Int
  }

  type NovelList {
    novel_id: Int
    novel_ulid: String
    title: String
    synopsis: String
    cover_picture_url: String
    user_uuid: String
    author: String
    user: User
    is_publish: Boolean
    is_ranking_visible: Boolean
    first_novel_publish_at: DateTime
    max_updated_at: String
    episode_count: Int
    likes: Int
    episodes: [Episode]
    bookmarks: Int
    comments: Int
    is_completed: Boolean
    rank: Rank
    user_likes: [User]
    user_bookmarks: [User]
    created_at: DateTime
    updated_at: DateTime
    badges: [OfficialBadge]
    tags: [OfficialTag]
    status: String
  }

  input NovelInput {
    novel_ulid: String
    user_id: Int
    title: String
    synopsis: String
    cover_picture_url: String
    foreword_url: String
    afterword_url: String
    setting_url: String
    note_url: String
    dictionary_url: String
    is_anonymous: Boolean
    is_publish: Boolean
    is_ranking_visible: Boolean
    is_completed: Boolean
    is_comment: Boolean
    is_comment_publish: Boolean
    first_novel_publish_at: String
    first_name_publish_at: String
    first_completed_at: String
  }

  type NovelPagination {
    novels: [NovelList!]
    totalItems: Int
    totalPages: Int
    currentPage: Int
  }

  type NovelResponse {
    novels: [NovelList]
  }

  input FilterNovel {
    searchValue: String
    type: String
  }

  type UserLikeNovelResponse implements MutationResponse {
    success: Boolean!
    message: String!
    novel_id: Int
    likedCount: Int
    isFavorite: Boolean
  }

  type UserBookmarkNovelResponse implements MutationResponse {
    success: Boolean!
    message: String!
    isBookmark: Boolean
  }

  type Query {
    novel(novel_id: Int!, type: String): NovelList
    novels(type: Int): NovelResponse
    getNovelsByAuthor(userId: Int!, page: Int, limit: Int): NovelPagination
    getNovelsPaginate(
      page: Int
      limit: Int
      filter: FilterNovel
      type: String
    ): NovelPagination
  }

  type Mutation {
    createNovel(input: NovelInput!): Novel
    updateNovel(novel_id: Int!, input: NovelInput!): Novel
    deleteNovel(novel_id: Int!): String
    toggleUserLike(novelId: Int!): UserLikeNovelResponse
    toggleUserBookmark(novelId: Int!, episodeId: Int): UserBookmarkNovelResponse
  }
`;

module.exports = {
  novelSchema,
};
