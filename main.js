function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  // console.log("ID: " + profile.getId()); 
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());
  window.location.href="/home.html"
}

$("#tabel").ready(function () {
	var tabel = document.getElementById("tabel")
	getAll().then(response => {
			console.log(response)
			for(var i = 0; i <response.length; i++){
					const tr = tabel.insertRow()
					const td1 = tr.insertCell();
					const td2 = tr.insertCell();
					const td3 = tr.insertCell();
					const td4 = tr.insertCell();
					const td5 = tr.insertCell();
          const td6 = tr.insertCell();
					console.log(response[i])
						
					td1.innerHTML = response[i].merek
					td2.innerHTML = response[i].tipe
					td3.innerHTML = response[i].jenis
					td4.innerHTML = response[i].harga
					td5.innerHTML = response[i].noseri
					td6.innerHTML =`
          <div class ="justify content-center">
					<a class="btn btn-info" href="edit.html?noseri=${response[i].noseri}">Edit</a>
					<button type ="button" class=""btn btn-danger"" onclick="del(${response[i].noseri});">Delete</button>
					</div>`
					}
			}
	)
});

function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
	console.log(gapi.auth2);
	auth2.signOut().then(function() {
	alert("User signed out");
	localStorage.removeItem("nama");
	localStorage.removeItem("image");
	localStorage.removeItem("email");
	window.location.href="/";
	})
	.catch(error => {console.log(error)});
}

function onLoad(){
	gapi.load("auth2", function(){
			gapi.auth2.init();
	})
}

var url ="http://localhost:8080/kameralist/kamera";

function dlt(noseri){
	if (window.confirm("Delete data?")===true) {
			axios.delete(`http://localhost:8080/kameralist/kamera/${noseri}`).then((result) => {
					alert("Success")
					window.location.href="home.html"
			}).catch((e) => {
					console.log(e)
			});
	}
}

function getAll(){
	const respon = axios.get("http://localhost:8080/kameralist/kamera")
	const k = respon.then(resp => resp.data)
	return k
}

async function create(kamera){
	await axios.post("http://localhost:8080/kameralist/kamera", kamera)
	.then((result) => {
			console.log(result)
			return result.data
	}).catch((e) => {
			console.error(e)
	});
}

async function update(kamera){
	await axios.put("http://localhost:8080/kameralist/kamera", kamera)
	.then((result) => {
			console.log(result)
			return result.data
	}).catch((e) => {
			console.error(e)
	});
}

async function del(kamera){
	await axios.delete("http://localhost:8080/kameralist/kamera", kamera)
	.then((result) => {
			console.log(result)
			return result.data
	}).catch((e) => {
			console.error(e)
	});
}