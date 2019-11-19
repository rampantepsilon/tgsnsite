var codes = ['epsilon','peace','tgs','gameplay','test'];

function init(){
  showCode();
  looper();
}

function looper(){
  setInterval('showCode()', 60000);
}

function showCode(){
  var d = new Date();
  var minutes = d.getMinutes();

  if (minutes == 0 || minutes == 30){
    var codeSelect = Math.floor((Math.random()*5));
    var codeReply = codes[codeSelect];

    document.getElementById('code').innerHTML = codeReply.toUpperCase();
    document.getElementById('code').style.position = 'absolute';
    document.getElementById('code').style.top = '1060px';
    document.getElementById('code').style.left = '1900px';
  } else {
    var codeSelect = Math.floor((Math.random()*5));
    var codeReply = codes[codeSelect];

    document.getElementById('code').innerHTML = codeReply.toUpperCase();
    document.getElementById('code').style.position = 'absolute';
    document.getElementById('code').style.right = '20px';
    document.getElementById('code').style.bottom = '20px';
  }
}

function twitchLogin(){
  var queryString = location.search;

  if (queryString != ""){
    var urlParams = new URLSearchParams(location.search);

    var code = urlParams.get('code');
    var scope = urlParams.get('scope');

    document.querySelector('#test').innerHTML = code + scope;
  } else {
    document.querySelector('#test').innerHTML = " ";
  }
}

function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();

  var staff = ['tomjware@gmail.com', 'peacemaker24482@gmail.com'];

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

      document.querySelector('#title').innerHTML = (userName + `<br><button onclick='googleLogout()'>Logout</button>`);
      document.querySelector('#userPic').innerHTML = (`<img src='` + user.photoURL + `' width='60px' height='60px' id='profilePic' />`);
    })
    .catch(console.log)
}

function googleLogout(){
  firebase.auth().signOut().then(function() {
    location.reload(true);
  }).catch(function(error){

  });
}
