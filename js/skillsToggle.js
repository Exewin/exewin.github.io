$(document).ready(function(){

	if($( document ).width()>767){

		$(".row").mouseenter(function(){
			var idx = $(this).attr("data-row");
			if(idx%2==0)
			{
				$("#col"+idx).show(0, function(){
					$("#colP"+idx).hide();
				});
			}
			else
				$("#col"+idx).show(0);
		});

		$(".row").mouseleave(function(){
			var idx = $(this).attr("data-row");
			if(idx%2==0)
			{
				$("#colP"+idx).show(0,function(){
					$("#col"+idx).hide(0);
				});
			}
			else
				$("#col"+idx).hide(0);
		});
	}
});

//this is my first jquery thing ever :)))