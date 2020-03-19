//Initial Load Functions
function getFollowers(){setInterval('api()', 60000)}
function init(){
  api();
  getFollowers();
}

//vars for releases
var apiReleases, startDate;

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
const notice1 = `<p>Welcome to The Gaming Saloon Network Staff HQ!<br />This location will hold important information regarding TGSN Staff</p><p><font color='red'>Please Note: All Staff must log into this page at least once and use the Request Page to request permissions.</font></p>`;
const notice2 = `<p><font color='red'>IMPORTANT STAFF TOOL RELOCATION</font><br>The Twitch Dashboard and TGSNBot Dashboard links can now be found on the Twitch Stream page when logged in. If you are experiencing problems please reach out to RampantEpsilon on Discord.</p>`;
const notice3 = [`<p>Want to provide feedback for the Staff HQ page?<br>Use the form <a href='https://forms.gle/PescTWy6oEDd6e6R7' target='_blank'>HERE</a>`];

//Bottom Links
function showAll(){
  document.getElementById('botLinks').innerHTML = [`<td align='center' width='10%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick="showHome()">
    Notices/Goals
  </td>
  <td align='center' width='10%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showTGSArticles()'>
    TGS Articles
  </td>
  <td align='center' width='10%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showTwitch()'>
    Twitch Stream
  </td>
  <td align='center' width='10%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showStats()'>
    Stats
  </td>
  <td align='center' width='10%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showSchedule()'>
    Schedule
  </td>
  <td align='center' width='10%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showReleases()'>
    Releases
  </td>
  <td align='center' width='10%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showTGSR()'>
    TGSR Videos
  </td>
  <td align='center' width='10%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showTVSVids()'>
    TVS Videos
  </td>
  <td align='center' width='10%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showRequest()'>
    Request Page
  </td>`]
}

function showAllRO(){
  document.getElementById('botLinks').innerHTML = [`<td align='center' width='12%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick="showHome()">
    Notices/Goals
  </td>
  <td align='center' width='12%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showTGSArticles()'>
    TGS Articles
  </td>
  <td align='center' width='14%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showTwitch()'>
    Twitch Stream
  </td>
  <td align='center' width='12%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showStats()'>
    Stats
  </td>
  <td align='center' width='12%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showSchedule()'>
    Schedule
  </td>
  <td align='center' width='12%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showReleases()'>
    Releases
  </td>
  <td align='center' width='14%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showTGSR()'>
    TGSR Videos
  </td>`]
  if (sessionStorage.getItem('user') != null && sessionStorage.getItem('user') != ""){
    document.getElementById('botLinks').innerHTML = [`
    <td align='center' width='11%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick="showHome()">
      Notices/Goals
    </td>
    <td align='center' width='11%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showTGSArticles()'>
      TGS Articles
    </td>
    <td align='center' width='11%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showTwitch()'>
      Twitch Stream
    </td>
    <td align='center' width='11%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showStats()'>
      Stats
    </td>
    <td align='center' width='11%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showSchedule()'>
      Schedule
    </td>
    <td align='center' width='11%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showReleases()'>
      Releases
    </td>
    <td align='center' width='11%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showTGSR()'>
      TGSR Videos
    </td>
    <td align='center' width='12%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showRequest()'>
      Request Access
    </td>`]}
}

function showDefault(){
  document.getElementById('botLinks').innerHTML = [`<td align='center' width='25%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick="showHome()">
    Notices/Goals
  </td>
  <td align='center' width='25%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showTwitch()'>
    Twitch Stream
  </td>
  <td align='center' width='25%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showSchedule()'>
    Schedule
  </td>
  <td align='center' width='25%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showReleases()'>
    Releases
  </td>`]
  if (sessionStorage.getItem('user') != null){
    document.getElementById('botLinks').innerHTML = [`<td align='center' width='20%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick="showHome()">
      Notices/Goals
    </td>
    <td align='center' width='20%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showTwitch()'>
      Twitch Stream
    </td>
    <td align='center' width='20%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showSchedule()'>
      Schedule
    </td>
    <td align='center' width='20%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showReleases()'>
      Releases
    </td>
    <td align='center' width='20%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showRequest()'>
      Request Access
    </td>`]
  }
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

//Add User Permissions
function addUser(){
  const db = firebase.firestore();
  const coord = db.collection('users').doc('tgsnCoord');
  const staff = db.collection('users').doc('tgsnStaff');

  //Set Info from Form
  var email = document.getElementById('email').value;
  var uid = document.getElementById('uid').value;
  var position = '';
  var positionRadio = document.getElementsByName('permPosition');
  for (i = 0; i < positionRadio.length; i++){
    if (positionRadio[i].checked){
      position = positionRadio[i].value;
    }
  }

  if (email != "" && email != 'tomjware@gmail.com' && email != 'peacemaker24482@gmail.com'){
    if (uid != ""){
      if (position == 'TGSNCoordinator'){
        coord.update({
          email: firebase.firestore.FieldValue.arrayUnion(email),
          uid: firebase.firestore.FieldValue.arrayUnion(uid)
        })
        document.getElementById('permConfirm').innerHTML = `Permissions Added For ` + email;
      } else if (position == 'TGSNStaff'){
        staff.update({
          email: firebase.firestore.FieldValue.arrayUnion(email),
          uid: firebase.firestore.FieldValue.arrayUnion(uid)
        })
        document.getElementById('permConfirm').innerHTML = `Permissions Added For ` + email;
      } else {
       document.getElementById('permConfirm').innerHTML = `Please make sure you have all fields filled.`
     }
    } else {
     document.getElementById('permConfirm').innerHTML = `Please make sure you have both fields filled.`
   }
  } else {
   document.getElementById('permConfirm').innerHTML = `Please make sure you have both fields filled.`
 }
}

//Remove User Permissions
function remUser(){
  const db = firebase.firestore();
  const coord = db.collection('users').doc('tgsnCoord');
  const staff = db.collection('users').doc('tgsnStaff');

  //Set Info from Form
  var email = document.getElementById('email').value;
  var uid = document.getElementById('uid').value;
  var position = '';
  var positionRadio = document.getElementsByName('permPosition');
  for (i = 0; i < positionRadio.length; i++){
    if (positionRadio[i].checked){
      position = positionRadio[i].value;
    }
  }

  if (email != "" && email != 'tomjware@gmail.com' && email != 'peacemaker24482@gmail.com'){
    if (uid != ""){
      if (position == 'TGSNCoordinator'){
        coord.update({
          email: firebase.firestore.FieldValue.arrayRemove(email),
          uid: firebase.firestore.FieldValue.arrayRemove(uid)
        })
        document.getElementById('permConfirm').innerHTML = `Permissions Added For ` + email;
      } else if (position == 'TGSNStaff'){
        staff.update({
          email: firebase.firestore.FieldValue.arrayRemove(email),
          uid: firebase.firestore.FieldValue.arrayRemove(uid)
        })
        document.getElementById('permConfirm').innerHTML = `Permissions Removed For ` + email;
      } else {
       document.getElementById('permConfirm').innerHTML = `Please make sure you have all fields filled.`
     }
    } else {
     document.getElementById('permConfirm').innerHTML = `Please make sure you have both fields filled.`
   }
  } else {
   document.getElementById('permConfirm').innerHTML = `Please make sure you have both fields filled.`
 }
}

//Request Access
function requestAccess(){
  var sessionID = sessionStorage.getItem('user');
  var sessionUser = sessionStorage.getItem('userName');
  var sessionEmail = sessionStorage.getItem('userEmail');
  const db = firebase.firestore();
  const coord = db.collection('access').doc('tgsnCoord');
  const staff = db.collection('access').doc('tgsnStaff');

  var position = '';
  var discordName = document.getElementById('discord').value;

  var positionRadio = document.getElementsByName('position');
  for (i = 0; i < positionRadio.length; i++){
    if (positionRadio[i].checked){
      position = positionRadio[i].value;
    }
  }

  if (discordName != ''){
    if (position == 'TGSNCoordinator'){
      coord.update({
        discord: firebase.firestore.FieldValue.arrayUnion(discordName),
        uid: firebase.firestore.FieldValue.arrayUnion(sessionID),
        email: firebase.firestore.FieldValue.arrayUnion(sessionEmail)
      });
      document.getElementById('confirmation').innerHTML = [`
        <h4>Your request has been submitted. If you don't hear from RampantEpsilon or see the changes within 48 hours, message him on Discord.</h4>`];
    } else if (position == 'TGSNStaff'){
      staff.update({
        discord: firebase.firestore.FieldValue.arrayUnion(discordName),
        uid: firebase.firestore.FieldValue.arrayUnion(sessionID),
        email: firebase.firestore.FieldValue.arrayUnion(sessionEmail)
      });
      document.getElementById('confirmation').innerHTML = [`
        <h4>Your request has been submitted. If you don't hear from RampantEpsilon or see the changes within 48 hours, message him on Discord.</h4>`];
    } else {
      document.getElementById('confirmation').innerHTML = [`
        <h4>Please Select Position</h4>`];
    }
  } else {
    document.getElementById('confirmation').innerHTML = [`
      <h4>Please Enter Your Discord Name For Verification</h4>`];
  }
}

//Load Releases
function loadReleases(){

  var title = [], date = [], platform = [];
  var title1 = [], date1 = [], platform1 = [];

  const app = firebase.app();
  const db = firebase.firestore();
  const releaseAPI = db.collection('releases').doc('info');

  //Get Bot Dashboard link
  releaseAPI.get().then(function(doc) {
    const data = doc.data();
    apiReleases = data.api;
    //startDate = data.startDate;
    //document.getElementById('startDate').value = startDate;
    var d = new Date();
    document.getElementById('startMonth').value = (d.getMonth() + 1);
    document.getElementById('startDate').value = d.getDate();
    document.getElementById('startYear').value = d.getFullYear();
    //document.getElementById('endDate').value = startDate;
    document.getElementById('offset').value = 0;
    document.getElementById('results').innerHTML = 'Results: ' + 0;
    //endDate = data.endDate;
    });
}

//Modules
function showHome(){
  api();
  //Determine what to show
  var uEmail = sessionStorage.getItem('userEmail');
  var uid = sessionStorage.getItem('user');
  var position = '';
  if (tgsnCoordinators.includes(uEmail)){
    position = 'TGSN Coordinator';
  } else if (tgsnStaff.includes(uEmail)) {
    position = 'TGSN Staff';
  } else {
    position = 'Staff';
  }

  document.getElementById('staffBody').innerHTML = [`<table width='100%'>
    <tr>
      <td style='text-align: center; border: 1px solid;'>
        <h2>Notices</h2>` + notice1 + `=======` + notice2 + `=======` + notice3 +
      `</td>
      <td style='text-align: center; vertical-align: text-top; width: 35%; border: 1px solid;'>
        <h2>Goals</h2><div id='followers'></div>
      </td>
    </tr>
    <tr>
  </table>`];
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
    var uid = sessionStorage.getItem('user');
    var position = '';
    if (tgsnCoordinators.includes(uEmail)){
      position = 'TGSN Coordinator';
    } else if (tgsnStaff.includes(uEmail)) {
      position = 'TGSN Staff';
    } else {
      position = 'Staff';
    }

    //Fill information
    if (position == 'TGSN Coordinator' && tgsnCoordUID.includes(uid)){
      document.getElementById('staffBody').innerHTML = [`
      <table width='100%'>
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
          <td colspan='2' align='center'>
            <iframe src='` + link + `' id='articlesWin'></iframe>
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
            <iframe src='` + link + `' id='articlesWin'></iframe>
          </td>
        </tr>
      </table>`]
    }

    var playerWidth = window.innerWidth-50;
    var playerHeight = window.innerHeight-450;
    $('#articlesWin').css('width', playerWidth +'px');
    $('#articlesWin').css('height', playerHeight +'px');
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

  //Determine what to show
  var uEmail = sessionStorage.getItem('userEmail');
  var uid = sessionStorage.getItem('user');

  sessionStorage.setItem('page','twitch');
  document.getElementById('staffBody').innerHTML = [`<table width='100%'>
    <tr>
      <td style='text-align:center;'>
        <iframe src='https://player.twitch.tv/?allowfullscreen&playsinline&player=twitch_everywhere&targetOrigin=https%3A%2F%2Fembed.twitch.tv&channel=thegamingsaloonnetwork&origin=https%3A%2F%2Fembed.twitch.tv' id='twitchPlayer' frameborder='0' scrolling='no' allow='autoplay; fullscreen' allowfullscreen></iframe>
      </td>
      <td>
        <iframe scrolling="no" frameborder="0" src="https://go.twitch.tv/embed/thegamingsaloonnetwork/chat?darkpopout=true&amp;te-theme=dark&amp;origin=https%3A%2F%2Fembed.twitch.tv" id='twitchChat'></iframe>
      </td>
    </tr>
  </table>`];

  if (tgsnCoordinators.includes(uEmail) && tgsnCoordUID.includes(uid)){
    document.getElementById('staffBody').innerHTML += [`<table width='100%'>
      <tr>
        <td style='text-align: center; border: 1px solid;' width='10%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showDashboard()'>
          Twitch Dashboard
        </td>
        <td style='text-align: center; border: 1px solid;' width='10%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showBotDash()'>
          TGSNBot Dashboard
        </td>
      </tr>
    </table>`];
  } else if (tgsnStaff.includes(uEmail) && tgsnStaffUID.includes(uid)){
    document.getElementById('staffBody').innerHTML += [`<table width='100%'>
      <tr>
        <td style='text-align: center; border: 1px solid;' align='center' width='10%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showDashboard()'>
          Twitch Dashboard
        </td>
      </tr>
    </table>`];
  }

  var playerHeight = window.innerHeight-260;
  var playerWidth = window.innerWidth-450;
  $('#twitchPlayer').css('width', playerWidth +'px');
  $('#twitchPlayer').css('height', playerHeight +'px');
  $('#twitchChat').css('width', 400+'px');
  $('#twitchChat').css('height', playerHeight+'px');
}

function showStats(){

  sessionStorage.setItem('page','stats');

  //Determine what to show
  var uEmail = sessionStorage.getItem('userEmail');
  var uid = sessionStorage.getItem('user');
  var position = '';
  if (tgsnCoordinators.includes(uEmail)){
    position = 'TGSN Coordinator';
  } else if (tgsnStaff.includes(uEmail)) {
    position = 'TGSN Staff';
  } else {
    position = 'Staff';
  }

  if (position == 'TGSN Coordinator' && tgsnCoordUID.includes(uid)){
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
                  <button onclick='updateTWValues()'>Update W2D Values</button>
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
                  <button onclick='updateLWValues()'>Update LW Values</button>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align='center'>
            <b><u>Excel Embed</u></b><br>
            <iframe src='https://docs.google.com/spreadsheets/d/1EVVwG-oq4N6XrPmvIice9iYMTlx1Qwxqnjxs5RM8V7c/edit' id='statsView'></iframe>
          </td>
        </tr>
      </table>
      <!--End Stats-->`];
  } else if (position == 'TGSN Staff' && tgsnStaffUID.includes(uid)) {
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
    //Change Stats
    $("#lengthutw").keyup(function(event) {
      if (event.keyCode === 13){
      updateTWValues();
      }
    });
    $("#minutw").keyup(function(event) {
      if (event.keyCode === 13){
      updateTWValues();
      }
    });
    $("#avgutw").keyup(function(event) {
      if (event.keyCode === 13){
      updateTWValues();
      }
    });
    $("#maxutw").keyup(function(event) {
      if (event.keyCode === 13){
        updateTWValues();
      }
    });
    $("#uniqueutw").keyup(function(event) {
      if (event.keyCode === 13){
        updateTWValues();
      }
    });
    $("#newFollowsutw").keyup(function(event) {
      if (event.keyCode === 13){
        updateTWValues();
      }
    });
    $("#followsutw").keyup(function(event) {
      if (event.keyCode === 13){
        updateTWValues();
      }
    });
    $("#lengthulw").keyup(function(event) {
      if (event.keyCode === 13){
        updateLWValues();
      }
    });
    $("#minulw").keyup(function(event) {
      if (event.keyCode === 13){
        updateLWValues();
      }
    });
    $("#avgulw").keyup(function(event) {
      if (event.keyCode === 13){
        updateLWValues();
      }
    });
    $("#maxulw").keyup(function(event) {
      if (event.keyCode === 13){
        updateLWValues();
      }
    });
    $("#uniqueulw").keyup(function(event) {
      if (event.keyCode === 13){
        updateLWValues();
      }
    });
    $("#newFollowsulw").keyup(function(event) {
      if (event.keyCode === 13){
        updateLWValues();
      }
    });
    $("#followsulw").keyup(function(event) {
      if (event.keyCode === 13){
        updateLWValues();
      }
    });

    //Load Stats
    loadStats();

  //Resize Window
  var playerWidth = window.innerWidth-50;
  var playerHeight = window.innerHeight-500;
  $('#statsView').css('width', playerWidth +'px');
  $('#statsView').css('height', playerHeight +'px');
}

function showSchedule(){

  sessionStorage.setItem('page','schedule');

  //Determine what to show
  var uEmail = sessionStorage.getItem('userEmail');
  var uid = sessionStorage.getItem('user');
  var position = '';
  if (tgsnCoordinators.includes(uEmail)){
    position = 'TGSN Coordinator';
  } else if (tgsnStaff.includes(uEmail)) {
    position = 'TGSN Staff';
  } else {
    position = 'Staff';
  }

  //Review Staff/No Perm (Possible combine?)
  if (position == 'TGSN Coordinator' && tgsnCoordUID.includes(uid)){
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
                        <button onclick='updateSchedule()' id='ud8Schedule'>Update Schedule</button>
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
  } else if (position == 'TGSN Staff' && tgsnStaffUID.includes(uid)){
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

  //Update on Enter
  $("#sTime").keyup(function(event){
    if (event.keyCode === 13){
      $("#ud8Schedule").click();
    }
  });
  $("#pShow").keyup(function(event){
    if (event.keyCode === 13){
      $("#ud8Schedule").click();
    }
  });
  $("#showGame").keyup(function(event){
    if (event.keyCode === 13){
      $("#ud8Schedule").click();
    }
  });
  $("#weekOfEdit").keyup(function(event){
    if (event.keyCode === 13){
      $("#ud8Schedule").click();
    }
  });

  loadSchedule();
}

function showReleases(){
  sessionStorage.setItem('page','releases');

  document.getElementById('staffBody').innerHTML = [`
    <!--Start Body-->
    <table width='100%' border='1px'>
      <tr>
        <td colspan='5' align='center'>
          <h2>Releases</h2>
        </td>
      </tr>
      <tr>
        <td>
          Date (MM/DD/YYYY): <input id='startMonth' size='1'> - <input id='startDate' size='1'> - <input id='startYear' size='3'> <button onclick='addDay()'>+1 Day</button> <!--<button onclick='remDay()'>-1 Day<button>--><button onclick='goToday()'>Today</button>
        </td>
        <!--<td>
          End Date: <input id='endDate'>
        </td>-->
        <td>
          Offset (Change by 100 @ a time): <input id='offset' size='5'> <button onclick='add100()'>Add 100 Offset</button> <button onclick='rem100()'>Remove 100 Offset</button>
        <td id='results'>
          Results:
        </td>
        <td>
          <button onclick='getReleases()'>Get Releases</button>
          <button onclick='clearReleases()'>Clear Releases</button>
        </td>
      </tr>
      <tr>
        <td colspan="5">
          <table id='releases' width='100%'>
        </td>
      </tr>
    </table>`];
  loadReleases();
}

function showRequest(){
  sessionStorage.setItem('page','request');

  //Firebase Constants
  const db = firebase.firestore();
  const coord = db.collection('access').doc('tgsnCoord');
  const staff = db.collection('access').doc('tgsnStaff');

  //Determine what to show
  var uEmail = sessionStorage.getItem('userEmail');
  var uid = sessionStorage.getItem('user');
  var position = '';
  if (tgsnCoordinators.includes(uEmail)){
    position = 'TGSN Coordinator';
  } else if (tgsnStaff.includes(uEmail)) {
    position = 'TGSN Staff';
  } else {
    position = 'Staff';
  }

  if (position == 'Staff'){
    document.getElementById('staffBody').innerHTML = [`<table width='100%'>
      <tr>
        <td style='text-align: center; border: 1px solid;' colspan='2'>
          <h3>Staff Access Request</h3>
          <table align='center'>
            <tr>
              <td align='left' id='positionList'>
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
  } else if (position == 'TGSN Staff'){
    document.getElementById('staffBody').innerHTML = [`<table width='100%'>
      <tr>
        <td style='text-align: center; border: 1px solid;' colspan='2'>
          <h3>Staff Access Request</h3>
          <table align='center'>
            <tr>
              <td align='left' id='positionList'>
                <input type='radio' name='position' value='TGSNCoordinator'> TGSN Coordinator
              </td>
            </tr>
          </table>
          Discord Name: <input type="text" id='discord'><br>
          <button onclick='requestAccess()'>Request Access</button><br>
          <div align='center' id='confirmation'></div>
        </td>
      </tr>
    </table>`];
  } else if (position == 'TGSN Coordinator'){
    document.getElementById('staffBody').innerHTML = [`
      <table width='100%'>
        <tr>
          <td align='center' colspan='4'>
            <h3>Grant Permissions</h3>
          </td>
        </tr>
        <tr>
          <td align='right'>
            Email: <input type='text' id='email'>
          </td>
          <td rowspan='2' valign='top' align='right'>
            Position:
          </td>
          <td rowspan='2' valign='top'>
            <input type='radio' name='permPosition' value='TGSNCoordinator'> TGSN Coordinator<br>
            <input type='radio' name='permPosition' value='TGSNStaff'> TGSN Staff
          </td>
        </tr>
        <tr>
          <td align='right'>
            User ID: <input type='text' id='uid'>
          </td>
        </tr>
        <tr>
          <td align='center' colspan='3'>
            <button onclick='addUser()'>Add Permissions</button>
            <button onclick='remUser()'>Remove Permissions</button>
          </td>
        </tr>
        <tr>
          <td align='center' id='permConfirm' colspan='3'>
          </td>
        </tr>
      </table>
      <table width='100%'>
        <tr>
          <td id='coordReq' width='50%' align='center' valign='top'><h3>Coordinator Requests</h3><br></td>
          <td id='staffReq' width='50%' align='center' valign='top'><h3>Staff Requests</h3><br></td>
        </tr>
      </table>`];
    loadRequests();
  }
}

function showTVSVids(){
  sessionStorage.setItem('page','tvs');

  var uEmail = sessionStorage.getItem('userEmail');
  var uid = sessionStorage.getItem('user');

  if (tgsnCoordinators.includes(uEmail) && tgsnCoordUID.includes(uid)){
    document.getElementById('staffBody').innerHTML = [`<table>
      <tr>
        <td>
          <h3 align='center'>Please download the video before streaming.</h3>
        </td>
      </tr>
      <tr>
        <td>
          <iframe id='tvsPlaylist' src="https://www.youtube.com/embed/videoseries?list=PLPs7OF2cnAct9JUghBoKdw30LhzMRbvCw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </td>
      </tr>
    </table>`]
  }
  var playerHeight = window.innerHeight-300;
  var playerWidth = (((window.innerHeight-300)*16)/9);
  $('#tvsPlaylist').css('width', playerWidth +'px');
  $('#tvsPlaylist').css('height', playerHeight +'px');
}

function showTGSR(){
  sessionStorage.setItem('page','request');

  //Determine what to show
  var uid = sessionStorage.getItem('user');

  loadTGSR(uid);
}

//Load Requests Made
function loadRequests(){
  //Firebase Constants
  const db = firebase.firestore();
  const coord = db.collection('access').doc('tgsnCoord');
  const staff = db.collection('access').doc('tgsnStaff');

  coord.get().then(function(doc) {
    const data = doc.data();
    for (i = 0; i < data.uid.length; i++){
      document.getElementById('coordReq').innerHTML += `<div id='coord` + i + `' onclick='remCoordRequest(` + i + `)'>` + data.discord[i] + '<br>' + data.uid[i] + '<br>' + data.email[i] + '</div><br>=====<br>';
    }
    if (data.uid.length == 0){
      document.getElementById('coordReq').innerHTML += `No Current Requests`;
    }
  })
  staff.get().then(function(doc) {
    const data = doc.data();
    for (i = 0; i < data.uid.length; i++){
      document.getElementById('staffReq').innerHTML += `<div id='staff` + i + `' onclick='remStaffRequest(` + i + `)'>` + data.discord[i] + '<br>' + data.uid[i] + '<br>' + data.email[i] + '</div><br>=====<br>';
    }
    if (data.uid.length == 0){
      document.getElementById('staffReq').innerHTML += `No Current Requests`;
    }
  })
}

//Remove Coord Requests
function remCoordRequest(num){
  var id = 'coord' + num;
  var example = document.getElementById(id).innerHTML;
	var infoArr = example.split( "<br>" );

  var discord = infoArr[0];
  var uid = infoArr[1];
  var email = infoArr[2];

  const db = firebase.firestore();
  const coord = db.collection('access').doc('tgsnCoord');
  coord.update({
    discord: firebase.firestore.FieldValue.arrayRemove(discord),
    uid: firebase.firestore.FieldValue.arrayRemove(uid),
    email: firebase.firestore.FieldValue.arrayRemove(email)
  });

  document.getElementById('coordReq').innerHTML = [`<h3>Coordinator Requests</h3><br>`];
  document.getElementById('staffReq').innerHTML = [`<h3>Staff Requests</h3><br>`];

  loadRequests();
}

//Remove Staff Requests
function remStaffRequest(num){
  var id = 'staff' + num;
  var example = document.getElementById(id).innerHTML;
	var infoArr = example.split( "<br>" );

  var discord = infoArr[0];
  var uid = infoArr[1];
  var email = infoArr[2];

  const db = firebase.firestore();
  const staff = db.collection('access').doc('tgsnStaff');
  staff.update({
    discord: firebase.firestore.FieldValue.arrayRemove(discord),
    uid: firebase.firestore.FieldValue.arrayRemove(uid),
    email: firebase.firestore.FieldValue.arrayRemove(email)
  });

  document.getElementById('coordReq').innerHTML = [`<h3>Coordinator Requests</h3><br>`];
  document.getElementById('staffReq').innerHTML = [`<h3>Staff Requests</h3><br>`];

  loadRequests();
}

//Resize player
function resizePlayer(){
  var pageCheck = sessionStorage.getItem('page');

  if (pageCheck == 'twitch'){
    var playerHeight = window.innerHeight-230;
    var playerWidth = window.innerWidth-450;
    $('#twitchPlayer').css('width', playerWidth +'px');
    $('#twitchPlayer').css('height', playerHeight +'px');
    $('#twitchChat').css('width', 400+'px');
    $('#twitchChat').css('height', playerHeight+'px');
  }
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

//Releases Functions
function clearReleases(){
  document.getElementById('releases').innerHTML = "";
}

function getReleases(){
  var title = [], date = [], platform = [];
  var title1 = [], date1 = [], platform1 = [];

  var start = document.getElementById('startYear').value + '-' + document.getElementById('startMonth').value + '-' + document.getElementById('startDate').value;
  var offset = document.getElementById('offset').value;
  var numReleases = results(apiReleases, start);
  var t1 = `<tr><td id='name'>`;
  var t2 = `</td><td id='date' align='center'>`;
  var t3 = `</td></tr><tr><td id='platform' colspan='2'>`;
  var t4 = `</td></tr><tr><td>=========================================================</td></tr>`;

  $.ajax({
    datatype: 'json',
    url: 'https://cors-anywhere.herokuapp.com/https://www.gamespot.com/api/releases/?api_key=' + apiReleases + '&offset=' + offset +'&sort=release_date:asc&filter=release_date:' + start + '&format=json',
    success: function(data)
    {
      var offsetCheck = offset;
      var results = parseInt(data.number_of_total_results, 10);
      var max = results - offsetCheck;
      console.log(max);
      if (max < 100){
        for (i = 0; i < max; i ++ ){
          if (data.results[i].region == 'North America'){
            if (data.results[i].platform != 'PC'){
              if (data.results[i].platform != 'Macintosh'){
                if (data.results[i].platform != 'Linux'){
                  title1[i] = data.results[i].name;
                  date1[i] = data.results[i].release_date.substring(5,10) + '-' + data.results[i].release_date.substring(0,4);
                  platform1[i] = data.results[i].platform;
                }
              }
            }
          }
        };
      } else {
        for (i = 0; i < 100; i ++ ){
          if (data.results[i].region == 'North America'){
            if (data.results[i].platform != 'PC'){
              if (data.results[i].platform != 'Macintosh'){
                if (data.results[i].platform != 'Linux'){
                  title1[i] = data.results[i].name;
                  date1[i] = data.results[i].release_date.substring(5,10) + '-' + data.results[i].release_date.substring(0,4);
                  platform1[i] = data.results[i].platform;
                }
              }
            }
          }
        };
      }
      var z = 0;
      for (k = 0; k < title1.length; k++){
        if (title1[k] != null){
          title[z] = title1[k];
          date[z] = date1[k];
          platform[z] = platform1[k];
          z += 1;
        }
      }
      for (j = 0; j < title.length; j++){
        document.getElementById('releases').innerHTML += t1 + title[j] + " (" + platform[j] + ")" + t2 + date[j] + t4;
      }
    },
    error: function(){
      console.log("The Request Failed");
    }
  });
}

function results(apiReleases, start){
  $.ajax({
    datatype: 'json',
    url: 'https://cors-anywhere.herokuapp.com/https://www.gamespot.com/api/releases/?api_key=' + apiReleases + '&sort=release_date:asc&filter=release_date:' + start + '&format=json',
    success: function(channel)
    {
      console.log(channel.number_of_total_results);
      document.getElementById('results').innerHTML = 'Results: ' + channel.number_of_total_results;
      return channel.number_of_total_results;
    },
    error: function(){
      console.log("The Request Failed");
    }
  });
}

function addDay(){
  var currentMonth = document.getElementById('startMonth').value;
  var currentDay = document.getElementById('startDate').value;
  var currentYear = document.getElementById('startYear').value;
  currentMonth = parseInt(currentMonth, 10);
  currentDay = parseInt(currentDay, 10);
  currentYear = parseInt(currentYear, 10);

  if (currentMonth < 12){
    if (currentMonth == 1 || currentMonth == 3 || currentMonth == 5 || currentMonth == 7 || currentMonth == 8 || currentMonth == 10){
      if (currentDay != 31){
        document.getElementById('startDate').value = currentDay + 1;
      } else if (currentDay = 31){
        document.getElementById('startDate').value = 1;
        document.getElementById('startMonth').value = currentMonth + 1;
      }
    } else if (currentMonth == 2){
      if ((currentYear % 4) == 0){
        if (currentDay != 29){
          document.getElementById('startDate').value = currentDay + 1;
        } else if (currentDay == 29){
          document.getElementById('startDate').value = 1;
          document.getElementById('startMonth').value = currentMonth + 1;
        }
      } else {
        if (currentDay != 28){
          document.getElementById('startDate').value = currentDay + 1;
        } else if (currentDay == 28){
          document.getElementById('startDate').value = 1;
          document.getElementById('startMonth').value = currentMonth + 1;
        }
      }
    } else {
      if (currentDay != 30){
        document.getElementById('startDate').value = currentDay + 1;
      } else if (currentDay == 30){
        document.getElementById('startDate').value = 1;
        document.getElementById('startMonth').value = currentMonth + 1;
      }
    }
  } else {
    if (currentDay != 31){
      document.getElementById('startDate').value = currentDay + 1;
    } else if (currentDay = 31){
      document.getElementById('startDate').value = 1;
      document.getElementById('startMonth').value = 1;
      document.getElementById('startYear').value = currentYear + 1;
    }
  }
}

function goToday(){
  var d = new Date();
  document.getElementById('startMonth').value = (d.getMonth() + 1);
  document.getElementById('startDate').value = d.getDate();
  document.getElementById('startYear').value = d.getFullYear();
}

function add100(){
  var current = document.getElementById('offset').value;
  current = parseInt(current, 10);
  current += 100;
  document.getElementById('offset').value = current;
}

function rem100(){
  var current = document.getElementById('offset').value;
  current = parseInt(current, 10);
  current -= 100;
  document.getElementById('offset').value = current;
}

//Change TGSR Videos
function loadTGSR(uid){
  const db = firebase.firestore();
  const tgsrVideos = db.collection('tgsr').doc('videos');
  var total;

  //Framework
  document.getElementById('staffBody').innerHTML = [`
    <table>
      <tr>
        <td id='video1'>
          Video 1<br>
        </td>
        <td id='video2'>
          Video 2<br>
        </td>
        <td rowspan='2' align='center' valign='top' id='repsilon'>
        </td>
      </tr>
      <tr>
        <td id='video3'>
          Video 3<br>
        </td>
        <td id='video4'>
          Video 4<br>
        </td>
      </tr>
    </table>`]

  tgsrVideos.onSnapshot(doc => {
    const data = doc.data();
    if (tgsnStaffUID.includes(uid) || tgsnCoordUID.includes(uid)){
      document.getElementById('video1').innerHTML = [`Video 1<br>
        <iframe src='` + data.v1 + `' width='533px' height='300px' allowfullscreen></iframe>`];
      if (data.v2 != ' '){
        document.getElementById('video2').innerHTML = [`Video 2<br>
          <iframe src='` + data.v2 + `' width='533px' height='300px' allowfullscreen></iframe>`];
      }
      if (data.v3 != ' '){
        document.getElementById('video3').innerHTML = [`Video 3<br>
          <iframe src='` + data.v3 + `' width='533px' height='300px' allowfullscreen></iframe>`];
      }
      if (data.v4 != ' '){
        document.getElementById('video4').innerHTML = [`Video 4<br>
          <iframe src='` + data.v4 + `' width='533px' height='300px' allowfullscreen></iframe>`];
      }
    }
  })

  if (tgsnCoordUID.includes(uid)){
    $("#repsilon").show();
    document.getElementById('repsilon').innerHTML = [`
      Change Videos<br>
      Video 1: <input type='text' id='v1'><br>
      Video 2: <input type='text' id='v2'><br>
      Video 3: <input type='text' id='v3'><br>
      Video 4: <input type='text' id='v4'><br>
      <button onclick='changeVideos()'>Change Videos</button>`];
  } else {
    $("#repsilon").hide();
  }

  $('#v1').keyup(function(event){
    if (event.keyCode === 13){
      changeVideos();
    }
  })
  $('#v2').keyup(function(event){
    if (event.keyCode === 13){
      changeVideos();
    }
  })
  $('#v3').keyup(function(event){
    if (event.keyCode === 13){
      changeVideos();
    }
  })
  $('#v4').keyup(function(event){
    if (event.keyCode === 13){
      changeVideos();
    }
  })
}

function changeVideos(){
  var video1 = document.getElementById('v1').value;
  var video2 = document.getElementById('v2').value;
  var video3 = document.getElementById('v3').value;
  var video4 = document.getElementById('v4').value;

  const db = firebase.firestore();
  const tgsrVideos = db.collection('tgsr').doc('videos');

  if (video1 != ""){
    tgsrVideos.update({ v1: video1});
  }
  if (video2 != ""){
    tgsrVideos.update({ v2: video2});
  }
  if (video3 != ""){
    tgsrVideos.update({ v3: video3});
  }
  if (video4 != ""){
    tgsrVideos.update({ v4: video4});
  }
}
