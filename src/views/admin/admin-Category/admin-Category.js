window.onload = function() {
    loadCategory();
};
  
// 페이지 로드 시 카테고리 목록 렌더링
function loadCategory() {
    // 카테고리 데이터 Read
    axios.get('/api/admin/categories')
    .then(response => {
        let category_All = response.data;
        let table_Body = document.querySelector("#category_List");
        table_Body.innerHTML = '';

        for (let category_One of category_All) {
        table_Body.innerHTML += `
            <tr>
            <td class="has-text-centered">${category_One.category}</td>
            <td class="has-text-centered">
                <button id="${category_One._id}" class="button is-rounded is-small" onclick="category_Modify(this)">
                <p class="has-text-weight-bold">수정</P>
                </button>
                <button id="${category_One._id}" class="button is-rounded is-small" onclick="category_Delete(this)">
                <p class="has-text-weight-bold">삭제</P>
                </button>
            </td>
            </tr>
        `;
        }
    })
    .catch(error => {
            console.error('에러 발생:', error);
    });
}

// 카테고리 추가 버튼 클릭 시 Modal 활성화
function category_Add() {
    let modal = document.getElementById('add_Modal');
    modal.className = "modal is-active";  
}

// 카테고리 수정 버튼 클릭 시 Modal 활성화
function category_Modify(element) {
    let modal = document.getElementById('modify_Modal');
    modal.className = "modal is-active";  

    let categoryId = element.id;
    let categoryName = element.parentNode.previousElementSibling.textContent;

    let input_Modify = document.querySelector('.modify_Input');

    input_Modify.placeholder = categoryName;
    input_Modify.value = categoryName;
    input_Modify.id = categoryId;
}

// 카테고리 삭제 버튼 클릭 이벤트
function category_Delete(element) {
    const isConfirmed = confirm('삭제하시겠습니까?');

    if (isConfirmed) {
        let categoryId = element.id;
        
        // 카테고리 데이터 deleteOne
        axios.delete(`/api/admin/categories/${categoryId}`)
        .then(response => {
            console.log('Category deleted successfully:', response.data);
            loadCategory();
        })
        .catch(error => {
            console.error('Error deleting category:', error);
        });
    }
}

// Modal 확인 버튼 클릭 시 발생하는 이벤트
function category_Submit(id) {
    let input_Data;
    let modal;
    
    // 클릭한 버튼이 추가 Modal의 Submit 버튼일 경우
    if (id === "submit_Add") {
        input_Data = document.querySelector('.input.add_Input').value;

        if (input_Data === '') {
            alert('추가할 카테고리를 입력하세요');
        } else {
            document.querySelector('.input.add_Input').value = "";
            modal = document.getElementById('add_Modal');

            alert('추가 완료');

            // 카테고리 데이터 Create
            axios.post('/api/admin/categories', { category_name: input_Data, category: input_Data })
                .then(response => {
                    console.log('Product added successfully:', response.data);
                    loadCategory();
                })
                .catch(error => {
                    console.error('Error adding product:', error);
                });
        }
    // 클릭한 버튼이 수정 Modal의 Submit 버튼일 경우
    } else if(id === 'submit_Modify') {
        // 카테고리 ID
        input_Id = document.querySelector('.input.modify_Input').id;
        // 수정한 카테고리명
        input_Data = document.querySelector('.input.modify_Input').value;
        // 기존 카테고리명
        old_Category = document.querySelector('.input.modify_Input').placeholder;

        // 기존 카테고리명과 수정한 카테고리명이 동일한 경우
        if (old_Category === input_Data) {
            alert('기존의 카테고리명과 동일하므로 변경 불가')
        } else {
            document.querySelector('.input.modify_Input').value = "";
            modal = document.getElementById('modify_Modal');
            
            // 카테고리 데이터 Update
            axios.put(`/api/admin/categories/${input_Id}`, { categoryId:input_Id, category: input_Data })
                .then(response => {
                    console.log('Product updated successfully:', response.data);
                    loadCategory();
                })
                .catch(error => {
                    console.error('Error updating product:', error);
                });
        }
    }
    modal.className = 'modal';
}

// Modal의 취소 버튼
function category_Cancel(id) {
    // Modal 비활성화
    let modal;
    if (id === "cancel_Add") {
        modal = document.getElementById('add_Modal');
    } else if(id === 'cancel_Modify') {
        modal = document.getElementById('modify_Modal');
    }
    modal.className = 'modal';
}