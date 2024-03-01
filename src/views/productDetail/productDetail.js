import { getDB } from '../../../indexedDB.js';

const db = await getDB();
const $minusButton = document.querySelector('.minus');
const $plusButton = document.querySelector('.plus');
const $countElement = document.querySelector('.cartCount');
const $addCart = document.querySelector('#addCart')
const $exhibitionInfo = document.querySelector('#exhibitionInfo');

const currentUrl = window.location.href;
const match = currentUrl.match(/\/exhibits\/productDetail\/([^\/]+)/);
const exhibitId = match[1]

insertExhibitionName();


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
        exhibitId: exhibitId,
        exhibitName: document.querySelector('#exhibitName').textContent,
        quantity: document.querySelector('#quantity').textContent,
        price: document.querySelector('#price').textContent,
        exhibitImg: document.querySelector('#exhibitImg').src,
    });
    addReq.addEventListener('success', function (event) {
        Swal.fire({
            title: '장바구니에 상품을 담았습니다',
            icon: 'success',
            confirmButtonColor: '#363636',
            confirmButtonText: '확인',
        })
    });

});

async function insertExhibitionName() {
    const $exhibitName = document.querySelector('#exhibitName')
    const $price = document.querySelector('#price')
    const $startDate = document.querySelector('#startDate')
    const $endDate = document.querySelector('#endDate')
    const $location = document.querySelector('#location')
    const $exhibitImg = document.querySelector('#exhibitImg')
    const res = await fetch(`/api/exhibits/detail/${exhibitId}`);
    const data = await res.json();
    console.log(data)
    $exhibitName.textContent = data.exhibitName;
    $price.textContent = data.price
    $startDate.textContent = data.startDate
    $endDate.textContent = data.endDate
    $location.textContent = data.exhibitAddress
    $exhibitImg.src = data.image
    console.log(exhibitName);

    $exhibitionInfo.textContent = data.information
}