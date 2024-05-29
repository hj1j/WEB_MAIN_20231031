const idsave_check = document.getElementById('idSaveCheck');

const check_xss = (input) => {
    // DOMPurify 라이브러리 로드 (CDN 사용)
    const DOMPurify = window.DOMPurify;
            
    // 입력 값을 DOMPurify로 sanitize
    const sanitizedInput = DOMPurify.sanitize(input);
            
    // Sanitized된 값과 원본 입력 값 비교
    if (sanitizedInput !== input) {
        // XSS 공격 가능성 발견 시 에러 처리
        alert('XSS 공격 가능성이 있는 입력값을 발견했습니다.');
        return false;
    }
            
    // Sanitized된 값 반환
    return sanitizedInput;
};
        
    const check_input = () => {         
    const loginForm = document.getElementById('login_form');
    const loginBtn = document.getElementById('login_btn');
    const emailInput= document.getElementById('typeEmailX');
    const passwordInput = document.getElementById('typePasswordX');

    const c = '아이디, 패스워드를체크합니다';
    alert(c);
 
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    const sanitizedPassword = check_xss(passwordValue);
    // check_xss 함수로 비밀번호 Sanitize
    const sanitizedEmail = check_xss(emailValue);
    // check_xss 함수로 비밀번호 Sanitize

    if (emailValue === '') {
        alert('이메일을입력하세요.');
        return false;
    }
    if (passwordValue === '') {
        alert('비밀번호를입력하세요.');
        return false;
    }
    if (emailValue.length < 5) {
    alert('아이디는최소5글자이상입력해야합니다.');
    return false;
    }
    if (passwordValue.length < 12) {
    alert('비밀번호는반드시12글자이상입력해야합니다.');
    return false;
    }
    const hasSpecialChar = passwordValue.match(/[!,@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]+/) !== null;
    if (!hasSpecialChar) {
    alert('패스워드는특수문자를1개이상포함해야합니다.');
    return false;
    }
    const hasUpperCase = passwordValue.match(/[A-Z]+/) !== null;
    const hasLowerCase = passwordValue.match(/[a-z]+/) !== null;
    if (!hasUpperCase || !hasLowerCase) {
    alert('패스워드는대소문자를1개이상포함해야합니다.');
    return false;
    }
    if (!sanitizedEmail) {
        // Sanitize된 비밀번호 사용
        return false;
    }
    if (!sanitizedPassword) {
        // Sanitize된 비밀번호 사용
        return false;
    }

    console.log('이메일:', emailValue);
    console.log('비밀번호:', passwordValue);

    //추가
    if(idsave_check.checked == true) { // 아이디 체크 o
        alert("쿠키를 저장합니다.", emailValue);
        setCookie("id", emailValue, 1); // 1일 저장
        alert("쿠키 값 :" + emailValue);
    }
    else
    { // 아이디 체크 x
        setCookie("id", emailValue.value, 0); //날짜를 0 - 쿠키 삭제
    }
    session_set();  //세션 생성
    loginForm.submit();
};
    
function setCookie(name, value, expiredays) {
    var date = new Date();
    date.setDate(date.getDate() + expiredays);
    document.cookie = escape(name) + "=" + escape(value) + "; expires=" + date.toUTCString() + "; path=/" + ";SameSite=None; Secure";
}
    
function getCookie(name) {
    var cookie = document.cookie;
    console.log("쿠키를 요청합니다.");
    if (cookie !=""){
        var cookie_array = cookie.split("; ");
        for ( var index in cookie_array) {
            var cookie_name = cookie_array[index].split("=");
            if (cookie_name[0] == "id") {//if (cookie_name[0] == "popupYN") {
                return cookie_name[1];
            }
        }
    }
}

function init(){ // 로그인 폼에 쿠키에서 가져온 아이디 입력
    const emailInput = document.getElementById('typeEmailX');
    const idsave_check = document.getElementById('idSaveCheck');
    let get_id = getCookie("id");

    if(get_id) {
    emailInput.value = get_id;  //emailInput.value = get_id;
    idsave_check.checked = true; //idsave_check.checked = true;
    }
    session_check(); // 세션 유무 검사
}

function session_set(){ // 세션 저장
    let session_id = document.querySelector("#typeEmailX"); // DOM 트리에서 ID 검색
    let session_pass = document.querySelector("#typePasswordX"); //DOM 트리에서 pass 검색
    if (sessionStorage){
        let en_text = encrypt_text(session_pass.value);
        sessionStorage.setItem("Session_Storage_id", session_id.value);
        sessionStorage.setItem("Session_Storage_pass", en_text);

    }else {
        alert("로컬 스토리지 지원 x")
    }
} //암호화된 데이터 저장

function session_get() { //세션 읽기
    if (sessionStorage) {
        return sessionStorage.getItem("Session_Storage_pass");
    } else {
        alert("세션 스토리지 지원 x");
    }
}

function session_check() {//세션 검사
    if(sessionStorage.getItem("Session_Storage_id")){
        alert("이미 로그인 되었습니다.");
        location.href='.../login/index_login.html'; //로그인된 페이지로 이동
    }
}
function session_del() {//세션 삭제
    if (sessionStorage) {
        sessionStorage.removeItem("Session_Storage_test");
        alert('로그아웃 버튼 클릭 확인 : 세션 스토리지를 삭제합니다.');
    } else {
        alert("세션 스토리지 지원x");
    }
}

function logout(){
    session_del(); //세션 삭제
    location.href='.../index.html';
}

//암복호화
function encodeByAES256(key, data) {
    const cipher= CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key),{
        iv: CryptoJS.enc.Utf8.parse(""),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    return cipher.toString();
}
function decodeByAES256(key, data){
    const cipher= CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(""),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
return cipher.toString(CryptoJS.enc.Utf8);
}

function encrypt_text(password){
    const k = "key"; // 클라이언트 키
    const rk = k.padEnd(32, " "); // AES256은 key 길이가 32
    const b = password;
    const eb = this.encodeByAES256(rk, b);
    return eb;
    console.log(eb);
}
function decrypt_text(){
    const k = "key"; // 서버의 키
    const rk = k.padEnd(32, " "); // AES256은 key 길이가 32
    const eb = session_get();
    const b = this.decodeByAES256(rk, eb);
    console.log(b);
}

//복호화 함수를 추가
//세션의 암호화된 값을 복호화 수행
function init_logined(){
    if(sessionStorage){
        decrypt_text(); //복호화 함수
    }
    else{
        alert("세션 스토리지 지원x");
    }
}

function addJavascript(jsname) { // 자바스크립트 외부 연동
    var th = document.getElementsByTagName('head')[0];
    var s = document.createElement('script');
    s.setAttribute('type','text/javascript');
    s.setAttribute('src',jsname);
    th.appendChild(s);
}
addJavascript('/js/security.js'); //암복호화 함수
addJavascript('/js/session.js');  //세션 함수
addJavascript('/js/cookie.js'); //쿠키 함수

document.getElementById("login_btn").addEventListener('click', check_input);
document.getElementById("logout_btn").addEventListener('click', logout);