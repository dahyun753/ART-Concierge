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
    value === "전체" || value === null || value === undefined || value === "") {
    await insertProductElement();
  } else {
    await filterProductElement(categoryKeyword); //카테고리 id
  }
};

// 검색시 데이터 가져오기
async function searchProductElement(valuedata) {
  const res = await fetch(`http://localhost:5001/api/exhibits/search?word=${keyword}`);
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
                    <img src="${data.image}" alt=""></a>
                    <div class="exhibitTitle"><a href="/exhibits/productDetail/${data._id}/"><div>${data.author}: ${data.exhibitName}</div></a></div>
                    <div class="exhibitInfo" id='listEnd'><a href="/exhibits/productDetail/${data._id}/" class="date">${data.startDate}~${data.endDate}</a></div>
            </div>`;
          columnsContainer.innerHTML += columnContents;
        }
      }
      list.appendChild(columnsContainer);
    }
  };

  // 전시회 목록 초기 로드
  addNewContent();

  // Intersection Observer 설정
  const options = {
    root: null,
    rootMargin: "0px 0px 10px 0px",
    threshold: 0,
  };

  // Intersection Observer 콜백함수
  const onIntersect = async (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 새로운 데이터 추가
        addNewContent();
      }
    });
  };

  // 초기 로드 후 Intersection Observer 생성 및 관찰 시작
  let observer = new IntersectionObserver(onIntersect, options);
  observer.observe(list.lastElementChild);
}


//전체 데이터 가져오기
async function insertProductElement(valuedata) {
    const res = await fetch(`http://localhost:5001/api/exhibits?page=1&perPage=10`);
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
                      <img src="${data.image}" alt=""></a>
                      <div class="exhibitTitle"><a href="/exhibits/productDetail/${data._id}/"><div>${data.author}: ${data.exhibitName}</div></a></div>
                      <div class="exhibitInfo" id='listEnd'><a href="/exhibits/productDetail/${data._id}/" class="date">${data.startDate}~${data.endDate}</a></div>
              </div>`;
            columnsContainer.innerHTML += columnContents;
          }
        }
        list.appendChild(columnsContainer);
      }
    };
  
    // 전시회 목록 초기 로드
    addNewContent();
  
    // Intersection Observer 설정
    const options = {
      root: null,
      rootMargin: "0px 0px 10px 0px",
      threshold: 0,
    };
  
    // Intersection Observer 콜백함수
    const onIntersect = async (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 새로운 데이터 추가
          addNewContent();
        }
      });
    };
  
    // 초기 로드 후 Intersection Observer 생성 및 관찰 시작
    let observer = new IntersectionObserver(onIntersect, options);
    observer.observe(list.lastElementChild);
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
                      <img src="${data.image}" alt=""></a>
                      <div class="exhibitTitle"><a href="/exhibits/productDetail/${data._id}/"><div>${data.author}: ${data.exhibitName}</div></a></div>
                      <div class="exhibitInfo" id='listEnd'><a href="/exhibits/productDetail/${data._id}/" class="date">${data.startDate}~${data.endDate}</a></div>
              </div>`;
            columnsContainer.innerHTML += columnContents;
          }
        }
        list.appendChild(columnsContainer);
      }
    };
  
    // 전시회 목록 초기 로드
    addNewContent();
  
    // Intersection Observer 설정
    const options = {
      root: null,
      rootMargin: "0px 0px 10px 0px",
      threshold: 0,
    };
  
    // Intersection Observer 콜백함수
    const onIntersect = async (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 새로운 데이터 추가
          addNewContent();
        }
      });
    };
  
    // 초기 로드 후 Intersection Observer 생성 및 관찰 시작
    let observer = new IntersectionObserver(onIntersect, options);
    observer.observe(list.lastElementChild);
  }
  