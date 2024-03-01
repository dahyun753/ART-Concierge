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

  if (key === "word") {
    await searchProductElement(searchKeyword);
  } else if (value === "전체 ID" || value === null || value === undefined || value === "") {
    await insertProductElement();
  } else {
    await filterProductElement(categoryKeyword); //카테고리 id
  }
};

// 검색시 데이터 가져오기
async function searchProductElement(keyword) {
  let page = 1;
  let fetchedIds = []; // 이미 가져온 데이터의 ID를 저장할 배열

  const fetchAndUpdateData = async () => {
    const res = await fetch(`http://localhost:5001/api/exhibits/search?word=${keyword}`);
    const serverdata = await res.json();

    const numColumn = 4;
    const numRows = Math.ceil(serverdata.datas.length / numColumn);

    const list = document.querySelector(".exhibition-list");

    for (let i = 0; i < numRows; i++) {
      let columnsContainer = document.createElement("div");
      columnsContainer.classList.add("columns");
      columnsContainer.classList.add("is-multiline");

      for (let j = 0; j < numColumn; j++) {
        let dataIndex = i * numColumn + j;
        if (dataIndex < serverdata.datas.length) {
          let data = serverdata.datas[dataIndex];
          
          // 이미 가져온 데이터인지 확인
          if (!fetchedIds.includes(data._id)) {
            let columnContents = `
              <div class="column is-one-quarter">
                <a href="/exhibits/productDetail/${data._id}/">
                  <img src="${data.image}" alt=""></a>
                  <div class="exhibitTitle">
                    <a href="/exhibits/productDetail/${data._id}/"><div>${data.author}: ${data.exhibitName}</div></a>
                  </div>
                  <div class="exhibitInfo">
                    <a href="/exhibits/productDetail/${data._id}/" class="date">${data.startDate}~${data.endDate}</a>
                  </div>
              </div>`;
            columnsContainer.innerHTML += columnContents;
            fetchedIds.push(data._id); // 이미 가져온 데이터의 ID를 배열에 추가
          }
        }
      }
      list.appendChild(columnsContainer);
    }

    page++; // 페이지 번호 증가
  };

  // 초기 로드 후 데이터 가져오기
  await fetchAndUpdateData();

  // Intersection Observer 설정
  const options = {
    root: null,
    rootMargin: "0px 0px 10px 0px",
    threshold: 0,
  };

  // Intersection Observer 콜백함수
  const onIntersect = async (entries, observer) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        // 새로운 데이터 추가
        await fetchAndUpdateData();
      }
    });
  };

  // Intersection Observer 생성 및 관찰 시작
  let observer = new IntersectionObserver(onIntersect, options);
  observer.observe(document.querySelector('footer'));
}


// 전체 데이터 가져오기
async function insertProductElement() {
  let page = 1;

  const fetchAndUpdateData = async () => {
    const res = await fetch(`http://localhost:5001/api/exhibits?page=${page}&perPage=12`);
    const serverdata = await res.json();
    
    const numColumn = 4;
    const numRows = Math.ceil(serverdata.datas.length / numColumn);

    const list = document.querySelector(".exhibition-list");

    for (let i = 0; i < numRows; i++) {
      let columnsContainer = document.createElement("div");
      columnsContainer.classList.add("columns");
      columnsContainer.classList.add("is-multiline");

      for (let j = 0; j < numColumn; j++) {
        let dataIndex = i * numColumn + j;
        if (dataIndex < serverdata.datas.length) {
          let data = serverdata.datas[dataIndex];
          let columnContents = `
            <div class="column is-one-quarter">
                <a href="/exhibits/productDetail/${data._id}/">
                    <img src="${data.image}" alt=""></a>
                    <div class="exhibitTitle"><a href="/exhibits/productDetail/${data._id}/"><div>${data.author}: ${data.exhibitName}</div></a></div>
                    <div class="exhibitInfo" class="date">${data.startDate}~${data.endDate}</div>
            </div>`;
          columnsContainer.innerHTML += columnContents;
        }
      }
      list.appendChild(columnsContainer);
    }

    page++; 
  };

  // 초기 데이터 로드
  await fetchAndUpdateData();

  // Intersection Observer 설정
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0,
  };

  // Intersection Observer 콜백 함수
  const onIntersect = async (entries, observer) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        await fetchAndUpdateData();
      }
    });
  };

  // Intersection Observer 생성 및 관찰 시작
  let observer = new IntersectionObserver(onIntersect, options);
  observer.observe(document.querySelector("footer"));
}



//카테고리 데이터 가져오기
async function filterProductElement(categoryKeyword) {
  let page = 1;

  const fetchAndUpdateData = async () => {
    const res = await fetch(`http://localhost:5001/api/exhibits/categories/${categoryKeyword}?page=1&perpage=2`);
    
    const serverdata = await res.json();

    const numColumn = 4;
    const numRows = Math.ceil(serverdata.datas.length / numColumn);

    const list = document.querySelector(".exhibition-list");

    for (let i = 0; i < numRows; i++) {
      let columnsContainer = document.createElement("div");
      columnsContainer.classList.add("columns");
      columnsContainer.classList.add("is-multiline");

      for (let j = 0; j < numColumn; j++) {
        let dataIndex = i * numColumn + j;
        if (dataIndex < serverdata.datas.length) {
          let data = serverdata.datas[dataIndex];
          let columnContents = `
            <div class="column is-one-quarter">
                <a href="/exhibits/productDetail/${data._id}/">
                    <img src="${data.image}" alt="">
                </a>
                <div class="exhibitTitle">
                    <a href="/exhibits/productDetail/${data._id}/"><div>${data.author}: ${data.exhibitName}</div></a>
                </div>
                <div class="exhibitInfo">
                    <a href="/exhibits/productDetail/${data._id}/" class="date">${data.startDate}~${data.endDate}</a>
                </div>
            </div>`;
          columnsContainer.innerHTML += columnContents;
        }
      }
      list.appendChild(columnsContainer);
    }

    page++; // 페이지 번호 증가
  };

  // 초기 로드 후 데이터 가져오기
  await fetchAndUpdateData();

  // Intersection Observer 설정
  const options = {
    root: null,
    rootMargin: "0px 0px 10px 0px",
    threshold: 0,
  };

  // Intersection Observer 콜백함수
  const onIntersect = async (entries, observer) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        // 새로운 데이터 추가
        await fetchAndUpdateData();
      }
    });
  };

  // Intersection Observer 생성 및 관찰 시작
  let observer = new IntersectionObserver(onIntersect, options);
  observer.observe(document.getElementById('footer'));
}
