const { Router } = require('express');
const router = Router();

const { Exhibit, Category } = require('../db');

// 전시 리스트 조회 (작가, 이미지, 전시제목, 날짜, 카테고리만) + 카테고리도 함께 
router.get('/', async(req, res, next) => {
    try {
        const exhibits = await Exhibit.find({})
            .select('author image exhibitName startDate endDate category')
            .populate('category', 'category'); // 전시의 카테고리 이름 가져오기
        const categories = await Category.find({}); // 모든 카테고리 이름 가져오기
        res.json({ exhibits,categories });
    } catch (err) {
        res.json(err);
    }
});

// 카테고리별 전시 리스트 조회 (작가, 이미지, 전시제목, 날짜, 카테고리만) + 카테고리도 함께 
router.get('/:categoryId', async(req, res, next) => {
    try {
        const category  = req.params.categoryId
        const exhibits = await Exhibit.find({ category })
            .select('author image exhibitName startDate endDate category')
            .populate('category', 'category'); // 전시의 카테고리 이름 가져오기
        // const categories = await Category.find({}); // 모든 카테고리 이름 가져오기
        res.json(exhibits);
    } catch (err) {
        res.json(err);
    }
});

// 전시 상세 조회 (전체 정보 리턴)
router.get('/:exhibitId', async(req, res, next) => {
    try {
        const { exhibitId } = req.params
        const exhibits = await Exhibit.findOne({ _id: exhibitId })
        res.json(exhibits);
    } catch (err) {
        res.json(err);
    }
});

// //전시 검색 (키워드) -> 아직 미구현
// router.get('/search', async (req, res, next) => {
//     try {
//         const exhibits = await Exhibit.find({ exhibitName: req.query.word });
//         res.json(exhibits);
//     } catch (err) {
//         res.json(err);
//     }
// });


module.exports = router;
