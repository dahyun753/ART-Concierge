// DB에서 가져올 데이터 목록, 현재는 더미데이터로 대체
let author_title = ['이지연, 현내음: 빛과 향기를 담다', '백주미: COMFORT ZONE', '음하영: MY LITTLE', '송현화: LUXURY PLASTIC : #3 Magic Airs'];

let image = [
    'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbLPhlN%2FbtsEyde34xx%2F0pf18lIU5kNPkpWNJ9Bezk%2Fimg.png',
    'https://cdn.imweb.me/thumbnail/20240213/d6d9a9f57fc6a.jpg',
    'https://static.wixstatic.com/media/ab9818_8f4201bf4ce84390bc0eb2111aa4a5c7~mv2.png/v1/fill/w_714,h_714,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/KakaoTalk_20240215_183219107_01.png',
    'http://www.gallerywe.com/wp-content/uploads/2024/02/1.Magic-Airs-130.3x130.jpg'
];

let infolink = ['https://art-map.co.kr/exhibition/view.php?idx=29641', 'https://art-map.co.kr/exhibition/view.php?idx=29641', 'https://art-map.co.kr/exhibition/view.php?idx=29641', 'https://art-map.co.kr/exhibition/view.php?idx=29641'];

let locations = ['하람갤러리/서울', '하람갤러리/서울', '스페이스다온/서울', '스페이스다온/서울'];

let date = ['2024.2.8~2024.5.27', '2024.2.8~2024.5.27', '2024.2.8~2024.5.27', '2024.2.8~2024.5.27'];

// 전시회 목록
const columnLength = author_title.length;
let text = '';

for (let i = 0; i < columnLength; i++) {
    text += `<div class="column" id='listEnd'>`;
    text += `<a href="${infolink[i]}">`;
    text += `<img src="${image[i]}" alt="">`;
    text += `<div class="전시회제목"><a href="${infolink[i]}"><div>${author_title[i]}</div></a></div>`;
    text += `<div class="관람상세"><a href="${infolink[i]}" class="장소">${locations[i]}</a><br><a href="${infolink[i]}" class="기간">${date[i]}</a></div>`;
    text += `</a>`;
    text += `</div>`; // column 요소 닫기
}

// exhibitionColumns 요소에 삽입
document.getElementById('exhibitionColumns').innerHTML = text;
