const { GraphQLError } = require("graphql");
const { Novel, UserLike } = require("../../models");
const NovelService = require("../../services/novelService");

const novelResolver = {
  Query: {
    novels: async (parent, args, context) => {
      try {
        return await Novel.findAll();
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    novel: async (parent, args, context) => {
      try {
        const { novel_id } = args;

        return await Novel.findOne({
          where: { novel_id: novel_id },
        });
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    getNovelsPaginate: async (parent, args, context) => {
      const res = await NovelService.paginate(parent, args, context);
      return res;
    },
    novelsByAuthor: async (parent, args, context) => {
      const res = await NovelService.paginate(parent, args, context);
      return res;
    },
    
  },
  Novel: {
    user: async (parent, args, context) => {
      try {
        return await parent.getUser();
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    novel_tag: async (parent, args, context) => {
      try {
        return await parent.getNovelTags();
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    novel_badges: async (parent, args, context) => {
      try {
        return await parent.getOfficialBadges();
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    novel_comments: async (parent, args, context) => {
      try {
        return await parent.getNovelComments();
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    total_badges: async (parent, args, context) => {
      try {
        const badgesCount = await parent.countOfficialBadges();
        return badgesCount;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    total_likes: async (parent, args, context) => {
      try {
        const userLikeCount = await parent.countUserLikeNovels();
        return userLikeCount;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    total_bookmarks: async (parent, args, context) => {
      try {
        const userLikeCount = await parent.countUserBookmarkNovels();
        return userLikeCount;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    user_like: async (parent, args, context) => {
      try {
        const userLikes = await parent.getUserLikeNovels();
        const userIds = userLikes.map((user) => user.user_id);
        return userIds;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    createNovel: async (parent, args, context) => {
      try {
        const data = ({
          novel_ulid,
          user_id,
          title,
          synopsis,
          cover_picture_url,
          foreword_url,
          afterword_url,
          setting_url,
          note_url,
          dictionary_url,
          is_anonymous,
          is_publish,
          is_ranking_visible,
          is_completed,
          is_comment,
          is_comment_publish,
          first_novel_publish_at,
          first_name_publish_at,
          first_completed_at,
        } = args.input);
        return await Novel.create(data);
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    updateNovel: async (parent, args, context) => {
      try {
        const novel_id = args.novel_id;
        const data = ({
          novel_ulid,
          user_id,
          title,
          synopsis,
          cover_picture_url,
          foreword_url,
          afterword_url,
          setting_url,
          note_url,
          dictionary_url,
          is_anonymous,
          is_publish,
          is_ranking_visible,
          is_completed,
          is_comment,
          is_comment_publish,
          first_novel_publish_at,
          first_name_publish_at,
          first_completed_at,
        } = args.input);
        await Novel.update(data, {
          where: {
            novel_id: novel_id,
          },
        });
        return Novel.findOne({
          where: {
            novel_id: novel_id,
          },
        });
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    deleteNovel: async (parent, args, context) => {
      try {
        const novel_id = args.novel_id;
        await Novel.destroy({
          where: { novel_id: novel_id },
        });
        return "OK";
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    toggleUserLike: async (_, args, context) => {
      try {
        const { novelId } = args;
        const { user } = context.user;
        const userId = user.id;
        const existingFavorite = await UserLike.findOne({
          where: { user_id: userId, novel_id: novelId },
        });

        console.log(existingFavorite);
        let isFavorite = false;
        if (existingFavorite) {
          await existingFavorite.destroy({ force: true });
        } else {
          await UserLike.create({ user_id: userId, novel_id: novelId });
          isFavorite = true;
        }

        return {
          success: true,
          message: isFavorite
            ? "Novel favorited successfully!"
            : "Novel unfavorited successfully!",
          isFavorite,
        };
      } catch (error) {
        console.log(error);
        return {
          success: false,
          message: "An error occurred while toggling favorite status.",
        };
      }
    },
  },
};

module.exports = {
  novelResolver,
};
