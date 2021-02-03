$(document).ready(function(){
	var inputHeight = $('.normal-text-input').prop('scrollHeight');
	//console.log(inputHeight);
	
	$('#input').keyup(function() {
		var hasSpace = $(this).val().indexOf(' ')>=0;
		
		var charCount = $(this).val().length;
		//console.log(charCount);
		if(charCount>=1){
			$('.send-btn').addClass('active-send-btn');
		} else {
			$('.send-btn').removeClass('active-send-btn');
		}
		
		// Auto height increase and decrease based character and input
		//var lines = document.querySelector('#text-input').value.split(/\r\n|\r|\n|<br>/).length;
		//console.log(lines);
		
		/*var inputInnerHeight = $('.normal-text-input').prop('scrollHeight');		
		if(inputInnerHeight > inputHeight){			
		}else {			
		}*/
				
	});
	
	// Get input and post
	
	$('.send-btn').click(function(){
		var windowPosition = $('.chat-content-wrapper').prop('scrollHeight');
		//console.log(windowPosition);
		$('.send-btn').removeClass('active-send-btn');
		var newTime = new Date();
		var currentTime = newTime.getHours() +":"+newTime.getMinutes();
		var getInput = $('#text-input').val();
		//getInput	=	getInput.trim();
		if(getInput.length > 1)
		{
			$('.chat-wrapper:last-child').after("<div class='bx chat-wrapper user'><div class='chat-bubble'><div class='pro-pic'><img src='images/user-img.jpg' width='96' height='96'></div><p>"+getInput+"</p><span class='bx time'>"+currentTime+"</span></div></div>");
			$('#text-input').val('');
			$('.chat-content-wrapper').animate({ scrollTop:windowPosition}, 1000);
		}
	});
	
});