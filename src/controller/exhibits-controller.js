const exhibitService = require('../services/exhibits-service');


// 전시 상세 조회 (전체 정보 리턴)
async function getdetailExhibit(req, res, next) {
    try{
        const { exhibitId } = req.params
        const exhibits = await exhibitService.detailhExhibit( exhibitId )
        res.json(exhibits);
    } catch (err) {
        // res.status(err.statusCode || 500).json(message: err.message );
        res.json(err);
    }
}

// 전시 리스트 조회 (작가, 이미지, 전시제목, 날짜, 카테고리만) + 카테고리도 함께 
async function getExhibitList(req, res, next) {
    try{
        const contents = await exhibitService.exhibitList();
        res.status(201).json( contents );
    } catch (err) {
        // res.status(err.statusCode || 500).json(message: err.message );
        res.json(err);
    }
}

// 카테고리별 전시 리스트 조회 (작가, 이미지, 전시제목, 날짜, 카테고리만) + 카테고리도 함께 
async function getExhibitByCategory (req, res, next) {
    try {
        const categoryId = req.params.categoryId;
        const exhibits = await exhibitService.searchByCategory(categoryId);
        res.json(exhibits);
    } catch (err) {
        next(err); // 에러 핸들링을 위해 next 사용
    }
};

module.exports = { getdetailExhibit, getExhibitList, getExhibitByCategory };