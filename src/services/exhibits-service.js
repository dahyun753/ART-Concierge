const { Exhibit, Category } = require('../db');

// 전시 상세 
async function detailhExhibit (exhibitId) {
    const exhibits = await Exhibit.findOne({ _id: exhibitId })

    return exhibits;
}

// 전시 리스트
async function exhibitList () {
    const exhibits = await Exhibit.find({})
        .select('author image exhibitName startDate endDate category')
        .populate('category', 'category'); // 전시의 카테고리 이름 가져오기

    return exhibits;
}

// 카테고리별 전시 조회
async function searchByCategory(category) {
    return await Exhibit.find( category )
        .select('author image exhibitName startDate endDate category')
        .populate('category', 'category'); // 전시의 카테고리 이름 가져오기
}

// 키워드로 전시조회
async function searchByWord (keyword) {
    return await Exhibit.find({ exhibitName: {'$regex': keyword }});
};


module.exports = { detailhExhibit, exhibitList, searchByCategory, searchByWord };