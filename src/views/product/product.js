// DB에서 가져올 데이터(배열 형식), 현재는 더미데이터로 대체
let ServerData = [
    { author: '이지연, 현내음', title: '빛과 향기를 담다', img: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbLPhlN%2FbtsEyde34xx%2F0pf18lIU5kNPkpWNJ9Bezk%2Fimg.png', infolink: 'https://art-map.co.kr/exhibition/view.php?idx=29641', locations: '하람갤러리/서울', startDate: '2024.2.8', endDate: '2024.2.29' },
    { author: '백주미', title: 'COMFORT ZONE', img: 'https://cdn.imweb.me/thumbnail/20240213/d6d9a9f57fc6a.jpg', infolink: 'https://art-map.co.kr/exhibition/view.php?idx=29641', locations: '하람갤러리/서울', startDate: '2024.2.8', endDate: '2024.2.29' },
    { author: '음하영', title: 'MY LITTLE', img: 'https://static.wixstatic.com/media/ab9818_8f4201bf4ce84390bc0eb2111aa4a5c7~mv2.png/v1/fill/w_714,h_714,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/KakaoTalk_20240215_183219107_01.png', locations: '하람갤러리/서울', startDate: '2024.2.8', endDate: '2024.2.29' },
    { author: '송현화', title: 'LUXURY PLASTIC : #3 Magic Airs', img: 'http://www.gallerywe.com/wp-content/uploads/2024/02/1.Magic-Airs-130.3x130.jpg', locations: '하람갤러리/서울', startDate: '2024.2.8', endDate: '2024.2.29' },

    { author: '송현화', title: 'LUXURY PLASTIC : #3 Magic Airs', img: 'https://static.wixstatic.com/media/9f5a27_fd74172ba0624daa956a0e34b188789d~mv2.jpg/v1/fill/w_1024,h_1024,al_c,q_85,enc_auto/9f5a27_fd74172ba0624daa956a0e34b188789d~mv2.jpg', locations: '하람갤러리/서울', startDate: '2024.2.8', endDate: '2024.2.29' },
    { author: '이지연, 현내음', title: '빛과 향기를 담다', img: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbLPhlN%2FbtsEyde34xx%2F0pf18lIU5kNPkpWNJ9Bezk%2Fimg.png', infolink: 'https://art-map.co.kr/exhibition/view.php?idx=29641', locations: '하람갤러리/서울', startDate: '2024.2.8', endDate: '2024.2.29' },
    { author: '백주미', title: 'COMFORT ZONE', img: 'https://cdn.imweb.me/thumbnail/20240213/d6d9a9f57fc6a.jpg', infolink: 'https://art-map.co.kr/exhibition/view.php?idx=29641', locations: '하람갤러리/서울', startDate: '2024.2.8', endDate: '2024.2.29' },
    { author: '음하영', title: 'MY LITTLE', img: 'https://static.wixstatic.com/media/ab9818_8f4201bf4ce84390bc0eb2111aa4a5c7~mv2.png/v1/fill/w_714,h_714,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/KakaoTalk_20240215_183219107_01.png', locations: '하람갤러리/서울', startDate: '2024.2.8', endDate: '2024.2.29' },
]

// 변수 생성
const numColumn = 4;
const numRows = Math.ceil(ServerData.length / numColumn); //전체 행의 개수

// 전시회 목록 삽입
for (let i = 0; i < numRows; i++) {
    let columnsContainer = document.createElement('div');
    columnsContainer.classList.add('columns'); 

    for (let j = 0; j < numColumn; j++) {
        let dataIndex = i * numColumn + j;
        if (dataIndex < ServerData.length) {
            let data = ServerData[dataIndex];
            let columnContents = `
                <div class="column">
                    <a href="${data.infolink}">
                        <img src="${data.img}" alt="">
                        <div class="exhibitTitle"><a href="${data.infolink}"><div>${data.author}: ${data.title}</div></a></div>
                        <div class="exhibitInfo" id='listEnd'><a href="${data.infolink}" class="locations">${data.locations}</a><br><a href="${data.infolink}" class="date">${data.startDate}~${data.endDate}</a></div>
                    </a>
                </div>`;
            columnsContainer.innerHTML += columnContents;
        }
    }
    
    document.getElementById('exhibitionColumns').appendChild(columnsContainer);
}

