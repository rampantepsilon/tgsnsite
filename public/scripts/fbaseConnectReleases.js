var api, startDate;

var title = [], date = [], platform = [];
var title1 = [], date1 = [], platform1 = [];

//Document Load
document.addEventListener("DOMContentLoaded", event =>{
  //Initialize Values
  const app = firebase.app();
  const db = firebase.firestore();
  const releaseAPI = db.collection('releases').doc('info');

  //Get Bot Dashboard link
  releaseAPI.get().then(function(doc) {
    const data = doc.data();
    api = data.api;
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
});
