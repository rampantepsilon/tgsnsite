//Initial Load Functions
function getFollowers(){setInterval('api()', 60000)}
function init(){
  api();
  getFollowers();
}

//API for Followers
function api(){
  //console.log("Begin Script");
  $.ajax({
    datatype: 'json',
    url: 'https://api.twitch.tv/helix/users/follows?to_id=43584807',
    headers: {
      "Client-ID": 'o118lfy65junb52nuye0weh4xbvn11',
    },
    success: function(channel)
    {
      //console.log("Results:");
      //console.log(channel);
      var followCount = channel.total;
      var latestFollower = channel.data[0].from_name;

      if (sessionStorage.getItem('page') == 'home'){
        document.getElementById('followers').innerHTML = `<div>Follower Goal: ` + followCount + `/200 (Or Affiliate)<br/>Rampant Plays Halo Custom Campaigns<br/>Peace Plays All Kamen Rider: Rider Revolution<br/>Latest Follower: ` + latestFollower + `</div>`;
      }
      //console.log(channel.total);
    },
    error: function(){
      console.log("The Request Failed");
    }
  });
  //console.log("End Script");
};

/* ----- BODY SCRIPTING ----- */
//Notices
const notice1a = `<p>Welcome to The Gaming Saloon Network Staff HQ!<br />This location will hold important information regarding TGSN Staff</p>`;
const notice1b = `<p><font color='red'>Please Note: All Staff must log into this page at least once and contact RampantEpsilon#7868 on Discord to get proper permissions.</font></p>`;
const notice2a = `<p><font color='red'>ATTENTION TGS STAFF!</font> I'm currently working on a Releases Page for Staff Use Only. If you have this link for any reason, you are NOT to share it with viewers. This is an internal page for the moment with the potential to allow users to view in the future.</p>`;
const notice2b = `<p>The page can be found <a href='./releases'>here</a> -RampantEpsilon</p>`;

//Bottom Links
function showAll(){
  document.getElementById('botLinks').innerHTML = [`<td align='center' width='14%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick="showHome()">
    Notices/Goals
  </td>
  <td align='center' width='14%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showTGSArticles()'>
    TGS Articles
  </td>
  <td align='center' width='14%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showDashboard()'>
    Dashboard
  </td>
  <td align='center' width='16%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showBotDash()'>
    TGSNBot Dashboard
  </td>
  <td align='center' width='14%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showTwitch()'>
    Twitch Stream
  </td>
  <td align='center' width='14%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showStats()'>
    Stats
  </td>
  <td align='center' width='14%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showSchedule()'>
    Schedule
  </td>`]
}

function showAllRO(){
  document.getElementById('botLinks').innerHTML = [`<td align='center' width='17%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick="showHome()">
    Notices/Goals
  </td>
  <td align='center' width='17%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showTGSArticles()'>
    TGS Articles
  </td>
  <td align='center' width='14%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showDashboard()'>
    Dashboard
  </td>
  <td align='center' width='16%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showTwitch()'>
    Twitch Stream
  </td>
  <td align='center' width='17%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showStats()'>
    Stats
  </td>
  <td align='center' width='17%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showSchedule()'>
    Schedule
  </td>`]
}

function showDefault(){
  document.getElementById('botLinks').innerHTML = [`<td align='center' width='17%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick="showHome()">
    Notices/Goals
  </td>
  <td align='center' width='16%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showTwitch()'>
    Twitch Stream
  </td>
  <td align='center' width='17%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showSchedule()'>
    Schedule
  </td>`]
}

//Stats Load
function loadStats(){
  //Initialize Values
  const app = firebase.app();
  const db = firebase.firestore();
  const tgsnStats = db.collection('stats').doc('tgsn');
  const tgsnPrev = db.collection('stats').doc('lastweek');

  //Get Last Week Stats
  tgsnPrev.onSnapshot(doc => {
    const data = doc.data();
    document.querySelector('#llw').innerHTML = data.length;
    document.querySelector('#mlw').innerHTML = data.minWatched;
    document.querySelector('#alw').innerHTML = data.avgViewers;
    document.querySelector('#maxlw').innerHTML = data.maxViewers;
    document.querySelector('#ulw').innerHTML = data.uniqViewers;
    document.querySelector('#nlw').innerHTML = data.newFollow;
    document.querySelector('#flw').innerHTML = data.totalFollow;
    statChange();
  })

  //Get This Week Stats
  tgsnStats.onSnapshot(doc => {
    const data = doc.data();
    document.querySelector('#ltw').innerHTML = data.length;
    document.querySelector('#mtw').innerHTML = data.minWatched;
    document.querySelector('#atw').innerHTML = data.avgViewers;
    document.querySelector('#maxtw').innerHTML = data.maxViewers;
    document.querySelector('#utw').innerHTML = data.uniqViewers;
    document.querySelector('#ntw').innerHTML = data.newFollow;
    document.querySelector('#ftw').innerHTML = data.totalFollow;
    statChange();
  })
}

//Schedule Load
function loadSchedule(){
  //Initialize Values
  const app = firebase.app();
  const db = firebase.firestore();
  const schedule = db.collection('schedule').doc('tgsn');

  //Get Current schedule
  schedule.onSnapshot(doc => {
    const field = doc.data();

    document.querySelector('#weekOf').innerHTML = 'Week Of ' + field.wo;

    //Set Start Times
    document.querySelector('#mTime').innerHTML = field.mTime;
    document.querySelector('#tuTime').innerHTML = field.tuTime;
    document.querySelector('#wTime').innerHTML = field.wTime;
    document.querySelector('#thTime').innerHTML = field.thTime;
    document.querySelector('#fTime').innerHTML = field.fTime;
    document.querySelector('#saTime').innerHTML = field.saTime;
    document.querySelector('#suTime').innerHTML = field.suTime;

    //Set Pre-Show
    document.querySelector('#mPre').innerHTML = field.mPS;
    document.querySelector('#tuPre').innerHTML = field.tuPS;
    document.querySelector('#wPre').innerHTML = field.wPS;
    document.querySelector('#thPre').innerHTML = field.thPS;
    document.querySelector('#fPre').innerHTML = field.fPS;
    document.querySelector('#saPre').innerHTML = field.saPS;
    document.querySelector('#suPre').innerHTML = field.suPS;

    //Set Stream
    document.querySelector('#mShow').innerHTML = field.mS;
    document.querySelector('#tuShow').innerHTML = field.tuS;
    document.querySelector('#wShow').innerHTML = field.wS;
    document.querySelector('#thShow').innerHTML = field.thS;
    document.querySelector('#fShow').innerHTML = field.fS;
    document.querySelector('#saShow').innerHTML = field.saS;
    document.querySelector('#suShow').innerHTML = field.suS;
  })
}

//Request Access
function requestAccess(){
  var sessionID = sessionStorage.getItem('user');
  var sessionUser = sessionStorage.getItem('userName');
  const db = firebase.firestore();

  var position = '';
  var discordName = document.getElementById('discord').value;

  var positionRadio = document.getElementsByName('position');
  for (i = 0; i < positionRadio.length; i++){
    if (positionRadio[i].checked){
      position = positionRadio[i].value;
    }
  }

  db.collection('access').doc(sessionUser).set({
    position: position,
    discord: discordName,
    uid: sessionID
  });

  document.getElementById('confirmation').innerHTML = [`
    <h4>Your request has been submitted. If you don't hear from RampantEpsilon or see the changes within 48 hours, message him on Discord.</h4>`];
}

//Modules
function showHome(){
  //Determine what to show
  var uEmail = sessionStorage.getItem('userEmail');
  var position = '';
  if (tgsnCoordinators.includes(uEmail)){
    position = 'TGSN Coordinator';
  } else if (tgsnStaff.includes(uEmail)) {
    position = 'TGSN Staff';
  } else {
    position = 'Staff';
  }

  /*if (position == 'Staff'){
    document.getElementById('staffBody').innerHTML = [`<table>
      <tr>
        <td style='text-align: center; border: 1px solid;'>
          <h2>Notices</h2>` + notice1a + notice1b + `</br>` + notice2a + notice2b +
        `</td>
        <td style='text-align: center; vertical-align: text-top; width: 35%; border: 1px solid;'>
          <h2>Goals</h2><div id='followers'></div>
        </td>
      </tr>
      <tr>
        <td style='text-align: center; border: 1px solid;' colspan='2'>
          <h3>Staff Access Request</h3>
          <table align='center'>
            <tr>
              <td align='left'>
                <input type='radio' name='position' value='TGSNCoordinator'> TGSN Coordinator<br>
                <input type='radio' name='position' value='TGSNStaff'> TGSN Staff
              </td>
            </tr>
          </table>
          Discord Name: <input type="text" id='discord'><br>
          <button onclick='requestAccess()'>Request Access</button><br>
          <div align='center' id='confirmation'></div>
        </td>
      </tr>
    </table>`];
  } else {*/
    document.getElementById('staffBody').innerHTML = [`<table>
      <tr>
        <td style='text-align: center; border: 1px solid;'>
          <h2>Notices</h2>` + notice1a + notice1b + `</br>` + notice2a + notice2b +
        `</td>
        <td style='text-align: center; vertical-align: text-top; width: 35%; border: 1px solid;'>
          <h2>Goals</h2><div id='followers'></div>
        </td>
      </tr>
    </table>`];
  //}
  sessionStorage.setItem('page','home');
}

function showTGSArticles(){

  sessionStorage.setItem('page','tgsArticles');
  //Initialize Values
  const app = firebase.app();
  const db = firebase.firestore();
  const tgsArticles = db.collection('tgs').doc('articles');

  //Get Articles Link
  tgsArticles.onSnapshot(doc => {
    const data = doc.data();
    var link = data.link;
    var length = data.link.length;
    var trunc = length - 5;

    //Determine what to show
    var uEmail = sessionStorage.getItem('userEmail');
    var position = '';
    if (tgsnCoordinators.includes(uEmail)){
      position = 'TGSN Coordinator';
    } else if (tgsnStaff.includes(uEmail)) {
      position = 'TGSN Staff';
    } else {
      position = 'Staff';
    }

    //Fill information
    if (position == 'TGSN Coordinator'){
      document.getElementById('staffBody').innerHTML = [`
      <table>
        <tr>
          <td align='center' valign='top'>
            <h3><u>TGS Resources</u></h3>
            <h6>Changes can only be made by a Network Admin or TGSN Coordinator</h6>
            <div id='body'>Current TGS Articles:<h5>(Only the document part of the URL is shown here)</h5><font size='2'><a href='` + link + `' target='_blank'>`/*Click Here (Opens in new tab)*/ + link.substring(35, trunc) + `</a></font></div>
          </td>
          <td align='center'>
            Enter the new link for TGS Articles<br>
            <input id='tgsArticleLink'>
            <table>
              <tr>
                <td id='linkButton2' onclick='updateTGSArticles()'>
                  Update TGS Articles
                </td>
                <td id='linkButton2' onclick='clearTGSArticles()'>
                  Clear Link Field
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td colspan='2'>
            <iframe src='` + link + `' width='900px' height='400px'></iframe>
          </td>
        </tr>
      </table>`]
    } else {
      document.getElementById('staffBody').innerHTML = [`
      <table>
        <tr>
          <td align='center' valign='top'>
            <h3><u>TGS Resources</u></h3>
            <h6>Changes can only be made by a Network Admin or TGSN Coordinator</h6>
            <div id='body'>Current TGS Articles:<h5>(Only the document part of the URL is shown here)</h5><font size='2'><a href='` + link + `' target='_blank'>`/*Click Here (Opens in new tab)*/ + link.substring(35, trunc) + `</a></font></div>
          </td>
        </tr>
        <tr>
          <td>
            <iframe src='` + link + `' width='900px' height='400px'></iframe>
          </td>
        </tr>
      </table>`]
    }
  })
}

function showDashboard(){
  window.open("https://dashboard.twitch.tv/u/thegamingsaloonnetwork/stream-manager");
}

function showBotDash(){
  //Initialize Values
  const app = firebase.app();
  const db = firebase.firestore();
  const botDashboard = db.collection('bot').doc('links');

  //Get Bot Dashboard link
  botDashboard.onSnapshot(doc => {
    const data = doc.data();
    window.open(data.TGSN);
  })
}

function showTwitch(){

  sessionStorage.setItem('page','twitch');
  document.getElementById('staffBody').innerHTML = [`<table>
    <tr>
      <td style='text-align:center;'>
        <iframe src='https://player.twitch.tv/?allowfullscreen&playsinline&player=twitch_everywhere&targetOrigin=https%3A%2F%2Fembed.twitch.tv&channel=thegamingsaloonnetwork&origin=https%3A%2F%2Fembed.twitch.tv' width='640px' height='390px' frameborder='0' scrolling='no' allow='autoplay; fullscreen' allowfullscreen></iframe>
      </td>
      <td>
        <iframe scrolling="no" frameborder="0" src="https://go.twitch.tv/embed/thegamingsaloonnetwork/chat?darkpopout=true&amp;te-theme=dark&amp;origin=https%3A%2F%2Fembed.twitch.tv" width='400px' height='390px'></iframe>
      </td>
    </tr>
  </table>`];
}

function showStats(){

  sessionStorage.setItem('page','stats');

  //Determine what to show
  var uEmail = sessionStorage.getItem('userEmail');
  var position = '';
  if (tgsnCoordinators.includes(uEmail)){
    position = 'TGSN Coordinator';
  } else if (tgsnStaff.includes(uEmail)) {
    position = 'TGSN Staff';
  } else {
    position = 'Staff';
  }

  if (position == 'TGSN Coordinator'){
    document.getElementById('staffBody').innerHTML = [`
      <!--Start Stream Stats-->
      <table>
        <tr>
          <td align='center' colspan="3">
            <h3><u>Stream Statistics</u></h3>
            <table align='center'>
              <tr>
                <td align='right' valign='top' style='border-right: 1px solid black;' width='185px'>
                  <u>Stat</u>&nbsp;&nbsp;&nbsp;<br>
                  Length&nbsp;&nbsp;&nbsp;</br>
                  Min. Watched&nbsp;&nbsp;&nbsp;</br>
                  Avg. Viewers&nbsp;&nbsp;&nbsp;</br>
                  Max Viewers&nbsp;&nbsp;&nbsp;</br>
                  Unique Viewers&nbsp;&nbsp;&nbsp;</br>
                  New Followers&nbsp;&nbsp;&nbsp;</br>
                  Total Followers&nbsp;&nbsp;&nbsp;</br>
                </td>
                <td align='center' valign='top' style='border-right: 1px solid black;' width='130px'>
                  <u>Week to Date</u>
                  <div id='ltw'></div>
                  <div id='mtw'></div>
                  <div id='atw'></div>
                  <div id='maxtw'></div>
                  <div id='utw'></div>
                  <div id='ntw'></div>
                  <div id='ftw'></div>
                </td>
                <td align='center' valign='top' style='border-right: 1px solid black;' width='130px'>
                  <u>Last Week</u>
                  <div id='llw'></div>
                  <div id='mlw'></div>
                  <div id='alw'></div>
                  <div id='maxlw'></div>
                  <div id='ulw'></div>
                  <div id='nlw'></div>
                  <div id='flw'></div>
                </td>
                <td align='center' valign='top' style='border-right: 1px solid black;' width='130px'>
                  <u>Change</u>
                  <div id='lchange'></div>
                  <div id='mchange'></div>
                  <div id='achange'></div>
                  <div id='maxchange'></div>
                  <div id='uchange'></div>
                  <div id='nchange'></div>
                  <div id='fchange'></div>
                </td>
                <td align='center' valign='top' width='130px' style='border-right: 1px solid black;'>
                  <u>Goal</u><br>
                  3:30<br>
                  630<br>
                  3<br>
                  5<br>
                  5<br>
                  0<br>
                  200
                </td>
                <td align='right' valign='top' rowspan="8" id='loggedIn' style='border-right: 1px solid black;' width='225px'>
                  <u>Update W2D</u><br>
                  Length: <input id='lengthutw' size='1'><br>
                  Min. Watched: <input id='minutw' size='1'><br>
                  Avg. Viewers: <input id='avgutw' size='1'><br>
                  Max Viewers: <input id='maxutw' size='1'><br>
                  Unique Viewers: <input id='uniqueutw' size='1'><br>
                  New Followers: <input id='newFollowsutw' size='1'><br>
                  Total Followers: <input id='followsutw' size='1'><br>
                  <table><tr><td id='linkButton2' onclick='updateTWValues()'>Update W2D Values</td></tr></table>
                </td>
                <td align='center' valign='top' rowspan="8" id='updateLW' width='175px'>
                  <u>Update LW</u><br>
                  <input id='lengthulw' size='1'><br>
                  <input id='minulw' size='1'><br>
                  <input id='avgulw' size='1'><br>
                  <input id='maxulw' size='1'><br>
                  <input id='uniqueulw' size='1'><br>
                  <input id='newFollowsulw' size='1'><br>
                  <input id='followsulw' size='1'><br>
                  <table><tr><td id='linkButton2' onclick='updateLWValues()'>Update LW Values</td></tr></table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <!--End Stats-->`];
  } else if (position == 'TGSN Staff') {
    document.getElementById('staffBody').innerHTML = [`
      <!--Start Stream Stats-->
      <table>
        <tr>
          <td align='center' colspan="3">
            <h3><u>Stream Statistics</u></h3>
            <table align='center'>
              <tr>
                <td align='right' valign='top' style='border-right: 1px solid black;' width='185px'>
                  <u>Stat</u>&nbsp;&nbsp;&nbsp;<br>
                  Length&nbsp;&nbsp;&nbsp;</br>
                  Min. Watched&nbsp;&nbsp;&nbsp;</br>
                  Avg. Viewers&nbsp;&nbsp;&nbsp;</br>
                  Max Viewers&nbsp;&nbsp;&nbsp;</br>
                  Unique Viewers&nbsp;&nbsp;&nbsp;</br>
                  New Followers&nbsp;&nbsp;&nbsp;</br>
                  Total Followers&nbsp;&nbsp;&nbsp;</br>
                </td>
                <td align='center' valign='top' style='border-right: 1px solid black;' width='130px'>
                  <u>Week to Date</u>
                  <div id='ltw'></div>
                  <div id='mtw'></div>
                  <div id='atw'></div>
                  <div id='maxtw'></div>
                  <div id='utw'></div>
                  <div id='ntw'></div>
                  <div id='ftw'></div>
                </td>
                <td align='center' valign='top' style='border-right: 1px solid black;' width='130px'>
                  <u>Last Week</u>
                  <div id='llw'></div>
                  <div id='mlw'></div>
                  <div id='alw'></div>
                  <div id='maxlw'></div>
                  <div id='ulw'></div>
                  <div id='nlw'></div>
                  <div id='flw'></div>
                </td>
                <td align='center' valign='top' style='border-right: 1px solid black;' width='130px'>
                  <u>Change</u>
                  <div id='lchange'></div>
                  <div id='mchange'></div>
                  <div id='achange'></div>
                  <div id='maxchange'></div>
                  <div id='uchange'></div>
                  <div id='nchange'></div>
                  <div id='fchange'></div>
                </td>
                <td align='center' valign='top' width='130px' style='border-right: 1px solid black;'>
                  <u>Goal</u><br>
                  3:30<br>
                  630<br>
                  3<br>
                  5<br>
                  5<br>
                  0<br>
                  200
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <!--End Stats-->`];
    }
    loadStats();
}

function showSchedule(){

  sessionStorage.setItem('page','schedule');

  //Determine what to show
  var uEmail = sessionStorage.getItem('userEmail');
  var position = '';
  if (tgsnCoordinators.includes(uEmail)){
    position = 'TGSN Coordinator';
  } else if (tgsnStaff.includes(uEmail)) {
    position = 'TGSN Staff';
  } else {
    position = 'Staff';
  }

  if (position == 'TGSN Coordinator'){
    document.getElementById('staffBody').innerHTML = [`
      <!--Start Schedule-->
      <table width='100%'>
        <tr>
          <td align='center' colspan='3'>
            <h3><u>Current Week's Schedule</u></h3>
            <div id='weekOf'>Week Of </div>
            <table width='85%' align='center'>
              <tr>
                <td width='20%' align='center'><u>Day</u></td>
                <td width='20%' align='center'><u>Start Time <font color='red'>*</font></u></td>
                <td width='20%' align='center'><u>Pre-Show Game/Stream</u></td>
                <td width='20%' align='center'><u>Game/Stream</u></td>
              </tr>
              <tr>
                <td width='20%' align='center'>Monday</td>
                <td width='20%' align='center' id='mTime'></td>
                <td width='20%' align='center' id='mPre'></td>
                <td width='20%' align='center' id='mShow'></td>
              </tr>
              <tr>
                <td width='20%' align='center'>Tuesday</td>
                <td width='20%' align='center' id='tuTime'></td>
                <td width='20%' align='center' id='tuPre'></td>
                <td width='20%' align='center' id='tuShow'></td>
              </tr>
              <tr>
                <td width='20%' align='center'>Wednesday</td>
                <td width='20%' align='center' id='wTime'></td>
                <td width='20%' align='center' id='wPre'></td>
                <td width='20%' align='center' id='wShow'></td>
              </tr>
              <tr>
                <td width='20%' align='center'>Thursday</td>
                <td width='20%' align='center' id='thTime'></td>
                <td width='20%' align='center' id='thPre'></td>
                <td width='20%' align='center' id='thShow'></td>
              </tr>
              <tr>
                <td width='20%' align='center'>Friday</td>
                <td width='20%' align='center' id='fTime'></td>
                <td width='20%' align='center' id='fPre'></td>
                <td width='20%' align='center' id='fShow'></td>
              </tr>
              <tr>
                <td width='20%' align='center'>Saturday</td>
                <td width='20%' align='center' id='saTime'></td>
                <td width='20%' align='center' id='saPre'></td>
                <td width='20%' align='center' id='saShow'></td>
              </tr>
              <tr>
                <td width='20%' align='center'>Sunday</td>
                <td width='20%' align='center' id='suTime'></td>
                <td width='20%' align='center' id='suPre'></td>
                <td width='20%' align='center' id='suShow'></td>
              </tr>
              <tr id='scheduleEdit'>
                <td colspan='4' align='center'><u>Update Schedule</u>
                  <table>
                    <tr>
                      <td>
                        <input type='radio' name='day' value='monday'> Monday<br>
                        <input type='radio' name='day' value='tuesday'> Tuesday<br>
                        <input type='radio' name='day' value='wednesday'> Wednesday<br>
                        <input type='radio' name='day' value='thursday'> Thursday<br>
                        <input type='radio' name='day' value='friday'> Friday<br>
                        <input type='radio' name='day' value='saturday'> Saturday<br>
                        <input type='radio' name='day' value='sunday'> Sunday<br>
                      </td>
                      <td>
                        &nbsp;
                      </td>
                      <td valign='top' align='right'>
                        Start Time (Pre-Show Start If Applicable): <input type="text" id='sTime'><br>
                        Pre-Show Game/Stream: <input type="text" id='pShow'><br>
                        Game/Stream: <input type='text' id='showGame'><br>
                        Week Of: <input type='text' id='weekOfEdit'><br>
                        <button onclick='updateSchedule()'>Update Schedule</button>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align='center' colspan='4'><font color='red'>* = Start Time will be for Pre-Show if Applicable</font></td>
              </tr>
            </table>
          </td>
        </tr>
      </table>`];
  } else if (position == 'TGSN Staff'){
    document.getElementById('staffBody').innerHTML = [`
      <!--Start Schedule-->
      <table width='100%'>
        <tr>
          <td align='center' colspan='3'>
            <h3><u>Current Week's Schedule</u></h3>
            <div id='weekOf'>Week Of </div>
            <table width='85%' align='center'>
              <tr>
                <td width='20%' align='center'><u>Day</u></td>
                <td width='20%' align='center'><u>Start Time <font color='red'>*</font></u></td>
                <td width='20%' align='center'><u>Pre-Show Game/Stream</u></td>
                <td width='20%' align='center'><u>Game/Stream</u></td>
              </tr>
              <tr>
                <td width='20%' align='center'>Monday</td>
                <td width='20%' align='center' id='mTime'></td>
                <td width='20%' align='center' id='mPre'></td>
                <td width='20%' align='center' id='mShow'></td>
              </tr>
              <tr>
                <td width='20%' align='center'>Tuesday</td>
                <td width='20%' align='center' id='tuTime'></td>
                <td width='20%' align='center' id='tuPre'></td>
                <td width='20%' align='center' id='tuShow'></td>
              </tr>
              <tr>
                <td width='20%' align='center'>Wednesday</td>
                <td width='20%' align='center' id='wTime'></td>
                <td width='20%' align='center' id='wPre'></td>
                <td width='20%' align='center' id='wShow'></td>
              </tr>
              <tr>
                <td width='20%' align='center'>Thursday</td>
                <td width='20%' align='center' id='thTime'></td>
                <td width='20%' align='center' id='thPre'></td>
                <td width='20%' align='center' id='thShow'></td>
              </tr>
              <tr>
                <td width='20%' align='center'>Friday</td>
                <td width='20%' align='center' id='fTime'></td>
                <td width='20%' align='center' id='fPre'></td>
                <td width='20%' align='center' id='fShow'></td>
              </tr>
              <tr>
                <td width='20%' align='center'>Saturday</td>
                <td width='20%' align='center' id='saTime'></td>
                <td width='20%' align='center' id='saPre'></td>
                <td width='20%' align='center' id='saShow'></td>
              </tr>
              <tr>
                <td width='20%' align='center'>Sunday</td>
                <td width='20%' align='center' id='suTime'></td>
                <td width='20%' align='center' id='suPre'></td>
                <td width='20%' align='center' id='suShow'></td>
              </tr>
              <tr>
                <td align='center' colspan='4'><font color='red'>* = Start Time will be for Pre-Show if Applicable</font></td>
              </tr>
            </table>
          </td>
        </tr>
      </table>`];
  } else {
    document.getElementById('staffBody').innerHTML = [`
      <!--Start Schedule-->
      <table width='100%'>
        <tr>
          <td align='center' colspan='3'>
            <h3><u>Current Week's Schedule</u></h3>
            <div id='weekOf'>Week Of </div>
            <table width='85%' align='center'>
              <tr>
                <td width='20%' align='center'><u>Day</u></td>
                <td width='20%' align='center'><u>Start Time <font color='red'>*</font></u></td>
                <td width='20%' align='center'><u>Pre-Show Game/Stream</u></td>
                <td width='20%' align='center'><u>Game/Stream</u></td>
              </tr>
              <tr>
                <td width='20%' align='center'>Monday</td>
                <td width='20%' align='center' id='mTime'></td>
                <td width='20%' align='center' id='mPre'></td>
                <td width='20%' align='center' id='mShow'></td>
              </tr>
              <tr>
                <td width='20%' align='center'>Tuesday</td>
                <td width='20%' align='center' id='tuTime'></td>
                <td width='20%' align='center' id='tuPre'></td>
                <td width='20%' align='center' id='tuShow'></td>
              </tr>
              <tr>
                <td width='20%' align='center'>Wednesday</td>
                <td width='20%' align='center' id='wTime'></td>
                <td width='20%' align='center' id='wPre'></td>
                <td width='20%' align='center' id='wShow'></td>
              </tr>
              <tr>
                <td width='20%' align='center'>Thursday</td>
                <td width='20%' align='center' id='thTime'></td>
                <td width='20%' align='center' id='thPre'></td>
                <td width='20%' align='center' id='thShow'></td>
              </tr>
              <tr>
                <td width='20%' align='center'>Friday</td>
                <td width='20%' align='center' id='fTime'></td>
                <td width='20%' align='center' id='fPre'></td>
                <td width='20%' align='center' id='fShow'></td>
              </tr>
              <tr>
                <td width='20%' align='center'>Saturday</td>
                <td width='20%' align='center' id='saTime'></td>
                <td width='20%' align='center' id='saPre'></td>
                <td width='20%' align='center' id='saShow'></td>
              </tr>
              <tr>
                <td width='20%' align='center'>Sunday</td>
                <td width='20%' align='center' id='suTime'></td>
                <td width='20%' align='center' id='suPre'></td>
                <td width='20%' align='center' id='suShow'></td>
              </tr>
              <tr>
                <td align='center' colspan='4'><font color='red'>* = Start Time will be for Pre-Show if Applicable</font></td>
              </tr>
            </table>
          </td>
        </tr>
      </table>`];
  }

  loadSchedule();
}

//Calculate Change in Stats
function statChange() {
  //Initalize all IDs
  var lengthw2d = document.getElementById("ltw");
  var lengthlw = document.getElementById("llw");
  var lengthChange = document.getElementById("lchange");
  var minw2d = document.getElementById("mtw");
  var minlw = document.getElementById("mlw");
  var minChange = document.getElementById("mchange");
  var avgw2d = document.getElementById("atw");
  var avglw = document.getElementById("alw");
  var avgChange = document.getElementById("achange");
  var maxw2d = document.getElementById("maxtw");
  var maxlw = document.getElementById("maxlw");
  var maxChange = document.getElementById("maxchange");
  var uniqw2d = document.getElementById("utw");
  var uniqlw = document.getElementById("ulw");
  var uniqChange = document.getElementById("uchange");
  var neww2d = document.getElementById("ntw");
  var newlw = document.getElementById("nlw");
  var newChange = document.getElementById("nchange");
  var followsw2d = document.getElementById("ftw");
  var followslw = document.getElementById("flw");
  var followsChange = document.getElementById("fchange");

  //Get all data
  var ltw = lengthw2d.innerHTML;
  var llw = lengthlw.innerHTML;
  var mtw = parseFloat(minw2d.innerHTML);
  var mlw = parseFloat(minlw.innerHTML);
  var atw = parseFloat(avgw2d.innerHTML);
  var alw = parseFloat(avglw.innerHTML);
  var maxtw = parseFloat(maxw2d.innerHTML);
  var maxlw = parseFloat(maxlw.innerHTML);
  var utw = parseFloat(uniqw2d.innerHTML);
  var ulw = parseFloat(uniqlw.innerHTML);
  var ntw = parseFloat(neww2d.innerHTML);
  var nlw = parseFloat(newlw.innerHTML);
  var ftw = parseFloat(followsw2d.innerHTML);
  var flw = parseFloat(followslw.innerHTML);

  //Split length values into minutes and hours for calculation
  ltw.split(":");
  llw.split(":");

  //Convert to minutes
  var ltwMin = parseInt(ltw[0] * 60) + parseInt(ltw[2] + ltw[3]);
  //console.log(ltwMin);
  var llwMin = parseInt(llw[0] * 60) + parseInt(llw[2] + llw[3]);
  //console.log(llwMin);

  //Calculate Length Change
  var lchangeHour = 0;
  var lchangeMin = ltwMin - llwMin;
  while (lchangeMin >= 60){
    lchangeHour += 1;
    lchangeMin -= 60;
  }
  while (lchangeMin <= -60){
    lchangeHour += 1;
    lchangeMin += 60;
  }
  if (lchangeMin < 0 && lchangeMin >= -60){
    lchangeMin += (lchangeMin * -2);
    lchangeHour.toString()
    lchangeHour = '-' + lchangeHour;
  }

  //Return Values
  if (lchangeMin < 10){
    lengthChange.innerHTML = lchangeHour + ':0' + lchangeMin;
  } else {
    lengthChange.innerHTML = lchangeHour + ':' + lchangeMin;
  }
  minChange.innerHTML = (mtw - mlw).toFixed(0);
  avgChange.innerHTML = (atw - alw).toFixed(1);
  maxChange.innerHTML = (maxtw - maxlw).toFixed(1);
  uniqChange.innerHTML = (utw - ulw).toFixed(1);
  newChange.innerHTML = (ntw - nlw).toFixed(0);
  followsChange.innerHTML = (ftw - flw).toFixed(0);

  //Format
  if (lengthChange.innerHTML.includes('-')){
    lengthChange.innerHTML = '<font color="red">' + lengthChange.innerHTML + '</font>';
  }
  if (minChange.innerHTML.includes('-')){
    minChange.innerHTML = '<font color="red">' + minChange.innerHTML + '</font>';
  }
  if (avgChange.innerHTML.includes('-')){
    avgChange.innerHTML = '<font color="red">' + avgChange.innerHTML + '</font>';
  }
  if (maxChange.innerHTML.includes('-')){
    maxChange.innerHTML = '<font color="red">' + maxChange.innerHTML + '</font>';
  }
  if (uniqChange.innerHTML.includes('-')){
    uniqChange.innerHTML = '<font color="red">' + uniqChange.innerHTML + '</font>';
  }
  if (newChange.innerHTML.includes('-')){
    newChange.innerHTML = '<font color="red">' + newChange.innerHTML + '</font>';
  }
  if (followsChange.innerHTML.includes('-')){
    followsChange.innerHTML = '<font color="red">' + followsChange.innerHTML + '</font>';
  }
}
