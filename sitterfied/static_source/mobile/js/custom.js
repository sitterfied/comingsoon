$(function() {
	// Logo hover
		    $('.logo img').hover(function(){
		          $(this).attr('src', ('/static/mobile/images/logo_h.png'));
		    });
		    $('.logo img').mouseout(function(){
		          $(this).attr('src', ('/static/mobile/images/logo.png'));
		    });
   	// Video
			$(".video").fancybox({
				maxWidth	: 800,
				maxHeight	: 600,
				width		: '70%',
				height		: '70%',
			});
    // show/hide input value
			$('input[type="text"]').each(function(){
				var valtxt = $(this).attr('value');
				$(this).focus(function() { if ($(this).val() == valtxt) {$(this).val('');} });
				$(this).blur(function() { if ($(this).val() == '') {$(this).val(valtxt);} });
			});
	// Choose only one checkbox in a group
			$("input:checkbox").click(function() {
			    if ($(this).is(":checked")) {
			        var group = "input:checkbox[name='" + $(this).attr("name") + "']";
			        $(group).prop("checked", false);
			        $(this).prop("checked", true);
			    } else {
			        $(this).prop("checked", false);
			    }
			});
	// Tabs
			$('.tabs_wrap .tab_content').hide();
			$('.tabs_wrap .tab_content:first').show();
			$('.tabs_wrap .tab_select li:first').addClass('active');
			$('.tabs_wrap .tab_select li a').click(function(){
				$('.tabs_wrap .tab_select li').removeClass('active');
				$(this).parent().addClass('active');
				var currentTab = $(this).attr('href');
				$('.tabs_wrap .tab_content').hide();
				$(currentTab).show();
				if($('.tabs_wrap .tab_select li:nth-child(2)').hasClass('active')) {
					$('.tabs_wrap .tab_select').addClass('movebg');
		        } else {
					$('.tabs_wrap .tab_select').removeClass('movebg');
		        };
				return false;
			});
	// Coming soon after_submit_form show
			$('.cs_register_form input[type="submit"]').on('click', function(){
				$('.cs_register_form, .cs_video').hide();
				$('.cs_after_submit_form').show();
				return false;
			});

});
