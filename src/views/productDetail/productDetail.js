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
const exhibitId = '65da13c21466236f65c13bb9'; 

insertExhibitionName();

async function insertExhibitionName() {
    const res = await fetch(`http://localhost:5001/api/exhibits/:${exhibitId}`);
    const data = await res.json(); 

    const exhibitName = data.exhibitName;

    console.log(data);

    $exhibitionInfo.innerHTML = `
        <li class="column">
            <span class="column is-one-quarter" style="font-weight: bold;"><strong>제목</strong></span>
            <span class="column">${exhibitName}</span>
        </li>
    `;
}