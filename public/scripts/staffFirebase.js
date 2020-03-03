//Staff Information
var tgsnStaff = [];
const tgsnStaffUID = [];
var tgsnCoordinators = [];
var tgsnCoordUID = [];

//Document Load
document.addEventListener("DOMContentLoaded", event =>{
  //Please Wait on Login
  document.querySelector('#title').innerHTML = (`Please Wait`);

  //Get info from Firestore Database
  const fBase = firebase.app();
  const fsDB = firebase.firestore();
  const coord = fsDB.collection('users').doc("tgsnCoord");
  const staff = fsDB.collection('users').doc('tgsnStaff');

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

  //Check if user refreshed Page
  setTimeout(`reloadCheck();`,1500);
  init();

  //Add Home information
  showHome();
});

function reloadCheck(){
  var uid = sessionStorage.getItem('user');
  var uEmail = sessionStorage.getItem('userEmail');
  var uName = sessionStorage.getItem('userName');
  var uPhoto = sessionStorage.getItem('userPhoto');

  var position = '';
  if (tgsnCoordinators.includes(uEmail)){
    position = 'TGSN Coordinator';
    showAll();
  } else if (tgsnStaff.includes(uEmail)) {
    position = 'TGSN Staff';
    showAllRO();
  } else {
    position = 'Staff';
    showDefault();
  }

  if (uid){
    document.querySelector('#topTitle').innerHTML = (`<a href='../staffv2' id='topLink'>` + position + ` HQ</a>`);
    document.querySelector('#title').innerHTML = (`Hello ` + uName + `<br><button onclick='googleLogout()'>Logout</button>`);
    document.querySelector('#userPic').innerHTML = (`<img src='` + uPhoto + `' width='60px' height='60px' id='profilePic' />`);
  } else {
    document.querySelector('#title').innerHTML = (`Not Signed In <br><button onclick='googleLogin()'>Login with Google</button>`);
  }
}

function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      var userName = "";
      if (user.email == 'tomjware@gmail.com' || user.email == 'tgs.rampantepsilon@gmail.com'){
        userName = 'RampantEpsilon';
      }
      else if (user.email == 'peacemaker24482@gmail.com'){
        userName = 'peacemaker2448';
      }
      else if (user.email == 'tgs.tommygun2442@gmail.com'){
        userName = 'Tommygun2442';
      }
      else {
        userName = user.displayName;
      }

      sessionStorage.setItem('user', user.uid);
      sessionStorage.setItem('userEmail', user.email);
      sessionStorage.setItem('userName', userName);
      sessionStorage.setItem('userPhoto', user.photoURL);

      var position = '';
      if (tgsnCoordinators.includes(user.email)){
        position = 'TGSN Coordinator';
      } else if (tgsnStaff.includes(user.email)) {
        position = 'TGSN Staff';
      } else {
        position = 'Staff';
      }

      document.querySelector('#topTitle').innerHTML = (`<a href='../staff' id='topLink'>` + position + ` HQ</a>`)

      document.querySelector('#title').innerHTML = (`Hello ` + userName + `<br><button onclick='googleLogout()'>Logout</button>`);
      document.querySelector('#userPic').innerHTML = (`<img src='` + user.photoURL + `' width='60px' height='60px' id='profilePic' />`);

      if (position == 'TGSN Coordinator'){
        showAll();
      } else if (position == 'TGSN Staff') {
        showAllRO();
      } else {
        showDefault();
      }
      //console.log(user);
    })
    .catch(console.log)
}

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

function updateTGSArticles() {
  const db = firebase.firestore();
  const tgsArticles = db.collection('tgs').doc('articles');

  var tgsArticleLink = "";
  if (document.getElementById('tgsArticleLink').value != ""){
    tgsArticleLink = document.getElementById('tgsArticleLink').value;
    tgsArticles.update({ link: tgsArticleLink });
  }
}

//Clear dialog box for TGS Articles
function clearTGSArticles(){
  document.getElementById('tgsArticleLink').value = "";
}

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
}

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

function prefixChange(){
  const db = firebase.firestore();
  const tgsnPrefix = db.collection('stream').doc('prefix');
  var newPrefix = document.getElementById('prefixChange').value;

  tgsnPrefix.update ({ TGSN: newPrefix});
}

function updateSchedule(){
  const db = firebase.firestore();
  const tgsnSchedule = db.collection('schedule').doc('tgsn');

  var day = "";
  var time = document.getElementById('sTime').value;
  var preShow = document.getElementById('pShow').value;
  var show = document.getElementById('showGame').value;
  var wo = document.getElementById('weekOfEdit').value;

  if (wo != ''){
    tgsnSchedule.update({wo: wo});
  }

  var dayRadio = document.getElementsByName('day');
  for (i = 0; i < dayRadio.length; i++){
    if (dayRadio[i].checked){
      day = dayRadio[i].value;
    }
  }

  if (day != ""){
    if (day == 'monday'){
      if (time != ""){
        tgsnSchedule.update ({ mTime: time});
      }
      if (preShow != ''){
        tgsnSchedule.update ({ mPS: preShow});
      }
      if (show != ''){
        tgsnSchedule.update ({ mS: show});
      }
    }
    if (day == 'tuesday'){
      if (time != ""){
        tgsnSchedule.update ({ tuTime: time});
      }
      if (preShow != ''){
        tgsnSchedule.update ({ tuPS: preShow});
      }
      if (show != ''){
        tgsnSchedule.update ({ tuS: show});
      }
    }
    if (day == 'wednesday'){
      if (time != ""){
        tgsnSchedule.update ({ wTime: time});
      }
      if (preShow != ''){
        tgsnSchedule.update ({ wPS: preShow});
      }
      if (show != ''){
        tgsnSchedule.update ({ wS: show});
      }
    }
    if (day == 'thursday'){
      if (time != ""){
        tgsnSchedule.update ({ thTime: time});
      }
      if (preShow != ''){
        tgsnSchedule.update ({ thPS: preShow});
      }
      if (show != ''){
        tgsnSchedule.update ({ thS: show});
      }
    }
    if (day == 'friday'){
      if (time != ""){
        tgsnSchedule.update ({ fTime: time});
      }
      if (preShow != ''){
        tgsnSchedule.update ({ fPS: preShow});
      }
      if (show != ''){
        tgsnSchedule.update ({ fS: show});
      }
    }
    if (day == 'saturday'){
      if (time != ""){
        tgsnSchedule.update ({ saTime: time});
      }
      if (preShow != ''){
        tgsnSchedule.update ({ saPS: preShow});
      }
      if (show != ''){
        tgsnSchedule.update ({ saS: show});
      }
    }
    if (day == 'sunday'){
      if (time != ""){
        tgsnSchedule.update ({ suTime: time});
      }
      if (preShow != ''){
        tgsnSchedule.update ({ suPS: preShow});
      }
      if (show != ''){
        tgsnSchedule.update ({ suS: show});
      }
    }
  }
}

function showTGSN(){
  $('#player').load('tgsn.html');
}

function showTVS(){
  $('#player').load('tvs.html');
}
