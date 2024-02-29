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

// 전시 리스트 조회 (작가, 이미지, 전시제목, 날짜, 카테고리만) 
async function getExhibitList(req, res, next) {
    try{
        const contents = await exhibitService.exhibitList();
        res.status(201).json( contents );
    } catch (err) {
        // res.status(err.statusCode || 500).json(message: err.message );
        res.json(err);
    }
}

// 카테고리 리스트 (일반 유저도 다 사용 가능)
async function getCategoryList(req, res, next) {
    try{
        const contents = await exhibitService.categoryList();
        res.status(201).json( contents );
    } catch (err) {
        // res.status(err.statusCode || 500).json(message: err.message );
        res.json(err);
    }
}

// 카테고리별 전시 리스트 조회 (작가, 이미지, 전시제목, 날짜, 카테고리만) 
async function getExhibitByCategory (req, res, next) {
    try {
        const categoryname = req.params.categoryName
        const exhibits = await exhibitService.searchByCategory(categoryname);
        res.json(exhibits);
    } catch (err) {
        res.json(err); // 에러 핸들링을 위해 next 사용
    }
};

// 키워드로 전시 조회
async function getExhibitByWord (req, res, next) {
    try {
        const exhibits = await exhibitService.searchByWord(req.query.word);
        res.status(201).json(exhibits);
    } catch (err) {
        res.json(err);
    }
};

module.exports = { getdetailExhibit, getExhibitList, getExhibitByCategory, getExhibitByWord, getCategoryList };