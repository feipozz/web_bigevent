$(function () {
  getUserInfo();
  var layer = layui.layer;

  $("#btn_out").on("click", function () {
    //是否确认退出
    layer.confirm("确定退出登录？", { icon: 3, title: "提示" }, function (
      index
    ) {
      //do something
      // console.log('ok');
      // 1.清空本地存储token
      localStorage.removeItem("token");

      // 2.重新跳转登录页面
      location.href = "/login.html";
      layer.close(index);
    });
  });
});

// 获取用户的基本信息
function getUserInfo() {
  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    // headers:{
    //     Authorization:localStorage.getItem('token') || ''
    // },
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg("获取用户信息失败！");
      }
      //渲染用户头像
      renderAvatar(res.data);
    },

    //不论成功还是失败，最终都会调用
    // complete: function (res) {
    //   //    console.log('执行了');
    //   //    console.log(res);

    //   //    在complete回调函数中，可以使用res.responseJSON 拿到服务器响应回来的数据
    //   if (
    //     res.responseJSON.status === 1 &&
    //     res.responseJSON.message === "身份验证失败!"
    //   )
    //     //    1.强制清空 token
    //     localStorage.removeItem('token');
    //   // 2.强制跳转到登录页面
    //   location.href = "/login.html";
    // },
  });
}

function renderAvatar(user) {
  // 获取用户名称
  var name = user.nickname || user.username;
  //设置欢迎文本
  $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
  //    按需设置头像
  if (user.user_pic !== null) {
    // 渲染图片头像
    $(".layui-nav-img").attr("src", user.user_pic).show();
    $(".text-avatar").hide();
  } else {
    // 渲染文本头像
    $(".layui-nav-img").hide();
    var first = name[0].toUpperCase();
    $(".text-avatar").html(first).show();
  }
}
