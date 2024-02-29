const { Router } = require('express');
const router =  Router();
const exhibitsController = require('../controller/exhibits-controller');
const { verifylogin } = require('../middlewares/loginRequired')

router.get('/search', exhibitsController.getExhibitByWord); //전시 검색 (키워드)
router.get('/', verifylogin, exhibitsController.getExhibitList); // 전시 리스트
router.get('/:exhibitId', exhibitsController.getdetailExhibit); // 전시 상세 추가
router.get('/category/:categoryId', exhibitsController.getExhibitByCategory); // 카테고리별 전시 리스트

module.exports = router;