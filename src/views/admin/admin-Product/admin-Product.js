window.onload = function() {
    loadProduct();
};

// 상품 데이터 불러오기
function loadProduct() {
    // 상품 데이터 Read(selectAll)
    axios.get('/api/admin/exhibits')
      .then(response => {
        let exhibits_All = response.data.exhibits;
        let table_Body = document.querySelector("#product_List");

        table_Body.innerHTML = '';

        exhibits_All.forEach(exhibit => {
          let author_Data = exhibit.author.split(', ');
          let author_Name = '';
          if (author_Data.length === 1) {
            author_Name = author_Data[0];
          } else {
            author_Name = `${author_Data[0]} 외 ${author_Data.length}명`;
          }

          table_Body.innerHTML += `
            <tr>
              <td id="td_categoryId" class="has-text-centered is-vcentered" style="width:15%">${exhibit.category === null ? '없음' : exhibit.category.category}</td>
              <td class="has-text-centered is-vcentered" style="width:30%">${exhibit.exhibitName}</td>
              <td class="has-text-centered is-vcentered" style="width:25%;"><p>${author_Name}</p></td>
              <td class="has-text-centered is-vcentered"><a href="${exhibit.image}" target="_blank"><img id="exhibit_Image" src="${exhibit.image}" alt=""></a></td>
              <td class="has-text-centered is-vcentered">
                <button id="${exhibit._id}" class="button is-rounded is-small" onclick="product_Modify(this.id)">
                  <p class="has-text-weight-bold is-vcentered">수정</P>
                </button>
                <button id="${exhibit._id}" class="button is-rounded is-small" onclick="product_Delete(this.id)">
                  <p class="has-text-weight-bold is-vcentered">삭제</P>
                </button>
              </td>
            </tr>
          `;
        });
      })
      .catch(error => {
            console.error('에러 발생:', error);
      });
}

// 상품 추가 버튼 클릭
function product_Add(){
    let add_URL = "/admin/exhibitsAdd";

    window.location.href = add_URL;
}

// 상품 수정 버튼 클릭
function product_Modify(productId) {
    let modify_URL = `/admin/exhibitsModify?productId=${productId}`;

    window.location.href = modify_URL;
}

// 상품 삭제 버튼 클릭
function product_Delete(productId) {
    let isConfirmed = confirm('삭제하시겠습니까?');

    if (isConfirmed) {
      
      // 상품 데이터 Delete
      axios.delete(`/api/admin/exhibits/${productId}`)
        .then(response => {
          console.log('Exhibit deleted successfully:', response.data);
          loadProduct();
        })
        .catch(error => {
          console.error('Error deleting Exhibit:', error);
        });
    }
}