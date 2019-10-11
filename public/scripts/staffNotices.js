//Notices to rotate
var notice1 = `<p>Welcome to The Gaming Saloon Network Staff HQ!<br>This location will hold important information regarding TGSN Staff</p> <p><font color='red'>Please Note: All Staff must log into this page at least once and contact RampantEpsilon on Discord to get proper permissions.</font></p>`;
var notice2 = `<p>RampantEpsilon is looking for people to help with The Voiceless Saloon, a new project to join the TGSN family.<br>If you are interested in streaming without commentary and have OBS for use with layouts, please contact RampantEpsilon on Discord.</p><p>&nbsp;</p>`;
var notice3 = `<p><font color='red'>ATTENTION TGS STAFF!</font> I'm currently working on a Releases Page for Staff Use Only. If you have this link for any reason, you are NOT to share it with viewers. This is an internal page for the moment with the potential to allow users to view in the future.</p><p>The page can be found <a href='./releases'>here</a> -RampantEpsilon</p>`

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
    loopN = 0
  }
}

function initNotices(){
  setInterval('notices()', 10000)
};
