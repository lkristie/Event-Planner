function login(){
	var user = document.getElementById("user").value;
	var password = document.getElementById("password").value;
	var actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be whitelisted in the Firebase Console.
  url: 'https://event-planner-2bed5.firebaseapp.com',
  // This must be true.
  handleCodeInApp: true,
};

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

	firebase.auth().sendSignInLinkToEmail(user, actionCodeSettings)
  .then(function() {
    // The link was successfully sent. Inform the user.
    // Save the email locally so you don't need to ask the user for it again
    // if they open the link on the same device.
    window.localStorage.setItem('emailForSignIn', user);
  })
  .catch(function(error) {
    // Some error occurred, you can inspect the code: error.code
  });
}
