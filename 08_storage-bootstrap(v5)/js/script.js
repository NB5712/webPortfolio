$(function(){
    //페이지 로드시 사용자 세션 확인
    const savedName = sessionStorage.getItem('name');
    const savedEmail = sessionStorage.getItem('email');

    console.log(savedName, savedEmail);

      if (savedName) {
    updateUserNameDisplay(savedName, savedEmail);

    // 로그인한 상태에서 login.html
    if (window.location.pathname.includes("login.html")) {
      alert("이미 로그인된 상태입니다.");
      window.location.href = "mypage.html"; // 혹은 index.html 등
    }

    // 회원가입 상태에서 signup.html 접근 시 리디렉션
    if (window.location.pathname.includes("signup.html")) {
      alert("이미 회원가입된 상태입니다.");
      window.location.href = "mypage.html"; // 혹은 index.html 등
    }

  } else {
    // 로그아웃 상태에서 mypage.html 접근 시 로그인 페이지로 이동
    if (window.location.pathname.includes("mypage.html")) {
      document.body.innerHTML = ""; // 페이지 내용을 비워 표시 안 되도록
      window.location.href = "login.html";
    }
  }

  /* 
    window.location.pathname.includes('특정문자열');
        => 현재 페이지의 URL 경로(pathname)가 특정 문자열을 포함하는지 여부를 확인하는 메서드
    window.location.pathname
        => 현재 페이지의 URL에서 **경로(path)**만을 반환. 즉, 도메인 뒤에 오는 경로 부분
        => 예) https://www.example.com/mypage.html이라면 pathname은 "/mypage.html"
    includes('특정문자열')
        => 문자열을 포함하는지 확인하고, 포함되면 true를 반환하고, 그렇지 않으면 false를 반환
  */

  // 사용자 이름 표시 업데이트
  function updateUserNameDisplay(name, email) {
    if (name) {
      $("#userNameDisplay").text(`안녕하세요, ${name}님!`);
      $("#logoutButton").show(); // 로그아웃 버튼 표시
      if (window.location.pathname.includes("mypage.html")) {
        $("#userInfo").html(`<p>사용자 이름: ${name}</p><p>메일주소: ${email}</p>`);
        /* 
          출력예시) 사용자 이름: 홍길동(변수내용)
          $("#userInfo").html("<p>텍스트" + 변수 + "</p>");
          $("#userInfo").html("<p>사용자 이름: " + name + "</p>");
          $("#userInfo").html(`<p>텍스트 ${변수}</p>`);
          $("#userInfo").html(`<p>사용자 이름: ${name}</p>`);
        */
      }
    } else {
      $("#userNameDisplay").text("");
      $("#logoutButton").hide(); // 로그아웃 버튼 숨기기
    }
  }

  // 회원가입 폼 제출시 처리
  $("#signupForm").submit(function (event) {
    // 폼의 기본 제출을 막음
    event.preventDefault();

    const name = $("#name").val().trim();
    const email = $("#email").val().trim();

    if (name == "" || email == "") {
      alert("성명과 이메일 주소를 모두 입력해 주세요.");
      return;
    } else {
      // 성명과 이메일을 localStorage에 저장
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);

      // 회원가입 후 로그인 페이지로 이동(필요시 변경)
      window.location.href = "login.html";

      alert("회원가입이 완료되었습니다.");
    }
  });

  // 로그인 버튼 클릭시 처리
  $("#loginButton").on('click',function () {
    const name = $("#name").val().trim();
    const email = $("#email").val().trim();
    console.log(123);
    const savedName = localStorage.getItem("name");
    const savedEmail = localStorage.getItem("email");
    console.log(444);

    if ((savedName == name) && (savedEmail == email)) {
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("email", email);
      updateUserNameDisplay(name, email);
      // 로그인시 마이페이지로 이동(필요시 변경)
      window.location.href = "mypage.html";

      alert("로그인 성공!!");
      /* 
        alert()가 페이지 이동을 방해
        => alert() 함수는 페이지 이동 전에 모달 팝업을 띄움
        페이지 이동이 즉시 이루어져야 한다면, alert()을 페이지 이동 뒤에 호출하는 것이 좋음
        alert() 호출로 인해 페이지 이동이 지연되거나 아예 되지 않을 수 있음
       */
    } else if (savedName != name) {
      alert("사용자 이름을 정확히 입력하세요!");
    } else if (savedEmail != email) {
      alert("사용자 메일주소를 정확히 입력하세요");
    } else {
      alert("사용자 이름과 사용자 메일주소를 정확히 입력하세요");
    }
  });

  // 로그아웃 버튼 클릭시 처리
  $("#logoutButton").on('click',function () {
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");
    updateUserNameDisplay("", "");
    // 로그아웃 후 로그인 페이지로 이동
    window.location.href = "login.html";
  });

   // 회원탈퇴 버튼 클릭시 처리
  $("#signOut").on('click',function () {
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");
    updateUserNameDisplay("", "");
    // 회원탈퇴 후 회원가입 페이지로 이동
    window.location.href = "signup.html";
  });
});


