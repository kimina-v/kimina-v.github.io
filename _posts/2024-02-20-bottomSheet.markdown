---
title: 아이폰 스크롤(IOS SCROLL)
---

<div class="post-stitle">스크롤이 느릴때</div>

기본적으로 모바일 사파리에서는 클릭 이벤트 발생 후 실제 이벤트 트리거까지 300ms의 지연이 있다고 한다.
그 이유는 사용자의 이벤트가 더블클릭을 통한 스케일 업인지 아니면 그냥 클릭인지를 확인하기 위해서.

메타태그에서 뷰포트 설정시 스케일 설정을 제거하고, css를 통해 빠른 탭 동작임을 선언할 수 있다.

{% highlight bash %}
<meta name="viewport" content="width=device-width, user-scalable=no">
html {
	-ms-touch-action: manipulation;
	touch-action: manipulation;
}
{% endhighlight %}

<div class="post-stitle">스크롤이 부드럽지 않을 때</div>

스크롤이 가능한 Class css 추가

{% highlight bash %}
-webkit-overflow-scrolling:touch;
{% endhighlight %}

<div class="post-stitle">fixed에 떨리고 잔상이 나타날 때</div>


{% highlight bash %}
-webkit-transform:translateZ(0)
{% endhighlight %}

<div class="post-stitle">페이지 상/하단 도달 시 바운스 효과가 싫을 때</div>

{% highlight bash %}
//상자의 스크롤 경계에 도달하면 기본 페이지가 스크롤되기 시작
overscroll-behavior:auto;

//스크롤 체인을 방지, 요소에서 시작된 스크롤은 상위 요소로 전달 되지않음,  iOS의 바운스효과 (러버밴딩 효과) 있음
overscroll-behavior:contain;

//스크롤 체인을 방지, 요소에서 시작된 스크롤은 상위 요소로 전달 되지않음,  iOS의 바운스효과 (러버밴딩 효과) 없음
overscroll-behavior:none;
{% endhighlight %}

overscroll-behavior:contain; 의 경우는 레이어 팝업시 container에 position:fixed 사용 없이 가능 할 듯..


<hr style="margin-top:30px;">
