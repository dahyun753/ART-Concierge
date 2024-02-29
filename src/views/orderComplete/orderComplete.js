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

  function placeOrder() {
    // 주문 정보를 수집
    const orderData = {
        // 주문자 정보
        name: document.getElementById('').innerText,
        mobile: document.getElementById('').innerText,
        address: document.getElementById('').innerText,
        // 배송 요청사항
        deliveryRequest: document.getElementById('').value,
        // 기타 배송 요청사항
        additionalRequest: document.getElementById('').value,
        // 상품 정보
        product: {
          
        }
    };

    // 주문 데이터를 서버로 전송
    fetch('/order', {
        method: 'POST',
        headers: {
            'Content-Type': ''
        },
        body: JSON.stringify(orderData)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('주문 실패');
    })
    .then(data => {
        // 주문이 성공적으로 처리되었을 때 실행
        console.log('주문이 성공적으로 처리되었습니다.', data);
        // 주문 완료 페이지로 이동 또는 사용자에게 알림을 표시
    })
    .catch(error => {
        // 주문 실패 시 실행
        console.error('주문을 처리하는 동안 오류가 발생했습니다:', error);
        // 사용자에게 오류 메시지를 표시
    });
}
