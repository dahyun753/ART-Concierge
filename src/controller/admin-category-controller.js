const a_categoryService = require("../services/admin-category-service");


//카테고리 추가 (관리자 페이지)
async function postCategory(req, res, next) {
  try {
    const { category } = req.body;

    const newcategory = await a_categoryService.addCategory({ category });
    res.status(200).json(newcategory);
  } catch (err) {
    res.json(err)
  }
}

//카테고리 리스트 조회 (관리자 페이지)
async function getCategory(req, res, next) {
  try {
    const newcategory = await a_categoryService.searchCategory();
    res.status(200).json(newcategory);
  } catch (err) {
    res.json(err)
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
    res.json(err)
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
    res.json(err)
  }
}

module.exports = { postCategory, getCategory, putCategory, deleteCategory };
