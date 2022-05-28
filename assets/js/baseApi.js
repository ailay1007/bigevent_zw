//实际上，每次用jquery发起ajax请求时，都会先调用jquery.ajaxPrefilter()这个函数，
// 在这个函数中，可以拿到我们给ajax传递的配置对象
$.ajaxPrefilter(function (options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url


    //凡是'/my'开头的路径都要加请求头，我们可以在这里统一设置请求头，这样可以减少设置请求头的次数
    //但是不以'/my'开头的又不需要加请求头，可以用indexof判断下，检索结果为-1则代表不是以my开头的
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token')
        }

        //当success或err回调完成后，会调用complete函数
        options.complete = function (res) {
            console.log(res)
            //res中有一个responseJSON对象，记录了相关信息
            //当身份认证失败后
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                localStorage.removeItem('token')
                location.href = '/login.html'
            }
        }
    }

})

