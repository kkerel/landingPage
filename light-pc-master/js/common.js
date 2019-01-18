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
	else{
	  $('.contents_main_navi_wrap').css({
		'position':'absolute',
		'top':680,
	  });
	}
  });
})
$(document).ready(function() {
	gnb();
	MapPop();
	TongsMove();
	bxSliders('.contents_widget .slider01', 325, 0, 8, 'controls', false, true);
	bxSliders('.contents_widget .slider02', 325, 0, 6, 'controls', false, true);
	bxSliders('.contents_widget .slider03', 325, 0, 6, 'controls', false, true);
	bxSliders('.contents_widget .slider04', 490, 0, 3, 'controls', false, true);
	bxSliders('.contents_widget .slider05', 420, 0, 4, 'controls', false, true);
	bxSliders('.contents_widget .slider06', 420, 0, 4, 'controls', false, true);
});
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
		scrollTop: $('#' + moveName).offset().top
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
			if ($(window).scrollTop() >= $(gnbLinks[i]).offset().top-$(".contents_main_navi_wrap").outerHeight()-80){
				$(".contents_navi_wrap  li").removeClass("now");
				$(".contents_navi_wrap  li").eq(i).addClass("now");
			}
		}
		if ($(window).scrollTop() < $(gnbLinks[0]).offset().top-$(".contents_main_navi_wrap").outerHeight()-80){
			$(".contents_navi_wrap  li").removeClass("now");
		}
	}
}

function bxSliders(obj, width, margin, count, controller, auto, loop) {
	var options = {
		mode: 'fade',
		speed: 300,
		pause: 4000,
		touchEnabled: true,
		auto: auto,
		responsive: true,
		autoHover: false,
		minSlides: 1,
		slideWidth:width,
		slideMargin:margin,
		maxSlides: count,
		infiniteLoop:loop,
		moveSlides: 1
	};
	options['controls'] = (controller == 'controls') ? true:(controller == 'all') ? true:false;
	options['pager'] = (controller == 'pager') ? true:(controller == 'all') ? true:true;
	var slider = $(obj).bxSlider(options);
}

function MapPop(){
	$(".map_type").click(function(){
		$(this).parents("li").find('.map_wrap').show();
	})

	$(".map_close").click(function(){
		$(".map_wrap").hide();
	})
}

function TongsMove(){
	var TongPop = ".luckydraw_popup"
	$(".start_btn").click(function(){
		$(".luckydraw_tongs").animate({left:"63%"}, 400);
		$(".luckydraw_line").delay(400).animate({height:"160px"}, 400);
		setTimeout(function() {
			$(TongPop).show();
		}, 800);
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
