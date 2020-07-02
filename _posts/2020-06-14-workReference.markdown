---
title: 작업 참고
---

<div class="blind">

    <div class="code-title">모바일 스크롤</div>

    {% highlight bash %}

    # EX1
    var handler = function(e) {e.preventDefault();}
    $(window).bind('touchmove', handler); # 터치무브 막기
    $(window).unbind('touchmove', handler); # 터치무브 실행

    # EX2
    $('#content').bind('touchmove',function(evt){
        evt.preventDefault();
    }); # 스크롤방지

    $('#content').unbind('touchmove'); # 스크롤시작

    {% endhighlight %}

    <div class="code-title">각 li에 class 넣기</div>

    {% highlight bash %}

    $('ul li').addClass(function(index){
        return 'item-' + index;
    });

    {% endhighlight %}

</div>

<div class="post-stitle">== vs =--</div>

<code class="code">==</code> : 값만 비교
<code class="code">===</code> : 값과 타입을 비교

{% highlight bash %}
if(undefined == null) {
    console.log(true); 
} else {
    console.log(false);
}
# true

if(undefined === null) {
    console.log(true);
} else {
    console.log(false); 
}
# false
{% endhighlight %}



<div class="post-stitle">모바일 text-indent 버그 (구 LG)</div>

{% highlight bash %}
color:transparent; # 추가.
# 그래도 해결되지 않을 땐.
text-indent:100%;white-space:nowrap;overflow:hidden; # 추가

{% endhighlight %}