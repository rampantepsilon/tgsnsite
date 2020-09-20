/******Global Variables******/
//Releases
var apiReleases, startDate;

//Notices
const notice1 = `<p>Welcome to The Gaming Saloon Network Staff HQ!<br />This location will hold important information regarding TGSN Staff</p><p><font color='red'>Please Note: All Staff must log into this page at least once and use the Request Page to request permissions.</font></p>`;
const notice2 = `<p>TheVoicelessSaloon is looking for people interested in helping. This can be providing gameplay, streaming content, or even help coordinating better methods of sharing runs. If you are interested, please reach out to RampantEpsilon#7868 on Discord.</p>`;
const notice3 = [`<p>Want to provide feedback for the Staff HQ page?<br>Use the form <a href='https://forms.gle/PescTWy6oEDd6e6R7' target='_blank'>HERE</a></p>`];
const notice4 = [`<p>There's a new lightweight Twitch Chat client for only viewing chat. If you want to use this there is no support for emotes currently. You can find it <a href='./chat'>HERE</a></p>`]

//Bottom Links
const coord = [
  `<td align='center' width='14%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick="showHome()">Message Board</td>
  <td align='center' width='14%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showTwitch()'>Twitch Stream</td>
  <td align='center' width='14%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showStats()'>Stats</td>
  <td align='center' width='14%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showSchedule()'>Schedule</td>
  <td align='center' width='14%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showReleases()'>Releases</td>
  <td align='center' width='14%' onmouseover='this.style.backgroundColor = "orange"'  onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showShowInfo()'>Show Resources</td>
  <td align='center' width='14%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showRequest()'>Request Page</td>`
];
const staff = [
  `<td align='center' width='14%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick="showHome()">Message Board</td>
  <td align='center' width='14%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showTwitch()'>Twitch Stream</td>
  <td align='center' width='14%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showStats()'>Stats</td>
  <td align='center' width='14%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showSchedule()'>Schedule</td>
  <td align='center' width='14%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showReleases()'>Releases</td>
  <td align='center' width='14%' onmouseover='this.style.backgroundColor = "orange"'  onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showShowInfo()'>Show Resources</td>
  <td align='center' width='14%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showRequest()'>Request Access</td>`
];
const newStaff = [
  `<td align='center' width='20%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick="showHome()">Message Board</td>
  <td align='center' width='20%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showTwitch()'>Twitch Stream</td>
  <td align='center' width='20%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showSchedule()'>Schedule</td>
  <td align='center' width='20%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showReleases()'>Releases</td>
  <td align='center' width='20%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showRequest()'>Request Access</td>`
];
const guest = [
  `<td align='center' width='25%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick="showHome()">Message Board</td>
  <td align='center' width='25%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showTwitch()'>Twitch Stream</td>
  <td align='center' width='25%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showSchedule()'>Schedule</td>
  <td align='center' width='25%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showReleases()'>Releases</td>`
];

/******Initial Load Functions******/
function getFollowers(){setInterval('api()', 60000)}
function init(){
  api();
  getFollowers();
}
//Secret Functions
function founderSecret(){
  window.alert("You've been here since the beginning. At least you found the secret.")
}
function userSecret(){
  window.alert("You are now one of us! One of us! One Of Us! ONE Of Us! ONE OF Us! ONE OF US!")
}

//Bottom Links
function showAll(){
  document.getElementById('botLinks').innerHTML = coord
}
function showAllRO(){
  if (sessionStorage.getItem('user') != null && sessionStorage.getItem('user') != ""){
    document.getElementById('botLinks').innerHTML = staff
  } else {
      showDefault();
    }
}
function showDefault(){
  document.getElementById('botLinks').innerHTML = guest;
  if (sessionStorage.getItem('user') != null){
    document.getElementById('botLinks').innerHTML = newStaff;
  }
}

//Follower API
function api(){
  //console.log("Begin Script");
  $.ajax({
    datatype: 'json',
    url: 'https://api.twitch.tv/helix/users/follows?to_id=43584807',
    headers: {
      "Authorization": 'Bearer d9phpw1r24jhls7l9i0fugyrf9eedo',
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

//Player Resize (Can be Global)
function resizePlayer(){
  var pageCheck = sessionStorage.getItem('page');

  if (pageCheck == 'twitch'){
    var playerHeight = window.innerHeight-230;
    var playerWidth = window.innerWidth-50;

    document.getElementById('player').setAttribute('width', playerWidth);
    document.getElementById('player').setAttribute('height', playerHeight);
  }
}

/******Page Load Functions******/
/*Message Board*/
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

  document.getElementById('staffBody').innerHTML = [
    `<table width='100%'>
      <tr>
        <td style='text-align: center; border: 1px solid;'>
          <h2><u>Message Board</u></h2>
          <table border='1px'>
            <tr>
              <td width='50%'>` + notice1 + `</td>
              <td width='50%'>` + notice2 + `</td>
            </tr>
            <tr>
              <td width='50%'>` + notice3 + `</td>
              <td width='50%'>` + notice4 +`</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style='text-align: center; vertical-align: text-top; width: 35%; border: 1px solid;'>
          <h2><u>Goals</u></h2>
          <table width='95%' align='center'>
            <tr>
              <td><div id='followers'></div></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
    </table>`
  ];
  sessionStorage.setItem('page','home');
}

/*Twitch Stream*/
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
//Load Stream
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
//Show Twitch Dashboard
function showDashboard(){
  window.open("https://dashboard.twitch.tv/u/thegamingsaloonnetwork/stream-manager");
}
//Show TGSNBot Dashboard
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

/*Stats*/
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
                Goal Avg. Viewers&nbsp;&nbsp;&nbsp;</br>
              </td>
              <td align='center' valign='top' style='border-right: 1px solid black;' width='130px'>
                <u>Week to Date</u>
                <div id='ltw'></div>
                <div id='mtw'></div>
                <div id='atw'></div>
                <div id='maxtw'></div>
                <div id='utw'></div>
                <div id='gav'></div>
              </td>
              <td align='center' valign='top' style='border-right: 1px solid black;' width='130px'>
                <u>Last Week</u>
                <div id='llw'></div>
                <div id='mlw'></div>
                <div id='alw'></div>
                <div id='maxlw'></div>
                <div id='ulw'></div>
                <div>---</div>
              </td>
              <td align='center' valign='top' style='border-right: 1px solid black;' width='130px'>
                <u>Change</u>
                <div id='lchange'></div>
                <div id='mchange'></div>
                <div id='achange'></div>
                <div id='maxchange'></div>
                <div id='uchange'></div>
                <div>---</div>
              </td>
              <td align='center' valign='top' width='130px' style='border-right: 1px solid black;'>
                <u>Goal</u><br>
                3:30<br>
                630<br>
                3<br>
                5<br>
                5<br>
                3
              </td>
              <td id="updateInfoTW" align='right' valign='top' rowspan="6" id='loggedIn'></td>
              <td id="updateInfoLW" align='center' valign='top' rowspan="6" id='updateLW'>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td id='excel' align='center'></td>
      </tr>
    </table>
  `]

  //Add Editor
  setTimeout(editMode, 1000);

  //Load Stats
  loadStats();
}
//Load Editor if Accessible
function editMode(){
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
    document.getElementById('updateInfoTW').innerHTML = [`
      <u>Update W2D</u><br>
      Length: <input id='lengthutw' size='1'><br>
      Min. Watched: <input id='minutw' size='1'><br>
      Avg. Viewers: <input id='avgutw' size='1'><br>
      Max Viewers: <input id='maxutw' size='1'><br>
      Unique Viewers: <input id='uniqueutw' size='1'><br>
      Goal Avg. Viewers: <input id='goalAvgView' size='1'></br>
      <button onclick='updateTWValues()'>Update W2D Values</button>
    `];
    document.getElementById('updateInfoLW').innerHTML = [`
      <u>Update LW</u><br>
      <input id='lengthulw' size='1'><br>
      <input id='minulw' size='1'><br>
      <input id='avgulw' size='1'><br>
      <input id='maxulw' size='1'><br>
      <input id='uniqueulw' size='1'><br>&nbsp;<br>
      <button onclick='updateLWValues()'>Update LW Values</button>
    `];
    document.getElementById('excel').innerHTML = [`
      <table width='100%' border='1'>
        <tr>
          <td align='center' width='33%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='calcSheet("calc")'>Stat Calculation</td>
          <td align='center' width='33%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='calcSheet("form")'>TGSN Stream Performance Form</td>
          <td align='center' width='33%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='calcSheet("results")'>TGSN Stream Performance Results</td>
          </a>
        </tr>
        <tr>
          <td align='center' id='iframe' colspan='3'>
            <iframe src='https://docs.google.com/spreadsheets/d/1EVVwG-oq4N6XrPmvIice9iYMTlx1Qwxqnjxs5RM8V7c/edit' name='statsView' id='statsView'></iframe>
          </td>
        </tr>
      </table>
    `];

    //Table Styles
    $('updateInfoTW').css('width', '225px');
    $('updateInfoLW').css('width', '175px');
    document.getElementById('updateInfoTW').style.borderRight = '1px solid black';
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
    $("#goalAvgView").keyup(function(event) {
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
  }
  if (position == 'TGSN Staff' && tgsnStaffUID.includes(uid)){
    document.getElementById('excel').innerHTML = [`
      <table width='100%' border='1'>
        <tr>
          <td align='center' width='50%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='calcSheet("form")'>TGSN Stream Performance Form</td>
          <td align='center' width='50%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='calcSheet("results")'>TGSN Stream Performance Results</td>
          </a>
        </tr>
        <tr>
          <td align='center' id='iframe' colspan='2'>
            <iframe src='https://docs.google.com/forms/d/e/1FAIpQLSdhWnTw2UR_bO310b8YYpLYGd52EZYicTFo88TMl7bBjb_z2A/viewform' name='statsView' id='statsView'></iframe>
          </td>
        </tr>
      </table>
    `];
  }

  //Resize Window
  var playerWidth = window.innerWidth-50;
  var playerHeight = window.innerHeight-500;
  $('#statsView').css('width', playerWidth +'px');
  $('#statsView').css('height', playerHeight +'px');
}
//Edit Mode Functions
function calcSheet(frame){
  if (frame == 'calc'){
    $('#iframe').html(`<iframe src='https://docs.google.com/spreadsheets/d/1EVVwG-oq4N6XrPmvIice9iYMTlx1Qwxqnjxs5RM8V7c/edit' name='statsView' id='statsView'></iframe>`);
  }
  if (frame == 'form'){
    $('#iframe').html(`<iframe src='https://docs.google.com/forms/d/e/1FAIpQLSdhWnTw2UR_bO310b8YYpLYGd52EZYicTFo88TMl7bBjb_z2A/viewform' name='statsView' id='statsView'></iframe>`);
  }
  if (frame == 'results'){
    $('#iframe').html(`<iframe src='https://docs.google.com/spreadsheets/d/1chzC7UitHZ9KvcrmPutmwUIHFg_e392E4iwptH0RhLQ/edit#gid=4238686' name='statsView' id='statsView'></iframe>`);
  }

  //Resize Window
  var playerWidth = window.innerWidth-50;
  var playerHeight = window.innerHeight-500;
  $('#statsView').css('width', playerWidth +'px');
  $('#statsView').css('height', playerHeight +'px');
}
//Load Stats
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
    document.querySelector('#gav').innerHTML = data.goalAvgView;
    statChange();
  })
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
}

/*Schedule*/
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
//Load Schedule
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
  setTimeout(`highlightToday();`,1700);
}
//Highlight Today
function highlightToday(){
  //Highlight Current Day
  var d = new Date();
  var month = (d.getMonth() + 1);
  var date = d.getDate();
  var fullDate = month + '/' + date;
  var hDay = d.getDay();

  if (hDay == 0){
    if (fullDate == document.getElementById('suDate').innerHTML){
      document.getElementById('sunday').style.backgroundColor = 'gold';
    }
  }
  if (hDay == 1){
    if (fullDate == document.getElementById('mDate').innerText){
      document.getElementById('monday').style.backgroundColor = 'gold';
    }
  }
  if (hDay == 2){
    if (fullDate == document.getElementById('tuDate').innerText){
      document.getElementById('tuesday').style.backgroundColor = 'gold';
    }
  }
  if (hDay == 3){
    if (fullDate == document.getElementById('wDate').innerText){
      document.getElementById('wednesday').style.backgroundColor = 'gold';
    }
  }
  if (hDay == 4){
    if (fullDate == document.getElementById('thDate').innerText){
      document.getElementById('thursday').style.backgroundColor = 'gold';
    }
  }
  if (hDay == 5){
    if (fullDate == document.getElementById('fDate').innerText){
      document.getElementById('friday').style.backgroundColor = 'gold';
    }
  }
  if (hDay == 6){
    if (fullDate == document.getElementById('saDate').innerText){
      document.getElementById('saturday').style.backgroundColor = 'gold';
    }
  }
}
//Edit Schedule (TGSN Coordinator+)
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

/*Releases*/
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
//Clear Releases
function clearReleases(){
  document.getElementById('releases').innerHTML = "";
}
//+1 Day
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
//Go To Today
function goToday(){
  var d = new Date();
  document.getElementById('startMonth').value = (d.getMonth() + 1);
  document.getElementById('startDate').value = d.getDate();
  document.getElementById('startYear').value = d.getFullYear();
}
//Offset +100
function add100(){
  var current = document.getElementById('offset').value;
  current = parseInt(current, 10);
  current += 100;
  document.getElementById('offset').value = current;
}
//Offset -100
function rem100(){
  var current = document.getElementById('offset').value;
  current = parseInt(current, 10);
  current -= 100;
  document.getElementById('offset').value = current;
}
//Get Releases
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
//Releases API
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

/*Show Resources*/
function showShowInfo(){
  document.getElementById('staffBody').innerHTML = [`
    <table width='100%'>
      <tr>
        <td>
          <table width='100%' border='1'>
            <tr>
              <td align='center' width='33%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showTGSArticles()'>TGS Articles</td>
              <td align='center' width='33%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showTGSR()'>TGSR Videos</td>
              <td align='center' width='33%' onmouseover="this.style.backgroundColor = 'orange'" onmouseout="this.style.backgroundColor = 'rgba(0,0,0,0)'" onclick='showTVSVids()'>TVS Videos</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td id='showBody'></td>
      </tr>
    </table>
  `];
  showTGSArticles();
}
//TGS Articles//
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
      document.getElementById('showBody').innerHTML = [`
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
//TGSR Videos//
function showTGSR(){
  sessionStorage.setItem('page','request');

  //Determine what to show
  var uid = sessionStorage.getItem('user');

  loadTGSR(uid);
}
//Load TGSR
function loadTGSR(uid){
  const db = firebase.firestore();
  const tgsrVideos = db.collection('tgsr').doc('videos');
  var total;

  //Framework
  document.getElementById('showBody').innerHTML = [`
    <table width='100%'>
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
//Change Videos
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
//Resize for TGSR
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
//TVS Videos//
function showTVSVids(){
  sessionStorage.setItem('page','tvs');

  var uEmail = sessionStorage.getItem('userEmail');
  var uid = sessionStorage.getItem('user');

  if ((tgsnCoordinators.includes(uEmail) && tgsnCoordUID.includes(uid)) || (tgsnStaff.includes(uEmail) && tgsnStaffUID.includes(uid))){
    document.getElementById('showBody').innerHTML = [`<table width='100%'>
      <tr>
        <td>
          <h3 align='center'>Please download the video before streaming.</h3>
        </td>
      </tr>
      <tr>
        <td align='center'>
          <iframe id='tvsPlaylist' src="https://www.youtube.com/embed/videoseries?list=PLOMNn1DOI7zeP2oJcQgMxVQ1tUm06_Xsg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </td>
      </tr>
    </table>`]
  }
  var playerHeight = window.innerHeight-320;
  var playerWidth = (((window.innerHeight-320)*16)/9);
  $('#tvsPlaylist').css('width', playerWidth +'px');
  $('#tvsPlaylist').css('height', playerHeight +'px');
}

/*Request Page*/
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
      document.getElementById('staffReq').innerHTML += `<div id='staff` + i + `'>` + data.discord[i] + '<br>' + data.uid[i] + '<br>' + data.email[i] + `<br><button onclick='remStaffRequest(` + i + `)'>Remove Request</button></div><br>=====<br>`;
    }
    if (data.uid.length == 0){
      document.getElementById('staffReq').innerHTML += `No Current Requests`;
    }
  })
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
