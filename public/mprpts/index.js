var currentSeed;
var chozoPoints = 0;
var magPoints = 0;
var phazonPoints = 0;
var phenPoints = 0;
var tallonPoints = 0;

var loadSeed = function (event) {
    let file = document.getElementById('file-input');
    event.preventDefault();
    if (!file.value.length) {
        return;
    } else {
        if (file.value.toString().substring(file.value.length - 5) == '.json') {
            document.getElementById('seedName').innerHTML = file.value.toString().substring(12, file.value.length - 13);
        }
        let reader = new FileReader();
        reader.onload = logFile;
        reader.readAsText(file.files[0]);
    }
};

function logFile(event) {
    let str = event.target.result;
    currentSeed = JSON.parse(str);
    chozoPoints = 0;
    magPoints = 0;
    phazonPoints = 0;
    phenPoints = 0;
    tallonPoints = 0;
    calcPoints();
}

function calcPoints() {
    startingItems();
    for (var i = 0; i < levels.length; i++) {
        if (i == 0) {
            for (var j = 0; j < CRchecks.length; j++) {
                for (var k = 0; k < currentSeed["levelData"][levels[i]]["rooms"][CRchecks[j]]['pickups'].length; k++) {
                    if (sevenChecks.includes(currentSeed["levelData"][levels[i]]["rooms"][CRchecks[j]]['pickups'][k]['model'])) {
                        chozoPoints += 7;
                    }
                    if (fiveChecks.includes(currentSeed["levelData"][levels[i]]["rooms"][CRchecks[j]]['pickups'][k]['model'])) {
                        chozoPoints += 5;
                    }
                    if (threeChecks.includes(currentSeed["levelData"][levels[i]]["rooms"][CRchecks[j]]['pickups'][k]['model'])) {
                        chozoPoints += 3;
                    }
                }
            }
        }
        if (i == 1) {
            for (var j = 0; j < MCchecks.length; j++) {
                for (var k = 0; k < currentSeed["levelData"][levels[i]]["rooms"][MCchecks[j]]['pickups'].length; k++) {
                    if (sevenChecks.includes(currentSeed["levelData"][levels[i]]["rooms"][MCchecks[j]]['pickups'][k]['model'])) {
                        magPoints += 7;
                    }
                    if (fiveChecks.includes(currentSeed["levelData"][levels[i]]["rooms"][MCchecks[j]]['pickups'][k]['model'])) {
                        magPoints += 5;
                    }
                    if (threeChecks.includes(currentSeed["levelData"][levels[i]]["rooms"][MCchecks[j]]['pickups'][k]['model'])) {
                        magPoints += 3;
                    }
                }
            }
        }
        if (i == 2) {
            for (var j = 0; j < PMchecks.length; j++) {
                for (var k = 0; k < currentSeed["levelData"][levels[i]]["rooms"][PMchecks[j]]['pickups'].length; k++) {
                    if (sevenChecks.includes(currentSeed["levelData"][levels[i]]["rooms"][PMchecks[j]]['pickups'][k]['model'])) {
                        phazonPoints += 7;
                    }
                    if (fiveChecks.includes(currentSeed["levelData"][levels[i]]["rooms"][PMchecks[j]]['pickups'][k]['model'])) {
                        phazonPoints += 5;
                    }
                    if (threeChecks.includes(currentSeed["levelData"][levels[i]]["rooms"][PMchecks[j]]['pickups'][k]['model'])) {
                        phazonPoints += 3;
                    }
                }
            }
        }
        if (i == 3) {
            for (var j = 0; j < PDchecks.length; j++) {
                for (var k = 0; k < currentSeed["levelData"][levels[i]]["rooms"][PDchecks[j]]['pickups'].length; k++) {
                    if (sevenChecks.includes(currentSeed["levelData"][levels[i]]["rooms"][PDchecks[j]]['pickups'][k]['model'])) {
                        phenPoints += 7;
                    }
                    if (fiveChecks.includes(currentSeed["levelData"][levels[i]]["rooms"][PDchecks[j]]['pickups'][k]['model'])) {
                        phenPoints += 5;
                    }
                    if (threeChecks.includes(currentSeed["levelData"][levels[i]]["rooms"][PDchecks[j]]['pickups'][k]['model'])) {
                        phenPoints += 3;
                    }
                }
            }
        }
        if (i == 4) {
            for (var j = 0; j < TOchecks.length; j++) {
                for (var k = 0; k < currentSeed["levelData"][levels[i]]["rooms"][TOchecks[j]]['pickups'].length; k++) {
                    if (sevenChecks.includes(currentSeed["levelData"][levels[i]]["rooms"][TOchecks[j]]['pickups'][k]['model'])) {
                        tallonPoints += 7;
                    }
                    if (fiveChecks.includes(currentSeed["levelData"][levels[i]]["rooms"][TOchecks[j]]['pickups'][k]['model'])) {
                        tallonPoints += 5;
                    }
                    if (threeChecks.includes(currentSeed["levelData"][levels[i]]["rooms"][TOchecks[j]]['pickups'][k]['model'])) {
                        tallonPoints += 3;
                    }
                }
            }
        }
    }
    displayPoints();
}

function points(location, amount) {
    if (location == 'chozo') {
        chozoPoints += amount;
    }
    if (location == 'magmoor') {
        magPoints += amount;
    }
    if (location == 'phazon') {
        phazonPoints += amount;
    }
    if (location == 'phendrana') {
        phenPoints += amount;
    }
    if (location == 'tallon') {
        tallonPoints += amount;
    }
    displayPoints();
}

function displayPoints() {
    if (chozoPoints == 0) {
        document.getElementById('chozoPT').innerHTML = '<span style="color:red">' + chozoPoints + '</span>';
    } else {
        document.getElementById('chozoPT').innerHTML = chozoPoints;
    }
    if (magPoints == 0) {
        document.getElementById('magmoorPT').innerHTML = '<span style="color:red">' + magPoints + '</span>';
    } else {
        document.getElementById('magmoorPT').innerHTML = magPoints;
    }
    if (phazonPoints == 0) {
        document.getElementById('phazonPT').innerHTML = '<span style="color:red">' + phazonPoints + '</span>';
    } else {
        document.getElementById('phazonPT').innerHTML = phazonPoints;
    }
    if (phenPoints == 0) {
        document.getElementById('phendranaPT').innerHTML = '<span style="color:red">' + phenPoints + '</span>';
    } else {
        document.getElementById('phendranaPT').innerHTML = phenPoints;
    }
    if (tallonPoints == 0) {
        document.getElementById('tallonPT').innerHTML = '<span style="color:red">' + tallonPoints + '</span>';
    } else {
        document.getElementById('tallonPT').innerHTML = tallonPoints;
    }
    /*document.getElementById('magmoorPT').innerHTML = magPoints;
    document.getElementById('phazonPT').innerHTML = phazonPoints;
    document.getElementById('phendranaPT').innerHTML = phenPoints;
    document.getElementById('tallonPT').innerHTML = tallonPoints;*/
}

function allowDrop(ev) {
    ev.preventDefault();
}
function drag(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
    var data = ev.target.id;
    if (ev.target.parentNode.id == 'chozo' || 'magmoor' || 'phazon' || 'phendrana' || 'tallon') {
        if (data.startsWith('suit') || data.startsWith('artifact')) {
            points(ev.target.parentNode.id, 7);
        }
        if (data.startsWith('five')) {
            points(ev.target.parentNode.id, 5);
        }
        if (data.startsWith('three')) {
            points(ev.target.parentNode.id, 3);
        }
    }
}
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData('text');
    var id = ev.target.id;
    var parent = ev.target.parentNode.id;
    if (id == 'chozo' || id == 'magmoor' || id == 'phazon' || id == 'phendrana' || id == 'tallon' || id == 'starting') {
        ev.target.appendChild(document.getElementById(data));
    } else if (parseInt(id)) {
        ev.target.appendChild(document.getElementById(data));
    } else {
        document.getElementById(parent).appendChild(document.getElementById(data));
    }
    if (id == 'chozo' || id == 'magmoor' || id == 'phazon' || id == 'phendrana' || id == 'tallon') {
        if (data.startsWith('suit') || data.startsWith('artifact')) {
            points(ev.target.id, -7);
        }
        if (data.startsWith('five')) {
            points(ev.target.id, -5);
        }
        if (data.startsWith('three')) {
            points(ev.target.id, -3);
        }
    }
    if (parent == 'chozo' || parent == 'magmoor' || parent == 'phazon' || parent == 'phendrana' || parent == 'tallon') {
        if (data.startsWith('suit') || data.startsWith('artifact')) {
            points(parent, -7);
        }
        if (data.startsWith('five')) {
            points(parent, -5);
        }
        if (data.startsWith('three')) {
            points(parent, -3);
        }
    }
}

function startingItems() {
    var list = [];
    var artList = [];
    for (var i = 0; i < startingItemsList.length; i++) {
        if (currentSeed['gameConfig']['startingItems'][startingItemsList[i]] == false || currentSeed['gameConfig']['startingItems'][startingItemsList[i]] == 0) {
            list[i] = 0;
        } else {
            list[i] = 1;
        }
    }
    for (var j = 0; j < list.length; j++) {
        if (list[j] == 0) {

        } else {
            document.getElementById('starting').appendChild(document.getElementById(imgList[j]));
        }
    }

    for (var k = 0; k < artifactList.length; k++) {
        if (currentSeed['gameConfig']['artifactTempleLayerOverrides'][artifactList[k]] == false) {
            artList[k] = 0;
        } else {
            artList[k] = 1;
        }
    }
    for (var l = 1; l < artList.length + 1; l++) {
        var variable = 'artifact' + l;
        if (artList[(l - 1)] == 0) {
            document.getElementById('starting').appendChild(document.getElementById(variable));
        } else {
        }
    }
}

function returnToPosition() {

}