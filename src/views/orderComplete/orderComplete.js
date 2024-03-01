import { getDB } from '../indexedDB.js';
const db = await getDB();
const $order = document.querySelector('#order')
const orderItems = [];

cartLoad()
getUserInformation()

$order.addEventListener('click', async () => {
    await getUserInformation();
    placeOrder(orderItems);
}
)

async function clearIndexedDB() {
    try {
        const db = await getDB();
        const transaction = db.transaction('shoppingCart', 'readwrite');
        const objectStore = transaction.objectStore('shoppingCart');
        const clearRequest = objectStore.clear();

        clearRequest.onsuccess = function () {
            console.log('indexedDB가 성공적으로 비워졌습니다.');
        };

        clearRequest.onerror = function (event) {
            console.error('indexedDB를 비우는 중 오류가 발생했습니다:', event.target.error);
        };
    } catch (error) {
        console.error('indexedDB에 접근 중 오류가 발생했습니다:', error);
    }
}
async function getUserInformation() {
    try {
        const response = await axios.get('/api/users/')
        document.querySelector('#delivery-mobile').textContent = response.data.phone;
        document.querySelector('#delivery-name').textContent = response.data.name;
        document.querySelector('#delivery-addr').textContent = response.data.userAddress
        document.querySelector('#detail-addr').textContent = response.data.detailAddress
        document.querySelector('#nameForDelivery').textContent = response.data.name;
    } catch (error) {
        console.error('Error fetching user information:', error);
    }
};

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
    radioBtns.forEach(function (radioBtn) {
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

async function placeOrder(items) {
    const orderInfo = {
        name: document.querySelector('#delivery-name').textContent,
        phone: document.querySelector('#delivery-mobile').textContent,
        userAddress: document.querySelector('#delivery-addr').textContent,
        detailAddress: document.querySelector('#detail-addr').textContent,
        item: items,
    };
    console.log(orderInfo)
    try {
        const response = await axios.post('/api/orders', orderInfo);
        // 성공적으로 처리된 경우
        console.log('주문이 성공적으로 처리되었습니다.', response.data);
        Swal.fire({
            title: '주문 완료',
            text: '주문이 정상적으로 처리되었습니다.',
            icon: 'success',
            confirmButtonColor: '#363636',
            confirmButtonText: '확인',
            timer: 5000, // 3초 동안 알림창을 표시
            timerProgressBar: true // 타이머 프로그레스 바 표시
        }).then(() => {
            clearIndexedDB();
            window.location.href = '/orders'; // 메인 페이지 URL에 맞게 수정
        });

    } catch (error) {
        console.error('주문 처리 중 오류가 발생했습니다.', error);
        // 추가로 할 일이 있다면 이곳에 작성
    }
}



async function cartLoad() {
    const $productList = document.querySelector('#productList');

    try {
        const transaction = db.transaction('shoppingCart', 'readonly');
        const objectStore = transaction.objectStore('shoppingCart');
        const request = objectStore.openCursor();

        request.onsuccess = function (event) {
            const cursor = event.target.result;
            if (cursor) {
                const $listItem = document.createElement('tr');
                // 각 아이템에 대한 HTML 요소를 만들어 목록에 추가합니다.
                $listItem.innerHTML = `
                <td class="td_product">
                <!-- 전시 정보 -->
                <div class="connect_img">
                    <img src=${cursor.value.exhibitImg} alt="" width="100"
                    height="200">
                </div>
                <div class="article_info connect_info">
                    <div class="box_product">
                    <span class="list_info">${cursor.value.exhibitName}</span>
                    </div>
                </div>
                </td>
                <td><span>${cursor.value.price}</span></td>
                <td rowspan="1">
                <span class="box_normal-dlv-amt" data-policy-no="3919">무료</span>
                </td>
                <td class="price"><span>${cursor.value.price}</span></td>`
                console.log($listItem)
                const item = {
                    exhibitId: cursor.value.exhibitId,
                    exhibitName: cursor.value.exhibitName,
                    quantity: cursor.value.quantity,
                    price: cursor.value.price,
                    image: cursor.value.exhibitImg
                };

                orderItems.push(item);

                // 커서를 다음 아이템으로 이동합니다.
                $productList.appendChild($listItem);
                cursor.continue();
            }
        }
    }
    catch {
        request.onerror = function (event) {
            console.error("indexedDB에서 데이터를 읽는 중 오류 발생:", event.target.error);
        };
    }

}

