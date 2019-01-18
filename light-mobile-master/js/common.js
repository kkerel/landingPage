$(function(){
  var mainCheck = $('#main_wrap').hasClass('main');
  if (mainCheck != true) {
	var _offvar = $('#contents_01').offset().top - 100;
  }
  $(window).on('scroll',function(){
	var win =$(window).scrollTop();
	if(win > _offvar){
	  $('.contents_main_navi_wrap').css({
		'position':'fixed',
		'z-index':'100',
		'top':0,
	  });
	}
  });
})
$(document).ready(function() {
  gnb();
  var bxEl = ['.container_wrap .slider01', '.container_wrap .slider02', '.container_wrap .slider03', '.container_wrap .slider04'];
  var bxWidth = [0,0,0,0];
  var bxMargin = [0,0,0,0];
  var bxCon = ['controls','controls','controls','controls'];
  var bxAuto = [false,false,false,false];
  var bxLoop = [true,true,true,true];
  var bxMode = ['horizontal','horizontal','horizontal','fade'];

  for(var i = 0; i < bxEl.length; i++) {
  		bxSliders(bxEl[i], bxWidth[i], bxMargin[i], bxCon[i], bxAuto[i], bxLoop[i], bxMode[i]);
  }
  //bx slider pager Custom
  bxsliderCounter('1');
  bxsliderCounter('2');
  LuckyDraw();
});

function bxSliders(obj, width, margin, controller, auto, loop, mode, fadePager) {
	var options = {
		mode: mode,
		speed: 300,
		pause: 4000,
		touchEnabled: true,
		auto: auto,
		responsive: true,
		autoHover: false,
		minSlides: 1,
		slideWidth:width,
		slideMargin:margin,
		// maxSlides: count,
		infiniteLoop:loop,
		moveSlides: 1,
		fadePager:'#new_hotel_pager'
	};
	options['controls'] = (controller == 'controls') ? true:(controller == 'all') ? true:true;
	options['pager'] = (controller == 'pager') ? true:(controller == 'all') ? true:true;
	var slider = $(obj).bxSlider(options);
}

/* 유의사항 */
function gnb(){
	var selBox = $(".view_content_wrap");
	selBox.find(".view_btn").on("click keypress", function(e){
		if($(this).parent().hasClass("active")){
			$(this).parent().removeClass("active");
		}else{
			$(this).parent().addClass("active").siblings().removeClass("active");
		}
	});
}
//섹션 스크롤 무빙
function moveScroll(moveName) {
	$('html, body').stop(true,true).animate({
		scrollTop: $('#' + moveName).offset().top -20
	}, 300);
	setTimeout(function() {
		gnbActive();
	}, 400);
}
// GNB 온 표시
var gnbLinks = new Array();
function gnbActive(){
	if (!$("html").is(":animated")){
		$(".contents_navi_wrap li").not(".anchorNone").each(function(i){
			var rel = $(this).attr("rel");
			var firstString = rel.substr(0,1);
			if (firstString == "#" && rel.length > 1){
				gnbLinks[i] = rel;
			}
		});
		if (!gnbLinks.length){
			return;
		}
		for (var i=0; i<gnbLinks.length; i++){
			if ($(window).scrollTop() >= $(gnbLinks[i]).offset().top-$(".contents_main_navi_wrap").outerHeight()){
				$(".contents_navi_wrap  li").removeClass("now");
				$(".contents_navi_wrap  li").eq(i).addClass("now");
			}
		}
		if ($(window).scrollTop() < $(gnbLinks[0]).offset().top-$(".contents_main_navi_wrap").outerHeight()){
			$(".contents_navi_wrap  li").removeClass("now");
		}
	}
}

function bxsliderCounter(index){
	$('#slide-counter-' + index).prepend('<strong class="current-index"></strong>/');
	var slider = $('#slideshows-' + index).bxSlider({
		onSliderLoad: function (currentIndex){
			$('#slide-counter-' + index).find('.current-index').text(currentIndex + 1);
		},
		onSlideBefore: function ($slideElement, oldIndex, newIndex){
			$('#slide-counter-' + index).find('.current-index').text(newIndex + 1);
		}
	});
	$('#slide-counter-' + index).append(slider.getSlideCount());
}

function LuckyDraw(){
	var TongPop = ".luckydraw_popup"
	$(".start_btn").click(function(){
		$(".luckydraw_tongs").animate({left:"45%"}, 400);
		$(".luckydraw_line").delay(500).animate({height:"5rem"}, 500);
		setTimeout(function() {
			$(TongPop).show();
		}, 1100);
	});

	$(".luckydraw_close").click(function(){
		$(".luckydraw_popup").hide();
	})
}

$(document).on("click", "#contents_navi_wrap li", function(){
	$("#contents_navi_wrap li").removeClass("on");
	$(this).addClass("now");
});

$(window).scroll(function(){
	gnbActive();// GNB 온 표시 호출
});


$(document).ready(function() {
	var fontSize = $(window).width() / 22.5;
	$('html').css('font-size', fontSize);
	$(window).resize(function() {
		var fontSize = $(window).width() / 22.5;
		$('html').css('font-size', fontSize);
	});

	$('.agree-view').on('click',function(event) {
		event.preventDefault();
		$('.main-agree').show();
		$('html,body').animate({scrollTop: 0}, 200);
	});
	$('.main-agree-close').on('click', function(event) {
		event.preventDefault();
		$('.main-agree').hide();
	});

});
