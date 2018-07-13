var string_name = "Hello World";
var int_index = 0;
var timer_type = null;
var key;
	
$(document).ready(function() {
	$('#div_home').click(function(){
		location.href = "main.html";
	});
	setTimeout(function(){ 
		$("#div_shortcutList a:nth-of-type(1)").attr("href", "javascript:login();");
		$("#div_shortcutList a:nth-of-type(2)").attr("href", "https://github.com/LeeSongA/Project");
		$("#div_shortcutList a:nth-of-type(2)").attr("target", "_blank");
		$("#div_contents").css("height", $(window).height()-$("#div_menu").height()-10);
		for(var i=1;i<=5;i++)
			$("#div_menuList a:nth-of-type("+i+")").attr("href", "javascript:selectMenu("+i+");");
		typeString();
	}, 3000);

	$.get("/public", function(data) { 
		key = new JSEncrypt();
	        key.setPublicKey(data);
	});	
});
function selectMenu(number){
	$("#div_background img").css("display","none");
	$("#div_hello").css("display","none");
	$("#div_contents").css("display","block");
	$("#div_menuList a").css("color", "#fff");
	$("#div_menuList a:nth-of-type("+number+")").css("color", "#ffff00");
	if(number == 1)
		$("#div_contents").load("introduce.html");
	else if(number == 4)
		$("#div_contents").load("member.html");
}
function typeString(){ 
	$('#div_hello span:nth-of-type(2)').html(string_name.substring(0, int_index) + "_");
	int_index++;
	timer_type = setTimeout('typeString()', 100);

	if(string_name.length < int_index){
		$('#div_hello span:nth-of-type(2)').html(string_name);
		clearTimeout(timer_type);
	}
}
function login(){
	$('#div_login').css('display','block');
	$('#div_mask').css('display','block');
}
function join(){
	$('#div_join').css('display','block');
}
function close(i){
	if(i == 1){
		$('#div_mask').css('display','none');
		$('#div_login').css('display','none');
	}
	else{
		$('#div_join').css('display','none');
	}
}
function checkLogin(){
	if($('#ID').val() == "")
		alert('Check your ID!');
	else{
		if($('#PWD').val() == "")
			alert('Check your PASSWORD!');
		else
			$.post("login?id="+$('#ID').val()+"&pwd="+key.encrypt($('#PWD').val()), function(data) { 
				if(data == "OK")
					close(1);
				else
					alert(data); 
			});
	}
}