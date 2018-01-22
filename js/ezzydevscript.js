window.onscroll = function() {myFunction()};

			var navbar = document.getElementById("navbar");
			var sticky = navbar.offsetTop;

			function myFunction() {
			  if (window.pageYOffset >= sticky) {
				navbar.classList.add("sticky")
			  } else {
				navbar.classList.remove("sticky");
			  }
			}

			
function toggle_hide() {
	var extended_element = document.getElementById("main-content");
	var i;
	
	extended_element.classList.toggle("col-lg-10");
	extended_element.classList.toggle("col-lg-6");
}

function point_out(id) {
	document.getElementById(id).style.color = "rgba(0,0,0,0)";
	setTimeout(function(){document.getElementById(id).style.color = "white";}, 500);
}
