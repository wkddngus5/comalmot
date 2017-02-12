function dim(bool, string)
{
  if (typeof bool=='undefined') bool=true; // so you can shorten dim(true) to dim()
  document.getElementById('dimmer').style.display=(bool?'block':'none');
  switch(string){
    case 'cpuWhat':
      document.getElementById('cpuWhatInfo').style.display=(bool?'block':'none');
      break;
    case 'cpuPoint':
      document.getElementById('cpuPointInfo').style.display=(bool?'block':'none');
      break;
    default:
      document.getElementById('cpuWhatInfo').style.display=(bool?'block':'none');
      document.getElementById('cpuPointInfo').style.display=(bool?'block':'none');
  }
  console.log('dim!!!');
}

dim(true); // on
dim(false); // off
