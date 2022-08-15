const openModalButton=document.querySelector('#userIcon');
const signInUpModal=document.querySelector('.signIn_signUp-modal')
const backPageButton=document.getElementById('backPage');
const signUpModal=document.querySelector('.signUp_modal')
const signUpButton=document.querySelector('#signUp');
const signInModal=document.querySelector('.signIn_modal');
const signInButton=document.querySelector('#signIn');
const signUpBtnAn=document.querySelector('#signupbutton');
const signInBtnAn=document.querySelector('#signinbutton');
//OPEN SIGN IN/UP BUTTON MODAL
const openModal=()=>{
    signInUpModal.classList.add('show','height-animation');
    backPageButton.classList.add('show');
    signUpButton.style.display='block';
    signInButton.style.display='block';
    signInUpModal.classList.remove('closeModal-animation');
    signInBtnAn.classList.remove('button-animation');
    signUpBtnAn.classList.remove('button-animation');
}
openModalButton.addEventListener('click', openModal);

//When click back arrow icon close modal
const closeModal=()=>{
     backPageButton.classList.remove('show');
     signUpModal.classList.remove('show');
     signInModal.classList.remove('show');
     signUpButton.style.display='none';
     signInButton.style.display='none';
     signInUpModal.classList.remove('height-animation');
     signInUpModal.classList.add('closeModal-animation');
     setTimeout(hiddenAllModal,500);
}
backPageButton.addEventListener('click', closeModal);

//OPEN SIGN UP MODAL

const openSignUpModal=()=>{
    signUpModal.classList.add('show');
    
    buttonsAnimation();
}
signUpButton.addEventListener('click', openSignUpModal);

const openSignInModal=()=>{
    signInModal.classList.add('show');
    buttonsAnimation();
}
signInButton.addEventListener('click', openSignInModal);

const hiddenButton =()=>{
    signUpButton.style.display='none';
    signInButton.style.display='none';
}
const buttonsAnimation  =()=>{
    signInBtnAn.classList.add('button-animation');
    signUpBtnAn.classList.add('button-animation');
    setTimeout(hiddenButton,300);
}

const hiddenAllModal  =()=>{
   signInUpModal.classList.remove('show');
}




