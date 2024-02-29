window.onload = function() {
    loadCategory();
    
    // 로그인이 된 경우에만 사용자 정보를 가져오기
    if (localStorage.getItem("loggedIn") === true) {
        showUserInfo();
    }
};

// 사용자 정보 가져오기
function showUserInfo() {

}

// 카테고리 목록을 드롭다운 목록에 렌더링
function loadCategory() {
    let category_List = ['카테고리 1', '카테고리 2', '카테고리 3', '카테고리 4', '카테고리 5']
    category_List.unshift('전체');

    let element_Select = document.querySelector('.navbar-dropdown');
    element_Select.innerHTML = "";

    category_List.forEach(category => {
        const createElement = document.createElement("a");
        createElement.className = 'navbar-item';
        createElement.textContent = category;
        element_Select.appendChild(createElement);
    });
}

