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
        
                    if (cookie_name[0] == "popupYN") {
                        return cookie_name[1];
                    }
                }
            }
            return;

        loginForm.submit();
    };
document.getElementById("login_btn").addEventListener('click', check_input);

 