// 实现注册和登录的切换
$('.login-box a').click(() => {
    $('.login-box').hide()
    $('.reg-box').show()
})
$('.reg-box a').click(() => {
    $('.reg-box').hide()
    $('.login-box').show()
})
// 当导入layui.js后，就会有一个layui对象
// 调用它的form.verify对象，可进行正则校验
let form = layui.form

form.verify({
    //自定义密码的校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 自定义两次密码是否一致的校验规则
    //value为表单的值
    repwd: function (value) {
        let pwd = $('.reg-box [name=password]').val();
        if (pwd !== value) {
            return '两次密码不一致'
        }
    }
})

//调注册的接口
$('#form_reg').on('submit', function (e) {
    e.preventDefault()
    let data = {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val()
    }
    $.post('/api/reguser', data, function (res) {
        //获取layer对象
        let layer = layui.layer
        if (res.status !== 0) {
            return layer.msg(res.message);
        }
        layer.msg('注册成功，请登录')
        //模拟人的点击行为，跳转到登录页面
        $('.reg-box a').click()
    })
})

//调用登录的接口
$('#form_login').submit(function (e) {
    e.preventDefault()
    $.ajax({
        method: 'POST',
        url: '/api/login',
        //快速获取表单的数据
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                console.log(res);
                return layer.msg(res.message)
            }
            layer.msg('登陆成功')
            // 登陆成功后会返回一个认证的token值，我们把这个token存到本地存储中
            localStorage.setItem('token', res.token)
            console.log(res.token)
            //登陆成功则跳转至首页
            location.href = '/index.html'
        }
    })
})

