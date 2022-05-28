
getUserInfo()
let layer = layui.layer
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                //请求失败，用layui里面的layer.mag进行消息提示
                return layer.msg(res.message)
            }
            //调用渲染用户头像信息的函数，将用户信息传进去
            renderAvatar(res.data)
        },
    })
}

function renderAvatar(user) {
    //nickname是用户昵称，username是创建账户时的用户名
    //name默认是nickname，若无，则用username
    let name = user.nickname || user.username
    //将name渲染到欢迎***中，&nbsp;是空格
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //判断用户是否有头像图片，有的话就将图片渲染到头像区
    //且文字头像区隐藏
    if (user.user_pic !== null) {
        $('.userinfo .layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()

    } else {
        //没有头像，就将用户名的第一个字母当成头像
        // toUpperCase()是将字母转成大写
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
        $('.userinfo .layui-nav-img').hide()
    }
}

//给退出按钮绑定点击事件
$('#logOut').click(function () {
    //layui内置的询问框
    //要退回到登陆页面
    //要清空存到本地存储中的token值
    layer.confirm('确定退出?', { icon: 3, title: '提示' }, function (index) {
        localStorage.removeItem('token')
        location.href = '/login.html'
        layer.close(index);
    });
})

