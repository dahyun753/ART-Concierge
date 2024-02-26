// 모달 열고 닫기
function showModal() {
    document.getElementById('myModal').classList.add('is-active');
}

function closeModal() {
    document.getElementById('myModal').classList.remove('is-active');
}

// 우편번호 팝업창 열기
function execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function (data) {
            // 선택한 주소 정보를 가져와서 우편번호와 주소 필드에 입력
            document.getElementById('postcode').value = data.zonecode; // 우편번호
            document.getElementById('address').value = data.address; // 도로명 주소
            document.getElementById('detailA_address').focus(); // 상세 주소 입력란으로 포커스 이동
        }
    }).open();
}

function chk_submit() {
    // 배송지명 입력란에서 값을 가져옴
    var deliveryName = document.querySelector('input[name="title"]').value;

    // 새로운 배송지명 생성
    var newDeliveryOption = document.createElement('div');
    newDeliveryOption.classList.add('field', 'is-normal', 'center-label'); // 추가된 부분
    newDeliveryOption.innerHTML = `
        <div class="control">
            <label class="radio">
                <input type="radio" name="delivery_choice" value="${deliveryName}">
                ${deliveryName}
            </label>
        </div>
    `;

    // 배송지 목록에 새로운 배송지명 추가
    var deliveryOptionsContainer = document.querySelector('.field.is-normal');
    deliveryOptionsContainer.parentNode.insertBefore(newDeliveryOption, deliveryOptionsContainer.nextSibling);

    // 기존의 라디오 버튼들을 선택 해제
    var radioBtns = document.querySelectorAll('input[name="delivery_choice"]');
    radioBtns.forEach(function(radioBtn) {
        radioBtn.checked = false;
    });

    // 만든 라디오 버튼을 선택 상태로 설정
    newDeliveryOption.querySelector('input[name="delivery_choice"]').checked = true;
}

// 주소 입력 필드 초기화
function clearFields() {
    document.getElementById("postcode").value = "";
    document.getElementById("address").value = "";
    document.getElementById("detailA_address").value = "";

    // 배송지명 입력 필드 초기화
    document.getElementsByName("title")[0].value = "";
  }
