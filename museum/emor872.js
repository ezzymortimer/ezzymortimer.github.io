//things to run on page load
getHomepage();
getInfo();
let newsLoaded = 0;
let displaysLoaded = 0;
let shopLoaded = 0;
let sectionList = [];

window.setInterval(function(){
  getComments();
}, 10000);

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
  let pageList = ["home", "news", "items", "shop", "register", "guestbook"];
  pageList.forEach((page) =>  document.getElementById(page).classList.add("hidden"));
  element.classList.remove("hidden");
  }
  
  function setCurrent(currentTab) {
  var element = document.getElementById(currentTab);
  let tabList = ["home-tab", "news-tab", "items-tab", "shop-tab", "register-tab", "guestbook-tab"];
  tabList.forEach((tab) =>  document.getElementById(tab).classList.remove("current-page"));
  element.classList.add("current-page");
  }
  
 function getPage(pageToShow) {
	 if((pageToShow == "home") || (pageToShow == "guestbook") || (pageToShow == "register")){
		getHomepage();
		getComments();
		return;
	 }
	  const xhr = new XMLHttpRequest();
	  let uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/"+ pageToShow;
	  if(pageToShow == 'shop'){
		  uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/" + pageToShow + "?term=";
		  }
	  xhr.open("GET", uri, true);
	  xhr.setRequestHeader("Accept", "application/json; charset=UTF-8");
	  xhr.onload= () => {
		const resp = JSON.parse(xhr.responseText);
		if((pageToShow == "news") && (newsLoaded == 0)){
				for(let i in resp){
					let title = resp[i].titleField;
					let node = document.getElementById(pageToShow).appendChild(document.createElement("div"));
					node.setAttribute("id", pageToShow + "-inner-" + i + "-div");
					node = document.getElementById(pageToShow + "-inner-" + i + "-div").appendChild(document.createElement("p"));
					node.setAttribute("id", pageToShow + "-inner-" + i + "-date");
					node = document.getElementById(pageToShow + "-inner-" + i + "-div").appendChild(document.createElement("img"));
					node.setAttribute("id", pageToShow + "-inner-" + i + "-img");
					node = document.getElementById(pageToShow + "-inner-" + i + "-div").appendChild(document.createElement("h4"));
					node.setAttribute("id", pageToShow + "-inner-" + i + "-title");
					node = document.getElementById(pageToShow + "-inner-" + i + "-div").appendChild(document.createElement("p"));
					node.setAttribute("id", pageToShow + "-inner-" + i);
					node = document.getElementById(pageToShow + "-inner-" + i + "-div").appendChild(document.createElement("hr"));
					let date = resp[i].pubDateField;
					let image = resp[i].enclosureField.urlField;
					let description = resp[i].descriptionField;
					document.getElementById(pageToShow + "-inner-" + i + "-date").innerHTML = date;
					document.getElementById(pageToShow + "-inner-" + i + "-img").src = image;
					document.getElementById(pageToShow + "-inner-" + i + "-img").classList.add("image-med-width");
					document.getElementById(pageToShow + "-inner-" + i + "-title").innerHTML = title;
					document.getElementById(pageToShow + "-inner-" + i).innerHTML = description;
				}	
				newsLoaded = 1;
		}
		if(pageToShow == "items" && (displaysLoaded == 0)){
				for(let i in resp){
					let title = resp[i].Title;
					let ID = resp[i].ItemId;
					let node = document.getElementById(pageToShow).appendChild(document.createElement("div"));
					node.setAttribute("id", title);
					node = document.getElementById(title).appendChild(document.createElement("img"));
					node.setAttribute("id", pageToShow + "-inner-" + i + "-img");
					node = document.getElementById(title).appendChild(document.createElement("h4"));
					node.setAttribute("id", pageToShow + "-inner-" + i + "-title");
					node.setAttribute("class", "h4");
					node = document.getElementById(title).appendChild(document.createElement("p"));
					node.setAttribute("id", pageToShow + "-inner-" + i);
					node = document.getElementById(title).appendChild(document.createElement("hr"));
					let image = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/itemimg?id=" + ID;
					let description = resp[i].Description;
					document.getElementById(pageToShow + "-inner-" + i + "-img").src = image;
					document.getElementById(pageToShow + "-inner-" + i + "-img").classList.add("image-med-width");
					document.getElementById(pageToShow + "-inner-" + i + "-title").innerHTML = title;
					document.getElementById(pageToShow + "-inner-" + i).innerHTML = description;
				}
				displaysLoaded = 1;
		}
		if(pageToShow == "shop" && (shopLoaded == 0)){
				for(let i in resp){
					let title = resp[i].Title;
					let ID = resp[i].ItemId;
					let node = document.getElementById(pageToShow).appendChild(document.createElement("div"));
					node.setAttribute("id", title);
					node = document.getElementById(title).appendChild(document.createElement("img"));
					node.setAttribute("id", pageToShow + "-inner-" + i + "-img");
					node = document.getElementById(title).appendChild(document.createElement("h4"));
					node.setAttribute("id", pageToShow + "-inner-" + i + "-title");
					node.setAttribute("class", "h4");
					node = document.getElementById(title).appendChild(document.createElement("p"));
					node.setAttribute("id", pageToShow + "-inner-" + i);
					node = document.getElementById(title).appendChild(document.createElement("button"));
					node.setAttribute("id", pageToShow + "-inner-" + i + "-buyItem");
					node.setAttribute('onclick','buyItem("'+ ID +'")');
					node.innerHTML = "Buy " + title;
					node.classList.add("buy-button");
					
					node = document.getElementById(title).appendChild(document.createElement("hr"));
					let image = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/shopimg?id=" + ID;
					let description = resp[i].Description;
					document.getElementById(pageToShow + "-inner-" + i + "-img").src = image;
					document.getElementById(pageToShow + "-inner-" + i + "-img").classList.add("image-med-width");
					document.getElementById(pageToShow + "-inner-" + i + "-title").innerHTML = title;
					document.getElementById(pageToShow + "-inner-" + i).innerHTML = description;
				}
				shopLoaded = 1;
		}
	  }
	  xhr.send(null);
	}
	
	function getHomepage() {
		document.getElementById("home-text").innerHTML = "Welcome to The Bob Doran Museum of Computing. \
		You can learn more about the displays here. \
		If you are intrigued by what you find here and live close to Auckland, or are visiting the city, please feel free to drop in to the school and see the displays for yourself. \
		We are located at the University on Princes Street and are always open during normal office hours and also in the evenings and on the weekends when classes are in session.";
	}
	
	function getComments() {
	  document.getElementById("comment-section").src = document.getElementById("comment-section").src;
	}
	
	function makeComment() {
		let name = document.getElementById("name-field").value;
		let comment = document.getElementById("comment-field").value;
	  const xhr = new XMLHttpRequest();
	  const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/comment?name=" + name;
	  xhr.open("POST", uri, true);
	  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8;");
	  xhr.send(JSON.stringify(comment));
	  alert(JSON.stringify(name + ", your comment of: " + comment + " has been posted."));
	  document.getElementById("name-field").value = "";
	  document.getElementById("comment-field").value = "";	
	  getComments();
	}
	
	function makeNewUser() {
		let name = document.getElementById("new-name").value;
		let password = document.getElementById("new-password").value;
		let address = document.getElementById("new-address").value;
	  const xhr = new XMLHttpRequest();
	  const uri = "http://localhost:8188/MuseumService.svc/register";
	  xhr.open("POST", uri, true);
	  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8;");
	  let userInfo = {"Address": address,"Name": name,"Password": password};
	  xhr.send(JSON.stringify(userInfo));
	  document.getElementById("new-name").value = "";
	  document.getElementById("new-password").value = "";
	  document.getElementById("new-address").value = "";	  
	}
	
	function checkUserExists() {
	  const xhr = new XMLHttpRequest();
	  const uri = "http://localhost:8189\Service.svc/user";
	  xhr.open("GET", uri, true, "jbon007","jbon007passwd");
	  xhr.withCredentials = true;
	  xhr.setRequestHeader("Accept", "application/json; charset=UTF-8");
	  xhr.onload= () => {
		const resp = JSON.parse(xhr.responseText);
		}
	xhr.send(null);
	alert(resp);
	}
	
	function login() {
		let name = document.getElementById("user-name").value;
		let password = document.getElementById("user-password").value;
		alert(name +" "+ password);
	}
	
	function buyItem(ID){
		window.open("http://redsox.uoa.auckland.ac.nz/mss/Service.svc/buy?id=" + ID);
		//alert("Your credit card has been charged for 1 "+ item + " at $999.99");
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
	  const xhr = new XMLHttpRequest();
	  const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/version";
	  xhr.open("GET", uri, true);
	  xhr.setRequestHeader("Accept", "application/json; charset=UTF-8");
	  xhr.onload= () => {
			const resp = JSON.parse(xhr.responseText);
			document.getElementById("version").innerHTML = "website version " + resp;
	  }
	  xhr.send(null);
	}