//DB와 데이터 연결시 삭제?
const list = document.querySelector('.exhibition-list'); // 새로운 요소를 추가할 때 사용될 부모 요소
const items = document.querySelectorAll('.column'); // 현재 화면에 출력되고 있는 아이템을 담은 배열
//

const options = {
    root: null, 
    rootMargin: '0px 0px 10px 0px', 
    threshold: 0.7, 
};

let page = 1;
let observer;

// 새로운 내용 가져오는 함수
//cloneNode 대신 DB 데이터 연결
const addNewContent = () => {
    const newRow = document.createElement('div');
    newRow.classList.add('columns'); 
    items.forEach(item => {
        const newItem = item.cloneNode(true);
        newRow.appendChild(newItem); // 새로운 열에 아이템 추가
    });
    list.appendChild(newRow); // 새로운 열을 전체 리스트에 추가
};

// Intersection Observer 콜백함수
const onIntersect = async (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            page++;
            //관찰대상은 새로운 데이터를 가져올 때마다 변해야함
            addNewContent();
            // 기존 Observer 해제
            observer.disconnect();
            // 새로운 listEnd 요소 가져오기
            listEnd = list.lastElementChild;
            // 다시 Intersection Observer로 관찰 대상을 설정
            observer.observe(listEnd);
        }
    });
};

let listEnd = list.lastElementChild; // 리스트의 끝을 나타내는 요소
observer = new IntersectionObserver(onIntersect, options);
observer.observe(listEnd);
