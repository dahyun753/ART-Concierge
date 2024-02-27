const { Router } = require('express');
const router = Router();

const { Exhibit, Category } = require('../db');


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
