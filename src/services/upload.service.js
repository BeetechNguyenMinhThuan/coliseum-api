const { upload } = require("../configs/multer.config");
const { s3, PutObjectCommand } = require("../configs/s3.config");
class UploadService {
  static async uploadFileFromLocalS3(parent, args, context) {
    const { file } = args;
    const { req, res } = args;
    try {
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.originalname || "unknown",
        Body: file.buffer,
        ContentType: "image/jpeg",
      });
    } catch (error) {}
  }
}
module.exports = UploadService;
