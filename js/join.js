function addJavascript(jsname) { // 자바스크립트 외부 연동
    var th = document.getElementsByTagName('head')[0];
    var s = document.createElement('script');
    s.setAttribute('type','text/javascript');
    s.setAttribute('src',jsname);
    th.appendChild(s);
}

function join(){ // 회원가입
    let form = document.querySelector("#form_main");
    let f_name = document.querySelector("#firstName");
    let l_name = document.querySelector("#lastName");
    let b_day = document.querySelector("#birthdayDate");
    let gender = document.querySelector("#inlineRadioOptions");
    let email = document.querySelector("#emailAddress");
    let p_number = document.querySelector("#phoneNumber");
    let class_check = document.querySelector(".select form-control-lg");
    
    form.action="../login/join.html";
    form.method = "get";
    
    if(f_name.value.length === 0 || l_name.value.length === 0 || b_day.value.length === 0 || email.value.length === 0 || p_number.value.length === 0){
       alert("회원가입 폼에 필수 정보를 입력해주세요.(성별, 분반 제외)");
       }
        else{
            form.submit();
        }
    }