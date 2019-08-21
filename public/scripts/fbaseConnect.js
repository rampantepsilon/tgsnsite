//Document Load
document.addEventListener("DOMContentLoaded", event =>{
  //Initialize Values
  const app = firebase.app();
  const db = firebase.firestore();
  const tgsArticles = db.collection('tgs').doc('articles');
  const tgsnStats = db.collection('stats').doc('tgsn');
  const tgsnPrev = db.collection('stats').doc('lastweek');
  const botDashboard = db.collection('bot').doc('links');

  //Get Bot Dashboard link
  botDashboard.onSnapshot(doc => {
    const data = doc.data();
    document.querySelector('#botDash').innerHTML = `<a href='` + data.TGSN + `' target='_blank'>TGSNBot Dashboard</a>`;
  })

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

  //Get Articles Link
  tgsArticles.onSnapshot(doc => {
    const data = doc.data();
    var link = data.link;
    var length = data.link.length;
    var trunc = length - 5;

    document.querySelector('#tgsArticles').innerHTML = (`Current TGS Articles:<h5>(Only the document part of the URL is shown here)</h5><font size='2'><a href='` + data.link + `' target='_blank'>`/*Click Here (Opens in new tab)*/ + link.substring(35, trunc) + `</a></font>`)
  })

  //Hide all Staff Tools
  $("#loggedIn").hide();
  $("#updateLW").hide();
  $('#streamPrefixUpdate').hide();
  $('#botDashCont').hide();
  $('#updateDashboard').hide();
  $('#chatBox').hide();
  $('#currentDashboard').attr('colspan', 2);

  //Initalize Follower and Dashboard Information
  init();
  dashboardGet();

});

function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();

  var tgsnCoordinators = ['tomjware@gmail.com', 'peacemaker24482@gmail.com'];
  var tgsnStaff = ['tgs.rampantepsilon@gmail.com'];//[];

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
      else {
        userName = user.displayName;
      }

      var position = '';
      if (tgsnCoordinators.includes(user.email)){
        position = 'TGSN Coordinator';
      } else if (tgsnStaff.includes(user.email)) {
        position = 'TGSN Staff';
      } else {
        position = 'Staff';
      }

      document.querySelector('#topTitle').innerHTML = (position + ` HQ`)

      document.querySelector('#title').innerHTML = (`Hello ` + userName + `<br><button onclick='googleLogout()'>Logout</button>`);
      document.querySelector('#userPic').innerHTML = (`<img src='` + user.photoURL + `' width='60px' height='60px' id='profilePic' />`);

      if (tgsnCoordinators.includes(user.email)){
        document.querySelector('#body').innerHTML = (`Enter the new link for TGS Articles<br><input id='tgsArticleLink'><table><tr><td id='linkButton2' onclick='updateTGSArticles()'>Update TGS Articles</a></td><td id='linkButton2' onclick='clearTGSArticles()'>Clear Link Field</td></tr></table>`);
        $("#loggedIn").show();
        $("#updateLW").show();
        $('#botDashCont').show();
        $("#streamPrefixUpdate").show();
        $('#updateDashboard').show();
        $('#currentDashboard').attr('colspan', 1);
        $('#chatBox').show();
      } else if (tgsnStaff.includes(user.email)) {
        $('#updateDashboard').show();
        $('#currentDashboard').attr('colspan', 1);
        $('#chatBox').show();
      }
      //console.log(user);
    })
    .catch(console.log)
}

function googleLogout(){
  firebase.auth().signOut().then(function() {
    location.reload(true);
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
