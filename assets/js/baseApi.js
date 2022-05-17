//实际上，每次用jquery发起ajax请求时，都会先调用jquery.ajaxPrefilter()这个函数，
// 在这个函数中，可以拿到我们给ajax传递的配置对象
$.ajaxPrefilter(function (options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url
    console.log(options.url)
})