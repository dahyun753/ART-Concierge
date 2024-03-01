const response = await axios.get('/api/orders');
const orderData = response.data;
console.log(orderData)
// 데이터를 HTML에 표시하는 함수
function displayOrderInfo(order) {
  const tableBody = document.querySelector('#tableBody')

  const newRow = document.createElement('tr');
  newRow.style.height = '130px';
  newRow.innerHTML = `
    <td>
      <a>
        <img class="image" src="${order.item[0].image}" alt="상품 이미지" width="50px" height="50px">
      </a>
    </td>
    <td>${order.item[0].exhibitName}</td>
    <td>${order.orderedDate}</td>
    <td>
      주문 금액<br>
      수량 : ${order.item[0].quantity}개
    </td>
    <td>
    <div class="container has-text-centered">
    <span id="deliveryStatusText">
        ${order.deliveryStatus === '1' ? '배송 준비중' : ''}
        ${order.deliveryStatus === '2' ? '배송 시작' : ''}
        ${order.deliveryStatus === '3' ? '배송 완료' : ''}
    </span>
    <br>
    <button id="cancelButton" data-exhibit-id="${order.item[0].exhibitId}" class="button" style="display: ${order.deliveryStatus === '1' ? 'inline-block' : 'none'}">주문 취소</button>
</div>
    </td>
  `;
  const $cancelButton = newRow.querySelector('#cancelButton')
  $cancelButton.addEventListener('click',async()=>{
    try{
      await axios.delete('/api/orders/')
      Swal.fire({
        title: '주문이 취소 되었습니다',
        icon: 'success',
        confirmButtonColor: '#363636',
        confirmButtonText: '확인'
      }).then(()=>{
        location.reload();
      })
    }
    catch{

    }
    
  })
  tableBody.appendChild(newRow);
}

// 각 주문 정보를 반복하며 HTML에 추가
orderData.forEach(displayOrderInfo);

