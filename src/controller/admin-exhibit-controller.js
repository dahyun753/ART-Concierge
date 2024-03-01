const a_exhibitService = require("../services/admin-exhibit-service");


//전시 추가 (관리자 페이지)
async function postExhibit(req, res, next) {
  try {
    const {
      exhibitName,
      exhibitAddress,
      price,
      startDate,
      endDate,
      category,
      author,
      information,
    } = req.body;

    const image = req.file.location;

    const exhibit = await a_exhibitService.addExhibit({
      exhibitName,
      exhibitAddress,
      price,
      startDate,
      endDate,
      category,
      author,
      information,
      image,
    });

    res.status(201).json(exhibit);
  } catch (err) {
    res.json(err)
  }
}

//전시 리스트 조회
async function getExhibitList(req, res, next) {
  try {
    const contents = await a_exhibitService.searchExhibit();
    res.status(201).json(contents);
  } catch (err) {
    res.json(err)
  }
}

//특정 전시 조회
async function getExhibitById(req, res, next) {
  try {
    const { exhibitId } = req.params;
    const content = await a_exhibitService.searchById(exhibitId);
    res.status(201).json(content);
  } catch (err) {
    res.json(err)
  }
}

//전시 수정 (관리자 페이지)
async function putExhibit(req, res, next) {
  try {
    const { exhibitId } = req.params;

    const {
      exhibitName,
      exhibitAddress,
      price,
      startDate,
      endDate,
      category,
      author,
      information,
    } = req.body;

    const image = req.file.location;

    const content = await a_exhibitService.updateExhibit(exhibitId, {
      exhibitName,
      exhibitAddress,
      price,
      startDate,
      endDate,
      category,
      author,
      information,
      image,
    });

    res.status(201).json(content);
  } catch (err) {
    res.json(err)
  }
}

//전시 삭제 (관리자)
async function deleteExhibit(req, res, next) {
  try {
    const { exhibitId } = req.params;
    const content = await a_exhibitService.deleteExhibit(exhibitId);
    res.status(201).json(content);
  } catch (err) {
    res.json(err)
  }
}

module.exports = {
  postExhibit,
  getExhibitList,
  getExhibitById,
  putExhibit,
  deleteExhibit,
};
