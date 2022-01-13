// Login google
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  // console.log("ID: " + profile.getId()); 
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());
  window.location.href="/kameraConsume/home.html"
}

//Logout
function signOut() {
	gapi.auth2.getAuthInstance().signOut().then(function() {
		console.log('Signed out')
		window.location.href="/kameraConsume/index.html";
	})
	.catch(error => {console.log(error)});
}

//get username
$("#user").ready(function () {
	var user = document.getElementById("user")
	user.innerHTML = `Welcome, ${profile.getName()}`
});

$("#view").ready(function () {
	var view = document.getElementById("view")
	getAll().then(response => {
			console.log(response)
			for(var i = 0; i <response.length; i++){
					const tr = view.insertRow()
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

function onLoad(){
	gapi.load("auth2", function(){
			gapi.auth2.init();
	})
}

var url ="http://localhost:8080/kameralist/kamera";

function del(noseri){
	if (window.confirm("Delete data?")===true) {
			axios.delete(`http://localhost:8080/kameralist/kamera/${noseri}`).then((result) => {
					alert("Success")
					window.location.href="/home.html"
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

function saveData(){
	var body = {
		noseri:$("#noseri").val(),
		merek:$("#merek").val(),
		tipe:$("#tipe").val(),
		jenis:$("#jenis").val(),
		harga:$("#harga").val(),
	}

	var json = JSON.stringify(body)
	console.log(json)
	axios({
			method:"post",
			url:url, 
			data:json, 
			headers:{ "Content-Type": "application/json" }
	})
	.then((result) => {
			console.log("Data berhasil disimpan")   
	}).catch((err) => {
			console.log(error)
	});
}

function getData(){
	var url = new URL($(location).attr("href"))
	var params = url.searchParams.get("noseri")
	console.log(params)
	axios.get(
			`http://localhost:8080/kameralist/kamera/${params}`
	).then((result) => {
			console.log(result)
			$("#noseri").val(result.data.noseri);
			$("#merek").val(result.data.merek);
			$("#tipe").val(result.data.tipe);
			$("#jenis").val(result.data.jenis);
			$("#harga").val(result.data.harga);
	}).catch((err) => {
			console.log(error)
	});
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