function login(){
	var user = document.getElementById("user").value;
	var password = document.getElementById("password").value;
	
	data = {
		"user":user, "password":password
	}
	window.alert("HELLO");
	window.location.replace("homepage.html");
	if(user != null && user.hasOwnProperty('uid') && user.hasOwnProperty('idToken')){
		window.location.replace("homepage.html");
		return;
	}
	$.post("/login")
}