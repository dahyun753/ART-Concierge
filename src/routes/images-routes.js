const express = require("express");
const multer = require("multer");
const path = require("path");
const { Exhibit } = require("../db/index.js"); // 데이터베이스 모델 가져오기

const router = express.Router();

// multer 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/"); // 파일 저장 위치 설정
  },
  filename: (req, file, cb) => {
    // 파일 이름 설정
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

//이미지 추가
router.post("/", upload.single("image"), async (req, res) => {
  // 업로드된 파일의 정보는 `req.file`에 있음
  if (!req.file) {
    return res.status(400).send("파일이 업로드되지 않았습니다.");
  }

  try {
    // Exhibit 모델을 사용하여 데이터베이스에 새로운 항목 생성
    const newExhibit = await Exhibit.create({
      // 여기서 `image`는 데이터베이스 필드 이름이며, `req.file.path`는 업로드된 파일의 저장 경로
      image: req.file.path,
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

module.exports = router;
