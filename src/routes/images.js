const { Exhibit } = require("../db/index.js");
const express = require("express");
const router = express.Router();

const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
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
    key: function (req, file, cb) {
      cb(null, Date.now().toString()); //업로드시 파일명 변경가능
    },
  }),
});

router.post("/", upload.single("image"), async (req, res) => {
  // 업로드된 파일의 정보는 `req.file`에 있음
  console.log(req.file.location);

  if (!req.file) {
    return res.status(400).send("파일이 업로드되지 않았습니다.");
  }

  try {
    // Exhibit 모델을 사용하여 데이터베이스에 새로운 항목 생성
    const newExhibit = await Exhibit.create({
      // 여기서 `image`는 데이터베이스 필드 이름이며, `req.file.path`는 업로드된 파일의 저장 경로
      image: req.file.location,
    });
    res.status(201).send({
      message: "파일이 성공적으로 업로드 되었습니다.",
      exhibit: newExhibit,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("파일 업로드 중 에러가 발생했습니다.");
  }
});

//이미지 조회
router.get("/", async (req, res) => {
  try {
    const exhibits = await Exhibit.find({}); // 데이터베이스에서 모든 Exhibit 데이터 조회
    res.json(exhibits);
  } catch (error) {
    console.error(error);
    res.status(500).send("데이터 조회 중 에러가 발생했습니다.");
  }
});

// 이미지 수정
router.put("/", upload.single("image"), async (req, res) => {
  const { _id } = req.body;

  if (!req.file) {
    return res.status(400).send("파일이 업로드되지 않았습니다.");
  }

  try {
    const updatedExhibit = await Exhibit.findOneAndUpdate(
      { _id: _id }, // 또는 데이터베이스 스키마에 맞게 { exhibitId: exhibitId } 등으로 조정
      { image: req.file.location },
      { new: true } // 업데이트된 문서를 반환
    );

    if (!updatedExhibit) {
      return res.status(404).send("해당 exhibitId를 가진 이미지가 없습니다.");
    }

    res.status(200).send({
      message: "이미지가 성공적으로 업데이트 되었습니다.",
      exhibit: updatedExhibit,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("이미지 업데이트 중 에러가 발생했습니다.");
  }
});

// 이미지 삭제
router.delete("/", async (req, res) => {
  const { _id } = req.body; // exhibitId를 통해 특정 문서를 찾습니다.

  try {
    // 해당 document의 image 필드만 업데이트하여 빈 문자열이나 null로 설정합니다.
    const updatedExhibit = await Exhibit.findOneAndUpdate(
      { _id: _id }, // 또는 데이터베이스 스키마에 맞게 { exhibitId: exhibitId }
      { $unset: { image: "" } }, // image 필드를 삭제합니다.
      { new: true } // 업데이트된 문서를 반환합니다.
    );

    if (!updatedExhibit) {
      return res.status(404).send("해당 exhibitId를 가진 이미지가 없습니다.");
    }

    res.status(200).send({
      message: "이미지 필드가 성공적으로 삭제되었습니다.",
      exhibit: updatedExhibit,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("이미지 필드 삭제 중 에러가 발생했습니다.");
  }
});

module.exports = router;
