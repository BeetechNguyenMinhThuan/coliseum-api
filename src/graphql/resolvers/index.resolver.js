const { officialTagResolver } = require("./officialTags.resolver");
const { officialBadgeResolver } = require("./officialBadges.resolver");
const { userResolver } = require("./users.resolver");
const { matchResolver } = require("./matches.resolver");
const { novelResolver } = require("./novels.resolver");
const { episodeResolver } = require("./episodes.resolver");
const { eventResolver } = require("./events.resolver");
const { roundResolver } = require("./rounds.resolver");
const { userLikeResolver } = require("./userLikes.resolver");
const { userBadgesResolver } = require("./userBadges.resolver");
const { novelCommentResolver } = require("./novelComment.resolver");
const { eventCommentResolver } = require("./eventComment.resolver");
const { commonResolver } = require("./common.resolver");
const { authResolver } = require("./auth.resolver");
const { contentSchema } = require("../schemas/content.schema");
const { contentResolver } = require("./content.resolver");

module.exports = [
  officialTagResolver,
  officialBadgeResolver,
  userResolver,
  matchResolver,
  novelResolver,
  episodeResolver,
  eventResolver,
  roundResolver,
  userLikeResolver,
  userBadgesResolver,
  novelCommentResolver,
  eventCommentResolver,
  authResolver,
  commonResolver,
  contentResolver
];
