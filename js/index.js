window.addEventListener('load', function () {
    //1.获取元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    focus.addEventListener('mouseenter', function () {
        //2.鼠标经过，圆点显示出来
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;//清除定时器变量
    })
    focus.addEventListener('mouseleave', function () {
        //3.鼠标离开，圆点隐藏
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = this.setInterval(function () {
            // 手动调用点击事件
            arrow_r.click();
        }, 2000);
    });
    // 动态生成小圆圈，图片有几张，就生成几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        // 创建一个小li
        var li = document.createElement('li');
        // 记录当前小圆圈的索引号 通过自定义属性来做
        li.setAttribute('index', i);
        // 把小li插入到ul中
        ol.appendChild('li');

        // 小圆圈的排他思想，我们可以直接生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function () {
            // 干掉所有人。把所有小li清除current类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            // 留下我自己 当前的小li
            this.className = 'current';
            // 点击小圆圈，移动图片 当然移动的是ul
            //ul的移动距离是小圆圈的索引号乘以图片宽度，注意是负值（往左走）
            // 当我们点击了某个小li 就拿到了当前小li的索引号
            var index = this.getAttribute('index');
            // 当我们点击了某个小li，就把li的这个索引号给num
            num = index;
            // 当我们点击了某个小li，就把li的这个索引号给circle
            circle = index
            animate(ul, -index * focusWidth);
        })
    }
    // 把ol里面的第一个小li设置类名为current
    ol.children[0].className = 'current';
    // 克隆第一张图片（li），放到ul最后面
    var first = ul.children[0].cloneNode(true);
    UL.appendChild(first);
    // 点击右侧按钮，图片滚动一张
    var num = 0;
    // circle控制小圆圈的播放
    var circle = 0;
    // flag节流阀
    var flag = true;
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;//关闭节流阀
            // 如果走到了最后一张复制的图片 此时我们的ul要快速复原 left值改为0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true;//打开节流阀
            })
            // 点击右侧按钮，小圆圈跟着一起变化 可以再声明一个变量控制小圆圈的播放
            circle++;
            // 如果circle==4 说明走到我们克隆的这张图片 我们就复原
            if (circle == ol.children.length) {
                circle = 0;
            }
            // 调用函数
            circleChange();
        }
    });
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;//关闭节流阀
            // 如果走到了最后一张复制的图片 此时我们的ul要快速复原 left值改为0
            if (num == ul.children.length - 1) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';

            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;//打开节流阀
            })
            // 点击右侧按钮，小圆圈跟着一起变化 可以再声明一个变量控制小圆圈的播放
            circle--;
            // 如果circle<0 说明走到我们克隆的这张图片 我们就复原
            // if (circle < 0) {
            //     circle = ol.children.length - 1;
            // }
            circle = circle < 0 ? ol.children.length - 1 : circle;
            // 调用函数
            circleChange();
        }
    });
    function circleChange() {
        // 先清除其余小圆圈的current类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        // 留下当前小圆圈的current类名
        ol.children[circle].className = 'current';
    }
    // 自动播放轮播图
    var timer = this.setInterval(function () {
        // 手动调用点击事件
        arrow_r.click();
    }, 2000);
})
