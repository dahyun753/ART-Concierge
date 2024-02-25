const { Router } = require('express');
const router = Router();

const { Exhibit } = require('../db');

// 전시 리스트 조회 (작가, 이미지, 전시제목, 날짜, 카테고리만)
router.get('/', async(req, res, next) => {
    try {
        const exhibits = await Exhibit.find({})
            .select('author image exhibitName startDate endDate category')
            .populate('category', 'category'); // 카테고리 이름 가져오기
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
