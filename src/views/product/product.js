let data; // 전역 범위에 선언된 data 변수
let key;
let value;
let searchKeyword;

window.onload = async function () {
  //카테고리별 작품(쿼리스트링) 가져오기
  let queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  urlParams.forEach(function (a, b) {
    value = a;
    key = b;
  });

  //변수 생성
  searchKeyword = urlParams.get("word");
  categoryKeyword = urlParams.get("categoryName");
  console.log(value);
  if (key === "word") {
    await searchProductElement(searchKeyword);
  } else if (
    value === "전체" ||
    value === null ||
    value === undefined ||
    value === ""
  ) {
    await insertProductElement();
  } else {
    await filterProductElement(categoryKeyword); //카테고리 id
  }
};

// 검색시 데이터 가져오기
async function searchProductElement(keyword) {
  // 검색어를 서버에 전송하여 필터링된 데이터를 가져오는 함수
  const res = await fetch(
    `http://localhost:5001/api/exhibits/search?word=${keyword}`
  );
  const searchdata = await res.json();

  // numRows 변수 계산
  const numColumn = 4;
  const numRows = Math.ceil(searchdata.length / numColumn);

  const list = document.querySelector(".exhibition-list");

  const addNewContent = () => {
    list.innerHTML = "";

    for (let i = 0; i < numRows; i++) {
      let columnsContainer = document.createElement("div");
      columnsContainer.classList.add("columns");
      columnsContainer.classList.add("is-multiline");

      for (let j = 0; j < numColumn; j++) {
        let dataIndex = i * numColumn + j;
        if (dataIndex < searchdata.length) {
          let data = searchdata[dataIndex];
          let columnContents = `
                        <div class="column is-one-quarter">
                            <a href="/exhibits/productDetail/${data._id}/">
                                <img src="${data.image}" alt="">
                                <div class="exhibitTitle"><a href="/exhibits/productDetail/${data._id}/"><div>${data.author}: ${data.exhibitName}</div></a></div>
                                <div class="exhibitInfo" id='listEnd'><a href="/exhibits/productDetail/${data._id}/" class="date">${data.startDate}~${data.endDate}</a></div>
                            </a>
                        </div>`;
          columnsContainer.innerHTML += columnContents;
        }
      }
      list.appendChild(columnsContainer);
    }
  };

  // 전시회 목록 초기 로드
  addNewContent();

  // 변수 listEnd 초기화
  let listEnd = list.lastElementChild; // 리스트의 끝을 나타내는 요소

  // Intersection Observer 콜백함수
  const onIntersect = async (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 관찰대상은 새로운 데이터를 가져올 때마다 변해야함
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

  // 설정 옵션
  const options = {
    root: null,
    rootMargin: "0px 0px 10px 0px",
    threshold: 0,
  };

  // Intersection Observer 생성 및 관찰 시작
  let observer = new IntersectionObserver(onIntersect, options);
  observer.observe(listEnd);
}

//전체 데이터 가져오기
async function insertProductElement() {
  const res = await fetch("http://localhost:5001/api/exhibits");
  const serverdata = await res.json();

  // numRows 변수 계산
  const numColumn = 4;
  const numRows = Math.ceil(serverdata.length / numColumn);

  const list = document.querySelector(".exhibition-list");

  const addNewContent = () => {
    list.innerHTML = "";

    for (let i = 0; i < numRows; i++) {
      let columnsContainer = document.createElement("div");
      columnsContainer.classList.add("columns");
      columnsContainer.classList.add("is-multiline");

      for (let j = 0; j < numColumn; j++) {
        let dataIndex = i * numColumn + j;
        if (dataIndex < serverdata.length) {
          let data = serverdata[dataIndex];

          let columnContents = `
                        <div class="column is-one-quarter">
                            <a href="/exhibits/productDetail/${data._id}/">
                                <img src="${data.image}" alt="">
                                <div class="exhibitTitle"><a href="/exhibits/productDetail/${data._id}/"><div>${data.author}: ${data.exhibitName}</div></a></div>
                                <div class="exhibitInfo" id='listEnd'><a href="/exhibits/productDetail/${data._id}/" class="date">${data.startDate}~${data.endDate}</a></div>
                            </a>
                        </div>`;
          columnsContainer.innerHTML += columnContents;
        }
      }
      list.appendChild(columnsContainer);
    }
  };

  // Intersection Observer 콜백함수
  const onIntersect = async (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
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

  // 설정 옵션
  const options = {
    root: null,
    rootMargin: "0px 0px 10px 0px",
    threshold: 0,
  };

  // 전시회 목록 초기 로드
  addNewContent();

  // 변수 listEnd 초기화
  let listEnd = list.lastElementChild; // 리스트의 끝을 나타내는 요소

  // Intersection Observer 생성 및 관찰 시작
  let observer = new IntersectionObserver(onIntersect, options);
  observer.observe(listEnd);
}

//카테고리 데이터 가져오기
async function filterProductElement(valuedata) {
  const res = await fetch(
    `http://localhost:5001/api/exhibits/categories/${valuedata}`
  );
  const serverdata = await res.json();

  // numRows 변수 계산
  const numColumn = 4;
  const numRows = Math.ceil(serverdata.length / numColumn);

  const list = document.querySelector(".exhibition-list");

  const addNewContent = () => {
    list.innerHTML = "";

    for (let i = 0; i < numRows; i++) {
      let columnsContainer = document.createElement("div");
      columnsContainer.classList.add("columns");
      columnsContainer.classList.add("is-multiline");

      for (let j = 0; j < numColumn; j++) {
        let dataIndex = i * numColumn + j;
        if (dataIndex < serverdata.length) {
          let data = serverdata[dataIndex];
          let columnContents = `
                        <div class="column is-one-quarter">
                           <a href="/exhibits/productDetail/${data._id}/">
                                <img src="${data.image}" alt="">
                                <div class="exhibitTitle"><a href="/exhibits/productDetail/${data._id}/"><div>${data.author}: ${data.exhibitName}</div></a></div>
                                <div class="exhibitInfo" id='listEnd'><a href="/exhibits/productDetail/${data._id}/" class="date">${data.startDate}~${data.endDate}</a></div>
                            </a>
                        </div>`;
          columnsContainer.innerHTML += columnContents;
        }
      }
      list.appendChild(columnsContainer);
    }
  };

  // Intersection Observer 콜백함수
  const onIntersect = async (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
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

  // 설정 옵션
  const options = {
    root: null,
    rootMargin: "0px 0px 10px 0px",
    threshold: 0,
  };

  // 전시회 목록 초기 로드
  addNewContent();

  // 변수 listEnd 초기화
  let listEnd = list.lastElementChild; // 리스트의 끝을 나타내는 요소

  // Intersection Observer 생성 및 관찰 시작
  let observer = new IntersectionObserver(onIntersect, options);
  observer.observe(listEnd);
}
