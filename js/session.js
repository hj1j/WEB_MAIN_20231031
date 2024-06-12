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

/*function session_set(){ // 세션 저장
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
*/

function session_set(){ //세션 저장(객체)    
    let id = document.querySelector("#typeEmailX");
    let password = document.querySelector("#typePasswordX");
    let random = new Date(); // 랜덤 타임스탬프

    const obj = { // 객체 선언
    id : id.value,
    otp : random
    }

    if (sessionStorage) {
    const objString = JSON.stringify(obj); // 객체 -> JSON 문자열 변환
    let en_text = encrypt_text(objString); // 암호화
    sessionStorage.setItem("Session_Storage_object", objString);
    sessionStorage.setItem("Session_Storage_encrypted", en_text);
} else {
    alert("세션 스토리지 지원 x");
}
}
    


function session_get() { //세션 읽기
    if (sessionStorage) {
        return sessionStorage.getItem("Session_Storage_encrypted");
    } else {
        alert("세션 스토리지 지원 x");
    }
}

//
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
    location.href='../index.html';
}