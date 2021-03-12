$(window).on("load", function() {
	"use strict";

	

	//  ============= POST PROJECT POPUP FUNCTION =========

	$(".post_project").on("click", function(){
		$(".post-popup.pst-pj").addClass("active");
		$(".wrapper").addClass("overlay");
		return false;
	});
	$(".post-project > a").on("click", function(){
		$(".post-popup.pst-pj").removeClass("active");
		$(".wrapper").removeClass("overlay");
		return false;
	});

	//  ============= POST JOB POPUP FUNCTION =========

	$(".post-jb").on("click", function(){
		$(".post-popup.job_post").addClass("active");
		$(".wrapper").addClass("overlay");
		return false;
	});
	$(".post-project > a").on("click", function(){
		$(".post-popup.job_post").removeClass("active");
		$(".wrapper").removeClass("overlay");
		return false;
	});

	//  ============= SIGNIN CONTROL FUNCTION =========

	$('.sign-control li').on("click", function(){
		var tab_id = $(this).attr('data-tab');
		$('.sign-control li').removeClass('current');
		$('.sign_in_sec').removeClass('current');
		$(this).addClass('current animated fadeIn');
		$("#"+tab_id).addClass('current animated fadeIn');
		return false;
	});

	//  ============= SIGNIN TAB FUNCTIONALITY =========

	$('.signup-tab ul li').on("click", function(){
		var tab_id = $(this).attr('data-tab');
		$('.signup-tab ul li').removeClass('current');
		$('.dff-tab').removeClass('current');
		$(this).addClass('current animated fadeIn');
		$("#"+tab_id).addClass('current animated fadeIn');
		return false;
	});

	//  ============= COVER GAP FUNCTION =========

	var gap = $(".container").offset().left;
	$(".cover-sec > a, .chatbox-list").css({
		"right": gap
	});

	//  ============== ChatBox ============== 


	$(".chat-mg").on("click", function(){
		$(this).next(".conversation-box").toggleClass("active");
		return false;
	});
	$(".close-chat").on("click", function(){
		$(".conversation-box").removeClass("active");
		return false;
	});


	//  ============ Notifications Open =============

	$(".not-box-open").on("click", function(){$("#message").hide();
		$(".user-account-settingss").hide();
		$(this).next("#notification").toggle();
	});

	 //  ============ Messages Open =============

	$(".not-box-openm").on("click", function(){$("#notification").hide();
		$(".user-account-settingss").hide();
		$(this).next("#message").toggle();
	});

	$( ".user-info" ).click(function() {
		$( ".user-account-settingss" ).slideToggle( "fast");
		$("#message").not($(this).next("#message")).slideUp();
		$("#notification").not($(this).next("#notification")).slideUp();
	// Animation complete.
	});
 

	//  ============= FORUM LINKS MOBILE MENU FUNCTION =========

	$(".forum-links-btn > a").on("click", function(){
		$(".forum-links").toggleClass("active");
		return false;
	});
	$("html").on("click", function(){
		$(".forum-links").removeClass("active");
	});
	$(".forum-links-btn > a, .forum-links").on("click", function(){
		e.stopPropagation();
	});



});


