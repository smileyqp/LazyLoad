
let $container = $('.container'),
    str = ``,
    $imgBoxs = null,
    $window = $(window)
 
new Array(20).fill().forEach((item)=>{      //new Array(20).fill() 创造长度为20的数组每一项用null填充
    str+='<div class="imgBox"><img src="" alt="懒加载" data-img="https://gss0.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/3ac79f3df8dcd100bbd10c8e738b4710b8122fcb.jpg"/></div>'
})
console.log(str)
$container.html(str);
$imgBoxs = $container.children('.imgBox');

//多张图片延迟加载
$window.on('load scroll',()=>{
    //获取浏览器距离body的距离
    let $B = $window.outerHeight() + $window.scrollTop() 
    console.log($imgBoxs)
    //循环获取每一张图片区域，根据自己距离body的距离计算出里面的图片是否进行加载
    $imgBoxs.each((index,item)=>{
        console.log(index,item)
        let $item = $(item),
            $itemA = $item.outerHeight() + $item.offset().top,
            isLoad = $item.attr('isLoad')
        if($itemA <= $B && isLoad !== 'true'){  //如果这个盒子已经懒加载过依次那么就不再次进行懒加载处理
            $item.attr('isLoad',true);
            $img = $item.children('img')
            $img.attr('src',$img.attr('data-img'))
            $img.on('load',()=>{
                //加载成功
                // $img.css('display','block')
                console.log('图片加载成功！')
                $img.stop().fadeIn()    //fadeIn是jq中的渐现
            })
        }
    });         
})