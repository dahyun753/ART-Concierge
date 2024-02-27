const express = require("express");
const path = require("path");

const viewsRouter = express.Router();

// 파일명과 html 폴더명 일치 필요
// 페이지별 html, css, js 파일 라우팅

viewsRouter.use("/", serveStatic("main")); 
// viewsRouter.use("/admin-Category", serveStatic("admin-Category"));
viewsRouter.use("/carts", serveStatic("cart"));
// viewsRouter.use("/itemDetail", serveStatic("productDetail"));
viewsRouter.use("/exhibits", serveStatic("product"));
viewsRouter.use("/auth", serveStatic("login"));
viewsRouter.use("/users", serveStatic("mypage"));
viewsRouter.use("/orders", serveStatic("order"));
// viewsRouter.use("/orderComplete", serveStatic("orderComplete"));
viewsRouter.use("/signup", serveStatic("registration"));


viewsRouter.use("/", serveStatic(""));

// ${resource}.html -> 기본 파일로 설정
function serveStatic(resource) {
    const resourcePath = path.join(__dirname, `../views/${resource}`);
    const option = { index: `${resource}.html` };

    return express.static(resourcePath, option);
}

module.exports = viewsRouter;

