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
	var toggleable_elements = document.getElementsByClassName("toggleable");
	var i;
	for (i = 0; i < toggleable_elements.length; i++) {
	toggleable_elements[i].classList.toggle("hidden");
	}
}

function point_out(id) {
	document.getElementById(id).style.color = "rgba(0,0,0,0)";
	setTimeout(function(){document.getElementById(id).style.color = "white";}, 500);
}
