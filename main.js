function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  // console.log("ID: " + profile.getId()); 
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());
  window.location.href="/kameraConsume/home.html"
}

function signOut() {
	gapi.auth2.getAuthInstance().signOut().then(function() {
		console.log('Signed out')
		window.location.href="/kameraConsume/index.html";
	})
	.catch(error => {console.log(error)});
}

      function wsconsume() {
        $.getXMLHttpRequest("http://localhost:8080/kameralist/kamera", function(data) {
          console.log(data);
          $.each(data,function(i){
        	const tr = tabel.insertRow()
					const td1 = tr.insertCell();
					const td2 = tr.insertCell();
					const td3 = tr.insertCell();
					const td4 = tr.insertCell();
					const td5 = tr.insertCell();
          const td6 = tr.insertCell();
					console.log(data[i])
						
					td1.innerHTML = data[i].merek
					td2.innerHTML = data[i].tipe
					td3.innerHTML = data[i].jenis
					td4.innerHTML = data[i].harga
					td5.innerHTML = data[i].noseri
					td6.innerHTML =`
          <div class ="justify content-center">
					<a class="btn btn-info" href="edit.html?noseri=${response[i].noseri}">Edit</a>
					<button type ="button" class=""btn btn-danger"" onclick="del(${response[i].noseri});">Delete</button>
					</div>`
					})
        })
      }

// $("#tabel").ready(function () {
// 	var tabel = document.getElementById("tabel")
// 	$.getJSON("http://localhost:8080/kameralist/kamera", function(data) {
// 	// getAll().then(response => {
// 			console.log(data)
// 			$.each(data,function(i){
// 					const tr = tabel.insertRow()
// 					const td1 = tr.insertCell();
// 					const td2 = tr.insertCell();
// 					const td3 = tr.insertCell();
// 					const td4 = tr.insertCell();
// 					const td5 = tr.insertCell();
//           const td6 = tr.insertCell();
// 					console.log(data[i])
						
// 					td1.innerHTML = data[i].merek
// 					td2.innerHTML = data[i].tipe
// 					td3.innerHTML = data[i].jenis
// 					td4.innerHTML = data[i].harga
// 					td5.innerHTML = data[i].noseri
// 					td6.innerHTML =`
//           <div class ="justify content-center">
// 					<a class="btn btn-info" href="edit.html?noseri=${response[i].noseri}">Edit</a>
// 					<button type ="button" class=""btn btn-danger"" onclick="del(${response[i].noseri});">Delete</button>
// 					</div>`
// 					})
// 			}
// 	)
// });

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