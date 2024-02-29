const { Exhibit, Category } = require("../db");
const pagination = require("../utils/pagination");

// 전시 상세
async function detailhExhibit(exhibitId) {
  const exhibits = await Exhibit.findOne({ _id: exhibitId });

  return exhibits;
}

// 전시 리스트
async function exhibitList(page = 1, perPage = 10) {
  const filter = {};
  const select = "author image exhibitName startDate endDate category";
  const sort = { startDate: -1 };
  const populate = "category";

  const result = await pagination(
    page,
    perPage,
    Exhibit,
    filter,
    select,
    sort,
    populate
  );

  return result;
}

// 카테고리별 전시 조회
async function searchByCategory(category, page = 1, perPage = 10) {
  const filter = { category };
  const select = "author image exhibitName startDate endDate category";
  const populate = { path: "category", select: "category" };

  // pagination 함수를 사용하여 페이지네이션 적용
  const result = await pagination(
    page,
    perPage,
    Exhibit,
    filter,
    select,
    {},
    populate
  );

  return result;
}

// 키워드로 전시조회
async function searchByWord(keyword, page = 1, perPage = 10) {
  const filter = { exhibitName: { $regex: keyword } }; // 대소문자를 구분하지 않는 검색
  const select = "author image exhibitName startDate endDate category";

  // pagination 함수를 사용하여 페이지네이션 적용
  const result = await pagination(page, perPage, Exhibit, filter, select);

  return result;
}

module.exports = {
  detailhExhibit,
  exhibitList,
  searchByCategory,
  searchByWord,
};
