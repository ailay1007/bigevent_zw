let form = layui.form
let layer = layui.layer
form.verify({
    password: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    //新旧密码不能一致
    samepwd: function (value) {
        if (value === $('[name=oldPwd]').val()) {
            return '新旧密码不能一致'
        }
    },
    repwd: function (value) {
        if (value !== $('[name=newPwd]').val()) {
            return '两次密码不一致'
        }
    }
})

//重置密码的点击事件
$('.layui-form').submit(function (e) {
    e.preventDefault()
    $.ajax({
        method: 'POST',
        url: '/my/updatepwd',
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('密码更新成功')
            $('.layui-form')[0].reset()
        }
    })
})