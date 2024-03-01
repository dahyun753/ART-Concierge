window.onload = function() {
    loadOrder();
};

  // 날짜 변환 Function
function convertDate(date) {
    const currentTimeInMilliseconds = date;
    const currentTime = new Date(currentTimeInMilliseconds);

    const year = currentTime.getFullYear().toString().padStart(4, '0');
     // 월은 0부터 시작하므로 +1 처리
    const month = (currentTime.getMonth() + 1).toString().padStart(2, '0');
    const day = currentTime.getDate().toString().padStart(2, '0');
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentTime.getSeconds().toString().padStart(2, '0');

    const formattedTime = [`${year}-${month}-${day}`, `${hours}:${minutes}:${seconds}`];
    return formattedTime;
}

// 페이지 로드 시 주문 목록 가져오기
function loadOrder() {
    // 주문 데이터 Read(selectAll)
    axios.get(`/api/admin/orders`)
      .then(response => {
        let order_Data = response.data;
        let order_Area = document.querySelector(".order-container");
        order_Area.innerHTML = '';

        order_Data.forEach(order => {
          let delivery_Status = (order.deliveryStatus === '1') ? "배송준비중" :
                                (order.deliveryStatus === '2') ? "배송시작" :
                                (order.deliveryStatus === '3') ? "배송완료" :
                                undefined;
          
          let order_Date = order.orderedDate.replace("T", " ").replace("Z", "").split(' ')[0];
          let order_Time = order.orderedDate.replace("T", " ").replace("Z", "").split(' ')[1].split('.')[0];

          order_Area.innerHTML += `
            <div class="card" style="margin-bottom: 20px">
                <header class="card-header">
                <p class="card-header-title">
                    주문정보
                </p>
                </header>
                <div class="card-content is-flex">
                <div class="content" style="flex: 1;">
                    <p><strong>주문자명 :</strong> ${order.name}</p>
                    <p><strong>전화번호 :</strong> ${order.phone}</p>
                    <p><strong>주문일자 :</strong> ${order_Date}</p>
                    <p><strong>주문시간 :</strong> ${order_Time}</p>
                    <p id="id${order._id}" class="p_DeliveryStatus"><strong>배송상태 :</strong> ${delivery_Status}</p>
                </div>
                <div class="content" style="flex: 1;">
                    <div class="select is-hovered" style="margin-bottom: 100px">
                    <select id="id${order._id}" class="delivery_Select">
                        <option><p class="has-text-weight-bold">배송준비중</P></option>
                        <option><p class="has-text-weight-bold">배송시작</P></option>
                        <option><p class="has-text-weight-bold">배송완료</P></option>
                    </select>
                    </div>
                    <div>
                    <button id=${order._id} class="button is-primary is-medium mr-6" onclick="order_Modify(this.id)">
                        <p class="has-text-weight-bold">수정</P>
                    </button>
                    <button id=${order._id} class="button is-danger is-medium" onclick="order_Delete(this.id)">
                        <p class="has-text-weight-bold">삭제</P>
                    </button>
                    </div>
                </div>
                </div>
            </div>
            `;
        });
      })
      .catch(error => {
            console.error('에러 발생:', error);
      });
}

// 주문 수정
function order_Modify(id) {
    // 기존의 배송상태
    let old_Delivery = document.querySelector(`p#id${id}.p_DeliveryStatus`);
    let old_DeliveryValue = old_Delivery.textContent.split(':')[1].trim();

    // 새로 선택한 배송상태
    let deliverySelect = document.querySelector(`select#id${id}.delivery_Select`);

    // 기존의 배송상태 값과 새로 선택한 배송상태 값이 다를 경우 Update
    if (old_DeliveryValue !== deliverySelect.value) {
      let delivery_Number = "";
      
      if (deliverySelect.value === '배송준비중') {
        delivery_Number = "1";
      } else if (deliverySelect.value === '배송시작') {
        delivery_Number = "2";
      } else if (deliverySelect.value === '배송완료') {
        delivery_Number = "3";
      }

      // 주문 데이터 Update
      axios.put(`/api/admin/orders/${id}`, { status: delivery_Number })
        .then(response => {
          console.log('Product updated successfully:', response.data);
          // Update가 적용된 주문 데이터 불러오기
          loadOrder();
        })
        .catch(error => {
          console.error('Error updating product:', error);
        });
    } else {
      alert(`선택한 배송상태가 이전 값과 같습니다.`);
    }
}

// 주문 삭제
function order_Delete(id) {
    let isConfirmed = confirm('삭제하시겠습니까?');

    if (isConfirmed) {
      let orderId = id;

      // 주문 데이터 Delete
      axios.delete(`/api/admin/orders/${orderId}`)
        .then(response => {
          console.log('Order deleted successfully:', response.data);
          loadOrder();
        })
        .catch(error => {
          console.error('Error deleting order:', error);
        });
    }
}