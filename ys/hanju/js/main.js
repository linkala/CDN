var msg_404="关键词不能为空~";
$(function(){$("img.lazy")
.lazyload({effect:"fadeIn"});echo.init({offset:100,throttle:250,unload:false,});});
$(document).ready(function(){$('#_js_search_form')
.submit(function(){var folder=jQuery("#_js_search_text")
.val();if(jQuery.trim(folder)==""){layer.msg(msg_404);return false;}});
$("#banner-slide")
.slide({titCell:".switch ul",mainCell:".bd ul",effect:"leftLoop",trigger:"click",interTime:5000,autoPlay:true,delayTime:700,switchLoad:"_src",
autoPage:"<li></li>"});
$('.data-tips')
.tipso({useTitle:false,background:'#FF443F',color:'#FFFFFF',});});
