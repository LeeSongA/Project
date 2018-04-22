$(document).ready(function() {
	$('#div_home').click(function(){
		location.href = "main.html";
	});
	setTimeout(function(){ 
		$("#div_shortcutList a").attr("href", "https://github.com/LeeSongA/Project");
		$("#div_shortcutList a").attr("target", "_blank");
		$("#div_contents").css("height", $(window).height()-$("#div_menu").height()-10);
		for(var i=1;i<=5;i++)
			$("#div_menuList a:nth-of-type("+i+")").attr("href", "javascript:selectMenu("+i+");");
	}, 3000);
	
});

function selectMenu(number){
	$("#div_background img").css("display","none");
	$("#div_contents").css("display","block");
	if(number == 1)
		$("#div_contents").load("introduce.html");
	else if(number == 4)
		$("#div_contents").load("member.html");
}