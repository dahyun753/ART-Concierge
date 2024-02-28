const express = require("express");
const path = require("path");

const viewsRouter = express.Router();

viewsRouter.use("/", serveStatic("main")); 

viewsRouter.use("/admin/categories", serveStatic("admin-Category"));
viewsRouter.use("/admin/orders", serveStatic("admin-Order"));
viewsRouter.use("/admin/exhibits", serveStatic("admin-Product"));

viewsRouter.use("/exhibits", serveStatic("product"));
// viewsRouter.use("/productDetail", serveStatic("productDetail"));

viewsRouter.use("/carts", serveStatic("cart"));
viewsRouter.use("/orders", serveStatic("order"));
// viewsRouter.use("/orderComplete", serveStatic("orderComplete"));

viewsRouter.use("/auth/join", serveStatic("registration"));
viewsRouter.use("/auth", serveStatic("login"));
viewsRouter.use("/users", serveStatic("mypage"));

viewsRouter.use("/", serveStatic("")); // 기본 경로

// ${resource}.html -> 기본 파일로 설정
function serveStatic(resource) {
    let option;
    let resourcePath;

    if (resource.includes('admin')) {
        resourcePath = path.join(__dirname, `../views/admin/${resource}`);
    } else {
        resourcePath = path.join(__dirname, `../views/${resource}`);
    }
    option = { index: `${resource}.html` };
    console.log(resourcePath)
    return express.static(resourcePath, option);
}

module.exports = viewsRouter;
