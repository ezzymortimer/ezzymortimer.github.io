var toggle_hide = function toggle_hide() {
	var extended_element = document.getElementById("main-content-collapsable");
	var i;
	
	extended_element.classList.toggle("col-lg-10");
	extended_element.classList.toggle("col-lg-6");
}

setTimeout(toggle_hide, 0);

function delay(){
	var extended = 0;
	
	if (extended == 0){
		setTimeout(toggle_hide, 1000);
		var extended = 1;}
	
	else {
		setTimeout(toggle_hide, 0);
		var extended = 0;}
}

function togglecomment(e)
{
	var t=$(e).thing(),n=t.find(".expand:first"),r=t.hasClass("collapsed");t.toggleClass("collapsed noncollapsed"),r?n.text("[â€“]"):n.text("[+]");
	}
