// JavaScript 코드
import { getDB } from '../indexedDB.js';
const db = await getDB();
const $order = document.querySelector('#order')
const orderItems = [];

cartLoad()
getUserInformation()

$order.addEventListener('click', async () => {
    await getUserInformation();
    placeOrder(orderItems);
});

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
        const response = await axios.get('/api/users/');
        console.log(response);
        document.querySelector('#delivery-mobile').textContent= response.data.phone;
        document.querySelector('#delivery-name').textContent = response.data.name;
        document.querySelector('#delivery-addr').textContent = response.data.userAddress;
        document.querySelector('#detail-addr').textContent = response.data.detailAddress;
        document.querySelector('.radio').textContent= response.data.name + "님 배송지";
    } catch (error) {
        console.error('Error fetching user information:', error);
    }
}

function showModal() {
    document.getElementById('myModal').classList.add('is-active');
}

function closeModal() {
    document.getElementById('myModal').classList.remove('is-active');
}

export function execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function (data) {
            document.getElementById('postcode').value = data.zonecode;
            document.getElementById('address').value = data.address;
            document.getElementById('detailA_address').focus();
        }
    }).open();
}

function chk_submit() {
    var deliveryName = document.querySelector('input[name="title"]').value;

    var newDeliveryOption = document.createElement('div');
    newDeliveryOption.classList.add('field', 'is-normal', 'center-label');
    newDeliveryOption.innerHTML = `
        <div class="control">
            <label class="radio">
                <input type="radio" name="delivery_choice" value="${deliveryName}">
                ${deliveryName}
            </label>
        </div>
    `;

    var deliveryOptionsContainer = document.querySelector('.field.is-normal');
    deliveryOptionsContainer.parentNode.insertBefore(newDeliveryOption, deliveryOptionsContainer.nextSibling);

    var radioBtns = document.querySelectorAll('input[name="delivery_choice"]');
    radioBtns.forEach(function (radioBtn) {
        radioBtn.checked = false;
    });

    newDeliveryOption.querySelector('input[name="delivery_choice"]').checked = true;
}

function clearFields() {
    document.getElementById("postcode").value = "";
    document.getElementById("address").value = "";
    document.getElementById("detailA_address").value = "";

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
    console.log(orderInfo);
    try {
        const response = await axios.post('/api/orders', orderInfo);
        console.log('주문이 성공적으로 처리되었습니다.', response.data);
        Swal.fire({
            title: '주문 완료',
            text: '주문이 정상적으로 처리되었습니다.',
            icon: 'success',
            confirmButtonColor: '#363636',
            confirmButtonText: '확인',
            timer: 5000,
            timerProgressBar: true
        }).then(() => {
            clearIndexedDB();
            window.location.href = '/orders';
        });
    } catch (error) {
        console.error('주문 처리 중 오류가 발생했습니다.', error);
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
                $listItem.innerHTML = `
                <td class="td_product">
                <div class="connect_img">
                    <img src=${cursor.value.exhibitImg} alt="" width="100" height="200">
                </div>
                <div class="article_info connect_info">
                    <div class="box_product">
                    <span class="list_info">${cursor.value.exhibitName}</span>
                    </div>
                </div>
                </td>
                <td><span>${cursor.value.quantity}</span></td>
                <td rowspan="1">
                <span class="box_normal-dlv-amt" data-policy-no="3919">무료</span>
                </td>
                <td class="price"><span>${cursor.value.price * cursor.value.quantity}₩</span></td>`;
                console.log($listItem);
                const item = {
                    exhibitId: cursor.value.exhibitId,
                    exhibitName: cursor.value.exhibitName,
                    quantity: cursor.value.quantity,
                    price: cursor.value.price,
                    image: cursor.value.exhibitImg
                };

                orderItems.push(item);

                $productList.appendChild($listItem);
                cursor.continue();
            }
        };
    } catch {
        request.onerror = function (event) {
            console.error("indexedDB에서 데이터를 읽는 중 오류 발생:", event.target.error);
        };
    }
}

// 모달을 열기 위한 버튼에 이벤트 리스너 추가
document.getElementById('openModalButton').addEventListener('click', showModal);

// 모달을 닫기 위한 요소에 이벤트 리스너 추가
document.getElementById('myModal').addEventListener('click', function(event) {
    if (event.target.classList.contains('modal-background') || event.target.classList.contains('modal-close')) {
        closeModal();
    }
});

// 초기화 버튼 클릭 이벤트 리스너 추가
document.querySelector('.modal-content .button.is-light').addEventListener('click', clearFields);
