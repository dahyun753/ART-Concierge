const $registrationButton = document.querySelector('#registrationButton');
const $loginForm = document.querySelector('#loginForm')
const $failModal = document.querySelector('.modal')
const $closeModalButton = document.querySelector('#closeModal')

$closeModalButton.addEventListener('click',()=>{
  $failModal.classList.remove('is-active');
})
$registrationButton.addEventListener('click', (event) => {
  //회원 가입 버튼 클릭시 회원 가입 페이지로 이동 
  window.location.href = '/auth/join';
});

$loginForm.onsubmit = async function (event) {
  event.preventDefault();

  // 폼 요소에서 이메일과 비밀번호 값 가져오기
  const email = this.email.value;
  const password = this.password.value;
  console.log(email)

  try {
    // 서버로 로그인 요청을 보냄
    const response = await axios.post('/api/auth', { email, password });

    // 로그인 성공 시 처리
    console.log('로그인 성공!');
    console.log('사용자 정보:', response.data.user);

  
    window.location.href = '/'; // 로그인 후 이동할 페이지

  } catch (error) {
    // 로그인 실패 시 처리 
    $failModal.classList.add('is-active');
    console.error('로그인 실패:', error.response.data.message);
  }
};
