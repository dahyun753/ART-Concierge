const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");
const path = require("path");

const s3 = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.S3_KEY,
    secretAccessKey: process.env.S3_SECRET,
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "artconcierge",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      //파일 확장자 추출
      const ext = path.extname(file.originalname);
      const filename = Date.now().toString() + ext;
      cb(null, filename);
    },
  }),

  fileFilter(req, file, cb) {
    const extension = file.mimetype.split("/")[1];
    if (!["png", "jpg", "jpeg", "gif", "bmp"].includes(extension)) {
      return cb(new Error("이미지 파일을 등록해 주세요."));
    }

    return cb(null, true);
  },
});

module.exports = upload;
