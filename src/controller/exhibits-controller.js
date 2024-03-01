const exhibitService = require("../services/exhibits-service");


//전시 상세 조회  (작가, 이미지, 전시제목, 날짜, 카테고리)
async function getdetailExhibit(req, res, next) {
  try {
    const { exhibitId } = req.params;
    const exhibits = await exhibitService.detailExhibit(exhibitId);
    res.json(exhibits);
  } catch (err) {
    res.json(err)
  }
}

//카테고리 리스트 조회
async function getCategoryList(req, res, next) {
  try {
    const contents = await exhibitService.categoryList();
    res.status(201).json(contents);
  } catch (err) {
    res.json(err)
  }
}

//전시 리스트 조회
async function getExhibitList(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;

    const contents = await exhibitService.exhibitList(page, perPage);
    res.status(200).json(contents);
  } catch (err) {
    res.json(err)
  }
}

//카테고리별 전시 리스트 조회
async function getExhibitByCategory(req, res, next) {
  try {
    const { categoryId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;

    const exhibits = await exhibitService.searchByCategory(
      categoryId,
      page,
      perPage
    );
    res.json(exhibits);
  } catch (err) {
    res.json(err); //에러 핸들링을 위해 next 사용
  }
}

//키워드로 전시 조회
async function getExhibitByWord(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;

    const exhibits = await exhibitService.searchByWord(
      req.query.word,
      page,
      perPage
    );
    res.status(201).json(exhibits);
  } catch (err) {
    res.json(err)
  }
}

module.exports = {
  getdetailExhibit,
  getExhibitList,
  getExhibitByCategory,
  getExhibitByWord,
  getCategoryList,
};
