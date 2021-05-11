#### 图片懒加载

- 前端性能优化的重要方案，通过图片或者数据的延迟加载，可以加快页面加载速度，第一次加载的速度变快，并且只有滑动到图片部分才会进行加载
- 处理方案
  - 将所有需要延迟加载的图片用一个盒子包起来，设置宽高和默认的占位图
  - 开始让所有的image的src为空，将图片真实地址放到image的自定义属性上，让img隐藏
  - 等到所有的其他资源加载完成之后我们才开始去加载图片
  - 对于有很多图片，当页面滚动的时候，当前图片完全显示出来后，再加载图片

![](https://img-blog.csdnimg.cn/20210511104945485.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM0MjczMDU5,size_16,color_FFFFFF,t_70)

- 单张图片懒加载

```shell
//html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>图片懒加载</title>
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        .imgBox{
            margin: 1000px auto;
            width: 300px;
            height: 200px;
            overflow: hidden;
            background: pink;
        }
        .imgBox img{
            width: 100%;
        }
    </style>
</head>
<body>
    <div class="imgBox">
        <img src="" alt="懒加载" data-img="https://gss0.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/3ac79f3df8dcd100bbd10c8e738b4710b8122fcb.jpg"/>
    </div>
    <script src="node_modules/jquery/dist/jquery.min.js"></script>
    <script src="./delayImg.js"></script>
</body>
</html>

```

```shell
//delayImg.js
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
```

![](https://img-blog.csdnimg.cn/20210511110612942.gif)



- 多图片懒加载

```shell
//html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>多图片懒加载</title>
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        .container{
           width: 800px;
           margin: 0 auto;
        }
        .imgBox{
            margin: 0px auto;
            width: 300px;
            height: 200px;
            overflow: hidden;
            background: pink;
            margin-bottom: 20px;
        }
        .imgBox img{
            width: 100%;

        }
    </style>
</head>
<body>
    <div class="container">
        <div class="imgBox">
            <img src="" alt="懒加载" data-img="https://gss0.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/3ac79f3df8dcd100bbd10c8e738b4710b8122fcb.jpg"/>
        </div>
    </div>
    <script src="node_modules/jquery/dist/jquery.min.js"></script>
    <script src="./moredelayImg.js"></script>
</body>
</html>
```

```shell
//moredelayImg.js
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
```





![在这里插入图片描述](https://img-blog.csdnimg.cn/20210511120033321.gif)



