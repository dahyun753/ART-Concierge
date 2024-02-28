document.addEventListener('DOMContentLoaded', function () {
    var minusButton = document.querySelector('.minus');
    var plusButton = document.querySelector('.plus');
    var countElement = document.querySelector('.cartCount');

    // 마이너스 버튼 클릭 시
    minusButton.addEventListener('click', function () {
        var count = parseInt(countElement.innerText);
        if (count > 0) {
            countElement.innerText = count - 1;
        }
    });

    // 플러스 버튼 클릭 시
    plusButton.addEventListener('click', function () {
        var count = parseInt(countElement.innerText);
        countElement.innerText = count + 1;
    });
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