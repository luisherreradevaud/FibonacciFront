function validarInput(input) {
  if(isNaN(input.value)) {
    input.value = "";
  } else if(input.value < 0) {
    input.value = "";
  } else if(input.value == "") {
    escribeEnView("");
    escribeEnBajada("");
  } else {
    pideInformacionAPI(input.value);
  }
}

function getJSON(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "json";

  xhr.onload = function() {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
}

function escribeEnView(texto) {
  document.getElementById("view").innerHTML = texto;
}

function escribeEnBajada(texto) {
  document.getElementById("bajada").innerHTML = texto;
}

function pideInformacionAPI(i) {
  var url = "http://localhost:5001/phi/";
  var urlSolicitud = url + i;

  getJSON(urlSolicitud, function(err, data) {
    if (err !== null) {
      escribeEnView("Algo no ha resultado.");
    } else {
      var n = BigInt(data["n"]);
      escribeEnView(n);
      escribeEnBajada("N&uacute;mero de Fibonacci");
    }
  });
}
