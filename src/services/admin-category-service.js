const { Category } = require('../db');

// 카테고리 추가 (관리자 페이지)
async function addCategory(newCategory) {
    if(!newCategory) throw new Error ("카테고리명을 입력해주세요!");

    const category = await Category.create(newCategory);
    return category;
};

// 카테고리 리스트 (관리자 페이지)
async function searchCategory() {
    const categories = await Category.find({});
    
    return categories;
};

// 카테고리 수정 (관리자 페이지)
async function updateCategory(categoryId, category) {
    if (!categoryId) throw Error("업데이트에 필요한 category ID가 없습니다");

    const result = await Category.updateOne({ _id: categoryId }, category)

    if (!result) throw new Error("카테고리를 찾지 못했습니다.");

    return result;
};

// 카테고리 삭제 (관리자 페이지)
async function deleteCategory(categoryId) {
    const result = await Category.deleteOne({ _id: categoryId })

    if (!categoryId) throw new Error("일치되는 Id가 없습니다.");

    return result;
};


module.exports = { addCategory, searchCategory, updateCategory, deleteCategory };
