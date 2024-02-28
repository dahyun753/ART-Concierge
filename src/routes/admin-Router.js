const { Router } = require("express");
const router = Router();
const a_ExhibitController = require('../controller/admin-exhibit-controller');
const a_CategoryController = require("../controller/admin-category-controller");
const upload = require("../middlewares/image-middleware")

router.post('/exhibits', upload.single("image"), a_ExhibitController.postExhibit); // 전시 추가
router.get('/exhibits', a_ExhibitController.getExhibitList); // 전시 리스트
router.get('/exhibits/:exhibitId', a_ExhibitController.getExhibitById); // 전시 검색
router.put('/exhibits/:exhibitId',  upload.single("image"), a_ExhibitController.putExhibit); // 전시 수정
router.delete('/exhibits/:exhibitId', a_ExhibitController.deleteExhibit ); // 전시 삭제

router.post('/categories', a_CategoryController.postCategory); // 카테고리 추가
router.get('/categories', a_CategoryController.getCategory); // 카테고리 리스트
router.put('/categories/:categoryId', a_CategoryController.putCategory); // 카테고리 수정
router.delete('/categories/:categoryId', a_CategoryController.deleteCategory); // 카테고리 삭제

module.exports = router;
