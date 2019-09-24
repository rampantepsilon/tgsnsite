//Notices to rotate
var notice1 = `<p>Welcome to The Gaming Saloon Network Staff HQ!<br>This location will hold important information regarding TGSN Staff</p> <p><font color='red'>Please Note: All Staff must log into this page at least once and contact RampantEpsilon on Discord to get proper permissions.</font></p>`;
var notice2 = `<p>RampantEpsilon is looking for people to help with a new project to join the TGSN family.<br>If you are interested in streaming without commentary and have OBS for use with layouts, please contact RampantEpsilon on Discord.</p><p>&nbsp;</p>`;
var notice3 = `<p>There have been issues with updating the Twitch Dashboard using the Staff HQ page.<br>If you are having issues, please use the TGSNBot Dashboard or Twitch in the meantime.</p><p>More information on this issues will be coming soon. -RampantEpsilon</p>`

//Start Script
var loopN = 1; //counter for looping

function notices(){
  if (loopN == 0){
    loopN = 1;
    document.getElementById('notices').innerHTML = notice1;
  } else if (loopN == 1){
    loopN = 2;
    document.getElementById('notices').innerHTML = notice2;
  } else if (loopN == 2){
    document.getElementById('notices').innerHTML = notice3;
  }
}

function initNotices(){
  setInterval('notices()', 10000)
};
