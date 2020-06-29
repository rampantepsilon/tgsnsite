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
      "Authorization": 'Bearer zaatduqj2w5nf40gwdyilmfaktid2a',
      "Client-ID": 'o118lfy65junb52nuye0weh4xbvn11',
    },
    success: function(channel)
    {
      //console.log("Results:");
      //console.log(channel);
      //var followCount = channel.total;
      const app = firebase.app();
      const db = firebase.firestore();
      const tgsnStats = db.collection('stats').doc('tgsn');
      var avgFollows;
      var latestFollower = channel.data[0].from_name;

      if (sessionStorage.getItem('page') == 'home'){
        tgsnStats.get().then(function(doc) {
          const data = doc.data();
          avgFollows = parseFloat(data.goalAvgView);
          var progBar = ((avgFollows / 3)*100);
          if (progBar >= 100){
            progBar = 100;
          }
          document.getElementById('followers').innerHTML = `<div><u>Road To Affiliate</u>
            <div class="w3-light-grey w3-round-xlarge">
              <div class="w3-container w3-blue w3-round-xlarge" style="width:` + progBar + `%" id="videos">` + avgFollows + `/3</div>
            </div>
          <br/>Rampant Randomizer Showcase
          <br/>Peace Plays FF 15
          <br/>Latest Follower: ` + latestFollower + `</div>`;
        })
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
const notice2 = `<p>TheVoicelessSaloon is looking for people interested in helping. This can be providing gameplay, streaming content, or even help coordinating better methods of sharing runs. If you are interested, please reach out to RampantEpsilon#7868 on Discord.</p>`;
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
    document.querySelector('#gav').innerHTML = data.goalAvgView;
    statChange();
  })
}

//Schedule Load
function loadSchedule(){
  //Initialize Values
  const app = firebase.app();
  const db = firebase.firestore();
  const schedule = db.collection('schedule').doc('new');

  //Get Schedule & Dates

  schedule.onSnapshot(doc => {
    const day = doc.data();

    //Fill dates
    var startMonth = day.week[0];
    var startDay = day.week[1];
    var endMonth = day.week[2];
    var endDay = day.week[3];
    var weekDays = [];
    var dayCalc;
    var newMonthCounter = 0;

    if (startMonth == endMonth){
      for (i=0; i < 7; i++){
        weekDays[i] = (parseInt(startDay)+parseInt(i));
      }
      //Add Dates to schedule
      $('#mDate').html(startMonth + '/' + weekDays[0]);
      $('#tuDate').html(startMonth + '/' + weekDays[1]);
      $('#wDate').html(startMonth + '/' + weekDays[2]);
      $('#thDate').html(startMonth + '/' + weekDays[3]);
      $('#fDate').html(startMonth + '/' + weekDays[4]);
      $('#saDate').html(startMonth + '/' + weekDays[5]);
      $('#suDate').html(startMonth + '/' + weekDays[6]);
    }
    if (startMonth != endMonth){
      if (parseInt(startMonth) == 4 || parseInt(startMonth) == 6 || parseInt(startMonth) == 9 || parseInt(startMonth) == 11){
        //Get Amount of Days before month change
        dayCalc = 31 - parseInt(startDay);

        //Add Current Month
        for (i = 0; i < dayCalc; i++){
          weekDays[i] = startMonth + '/' + (parseInt(startDay)+parseInt(i));
        }

        //Add New Month
        for (j = weekDays.length; j < 7; j++){
          weekDays[j] = endMonth + '/' + (1 + parseInt(newMonthCounter));
          newMonthCounter++;
        }

        //Add Dates to schedule
        $('#mDate').html(weekDays[0]);
        $('#tuDate').html(weekDays[1]);
        $('#wDate').html(weekDays[2]);
        $('#thDate').html(weekDays[3]);
        $('#fDate').html(weekDays[4]);
        $('#saDate').html(weekDays[5]);
        $('#suDate').html(weekDays[6]);
      }

      if (parseInt(startMonth) == 1 || parseInt(startMonth) == 3 || parseInt(startMonth) == 5 || parseInt(startMonth) == 7 || parseInt(startMonth) == 8 || parseInt(startMonth) == 10 || parseInt(startMonth) == 12){
        //Get Amount of Days before month change
        dayCalc = 32 - parseInt(startDay);

        //Add Current Month
        for (i = 0; i < dayCalc; i++){
          weekDays[i] = startMonth + '/' + (parseInt(startDay)+parseInt(i));
        }

        //Add New Month
        for (j = weekDays.length; j < 7; j++){
          weekDays[j] = endMonth + '/' + (1 + parseInt(newMonthCounter));
          newMonthCounter++;
        }

        //Add Dates to schedule
        $('#mDate').html(weekDays[0]);
        $('#tuDate').html(weekDays[1]);
        $('#wDate').html(weekDays[2]);
        $('#thDate').html(weekDays[3]);
        $('#fDate').html(weekDays[4]);
        $('#saDate').html(weekDays[5]);
        $('#suDate').html(weekDays[6]);
      }

      if (parseInt(startMonth) == 2){
        //Get Amount of Days before month change
        dayCalc = 29 - parseInt(startDay);

        //Add Current Month
        for (i = 0; i < dayCalc; i++){
          weekDays[i] = startMonth + '/' + (parseInt(startDay)+parseInt(i));
        }

        //Add New Month
        for (j = weekDays.length; j < 7; j++){
          weekDays[j] = endMonth + '/' + (1 + parseInt(newMonthCounter));
          newMonthCounter++;
        }

        //Add Dates to schedule
        $('#mDate').html(weekDays[0]);
        $('#tuDate').html(weekDays[1]);
        $('#wDate').html(weekDays[2]);
        $('#thDate').html(weekDays[3]);
        $('#fDate').html(weekDays[4]);
        $('#saDate').html(weekDays[5]);
        $('#suDate').html(weekDays[6]);
      }
    }

    //Fill Monday Fields
    $('#mTime').html(day.monday[0]);
    $('#mPShow').html(day.monday[1]);
    $('#mShow').html(day.monday[2] + "<br>(" + day.monday[3] + ")");

    //Fill Tuesday Fields
    $('#tuTime').html(day.tuesday[0]);
    $('#tuPShow').html(day.tuesday[1]);
    $('#tuShow').html(day.tuesday[2] + "<br>(" + day.tuesday[3] + ")");

    //Fill Wednesday Fields
    $('#wTime').html(day.wednesday[0]);
    $('#wPShow').html(day.wednesday[1]);
    $('#wShow').html(day.wednesday[2] + "<br>(" + day.wednesday[3] + ")");

    //Fill Thursday Fields
    $('#thTime').html(day.thursday[0]);
    $('#thPShow').html(day.thursday[1]);
    $('#thShow').html(day.thursday[2] + "<br>(" + day.thursday[3] + ")");

    //Fill Friday Fields
    $('#fTime').html(day.friday[0]);
    $('#fPShow').html(day.friday[1]);
    $('#fShow').html(day.friday[2] + "<br>(" + day.friday[3] + ")");

    //Fill Saturday Fields
    $('#saTime').html(day.saturday[0]);
    $('#saPShow').html(day.saturday[1]);
    $('#saShow').html(day.saturday[2] + "<br>(" + day.saturday[3] + ")");

    //Fill Sunday Fields
    $('#suTime').html(day.sunday[0]);
    $('#suPShow').html(day.sunday[1]);
    $('#suShow').html(day.sunday[2] + "<br>(" + day.sunday[3] + ")");
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
        <h2>Goals</h2>
        <table width='95%' align='center'>
          <tr>
            <td><div id='followers'></div></td>
          </tr>
        </table>
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
    var staffLink = data.staffLink;
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
          <td align='center' valign='top' colspan='3'>
            <h3><u>TGS Resources</u></h3>
            <h6>Changes can only be made by a Network Admin or TGSN Coordinator</h6>
          </td>
        </tr>
        <tr>
          <td align='center'>
            <div id='body'>Current TGS Articles (Viewer Facing):<h5>(Only the document part of the URL is shown here)</h5><font size='2'><a href='` + link + `' target='_blank'>`/*Click Here (Opens in new tab)*/ + link.substring(35, trunc) + `</a></font></div>
          </td>
          <td align='center'>
            <div id='body'>Current TGS Articles (Staff Facing [Shown Below]):<h5>(Only the document part of the URL is shown here)</h5><font size='2'><a href='` + staffLink + `' target='_blank'>`/*Click Here (Opens in new tab)*/ + staffLink.substring(35, trunc) + `</a></font></div>
          </td>
          <td align='center'>
            Enter the new link for TGS Articles<br>
            <input id='tgsArticleLink'><br>
            <button onclick='updateTGSArticles()'>Update Viewer Articles</button>
            <button onclick='updateStaffArticles()'>Update Staff Articles</button>
            <button onclick='clearTGSArticles()'>Clear Link Field</button>
          </td>
        </tr>
        <tr>
          <td colspan='3' align='center'>
            <iframe src='` + staffLink + `' id='articlesWin'></iframe>
          </td>
        </tr>
      </table>`]
    } else {
      document.getElementById('staffBody').innerHTML = [`

        <table width='100%'>
          <tr>
            <td align='center' valign='top' colspan='2'>
              <h3><u>TGS Resources</u></h3>
              <h6>Changes can only be made by a Network Admin or TGSN Coordinator</h6>
            </td>
          </tr>
          <tr>
            <td align='center'>
              <div id='body'>Current TGS Articles (Viewer Facing):<h5>(Only the document part of the URL is shown here)</h5><font size='2'><a href='` + link + `' target='_blank'>`/*Click Here (Opens in new tab)*/ + link.substring(35, trunc) + `</a></font></div>
            </td>
            <td align='center'>
              <div id='body'>Current TGS Articles (Staff Facing [Shown Below]):<h5>(Only the document part of the URL is shown here)</h5><font size='2'><a href='` + staffLink + `' target='_blank'>`/*Click Here (Opens in new tab)*/ + staffLink.substring(35, trunc) + `</a></font></div>
            </td>
          </tr>
          <tr>
            <td colspan='2' align='center'>
              <iframe src='` + staffLink + `' id='articlesWin'></iframe>
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

function loadTwitch(){
  var playerHeight = window.innerHeight-260;
  var playerWidth = window.innerWidth-50;

  new Twitch.Embed('twitch-embed', {
    width: playerWidth,
    height: playerHeight,
    channel: 'thegamingsaloonnetwork',
    theme: 'dark',
    parent: ['tgsnetwork.org','localhost']
  })

  document.getElementsByTagName("iframe")[0].setAttribute('id','player');
}

function showTwitch(){

  //Determine what to show
  var uEmail = sessionStorage.getItem('userEmail');
  var uid = sessionStorage.getItem('user');

  sessionStorage.setItem('page','twitch');
  /*document.getElementById('staffBody').innerHTML = [`<table width='100%'>
    <tr>
      <td style='text-align:center;'>
        <iframe src='https://player.twitch.tv/?thegamingsaloonnetwork&parent=tgsnetwork.org&parent=localhost&autoplay=true' id='twitchPlayer' frameborder='0' scrolling='no' allowfullscreen='true'></iframe>
      </td>
      <td>
        <iframe scrolling="no" frameborder="0" src="https://www.twitch.tv/popout/thegamingsaloonnetwork/chat?parent=tgsnetwork.org&parent=localhost" id='twitchChat'></iframe>
      </td>
    </tr>
  </table>`];*/
  document.getElementById('staffBody').innerHTML = [`<table width='100%'>
    <tr>
      <td style='text-align:center;'>
        <div id='twitch-embed'></div>
      </td>
    </tr>
  </table>`];

  loadTwitch();

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
                  Goal Avg. Viewers&nbsp;&nbsp;&nbsp;</br>
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
                  <div id='gav'></div>
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
                  <div>---</div>
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
                  <div>---</div>
                </td>
                <td align='center' valign='top' width='130px' style='border-right: 1px solid black;'>
                  <u>Goal</u><br>
                  3:30<br>
                  630<br>
                  3<br>
                  5<br>
                  5<br>
                  0<br>
                  205<br>
                  3
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
                  Goal Avg. Viewers: <input id='goalAvgView' size='1'></br>
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
                  Goal Avg. Viewers&nbsp;&nbsp;&nbsp;</br>
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
                  <div id='gav'></div>
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
                  <div>---</div>
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
                  <div>---</div>
                </td>
                <td align='center' valign='top' width='130px' style='border-right: 1px solid black;'>
                  <u>Goal</u><br>
                  3:30<br>
                  630<br>
                  3<br>
                  5<br>
                  5<br>
                  0<br>
                  205<br>
                  3
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
    $("#goalAvgView").keyup(function(event) {
      if (event.keyCode === 13){
        updateTWValues();
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

  window.onclick = function(event) {
    if (event.target == document.getElementById('myModal')) {
      document.getElementById('myModal').style.display = 'none';
    }
  }

  document.getElementById('staffBody').innerHTML = [`
    <div align='center'>Stream Schedule</div>
    <table width='85%' align='center' border='1px'>
      <tr>
        <td width='25%' align='center'>
          <b><u>Date</u></b>
          <div>Start Time</div>
          <div>Pre-Show</div>
          <div>Show</div>
          <div>Game (If Applicable)</div>
        </td>
        <td width='25%' id='monday' align='center' onclick='edit("monday")'>
          <b><u>Monday <span id='mDate'></span></u></b>
          <div id='mTime'>&nbsp;</div>
          <div id='mPShow'>&nbsp;<br>&nbsp;</div>
          <div id='mShow'>&nbsp;<br>&nbsp;</div>
        </td>
        <td width='25%' id='tuesday' align='center' onclick='edit("tuesday")'>
          <b><u>Tuesday <span id='tuDate'></span></u></b>
          <div id='tuTime'>&nbsp;</div>
          <div id='tuPShow'>&nbsp;<br>&nbsp;</div>
          <div id='tuShow'>&nbsp;<br>&nbsp;</div>
        </td>
        <td width='25%' id='wednesday' align='center' onclick='edit("wednesday")'>
          <b><u>Wednesday <span id='wDate'></span></u></b>
          <div id='wTime'>&nbsp;</div>
          <div id='wPShow'>&nbsp<br>&nbsp;;</div>
          <div id='wShow'>&nbsp;<br>&nbsp;</div>
        </td>
      </tr>
    </table>
    <table width='85%' align='center' border='1px'>
      <tr>
        <td width='25%' id='thursday' align='center' onclick='edit("thursday")'>
          <b><u>Thursday <span id='thDate'></span></u></b>
          <div id='thTime'>&nbsp;</div>
          <div id='thPShow'>&nbsp;<br>&nbsp;</div>
          <div id='thShow'>&nbsp;<br>&nbsp;</div>
        </td>
        <td width='25%' id='friday' align='center' onclick='edit("friday")'>
          <b><u>Friday <span id='fDate'></span></u></b>
          <div id='fTime'>&nbsp;</div>
          <div id='fPShow'>&nbsp;<br>&nbsp;</div>
          <div id='fShow'>&nbsp;<br>&nbsp;</div>
        </td>
        <td width='25%' id='saturday' align='center' onclick='edit("saturday")'>
          <b><u>Saturday <span id='saDate'></span></u></b>
          <div id='saTime'>&nbsp;</div>
          <div id='saPShow'>&nbsp;<br>&nbsp;</div>
          <div id='saShow'>&nbsp;<br>&nbsp;</div>
        </td>
        <td width='25%' id='sunday' align='center' onclick='edit("sunday")'>
          <b><u>Sunday <span id='suDate'></span></u></b>
          <div id='suTime'>&nbsp;</div>
          <div id='suPShow'>&nbsp;<br>&nbsp;</div>
          <div id='suShow'>&nbsp;<br>&nbsp;</div>
        </td>
      </tr>
    </table>`];

  //Schedule Edit Commands
  if (position == 'TGSN Coordinator' && tgsnCoordUID.includes(uid)){
    //document.getElementById('monday').innerHTML += [`<button onclick='edit()'>Edit</div>`];

    /*document.getElementById('staffBody').innerHTML += [`
      <table width='85%' align='center'>
        <tr id='scheduleEdit'>
          <td colspan='4' align='center'><u>Update Schedule</u>
            <table>
              <tr>
                <td align='right' valign='top' style='font-size:18px'>
                  Day:<br>
                  Start Time:<br>
                  Pre-Show Game:<br>
                  Show:<br>
                  Game:<br>
                  Week Of:
                </td>
                <td valign='top' align='left'>
                  <form>
                    <select id='day' size='1'>
                      <option>Monday</option>
                      <option>Tuesday</option>
                      <option>Wednesday</option>
                      <option>Thursday</option>
                      <option>Friday</option>
                      <option>Saturday</option>
                      <option>Sunday</option>
                    </select>
                  </form>
                  <input type="text" id='sTime'><br>
                  <input type="text" id='pShow'><br>
                  <form>
                    <select id='show' size='1'>
                      <option>No Stream</option>
                      <option>The Gaming Saloon</option>
                      <option>Rampant Gaming</option>
                      <option>Weekly Co-Op</option>
                      <option>The Gaming Saloon Reviews</option>
                      <option>Peace Plays</option>
                      <option>Rampant Plays</option>
                      <option>Rampant Runs</option>
                      <option>Glock Plays</option>
                    </select>
                  </form>
                  <input type='text' id='game'><br>
                  <input type='text' id='wosm' maxlength='2' size='2'>/<input type='text' id='wosd' maxlength='2' size='2'> - <input type='text' id='woem' maxlength='2' size='2'>/<input type='text' id='woed' maxlength='2' size='2'><br>
                  <button onclick='updateSchedule()' id='ud8Schedule'>Update Schedule</button>
              </tr>
            </table>
            <div align='center'><span style='color:red;'>NOTE:</span> If a field is left blank all information for that slot will be removed!<br>When editing, if you want to remove all entries, leave all fields blank and set the day and show.</div>
          </td>
        </tr>
      </table>`];*/
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
  $("#game").keyup(function(event){
    if (event.keyCode === 13){
      $("#ud8Schedule").click();
    }
  });
  $("#wosm").keyup(function(event){
    if (event.keyCode === 13){
      $("#ud8Schedule").click();
    }
  });
  $("#wosd").keyup(function(event){
    if (event.keyCode === 13){
      $("#ud8Schedule").click();
    }
  });
  $("#woem").keyup(function(event){
    if (event.keyCode === 13){
      $("#ud8Schedule").click();
    }
  });
  $("#woed").keyup(function(event){
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
          <iframe id='tvsPlaylist' src="https://www.youtube.com/embed/videoseries?list=PLOMNn1DOI7zeP2oJcQgMxVQ1tUm06_Xsg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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
    var playerWidth = window.innerWidth-50;

    document.getElementById('player').setAttribute('width', playerWidth);
    document.getElementById('player').setAttribute('height', playerHeight);
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
    origin: 'https://www.gamespot.com',
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
    origin: 'https://www.gamespot.com',
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
      <tr colspan='3'>
        <td align='center'>During the run of Kamen Rider (1971), there will not be embeds. Please visit <a href='http://www.shoutfactorytv.com/series/kamen-rider' target='_blank'>Shout Factory TV</a> for the epsiodes.
      <tr>
        <td id='video1'>
          Video 1<br>
        </td>
        <td id='video2'>
          Video 2<br>
        </td>
        <td align='center' valign='middle' id='repsilon'>
        </td>
      </tr>
      <tr>
        <td id='video3'>
          Video 3<br>
        </td>
        <td id='video4'>
          Video 4<br>
        </td>
        <td id='video5'>
          Video 5<br>
        </td>
      </tr>
    </table>`]

  tgsrVideos.onSnapshot(doc => {
    const data = doc.data();
    if (tgsnStaffUID.includes(uid) || tgsnCoordUID.includes(uid)){
      if (data.v1 != 'n/a'){
        $('#video1').show();
        document.getElementById('video1').innerHTML = [`Video 1<br>
          <iframe src='` + data.v1 + `' width='567px' height='318px' id='tgsrVid1' allowfullscreen style='overflow-y:hidden;'></iframe>`];
      }
      if (data.v1 == 'n/a'){
        $('#video1').hide();
      }
      if (data.v2 != 'n/a'){
        $('#video2').show();
        document.getElementById('video2').innerHTML = [`Video 2<br>
          <iframe src='` + data.v2 + `' width='567px' height='318px' id='tgsrVid2' allowfullscreen style='overflow-y:hidden;'></iframe>`];
      }
      if (data.v2 == 'n/a'){
        $('#video2').hide();
      }
      if (data.v3 != 'n/a'){
        $('#video3').show();
        document.getElementById('video3').innerHTML = [`Video 3<br>
          <iframe src='` + data.v3 + `' width='567px' height='318px' id='tgsrVid3' allowfullscreen style='overflow-y:hidden;'></iframe>`];
      }
      if (data.v3 == 'n/a'){
        $('#video3').hide();
      }
      if (data.v4 != 'n/a'){
        $('#video4').show();
        document.getElementById('video4').innerHTML = [`Video 4<br>
          <iframe src='` + data.v4 + `' width='567px' height='318px' id='tgsrVid4' allowfullscreen style='overflow-y:hidden;'></iframe>`];
      }
      if (data.v4 == 'n/a'){
        $('#video4').hide();
      }
      if (data.v5 != 'n/a'){
        $('#video5').show();
        document.getElementById('video5').innerHTML = [`Video 5<br>
          <iframe src='` + data.v5 + `' width='567px' height='318px' id='tgsrVid5' allowfullscreen style='overflow-y:hidden;'></iframe>`];
      }
      if (data.v5 == 'n/a'){
        $('#video5').hide();
      }
    }
  })

  if (tgsnCoordUID.includes(uid)){
    document.getElementById('repsilon').innerHTML = [`
      <button onclick='resizeTGSR()'>Fit To Screen</button><br>
      Change Videos<br>
      Video 1: <input type='text' id='v1'><br>
      Video 2: <input type='text' id='v2'><br>
      Video 3: <input type='text' id='v3'><br>
      Video 4: <input type='text' id='v4'><br>
      Video 5: <input type='text' id='v5'><br>
      <button onclick='changeVideos()'>Change Videos</button><br>
      Tip: Use "n/a" to signify no video.`];
  } else {
    document.getElementById('repsilon').innerHTML = [`
      <button onclick='resizeTGSR()'>Fit To Screen</button>`];
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
  $('#v5').keyup(function(event){
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
  var video5 = document.getElementById('v5').value;

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
  if (video5 != ""){
    tgsrVideos.update({ v5: video5});
  }
}

function resizeTGSR(){
  //Resize based on winSize (min 220*124)
  var playerWidth = (window.innerWidth-75)/3;
  var playerHeight = ((playerWidth*9)/16);
  if (playerWidth < '220'){
    for (i=1; i < 6; i++){
      $('#tgsrVid'+i).css('width', '220px');
      $('#tgsrVid'+i).css('height', '124px');
    }
    alert('Window is too small.\nPlease enlarge the window or try another browser and try again.');
  } else {
    for (i=1; i < 6; i++){
      $('#tgsrVid'+i).css('width', playerWidth +'px');
      $('#tgsrVid'+i).css('height', playerHeight +'px');
    }
  }
}

function edit(dayOfWeek){
  var modal = document.getElementById('myModal');
  var span = document.getElementsByClassName("close")[0];
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
    //Modal Open
    modal.style.display = 'block';
    //Close Function
    span.onclick = function() {
      document.getElementById('myModal').style.display = 'none';
    };

    //Load current information for day
    //Initialize Values
    const app = firebase.app();
    const db = firebase.firestore();
    const schedule = db.collection('schedule').doc('new');

    //Get Schedule & Dates

    schedule.onSnapshot(doc => {
      const day = doc.data();

      if (dayOfWeek == 'monday'){
        //Fill Monday Fields
        document.getElementById('day').value = 'Monday';
        document.getElementById('sTime').value = day.monday[0];
        document.getElementById('pShow').value = day.monday[1];
        document.getElementById('show').value = day.monday[2];
        document.getElementById('game').value = day.monday[3];
      }
      if (dayOfWeek == 'tuesday'){
        //Fill Monday Fields
        document.getElementById('day').value = 'Tuesday';
        document.getElementById('sTime').value = day.tuesday[0];
        document.getElementById('pShow').value = day.tuesday[1];
        document.getElementById('show').value = day.tuesday[2];
        document.getElementById('game').value = day.tuesday[3];
      }
      if (dayOfWeek == 'wednesday'){
        //Fill Monday Fields
        document.getElementById('day').value = 'Wednesday';
        document.getElementById('sTime').value = day.wednesday[0];
        document.getElementById('pShow').value = day.wednesday[1];
        document.getElementById('show').value = day.wednesday[2];
        document.getElementById('game').value = day.wednesday[3];
      }
      if (dayOfWeek == 'thursday'){
        //Fill Monday Fields
        document.getElementById('day').value = 'Thursday';
        document.getElementById('sTime').value = day.thursday[0];
        document.getElementById('pShow').value = day.thursday[1];
        document.getElementById('show').value = day.thursday[2];
        document.getElementById('game').value = day.thursday[3];
      }
      if (dayOfWeek == 'friday'){
        //Fill Monday Fields
        document.getElementById('day').value = 'Friday';
        document.getElementById('sTime').value = day.friday[0];
        document.getElementById('pShow').value = day.friday[1];
        document.getElementById('show').value = day.friday[2];
        document.getElementById('game').value = day.friday[3];
      }
      if (dayOfWeek == 'saturday'){
        //Fill Monday Fields
        document.getElementById('day').value = 'Saturday';
        document.getElementById('sTime').value = day.saturday[0];
        document.getElementById('pShow').value = day.saturday[1];
        document.getElementById('show').value = day.saturday[2];
        document.getElementById('game').value = day.saturday[3];
      }
      if (dayOfWeek == 'sunday'){
        //Fill Monday Fields
        document.getElementById('day').value = 'Sunday';
        document.getElementById('sTime').value = day.sunday[0];
        document.getElementById('pShow').value = day.sunday[1];
        document.getElementById('show').value = day.sunday[2];
        document.getElementById('game').value = day.sunday[3];
      }
      if (document.getElementById('pShow').value == '&nbsp;'){
        document.getElementById('pShow').value = '';
      }
    })

  } else {
    modal.style.display = 'none';
  }
}
