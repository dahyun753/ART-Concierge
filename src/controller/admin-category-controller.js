const a_categoryService = require("../services/admin-category-service");
const ERRORS = require("../utils/errors");

//카테고리 추가 (관리자 페이지)
async function postCategory(req, res, next) {
  try {
    const { category } = req.body;

    const newcategory = await a_categoryService.addCategory({ category });
    res.status(200).json(newcategory);
  } catch (err) {
    const { statusCode, message } = err.statusCode ? err : ERRORS.BAD_REQUEST;
    res.status(statusCode).json({ message });
  }
}

//카테고리 리스트 조회 (관리자 페이지)
async function getCategory(req, res, next) {
  try {
    const newcategory = await a_categoryService.searchCategory();
    res.status(200).json(newcategory);
  } catch (err) {
    const { statusCode, message } = err.statusCode
      ? err
      : ERRORS.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({ message });
  }
}

//카테고리 수정 (관리자 페이지)
async function putCategory(req, res, next) {
  try {
    const { categoryId } = req.params;
    const { category } = req.body;

    const newcategory = await a_categoryService.updateCategory(categoryId, {
      category,
    });
    res.json(newcategory);
  } catch (err) {
    const { statusCode, message } = err.statusCode ? err : ERRORS.BAD_REQUEST;
    res.status(statusCode).json({ message });
  }
}

//카테고리 삭제 (관리자 페이지)
async function deleteCategory(req, res, next) {
  try {
    const { categoryId } = req.params;
    const { category } = req.body;

    const newcategory = await a_categoryService.deleteCategory(categoryId, {
      category,
    });
    res.json(newcategory);
  } catch (err) {
    const { statusCode, message } = err.statusCode ? err : ERRORS.BAD_REQUEST;
    res.status(statusCode).json({ message });
  }
}

module.exports = { postCategory, getCategory, putCategory, deleteCategory };
