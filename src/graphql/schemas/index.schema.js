const { officialTagSchema } = require("./officialTags.schema");
const { officialBadgeSchema } = require("./officialBadges.schema");
const { userSchema } = require("./users.schema");
const { userBadgeSchema } = require("./userBadges.schema");
const { DateTime } = require("../common/customScalars");
const { matchSchema } = require("./matches.schema");
const { novelSchema } = require("./novels.schema");
const { episodeSchema } = require("./episodes.schema");
const { eventSchema } = require("./events.schema");
const { roundSchema } = require("./rounds.schema");
const { userLikeSchema } = require("./userLikes.schema");
const { novelCommentSchema } = require("./novelComment.schema");
const { userBookmarkSchema } = require("./userBookmarks.schema");
const { eventParticipantSchema } = require("./eventParticipants.schema");
const { matchVoteSchema } = require("./matchVote.schema");
const { matchNovelSchema } = require("./matchNovel.schema");
const { eventCommentSchema } = require("./eventComment.schema");
const { commonSchema } = require("./common.schema");
const { contentSchema } = require("./content.schema");

module.exports = [
  commonSchema,
  DateTime,
  officialBadgeSchema,
  officialTagSchema,
  userSchema,
  userBadgeSchema,
  userLikeSchema,
  matchSchema,
  novelSchema,
  episodeSchema,
  eventSchema,
  roundSchema,
  userBookmarkSchema,
  eventParticipantSchema,
  matchVoteSchema,
  matchNovelSchema,
  novelCommentSchema,
  eventCommentSchema,
  contentSchema,
];
