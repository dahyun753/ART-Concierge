const { Router } = require("express");
const router = Router();
const adminController = require("../controller/admin-controller");
const upload = require("../middlewares/image-middleware");

router.post("/", upload.single("image"), adminController.postExhibit); // 전시 추가
router.get("/", adminController.getExhibitList); // 전시 리스트
router.get("/:exhibitId", adminController.getExhibitById); // 전시 검색
router.put("/:exhibitId", upload.single("image"), adminController.putExhibit); // 전시 수정
router.delete("/:exhibitId", adminController.deleteExhibit); // 전시 삭제

module.exports = router;
