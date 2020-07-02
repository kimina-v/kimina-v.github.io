css 선택자

<div class="code-title">전체 선택자</div> 

{% highlight bash %}	
 * 
{% endhighlight %}

<div class="code-title">태그 선택자</div> 

{% highlight bash %}
 h1
{% endhighlight %}

<div class="code-title">아이디 선택자</div>

{% highlight bash %}
＃header
{% endhighlight %}

<div class="code-title">클래스 선택자</div>

{% highlight bash %}
.item
{% endhighlight %}

<div class="code-title">후손 선택자</div>

{% highlight bash %}
 header h1
{% endhighlight %}

<div class="code-title">자손 선택자</div> 

{% highlight bash %}
 header > h1
{% endhighlight %}

<div class="code-title">속성 선택자</div> 

{% highlight bash %}
 input[type=text]   
 div[data-role=row]  
 div[data-role|=row] 
 div[data-role^=row] 
 div[data-role$=9]   
 div[data-role*=row] 
{% endhighlight %}

<div class="code-title">동위 선택자</div> 

{% highlight bash %}
 h1 + div
 h1 ~ div
{% endhighlight %}

<div class="code-title">구조 선택자</div>

{% highlight bash %}
 li:first-child
 li:last-child
 li:nth-child(2n+1)
 li:nth-last-child(2n+1)
 h1:first-of-type
 h1:last-of-type
 h1:nth-of-type(2n+1)
 h1:nth-last-of-type(2n+1)
{% endhighlight %}

<div class="code-title">반응 선택자</div>

{% highlight bash %}
 div:active
 div:hover
{% endhighlight %}

<div class="code-title">상태 선택자</div>

{% highlight bash %}
input:checked
input:focus
input:enabled
input:disabled
{% endhighlight %}

<div class="code-title">링크 선택자</div>

{% highlight bash %}
 a:link
 a:visited
{% endhighlight %}

<div class="code-title">문자 선택자</div>

{% highlight bash %}
 p::first-letter
 p::first-line
 p::after
 p::before
 p::selection
{% endhighlight %}

<div class="code-title">부정 선택자</div>

{% highlight bash %}
 li:not(.item)
{% endhighlight %}