function cardDisplay(bool, string){
  // console.log(string);
  document.getElementById(string+'Info').style.display='block';
}

function dim(bool, string){
  if (typeof bool=='undefined') bool=false; // so you can shorten dim(true) to dim()
  document.getElementById('dimmer').style.display=(bool?'block':'none');
  if(bool==true) cardDisplay(bool, string);
  else {
    var cardList = document.getElementsByClassName('demo-card-square mdl-card');
    for (var i=0; i<cardList.length; i++){
      cardList[i].style.display='none';
    }
  }
  console.log('dim!!');
}


function addInfo(){
  var btn = document.createElement("INPUT");        // Create a <button> element
  var t = document.createTextNode("CLICK ME");       // Create a text node
  btn.appendChild(t);                                // Append the text to <button>
  document.getElementById("zone").appendChild(btn);
}

function signIn(){
  console.log("signIn!!!!!");
  dim(false);
  dim(true, "signIn");
}
//
// dim(true); // on
// dim(false); // off
