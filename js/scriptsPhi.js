function validarInput(input) {
  if(isNaN(input.value)) {
    input.value = "";
  } else if(input.value < 0) {
    input.value = "";
  } else if(input.value == "") {
    escribeEnViews("");
    escribeEnBajadas("");
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

function escribeEnViews(data) {
  if ( data != "" ) {
    document.getElementById("viewPhi").innerHTML = BigInt(data["respuestaPhi"]);
    document.getElementById("viewSuma").innerHTML = BigInt(data["respuestaSuma"]);
    document.getElementById("viewMult").innerHTML = BigInt(data["respuestaMult"]);
  } else {
    document.getElementById("viewPhi").innerHTML = "";
    document.getElementById("viewSuma").innerHTML = "";
    document.getElementById("viewMult").innerHTML = "";
  }

}

function escribeEnBajadas(texto) {
  if ( texto != "" ) {
    document.getElementById("bajadaPhi").innerHTML = "Phi";
    document.getElementById("bajadaSuma").innerHTML = "Suma";
    document.getElementById("bajadaMult").innerHTML = "Suma cuadrados";
  } else {
    document.getElementById("bajadaPhi").innerHTML = texto;
    document.getElementById("bajadaSuma").innerHTML = texto;
    document.getElementById("bajadaMult").innerHTML = texto;
  }
}

function pideInformacionAPI(i) {
  var url = "http://localhost:5001/phi/";
  var urlSolicitud = url + i;

  getJSON(urlSolicitud, function(err, data) {
    if (err !== null) {
      escribeEnView("Algo no ha resultado.");
    } else {
      console.log(data);
      escribeEnViews(data);
      escribeEnBajadas("Phi, suma y multiplicaci&oacute;n");
    }
  });
}
