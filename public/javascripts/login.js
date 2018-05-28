 //先查看是否有本地数据（记住密码）  


 // 登录验证

 $(function() {
     function loginAuth() {
         var username = $("#username").val();
         var password = $("#password").val();


         if (username && password) {
             $(".notice").text("");

             $.ajax({
                 type: "POST",
                 url: '/login/verify',
                 data: {
                     username: username,
                     password: md5(password)
                 },
                 dataType: 'json',
                 success: function(data) {
                     if (data.code == "200") {
                         if (location.hash == "#!/logout") {
                             window.location.href = '#!/index/info';
                         } else {
                             location.reload();
                         }
                     } else {
                         $(".notice").text("用户名和密码不正确");
                     }
                 },
                 error: function() {
                     //  alert("系统错误");
                     console.log('服务器出错');
                     //登录成功后保存session，如果选择了记住密码，再保存到本地  
                     //window.location.href ='../index/index.jsp';  
                     window.location.href = '/index';
                 }
             });
         } else {
             $(".notice").text("请输入用户名和密码");
         }
     }

     $("#login").on("click", function() {
         loginAuth();
     });

 });