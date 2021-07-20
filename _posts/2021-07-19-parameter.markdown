---
title: 매개변수(parameter)
---

<div class="post-stitle">매개변수 넘기기</div>

예를 들어, 버튼 클릭 시 해당 영역으로 이동시킬 경우,

{% highlight bash %}
<button id="about">about btn</button>
<button id="contact">contact btn</button>

//방법1
function toAbout(){
    $('#about').on('click',function(){
        $('html, body').animate({scrollTop:$('.about').position().top},500);
    })
}

function toContact(){
    $('#contact').on('click',function(){
        $('html, body').animate({scrollTop:$('.contact').position().top},500);
    })
}
toAbout()
toContact()

//방법2
$(function(){
    $('#about').on('click',function(){
        $('html, body').animate({scrollTop:$('.about').position().top},500);
    });
    $('#contact').on('click',function(){
        $('html, body').animate({scrollTop:$('.contact').position().top},500);
    })
})
{% endhighlight %}

위와 같은 방법으로 표현 한 것을 줄여보고자 아래와 같은 방법으로 표현 할 수 있고,


{% highlight bash %}
<button id="about">about btn</button>
<button id="contact">contact btn</button>

//방법1
$(function(){
    function toSection(sectionName){
        $('html, body').animate({scrollTop:$(sectionName).position().top},500);
    }
    $('#about').on('click', toSection.bind(null,'.about'));
    $('#contact').on('click', toSection.bind(null,'.contact'));
})

//방법2
$(function(){
    function toSection(sectionName){
        $('html, body').animate({scrollTop:$(sectionName).position().top},500);
    }
    $('#about').on('click', function(){toSection('.about')});
    $('#contact').on('click', function(){toSection('.contact')});
})
{% endhighlight %}

html의 onclick을 사용하여 아래와 같이 더 줄일 수 있다.

{% highlight bash %}
//방법1
<button id="about" onclick="toSection(this.id)">about btn</button>
<button id="contact" onclick="toSection(this.id)">contact btn</button>
function toSection(sectionName){
    $('html, body').animate({scrollTop:$('.'+sectionName).position().top},500);
}

//방법2
<button id="about" onclick="toSection('.about')">about btn</button>
<button id="contact" onclick="toSection('.contact')">contact btn</button>
function toSection(sectionName){
    $('html, body').animate({scrollTop:$(sectionName).position().top},500);
}
{% endhighlight %}

<div class="post-stitle">onclick 여러개 넘기기</div>

{% highlight bash %}
<button id="about" onclick="toSection('.about','텍스트1',this.id)" data-id="id is about" data-name="name is about">about btn</button>
<button id="contact" onclick="toSection('.contact','텍스트2',this.id)" data-id="id is contact" data-name="name is contact">contact btn</button>
function toSection(sectionName,text,sectionId){
    console.log(sectionName,text,sectionId);
    var dataId = $('#'+id).data('id');
    var dataName = $('#'+id).data('name');
    console.log(sectionName,text,sectionId,dataId,dataName)
}
{% endhighlight %}


<hr style="margin-top:30px;">
link : 
[출처](https://www.codeit.kr/community/threads/7437)