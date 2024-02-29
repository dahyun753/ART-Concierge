import { getDB } from '../indexedDB.js';

const $minusButton = document.querySelector('.minus');
const $plusButton = document.querySelector('.plus');
const $countElement = document.querySelector('.cartCount');
const $addCart = document.querySelector('#addCart')
const db = await getDB();
const $modal = document.querySelector('.modal')
const $modalCheck = document.querySelector('#modalCheck')

$modalCheck.addEventListener('click',()=>{
    $modal.classList.remove('is-active')
})

$minusButton.addEventListener('click', function () {
    var count = parseInt($countElement.innerText);
    if (count > 1) {
        $countElement.innerText = count - 1;
    }
});

// 플러스 버튼 클릭 시
$plusButton.addEventListener('click', function () {
    var count = parseInt($countElement.innerText);
    $countElement.innerText = count + 1;
});

$addCart.addEventListener('click', () => {
    let store = db.transaction('shoppingCart', 'readwrite').objectStore('shoppingCart');
    let addReq = store.add({
        exhibitId : "test",
        exhibitName: document.querySelector('#exhibitName').textContent,
        quantity :document.querySelector('#quantity').textContent ,
        price :document.querySelector('#price').textContent , 
    });
    addReq.addEventListener('success', function (event) {
        console.log(event);
    });
    $modal.classList.add('is-active')

});

const $exhibitionInfo = document.querySelector('#exhibitionInfo');
const exhibitId = '65dea2262f8985a75a3382e1'; // 전시의 실제 ID 값

insertExhibitionName();

async function insertExhibitionName() {
    const res = await fetch(`http://localhost:5001/api/exhibits/${exhibitId}`);
    const data = await res.json(); 

    const exhibitName = data.exhibitName;

    console.log(exhibitName);

    $exhibitionInfo.innerHTML = `
            <span class="column is-one-quarter" style="font-weight: bold;"><strong>제목</strong></span>
            <span class="column">${exhibitName}</span>
        <li class="columns">
            <span class="column is-one-quarter" style="font-weight: bold;"><strong>작가</strong></span>
            <span class="column">트레이시 에민</span>
        </li>
    `;
}
