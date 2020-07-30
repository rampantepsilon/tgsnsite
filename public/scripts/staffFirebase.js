//Staff Information
var tgsnStaff = [];
var tgsnStaffUID = [];
var tgsnStaffName = [];
var tgsnCoordinators = [];
var tgsnCoordUID = [];
var tgsnCoordName = [];
var tgsnAdminUName = ['RampantEpsilon', 'peacemaker2448'];

//Document Load
document.addEventListener("DOMContentLoaded", event =>{
  //Please Wait on Login
  document.querySelector('#title').innerHTML = (`Please Wait`);

  //Get info from Firestore Database
  const fBase = firebase.app();
  const fsDB = firebase.firestore();
  const coord = fsDB.collection('users').doc("tgsnCoord");
  const staff = fsDB.collection('users').doc('tgsnStaff');
  const usernames = fsDB.collection('users').doc('usernames');

  coord.onSnapshot(doc => {
    const coordData = doc.data();
    for (i = 0; i < coordData.uid.length; i++){
      tgsnCoordUID[i] = coordData.uid[i];
    }
    for (i = 0; i < coordData.email.length; i++){
      tgsnCoordinators[i] = coordData.email[i];
    }
  })

  staff.onSnapshot(doc => {
    const staffData = doc.data();
    for (i = 0; i < staffData.uid.length; i++){
      tgsnStaffUID[i] = staffData.uid[i];
    }
    for (i = 0; i < staffData.email.length; i++){
      tgsnStaff[i] = staffData.email[i];
    }
  })

  firebase.auth().getRedirectResult()
    .then(result => {
      var token = result.credential.accessToken;
      const user = result.user;
      var userName;

      for (i = 0; i < names.length; i++){
        if (user.email == emails[i]){
          userName = names[i];
        }
      }

      if (!userName) {
        userName = user.displayName;
      }

      sessionStorage.setItem('user', user.uid);
      sessionStorage.setItem('userEmail', user.email);
      sessionStorage.setItem('userName', userName);
      sessionStorage.setItem('userPhoto', user.photoURL);

      location.reload(1);
    })
    .catch(console.log)

  //Check if user refreshed Page
  setTimeout(`reloadCheck();`,1700);
  init();

  //Add Home information
  showHome();
});

//Resize Scripting for Twitch, TVS, & TGS Articles
window.addEventListener('resize', resizeView);

//Scripting for Resizing Window
function resizeView() {
  var page = sessionStorage.getItem('page');

  if (page == 'tgsArticles'){
    var playerWidth = window.innerWidth-50;
    var playerHeight = window.innerHeight-450;
    $('#articlesWin').css('width', playerWidth +'px');
    $('#articlesWin').css('height', playerHeight +'px');
  }
  if (page == 'twitch'){
    var playerHeight = window.innerHeight-260;
    var playerWidth = window.innerWidth-450;
    $('#twitchPlayer').css('width', playerWidth +'px');
    $('#twitchPlayer').css('height', playerHeight +'px');
    $('#twitchChat').css('width', 400+'px');
    $('#twitchChat').css('height', playerHeight+'px');
  }
  if (page == 'tvs'){
    var playerHeight = window.innerHeight-300;
    var playerWidth = (((window.innerHeight-300)*16)/9);
    $('#tvsPlaylist').css('width', playerWidth +'px');
    $('#tvsPlaylist').css('height', playerHeight +'px');
  }
  if (page == 'stats'){
    var playerWidth = window.innerWidth-50;
    var playerHeight = window.innerHeight-500;
    $('#statsView').css('width', playerWidth +'px');
    $('#statsView').css('height', playerHeight +'px');
  }
}

//Check if previously logged in
function reloadCheck(){
  var uid = sessionStorage.getItem('user');
  var uEmail = sessionStorage.getItem('userEmail');
  var uName = sessionStorage.getItem('userName');
  var uPhoto = sessionStorage.getItem('userPhoto');

  var position = '';
  if (tgsnCoordinators.includes(uEmail)){
    if (tgsnAdminUName.includes(uName)){
      position = 'TGSN Network Admin';
    } else {
      position = 'TGSN Coordinator';
    }
    showAll();
  } else if (tgsnStaff.includes(uEmail)) {
    position = 'TGSN Staff';
    showAllRO();
  } else {
    position = 'Staff';
    showDefault();
  }

  var page = sessionStorage.getItem('page');

  if (uid){
    if (uName == 'RampantEpsilon' || uName == 'peacemaker2448' || uName == 'Tommygun2442'){
      document.querySelector('#topTitle').innerHTML = (`<a href='../staff' id='topLink'>` + position + ` HQ</a><div style='position:absolute; top: 47px; right: 15px; z-index: 1000;'><img src='../images/founder.png' width='30px' height='30px' alt='Founding Member' onclick='founderSecret()'/></div>`);
      document.querySelector('#title').innerHTML = (`Hello ` + uName + `<br><button onclick='googleLogout()'>Logout</button>`);
      document.querySelector('#userPic').innerHTML = (`<img src='` + uPhoto + `' width='60px' height='60px' id='profilePic' onclick='userSecret()'/>`);
    } else {
      document.querySelector('#topTitle').innerHTML = (`<a href='../staff' id='topLink'>` + position + ` HQ</a>`);
      document.querySelector('#title').innerHTML = (`Hello ` + uName + `<br><button onclick='googleLogout()'>Logout</button>`);
      document.querySelector('#userPic').innerHTML = (`<img src='` + uPhoto + `' width='60px' height='60px' id='profilePic' onclick='userSecret()'/>`);
    }
  } else {
    document.querySelector('#title').innerHTML = (`Not Signed In <br><button onclick='googleLogin()'>Login with Google</button>`);
  }
}

//Login with Google
function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithRedirect(provider);
}

//Logout with Google
function googleLogout(){
  firebase.auth().signOut().then(function() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userPhoto');
    setTimeout('location.reload(1)',500);
  }).catch(function(error){

  });
}

//Update Viewer Facing TGS Articles
function updateTGSArticles() {
  const db = firebase.firestore();
  const tgsArticles = db.collection('tgs').doc('articles');

  var tgsArticleLink = "";
  if (document.getElementById('tgsArticleLink').value != ""){
    tgsArticleLink = document.getElementById('tgsArticleLink').value;
    tgsArticles.update({ link: tgsArticleLink });
  }
}

//Update Staff Facing TGS Articles
function updateStaffArticles(){
  const db = firebase.firestore();
  const tgsArticles = db.collection('tgs').doc('articles');

  var tgsArticleLink = '';
  if (document.getElementById('tgsArticleLink').value != ""){
    tgsArticleLink = document.getElementById('tgsArticleLink').value;
    tgsArticles.update({ staffLink: tgsArticleLink });
  }
}

//Clear dialog box for TGS Articles
function clearTGSArticles(){
  document.getElementById('tgsArticleLink').value = "";
}

//Update this week's stats
function updateTWValues(){
  const db = firebase.firestore();
  const tgsnLWStats = db.collection('stats').doc('tgsn');

  var lwLength = "";
  var lwMin = "";
  var lwAvg = "";
  var lwMax = "";
  var lwUnique = "";
  var lwNewFollows = "";
  var lwFollows = "";
  var goalAvgView = ""

  if (document.getElementById('lengthutw').value != ""){
    lwLength = document.getElementById('lengthutw').value;
    tgsnLWStats.update ({ length: lwLength});
  }
  if (document.getElementById('minutw').value != ""){
    lwMin = document.getElementById('minutw').value;
    tgsnLWStats.update ({ minWatched: lwMin});
  }
  if (document.getElementById('avgutw').value != ""){
    lwAvg = document.getElementById('avgutw').value;
    tgsnLWStats.update ({ avgViewers: lwAvg});
  }
  if (document.getElementById('maxutw').value != ""){
    lwMax = document.getElementById('maxutw').value;
    tgsnLWStats.update ({ maxViewers: lwMax});
  }
  if (document.getElementById('uniqueutw').value != ""){
    lwUnique = document.getElementById('uniqueutw').value;
    tgsnLWStats.update ({ uniqViewers: lwUnique});
  }
  if (document.getElementById('newFollowsutw').value != ""){
    lwNewFollows = document.getElementById('newFollowsutw').value;
    tgsnLWStats.update ({ newFollow: lwNewFollows});
  }
  if (document.getElementById('followsutw').value != ""){
    lwFollows = document.getElementById('followsutw').value;
    tgsnLWStats.update ({ totalFollow: lwFollows});
  }
  if (document.getElementById('goalAvgView').value != ""){
    goalAvgView = document.getElementById('goalAvgView').value;
    tgsnLWStats.update ({ goalAvgView: goalAvgView });
  }
}

//Update last week's stats
function updateLWValues(){
  const db = firebase.firestore();
  const tgsnLWStats = db.collection('stats').doc('lastweek');

  var lwLength = "";
  var lwMin = "";
  var lwAvg = "";
  var lwMax = "";
  var lwUnique = "";
  var lwNewFollows = "";
  var lwFollows = "";

  if (document.getElementById('lengthulw').value != ""){
    lwLength = document.getElementById('lengthulw').value;
    tgsnLWStats.update ({ length: lwLength});
  }
  if (document.getElementById('minulw').value != ""){
    lwMin = document.getElementById('minulw').value;
    tgsnLWStats.update ({ minWatched: lwMin});
  }
  if (document.getElementById('avgulw').value != ""){
    lwAvg = document.getElementById('avgulw').value;
    tgsnLWStats.update ({ avgViewers: lwAvg});
  }
  if (document.getElementById('maxulw').value != ""){
    lwMax = document.getElementById('maxulw').value;
    tgsnLWStats.update ({ maxViewers: lwMax});
  }
  if (document.getElementById('uniqueulw').value != ""){
    lwUnique = document.getElementById('uniqueulw').value;
    tgsnLWStats.update ({ uniqViewers: lwUnique});
  }
  if (document.getElementById('newFollowsulw').value != ""){
    lwNewFollows = document.getElementById('newFollowsulw').value;
    tgsnLWStats.update ({ newFollow: lwNewFollows});
  }
  if (document.getElementById('followsulw').value != ""){
    lwFollows = document.getElementById('followsulw').value;
    tgsnLWStats.update ({ totalFollow: lwFollows});
  }
}

//Update Schedule from Modal
function updateSchedule(){
  const db = firebase.firestore();
  const tgsnSchedule = db.collection('schedule').doc('new');

  var day = document.getElementById('day').value;
  //var month = document.getElementById('mDate').value;
  //var date = document.getElementById('dDate').value;
  var time = document.getElementById('sTime').value;
  var preShow = document.getElementById('pShow').value;
  var show = document.getElementById('show').value;
  var game = document.getElementById('game').value;
  var wosm = document.getElementById('wosm').value;
  var wosd = document.getElementById('wosd').value;
  var woem = document.getElementById('woem').value;
  var woed = document.getElementById('woed').value;
  var post = [];

  if (wosm != '' && wosd != '' && woem != '' && woed != ''){
    tgsnSchedule.update({week: {[0]: wosm,[1]: wosd,[2]: woem,[3]: woed}});
  }

  if (time != ''){
    post[0] = time;
  }
  if (time == ''){
    post[0] = 'N/A';
  }
  if (preShow != ''){
    post[1] = preShow
  }
  if (preShow == ''){
    post[1] = '&nbsp;';
  }
  post[2] = show;
  if (game != ''){
    post[3] = game;
  }
  if (game == ''){
    post[3] = 'N/A';
  }
  //To Be Added In Next Update
  //post[4] = month + '/' + date;

  //Post to Database
  if (day == 'Monday'){
    tgsnSchedule.update({monday: {[0]: post[0], [1]: post[1], [2]: post[2], [3]: post[3]}});
  }
  if (day == 'Tuesday'){
    tgsnSchedule.update({tuesday: {[0]: post[0], [1]: post[1], [2]: post[2], [3]: post[3]}});
  }
  if (day == 'Wednesday'){
    tgsnSchedule.update({wednesday: {[0]: post[0], [1]: post[1], [2]: post[2], [3]: post[3]}});
  }
  if (day == 'Thursday'){
    tgsnSchedule.update({thursday: {[0]: post[0], [1]: post[1], [2]: post[2], [3]: post[3]}});
  }
  if (day == 'Friday'){
    tgsnSchedule.update({friday: {[0]: post[0], [1]: post[1], [2]: post[2], [3]: post[3]}});
  }
  if (day == 'Saturday'){
    tgsnSchedule.update({saturday: {[0]: post[0], [1]: post[1], [2]: post[2], [3]: post[3]}});
  }
  if (day == 'Sunday'){
    tgsnSchedule.update({sunday: {[0]: post[0], [1]: post[1], [2]: post[2], [3]: post[3]}});
  }

  document.getElementById('myModal').style.display = 'none';
}
