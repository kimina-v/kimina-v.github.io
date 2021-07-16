/**
 * 자바스크립트가 로드될 때까지 기다린 후, 화면제어 로직을 처리하는 스크립트의 init 함수를 호출한다.
 */
(function($) {
	var	ScriptInvoker	= function(scriptName) {
		this.scriptName	= scriptName;	// 실행할 스크립트 객체명
		this.timeVar	= undefined;	// timeout 이벤트의 참조 변수
		this.attrValue	= undefined;	// 객체에 전달할 데이터 값
		this.attrName;					// 객체에 생성할 데이터

		/**
		 * script에 전달할 데이터를 설정한다.
		 * @param attrName  변수명
		 * @param attrValue 데이터, Object, string, int 등
		 */
		this.setAttribute	= function(attrName, attrValue) {
			this.attrName	= attrName;
			this.attrValue	= attrValue;
		};

		/**
		 * script의 init를 호출한다.
		 */
		this.invoke	= function() {
			var	self	= this;

			this.timeVar	= setTimeout(function() {
				var	func	= window[self.scriptName];

				if (func) {
					if (self.attrName) {
						func[self.attrName]	= self.attrValue;
					}

					func.init();
					self.clearTime();
				} else {
					self.invoke();
				}
			});
		};

		/**
		 * 타임아웃을 해제한다.
		 */
		this.clearTime	= function() {
			clearTimeout(this.timeVar);
		};
	};

	var	invoker	= {
		/**
		 * Javascript가 로드될 때까지 기다린 후 javascript object가 유효하면 script의 init function을 호출한다.
		 * 화면개발가이드 참조
		 * 
		 * @param scriptName  javascript 객체이름
		 * @param varName  객체에 추가할 변수이름
		 * @param jsonStr 객체에 담을 변수, Object or primitive type
		 */
		invoke : function(scriptName, varName, jsonStr) {
			var	invoker	= new ScriptInvoker(scriptName);
			invoker.setAttribute(varName, jsonStr);
			invoker.invoke();
		}
	};

	window.invoker	= invoker;
})(jQuery);