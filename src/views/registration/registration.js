const $searchAddress = document.querySelector('#address')
const $detailAddress = document.querySelector('#sample6_detailAddress')
const $research = document.querySelector('#research')
const $registrationButton = document.querySelector('#registrationButton')
const $emailCheck = document.querySelector('#checkEmail')
const $temp = document.querySelector('#temp')

let isEmailauth = false;

function resetStyles() {
  const allFields = ['email', 'password', 'confirmPassword', 'name', 'detailAddress', 'address', 'phone'];
  allFields.forEach(fieldId => {
    const field = document.querySelector(`#${fieldId}`);
    field.style.borderColor = '';
    field.style.backgroundColor = '';
  });
}

function displayError(fieldId) {
  const errorContainer = document.querySelector(`#${fieldId}`);
  errorContainer.style.borderColor = 'red';
  errorContainer.style.backgroundColor = 'mistyrose';
  errorContainer.placeholder = '입력필드를 채워주세요';
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

$emailCheck.addEventListener('click', async (event) => {
  event.preventDefault()
  const email = document.querySelector('#email')
  if (!isValidEmail(email.value)) {
    displayError('email')
    return;
  }
  try {
    const response = await axios.post('/api/auth/check-email', { email: email.value });
    console.log(response.data);

    $emailCheck.classList.add('is-primary')
    $emailCheck.textContent = '인증번호 전송 완료'
    await axios.post('/api/auth/send-email', { email: email.value })
    $emailCheck.disabled = true
    const authInputDiv = document.createElement('div');
    authInputDiv.innerHTML = `
    <div class="column is-2 ">인증번호<span class="essential">*</span></div>
    <div class="column is-6"><input type="text" class="input is-medium" placeholder="인증번호를 입력해주세요" id="authcode" ></div>
    <div class="column is-1"></div>
    <div class="column is-3"><button class="button is-fullwidth is-medium" id="checkEmail">인증하기</button></div>
      </div>
    `;
    authInputDiv.classList.add('columns', 'is-vcentered')
    $temp.insertAdjacentElement('afterend', authInputDiv);
    const $checkAuthmail = authInputDiv.querySelector('#checkEmail');
    const $authcode = authInputDiv.querySelector('#authcode')
<<<<<<< Updated upstream

    $checkAuthmail.addEventListener('click', async (e) => {
      e.preventDefault()
      
      try{
        const res = await axios.post('/api/auth/match-email', { code: $authcode.value, email: email.value })
        console.log(res)
=======
    $checkAuthmail.addEventListener('click', async (e) => {
      e.preventDefault()

      const res = await axios.post('/api/auth/match-email', { code: $authcode, email: email.value })
      console.log(res.data)

      if (res.data === "인증 코드가 일치하지 않습니다") {
        $checkAuthmail.classList.add('is-danger')
        $checkAuthmail.textContent = '인증실패'
      }
      else {
>>>>>>> Stashed changes
        isEmailauth = true;
        $checkAuthmail.classList.add('is-primary')
        $checkAuthmail.textContent = '인증성공'
      }
<<<<<<< Updated upstream
      catch{
        $checkAuthmail.classList.add('is-danger')
        $checkAuthmail.textContent = '인증실패'
      }
      
=======



>>>>>>> Stashed changes
    })
    const existingEmailCheckElement = document.getElementById('needEmailCheck');
    if (existingEmailCheckElement) {
      existingEmailCheckElement.remove();
    }
    const existingMessage = document.getElementById('emailAlreadyRegistered');
    if (existingMessage) {
      existingMessage.remove();
    }
    email.parentNode.parentNode.classList.remove('is-gapless', 'mb-0')
    email.style.borderColor = ''
    email.style.backgroundColor = ''
    email.setAttribute('readonly', 'true');
  } catch (error) {
    console.log(error)
    // 오류 메시지가 이미 존재하는지 확인
    const existingMessage = document.getElementById('emailAlreadyRegistered');
    if (!existingMessage) {
      email.parentNode.parentNode.classList.add('is-gapless', 'mb-0');
      // 오류 메시지 생성 및 구성
      const message = document.createElement('span');
      message.textContent = "이미 가입 된 이메일 입니다";
      message.style.marginLeft = '144px';
      // span 엘리먼트에 id 추가
      message.id = 'emailAlreadyRegistered';

      // 이메일 입력 필드의 다음에 메시지 삽입
      email.parentNode.parentNode.insertAdjacentElement('afterend', message);
    }
  }
})

$registrationButton.addEventListener('click', async function (event) {
  // Add the rest of the code here, just like in the previous onsubmit handler
  event.preventDefault()
  resetStyles();
  const email = document.querySelector('#email')
  const password = document.querySelector('#password')
  const name = document.querySelector('#name')
  const confirmPassword = document.querySelector('#confirmPassword');
  const phone = document.querySelector('#phone')
  const userAddress = document.querySelector('#userAddress')
  const detailAddress = document.querySelector('#detailAddress')

  if (!isEmailauth) {
    // 오류 메시지가 이미 존재하는지 확인
    const existingMessage = document.getElementById('needEmailCheck');

    if (!existingMessage) {
      console.log(email.parentNode.parentNode);

      // 시각적 피드백을 위해 클래스 및 스타일 추가
      email.parentNode.parentNode.classList.add('is-gapless', 'mb-0');
      email.style.borderColor = 'red';
      email.style.backgroundColor = 'mistyrose';

      // 오류 메시지 생성 및 구성
      const message = document.createElement('span');
      message.textContent = "이메일 중복 확인이 필요합니다";
      message.style.marginLeft = '144px';

      // span 엘리먼트에 id 추가
      message.id = 'needEmailCheck';

      // 이메일 입력 필드의 부모 노드 뒤에 메시지 삽입
      email.parentNode.parentNode.insertAdjacentElement('afterend', message);
    }

    return;
  }

  if (!password.value) {
    displayError('password');
    return;
  }
  if (password.value !== confirmPassword.value) {
    // 오류 메시지가 이미 존재하는지 확인
    const existingMessage = document.getElementById('passwordMismatch');

    if (!existingMessage) {
      confirmPassword.parentNode.parentNode.classList.add('is-gapless', 'mb-0');

      // 시각적 피드백을 위해 스타일 및 클래스 추가
      confirmPassword.style.borderColor = 'red';
      confirmPassword.style.backgroundColor = 'mistyrose';

      // 오류 메시지 생성 및 구성
      const message = document.createElement('span');
      message.textContent = "비밀번호가 일치하지 않습니다";
      message.style.marginLeft = '144px';

      // span 엘리먼트에 id 추가
      message.id = 'passwordMismatch';

      // 확인 비밀번호 입력 필드의 부모 노드 뒤에 메시지 삽입
      confirmPassword.parentNode.parentNode.insertAdjacentElement('afterend', message);
    }

    return;
  }
  else {
    if (document.querySelector('#passwordMismatch')) {
      document.querySelector('#passwordMismatch').remove()
    }
    confirmPassword.parentNode.parentNode.classList.remove('is-gapless', 'mb-0')
    confirmPassword.style.borderColor = ''
    confirmPassword.style.backgroundColor = ''

  }

  if (!name.value) {
    displayError('name');
    return;
  }

  if (!phone.value) {
    displayError('phone');
    return;
  }

  if (userAddress.value === "🔍︎주소 검색") {
    userAddress.style.backgroundColor = "mistyrose"
    userAddress.value = "🔍︎클릭해서 주소를 검색하세요"
  }

  if (!detailAddress.value) {
    displayError('detailAddress');
    return;
  }

  try {
    await axios.post('/api/auth/join', {
      email: email.value,
      password: password.value,
      name: name.value,
      phone: phone.value,
      userAddress: userAddress.value,
      detailAddress: detailAddress.value
    });
    Swal.fire({
      title: '회원 가입이 완료되었습니다',
      text: "다시 로그인 해주세요",
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#363636',
      confirmButtonText: '확인',
    }).then((result) => {
      if (result.value) {
        window.location.href = '/auth'
      }
    })

  } catch (error) {
    console.error('가입 실패:', error.response.data.message);
  }
});

<<<<<<< Updated upstream
function findPostCode() {
=======
function sample6_execDaumPostcode() {
>>>>>>> Stashed changes
  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 각 주소의 노출 규칙에 따라 주소를 조합한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var addr = ''; // 주소 변수
      var extraAddr = ''; // 참고항목 변수

      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else { // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }

      // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
      if (data.userSelectedType === 'R') {
        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraAddr !== '') {
          extraAddr = ' (' + extraAddr + ')';
        }

      }
      $searchAddress.innerHTML = '<input type="text" id="userAddress" class="input is-medium" name="address" readonly>'
      $detailAddress.style.display = 'flex';
      $research.style.display = 'block';
      document.getElementById("userAddress").value = addr;
      // 커서를 상세주소 필드로 이동한다.
      document.getElementById("sample6_detailAddress").focus();
    }
  }).open();
}