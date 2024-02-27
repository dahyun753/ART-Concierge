const { Router } = require('express');
const router =  Router();
const exhibitsController = require('../controller/exhibits-controller');

router.get('/:exhibitId', exhibitsController.getdetailExhibit); // 전시 상세 추가
router.get('/', exhibitsController.getExhibitList); // 전시 리스트
router.get('/:categoryId', exhibitsController.getExhibitByCategory); // 카테고리별 전시 리스트

module.exports = router;