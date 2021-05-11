let $imgBox  = $(".imgBox"),
    $img = $imgBox.children('img'),
    $window = $(window)
/**
 * 加载的时机:
 * 1、当页面其他的所有资源都加载完成的时候
 * 2、当页面滚动到其位置的时候，图片完全出现在视野之中
 */
 
// $(document).ready();//dom结构加载完成
$(window).on('load scroll',function(){      //在load和scroll两个事件的时候都会触发;JQuery中事件绑定支持多事件绑定,两个事件触发的时候执行相同的事件;
    if($img.attr('isLoad')==='true'){
        return; //加载过之后不会重新加载
    }
    console.log('ok')
    let $A = $imgBox.outerHeight() + $imgBox.offset().top;
    let $B = $window.outerHeight() + $window.scrollTop()
    if($A<=$B){
        //加载真实图片
        $img.attr('src',$img.attr('data-img'))
        $img.on('load',()=>{
            //加载成功
            // $img.css('display','block')
            console.log('图片加载成功！')
            $img.stop().fadeIn()    //fadeIn是jq中的渐现
        })
        $img.attr('isLoad',true)        //attr存储的自定义属性值都是字符串格式'true'
    }
});