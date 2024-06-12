//로그아웃

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
    location.href='../Index.html';
}

//const idsave_check = document.getElementById('idSaveCheck');




document.getElementById("logout_btn").addEventListener('click', logout);