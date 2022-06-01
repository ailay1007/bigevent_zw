let layer = layui.layer
// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)

//给上传图片按钮绑定点击事件
$('#btnChooseImage').click(function () {
    //模拟人的电机行为
    $('#file').click()
})
//当上传了文件时，input文本域就会触发change事件
$('#file').change(function (e) {
    // e.target身上有个files伪数组，length代表选择了几个文件
    console.log(e)
    if (e.target.files.length === 0) {
        return layer.msg('请选择图片！')
    }

    //拿到用户选择的文件
    var file = e.target.files[0]
    // 根据选择的文件，创建一个对应的url地址
    var newImgURL = URL.createObjectURL(file)
    $image.cropper('destroy')// 销毁旧的裁剪区域
        .attr('src', newImgURL)  // 重新设置图片路径 
        .cropper(options)        // 重新初始化裁剪区域
})

//当用户点击确定时，应把选中的图片上传到服务器
$('#btnUpdate').click(function () {
    //拿到裁剪后的图片
    var dataURL = $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        .toDataURL('image/png') //将Canvas画布上的内容，转化为base64 格式的字符串
    //发起ajax请求
    $.ajax({
        method: 'POST',
        url: '/my/update/avatar',
        data: {
            avatar: dataURL
        },
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('头像更换失败！')
            }
            window.parent.getUserInfo()
        }
    })
})