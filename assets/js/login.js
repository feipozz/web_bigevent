$(function () {
  //点击去注册账号的链接
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });

  //点击去登录的链接
  $("#link_login").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });

  //从 layui 获form 对象

  var form = layui.form;
  var layer = layui.layer;
  //通过form.verify() 函数自定义校验规则
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],

    //验证俩次密码是否一致
    repwd: function (value) {
      //通过形参拿到的是确认密码框中的内容
      //还需要拿到密码框中的内容
      //然后进行对于的判断
      //如果判断失败则return提示消息
      var pwd = $(".reg-box [name=password]").val();
      if (pwd !== value) {
        return "俩次密码不一致！";
      }
    },
  });

  //监听注册表单的提交事件
  $("#form_reg").on("submit", function (e) {
    //1.阻止默认提交行为
    e.preventDefault();

    var data = {
      username: $("#form_reg [name=username]").val(),
      password: $("#form_reg [name=password]").val(),
    };
    //2.发起ajax 的post请求
    $.post("http://ajax.frontend.itheima.net/api/reguser", data, function (
      res
    ) {
      if (res.status !== 0) {
        //   return console.log(res.message);
        return layer.msg(res.message);
      }
      // console.log('注册成功');
      layer.msg("注册成功,请登录");
      // 模拟人的点击行为
      $("#link_login").click();
    });
  });
});
