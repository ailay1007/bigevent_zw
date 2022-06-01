let form = layui.form
let layer = layui.layer
form.verify({
    nickname: function (value) {
        if (value.length > 6) {
            return '用户昵称必须为1~6个字符'
        }
    }
})
initUserInfo()
function initUserInfo() {
    // 发起获取用户的基本信息的请求
    $.get({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            // 调用layui中的form.val()快速为表单赋值
            //第一个参数是被赋值的form表单，它的lay-filter的属性值
            //第二个参数是要渲染的数据
            form.val('UserInfo', res.data)
        }
    })
}

//给重置按钮绑定点击事件
$('#btnReset').click(function (e) {
    //先阻止重置按钮默认的重置功能
    e.preventDefault()
    //其实就是重新将用户的信息展示到表单中
    initUserInfo()
})
//提交修改事件
$('.layui-form').submit(function (e) {
    e.preventDefault()
    $.ajax({
        method: 'POST',
        url: '/my/userinfo',
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            //成功之后
            //1、提示成功
            layer.msg('信息更新成功！')
            // 2、当更新用户昵称之后，应该把用户昵称更新到头像区域
            //更新信息的user_info页面其实对于整个index页面而言，是由ifranme创建出来的一个子页面
            //只要在这个子页面调用父页面渲染用户头像信息的函数就行
            //window指向当前的user_info页面，window.parent也就是整个index窗口
            window.parent.getUserInfo()
        }
    })
})
