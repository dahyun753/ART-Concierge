const $joinNow = document.querySelector('#joinNow')
const $artList = document.querySelector('#artList')

$artList.addEventListener('click',()=>{
  window.location.href = '/exhibits'
})

$joinNow.addEventListener('click',()=>{
  if(token){
    window.location.href = '/exhibits'
  }
  else{
    window.location.href = '/auth/join'
  }
})