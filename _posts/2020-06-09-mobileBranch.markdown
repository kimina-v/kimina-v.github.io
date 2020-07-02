mobile 기기 분기

<div class="code-title">script 안드로이드 아이폰 분기</div>

{% highlight bash %}
if (varUA.match("android") != null) { 
    # //안드로이드 일때 처리
} else
 if (varUA.indexOf("iphone")>-1||varUA.indexOf("ipad")>-1||varUA.indexOf("ipod")>-1) {
    # //IOS 일때 처리
} else {
    # // 아이폰, 안드로이드 외 처리
}
{% endhighlight %}