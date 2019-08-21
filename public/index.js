document.addEventListener("DOMContentLoaded", event =>{

  const app = firebase.app();

  const db = firebase.firestore();

  const tgsArticles = db.collection('tgs').doc('articles');

  tgsArticles.onSnapshot(doc => {
    const data = doc.data();
    document.querySelector('#tgsArticles').innerHTML = (`<iframe width='100%' height='100%' src="` + data.link + `" frameborder='0'>`)
  })

});
