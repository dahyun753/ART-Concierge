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