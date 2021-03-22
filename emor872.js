//things to run on page load
getHomepage();
getInfo();
let newsLoaded = 0;
let displaysLoaded = 0;
let shopLoaded = 0;
let sectionList = [];

function loginSwitch(section){
	var element = document.getElementById(section);
  let pageList = ["login-section", "register-section"];
  pageList.forEach((page) =>  document.getElementById(page).classList.add("hidden"));
  element.classList.remove("hidden");
}

//functions
function pageSelection(pageToShow) {
	showPage(pageToShow);
	setCurrent(pageToShow + "-tab");
	getPage(pageToShow);
}

function showPage(pageToShow) {
  var element = document.getElementById(pageToShow);
  let pageList = ["home", "news", "items"];
  pageList.forEach((page) =>  document.getElementById(page).classList.add("hidden"));
  element.classList.remove("hidden");
  }
  
  function setCurrent(currentTab) {
  var element = document.getElementById(currentTab);
  let tabList = ["home-tab", "news-tab", "items-tab"];
  tabList.forEach((tab) =>  document.getElementById(tab).classList.remove("current-page"));
  element.classList.add("current-page");
  }
  
 function getPage(pageToShow) {
	 if((pageToShow == "home") || (pageToShow == "guestbook") || (pageToShow == "register")){
		getHomepage();
		return;
	 }
		if((pageToShow == "news") && (newsLoaded == 0)){
				newsLoaded = 1;
		}
		if(pageToShow == "items" && (displaysLoaded == 0)){
				displaysLoaded = 1;
		}
		if(pageToShow == "shop" && (shopLoaded == 0)){
				shopLoaded = 1;
		}
	  }

	
	function getHomepage() {
		document.getElementById("home-text").innerHTML = "Hi I am a Computer Science Graduate, who studied at the University of Auckland. \
		I like to spend my spare time doing digital art and livestreaming on twitch.\
		I'm particularly interested in UI/UX, how we interact with computers.\
		\
		What is Beautiful is Usable.";
	}
	
	
	function searchItems(pageToSearch) {
		var input, filter, itemsSection, h4, i, text;
		if(pageToSearch == "items"){
			input = document.getElementById("searchDisplays");
			}
		if(pageToSearch == "shop"){
			input = document.getElementById("searchShop");
			}
		filter = input.value.toUpperCase();
		itemsSection = document.getElementById(pageToSearch);
			h4 = itemsSection.getElementsByTagName("h4");
		for (i=0; i<h4.length; i++) {
			text = h4[i].innerHTML;
			if (text.toUpperCase().indexOf(filter) > -1) {
				h4[i].parentNode.style.display = "";
			}else{h4[i].parentNode.style.display = "none";
			}
		}
	}
	
	function getInfo() {	  
		document.getElementById("version").innerHTML = "ver. " + "2.0" ;
	  }