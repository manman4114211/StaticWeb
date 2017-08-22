!function(a){var b={},c={};c.attachEvent=function(b,c,d){return"addEventListener"in a?b.addEventListener(c,d,!1):void 0},c.fireFakeEvent=function(a,b){return document.createEvent?a.target.dispatchEvent(c.createEvent(b)):void 0},c.createEvent=function(b){if(document.createEvent){var c=a.document.createEvent("HTMLEvents");return c.initEvent(b,!0,!0),c.eventName=b,c}},c.getRealEvent=function(a){return a.originalEvent&&a.originalEvent.touches&&a.originalEvent.touches.length?a.originalEvent.touches[0]:a.touches&&a.touches.length?a.touches[0]:a};var d=[{test:("propertyIsEnumerable"in a||"hasOwnProperty"in document)&&(a.propertyIsEnumerable("ontouchstart")||document.hasOwnProperty("ontouchstart")),events:{start:"touchstart",move:"touchmove",end:"touchend"}},{test:a.navigator.msPointerEnabled,events:{start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp"}},{test:a.navigator.pointerEnabled,events:{start:"pointerdown",move:"pointermove",end:"pointerup"}}];b.options={eventName:"tap",fingerMaxOffset:11};var e,f,g,h,i={};e=function(a){return c.attachEvent(document.body,h[a],g[a])},g={start:function(a){a=c.getRealEvent(a),i.start=[a.pageX,a.pageY],i.offset=[0,0]},move:function(a){return i.start||i.move?(a=c.getRealEvent(a),i.move=[a.pageX,a.pageY],void(i.offset=[Math.abs(i.move[0]-i.start[0]),Math.abs(i.move[1]-i.start[1])])):!1},end:function(d){if(d=c.getRealEvent(d),i.offset[0]<b.options.fingerMaxOffset&&i.offset[1]<b.options.fingerMaxOffset&&!c.fireFakeEvent(d,b.options.eventName)){if(a.navigator.msPointerEnabled||a.navigator.pointerEnabled){var e=function(a){a.preventDefault(),d.target.removeEventListener("click",e)};d.target.addEventListener("click",e,!1)}d.preventDefault()}i={}},click:function(a){return c.fireFakeEvent(a,b.options.eventName)?void 0:a.preventDefault()}},f=function(){for(var a=0;a<d.length;a++)if(d[a].test)return h=d[a].events,e("start"),e("move"),e("end"),!1;return c.attachEvent(document.body,"click",g.click)},c.attachEvent(a,"load",f),a.Tap=b}(window);

(function($){
	$.fn.mdater = function(config){
		var input = this;

		//通用函数
		var F = {
			//计算某年某月有多少天
			getDaysInMonth : function(year, month){
			    return new Date(year, month+1, 0).getDate();
			},
			//计算某月1号是星期几
			getWeekInMonth : function(year, month){
				return new Date(year, month, 1).getDay();
			},
			getMonth : function(m){
				return ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'][m];
			}
		}

		//为$扩展一个方法，以配置的方式代理事件
		$.fn.delegates = function(configs) {
		    var el = $(this[0]);
		    for (var name in configs) {
		        var value = configs[name];
		        if (typeof value == 'function') {
		            var obj = {};
		            obj.tap = value;
		            value = obj;
		        };
		        for (var type in value) {
		            el.delegate(name, type, value[type]);
		        }
		    }
		    return this;
		}

		var mdater = {
			value : {
				year : '',
				month : '',
				date : ''
			},
			lastCheckedDate : '',
			_changeMonth : function(add, checkDate){

				//先把已选择的日期保存下来
				this.saveCheckedDate();

				var monthTag = $('.md_selectarea').find('.monthtag'),
					num = ~~monthTag.data('month')+add;
				//月份变动发生了跨年
				if(num>11){
					num = 0;
					this.value.year++;
					$('.yeartag').text(this.value.year+'年').data('year', this.value.year);
				}else if(num<0){
					num = 11;
					this.value.year--;
					$('.yeartag').text(this.value.year+'年').data('year', this.value.year);
				}

				var nextMonth = F.getMonth(num)+'月';
				monthTag.text(nextMonth).data('month', num);
				this.value.month = num;
				if(checkDate){
					this.value.date = checkDate;
				}else{
					//如果有上次选择的数据，则进行赋值
					this.setCheckedDate();
				}
				this.updateDate(add);
			},
			//保存上一次选择的数据
			saveCheckedDate : function(){
				if(this.value.date){
					this.lastCheckedDate = {
						year : this.value.year,
						month : this.value.month,
						date : this.value.date
					}
				}
			},
			//将上一次保存的数据恢复到界面
			setCheckedDate : function(){
				if(this.lastCheckedDate && this.lastCheckedDate.year==this.value.year && this.lastCheckedDate.month==this.value.month){
					this.value.date = this.lastCheckedDate.date;
				}
				else{
					this.value.date = '';
				}
			},
			//根据日期得到渲染天数的显示的HTML字符串
			getDateStr : function(y, m, d){
				var dayStr = '';
				//计算1号是星期几，并补上上个月的末尾几天
				var week = F.getWeekInMonth(y, m);
				var lastMonthDays = F.getDaysInMonth(y, m-1);
				for(var j=week-1; j>=0; j--){
					dayStr += '<li class="prevdate" data-day="'+(lastMonthDays-j)+'">'+(lastMonthDays-j)+'</li>';
				}
				//再补上本月的所有天;
				var currentMonthDays = F.getDaysInMonth(y, m);

				//将日期按允许的范围分三段拼接
				for(var i=1; i<=currentMonthDays; i++){
					var current = '';
					// 模拟考勤数据
					if(new Date(y, m, i+1) < new Date()){
						if(i % 9 === 0) {
							current = 'exception';
						} else {
							current = 'normal';
						}
					}
					if(y==this.value.year && m==this.value.month && d==i){
						current = 'current';
					}
					dayStr += '<li class="'+current+'" data-day="'+i+'">'+i+'</li>';
				}

				//再补上下个月的开始几天
				var nextMonthStartWeek = (currentMonthDays + week) % 7;
				if(nextMonthStartWeek!==0){
					for(var i=1; i<=7-nextMonthStartWeek; i++){
						dayStr += '<li class="nextdate" data-day="'+i+'">'+i+'</li>';
					}
				}

				return dayStr;
			},
			updateDate : function(add){
				var dateArea = $('.md_datearea.in');
				if(add == 1){
					var c1 = 'out_left';
					var c2 = 'out_right';
				}
				else{
					var c1 = 'out_right';
					var c2 = 'out_left';	
				}
				var newDateArea = $('<ul class="md_datearea '+c2+'"></ul>');
				newDateArea.html(this.getDateStr(this.value.year, this.value.month, this.value.date));
				$('.md_body').append(newDateArea);
				setTimeout(function(){
					newDateArea.removeClass(c2).addClass('in');
					dateArea.removeClass('in').addClass(c1);
				}, 10);
				
			},
			//每次调出panel前，对界面进行重置
			refreshView : function(){
				var date = new Date();

				var y = this.value.year = date.getFullYear(),
					m = this.value.month = date.getMonth(),
					d = this.value.date = date.getDate();
				$('.yeartag').text(y+'年').data('year', y);
				$('.monthtag').text(F.getMonth(m)+'月').data('month', m);
				var dayStr = this.getDateStr(y, m, d);
				$('.md_datearea').html(dayStr);
				this.settingValues(y, m, d);
			},
			settingValues : function(y,m,d){
				var monthValue = m + 1;
				if(monthValue < 10){
					monthValue = '0' + monthValue;
				}
				var dateValue = d;
				if(dateValue === ''){
					dateValue = 1;
				}
				if(dateValue < 10){
					dateValue = '0' + dateValue;
				}
				input.val(y + '-' + monthValue + '-' + dateValue);
			},
			initListeners : function(){
				var panel = $('.md_panel'),
					_this = this;

				_this.refreshView();

				/*panel.swipeLeft(function(){
					_this._changeMonth(1);
				});
				panel.swipeRight(function(){
					_this._changeMonth(-1);
				});*/

				panel.delegates({
					'.change_month' : function(){
						var add = $(this).hasClass('md_next') ? 1 : -1;
						_this._changeMonth(add);
					},
					'.out_left, .out_right' : {
						'webkitTransitionEnd' : function(){
							$(this).remove();
						}
					},
					'.md_datearea li' : function(){
						var $this = $(this);
						if($this.hasClass('disabled')){
							return;
						}
						_this.value.date = $this.data('day');
						//判断是否点击的是前一月或后一月的日期
						var add = 0;
						if($this.hasClass('nextdate')){
							add = 1;
						}
						else if($this.hasClass('prevdate')){
							add = -1;
						}

						if(add !== 0){
							_this._changeMonth(add, _this.value.date);
						}
						else{
							$this.addClass('current').siblings('.current').removeClass('current');	
						}						
						// 赋值
						_this.settingValues(_this.value.year,~~_this.value.month,_this.value.date)
					},
				});
			}
		}
		mdater.initListeners();
	}
})(Zepto);