//点击去注册账号，切换到注册页面
$('#reg').on('click', () => {
    $('.loginAndbox .reg-box').show()
    $('.loginAndbox .login-box').hide()
})
//点击去登录，切换到登录页面
$('#login').on('click', () => {
    $('.loginAndbox .reg-box').hide()
    $('.loginAndbox .login-box').show()
})
//表单正则验证
let span = document.querySelector('.loginAndbox .tip')
//登陆页面
let inps = document.querySelectorAll('.login-box input')
inps[0].addEventListener('change', verifyUname)
function verifyUname() {
    if (!/^[a-zA-Z0-9-_]{6,10}$/.test(inps[0].value)) {
        span.style.display = 'block'
        span.innerHTML = '用户名为6-10位数字或字母'
        return false
    }
    span.style.display = 'none'
    span.innerHTML = ''
    return true
}
inps[1].addEventListener('change', verifyPwd)
function verifyPwd() {
    if (!/^[\S]{6,12}$/.test(inps[1].value)) {
        span.style.display = 'block'
        span.innerHTML = '密码必须6-12位，且不能有空格'
        return false
    }
    span.style.display = 'none'
    span.innerHTML = ''
    return true
}
let btns = document.querySelectorAll('.loginAndbox .btn')
btns[0].addEventListener('click', function (e) {
    if (!verifyUname() || !verifyPwd()) {
        e.preventDefault()
        span.style.display = 'block'
        return span.innerHTML = '必填项格式错误'
    }
})
// 注册页面
let inpts = document.querySelectorAll('.reg-box input')
inpts[0].addEventListener('change', verifyUname1)
function verifyUname1() {
    if (!/^[a-zA-Z0-9-_]{6,10}$/.test(inpts[0].value)) {
        span.style.display = 'block'
        span.innerHTML = '用户名为6-10位数字或字母'
        return false
    }
    span.style.display = 'none'
    span.innerHTML = ''
    return true
}
inpts[1].addEventListener('change', verifyPwd1)
function verifyPwd1() {
    if (!/^[\S]{6,12}$/.test(inpts[1].value)) {
        span.style.display = 'block'
        span.innerHTML = '密码必须6-12位，且不能有空格'
        return false
    }
    span.style.display = 'none'
    span.innerHTML = ''
    return true
}
inpts[2].addEventListener('change', verifyPwdAgain)
function verifyPwdAgain() {
    if (inpts[2].value !== inpts[1].value) {
        span.style.display = 'block'
        span.innerHTML = '两次输入的密码不一致'
        return false
    }
    span.style.display = 'none'
    span.innerHTML = ''
    return true
}

$('#form_reg').on('submit', function (e) {
    e.preventDefault()
    if (!verifyUname1() || !verifyPwd1() || !verifyPwdAgain()) {
        span.style.display = 'block'
        return span.innerHTML = '必填项格式错误'
    }
    $.post('/api/reguser',
        {
            username: $('#form_reg [name = username]').val(), password: $('#form_reg [name = password]').val()
        }, function (req, res) {
            if (res.status !== 0) return console.log(res.message)
            console.log('注册成功')
        })
})
// '注册失败'