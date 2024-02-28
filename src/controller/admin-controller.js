const adminService = require("../services/admin-service");

// 전시 추가 (관리자 페이지)
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

    const exhibit = await adminService.addExhibit({
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
    // res.status(err.statusCode || 500).json(message: err.message );
    res.json(err);
  }
}

// 전시 리스트 조회 (작가, 이미지, 전시제목, 날짜, 카테고리만) + 카테고리도 함께
async function getExhibitList(req, res, next) {
  try {
    const contents = await adminService.searchExhibit();
    res.status(201).json(contents);
  } catch (err) {
    // res.status(err.statusCode || 500).json(message: err.message );
    res.json(err);
  }
}

// id를 통한 전시 검색 (작가, 이미지, 전시제목, 날짜, 카테고리만) + 카테고리도 함께
async function getExhibitById(req, res, next) {
  try {
    const { exhibitId } = req.params;
    const content = await adminService.searchById(exhibitId);
    res.status(201).json(content);
  } catch (err) {
    // res.status(err.statusCode || 500).json(message: err.message );
    res.json(err);
  }
}

// 전시 수정 (관리자 페이지)
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

    const content = await adminService.updateExhibit(exhibitId, {
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
    // res.status(err.statusCode || 500).json(message: err.message );
    res.json(err);
  }
}

// 전시 삭제 (관리자)
async function deleteExhibit(req, res, next) {
  try {
    const { exhibitId } = req.params;
    const content = await adminService.deleteExhibit(exhibitId);
    res.status(201).json(content);
  } catch (err) {
    // res.status(err.statusCode || 500).json(message: err.message );
    res.json(err);
  }
}

module.exports = {
  postExhibit,
  getExhibitList,
  getExhibitById,
  putExhibit,
  deleteExhibit,
};
