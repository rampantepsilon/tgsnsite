document.addEventListener("DOMContentLoaded", event =>{

  const app = firebase.app();

  const db = firebase.firestore();

  const tgsArticles = db.collection('tgs').doc('articles');
  const tgsrArticles = db.collection('tgsr').doc('videos');

  tgsArticles.onSnapshot(doc => {
    const data = doc.data();
    document.querySelector('#tgsArticles').innerHTML = (`<iframe width='100%' height='100%' src="` + data.link + `" frameborder='0'>`)
  })

  tgsrArticles.onSnapshot(doc => {
    const data = doc.data();
    document.querySelector('#tgsrarticles').innerHTML = (`<h4 align='center' style='color:white;'>Watch Along @ <a href='` + data.source + `'>` + data.source + `</a><br><iframe width='100%' height='96%' src="` + data.notes + `" frameborder='0'>`)
  })

});
