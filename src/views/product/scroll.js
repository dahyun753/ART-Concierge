const list = document.querySelector('.exhibition-list'); // 새로운 요소를 추가할 때 사용될 부모 요소
const items = document.querySelectorAll('.column'); // 현재 화면에 출력되고 있는 아이템을 담은 배열

const listEnd = document.querySelector('#listEnd'); // 관찰할 대상(요소)

const options = {
    root: null, // 뷰포트를 기준으로 타켓의 가시성 검사
    rootMargin: '0px 0px 0px 0px', //감지영역 확장
    threshold: 0, // 타켓의 가시성 0%일 때 옵저버 실행
};

let page = 1;

//Intersection Observer의 콜백함수
//entries는 Intersection Observer가 관찰하는 대상들의 집합
///isIntersecting 대상 요소가 교차되었는지 여부를 나타내는 불리언
const onIntersect = async (entries, observer) => {
    //만약 현재 반복 중인 요소가 Intersection Observer의 타겟 요소와 교차하고 있을 때 내부의 코드를 실행
    entries.forEach(async (entry) => { //루프문 비동기 처리
        if (entry.isIntersecting) { 
            page++;
            // 새로운 내용 가져오는 함수
            await addNewContent(); 
        } 
    });
};

const observer = new IntersectionObserver(onIntersect, options); // IntersectionObserver 생성
observer.observe(listEnd); // 관찰할 대상(요소) 등록


// 백엔드 통신X 일단 데이터 복사해서 사용, 백엔드 통신시 비동기 문법 사용 데이터 받은후 처리
const addNewContent = () => {
    const newRow = document.createElement('div');
    newRow.classList.add('columns'); // 새로운 열 추가
    items.forEach(item => {
        const newItem = item.cloneNode(true);
        newRow.appendChild(newItem); // 새로운 열에 아이템 추가
    });
    list.appendChild(newRow); // 새로운 열을 전체 리스트에 추가
};
