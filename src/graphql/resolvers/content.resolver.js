const { Content } = require("../../models");
const {
  CONTENT_FOOTER_ADVERTISEMENT,
  CONTENT_NOTI_EVENT,
  CONTENT_SIDE_ADVERTISEMENT,
  CONTENT_NOTI,
  CONTENT_SLIDE_BANNER,
} = require("../../constants/constants");
const contentResolver = {
  Query: {
    contentsBanner: async (parent, args, context) => {
      const { type } = args;
      if (type !== CONTENT_SLIDE_BANNER) {
        return null;
      }
      const content = await Content.findAll({
        attributes: ["content_url", "destination_url"],
        where: {
          position_type: type,
        },
        order: [["sort_order", "DESC"]],
      });
      return content;
    },

    contentsNoti: async (parent, args, context) => {
      const { type } = args;
      if (type !== CONTENT_NOTI && type !== CONTENT_NOTI_EVENT) {
        return null;
      }
      let attributes = [];
      if (type === CONTENT_NOTI_EVENT) {
        attributes = ["content_url", "destination_url"];
      } else {
        attributes = [
          "title",
          "content",
          "publication_start_at",
          "information_type",
          "content_url",
          "destination_url",
        ];
      }
      const content = await Content.findAll({
        attributes: attributes,
        where: {
          position_type: type,
        },
      });
      return content;
    },
    contentsAdvertisement: async (parent, args, context) => {
      const { type } = args;
      if (
        type !== CONTENT_FOOTER_ADVERTISEMENT &&
        type !== CONTENT_SIDE_ADVERTISEMENT
      ) {
        return null;
      }
      const content = await Content.findAll({
        attributes: ["content_url", "destination_url"],
        where: {
          position_type: type,
        },
        order: [["sort_order", "DESC"]],
      });
      return content;
    },
  },
};

module.exports = {
  contentResolver,
};
