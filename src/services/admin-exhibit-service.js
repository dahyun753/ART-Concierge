const { Exhibit, Category } = require("../db");
const pagination = require("../utils/pagination");

//전시 추가
async function addExhibit(content) {

  const exhibit = await Exhibit.create(content);
  return exhibit;
}

//전시 리스트 조회
async function searchExhibit() {
  const exhibits = await Exhibit.find({})
    .select("author image exhibitName startDate endDate category")
    .populate("category", "category"); // 전시의 카테고리 이름 가져오기
  const categories = await Category.find({}); // 모든 카테고리 이름 가져오기

  return { exhibits };
}

//전시 조회
async function searchById(exhibitId) {
  const exhibit = await Exhibit.findOne({ _id: exhibitId })
    .select("author image exhibitName startDate endDate category")
    .populate("category", "category"); // 전시의 카테고리 이름 가져오기

  return exhibit;
}

// 전시 수정
async function updateExhibit(exhibitId, content) {
  try {
    if (!exhibitId) throw new Error("업데이트에 필요한 전시 ID가 없습니다");

    const result = await Exhibit.updateOne({_id: exhibitId}, content
    );

    if (!result) throw new Error("전시를 찾지 못했습니다.");

    return result;
  } catch (error) {
    throw new Error(`전시 업데이트 중 오류 발생: ${error.message}`);
  }
}

//전시 삭제
async function deleteExhibit(exhibitId) {
  const result = await Exhibit.deleteOne({ _id: exhibitId });

  if (!exhibitId) throw new Error("일치되는 Id가 없습니다.");
  return result;
}

module.exports = {
  addExhibit,
  searchExhibit,
  searchById,
  updateExhibit,
  deleteExhibit,
};
