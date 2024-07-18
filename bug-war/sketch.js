const width = 600;
const height = 600;
const bugSize = 20;
const leaderBugSize = 25;
const nTroops = 10;

let battleGround = null; 

function setupTeam(team, teamColor, nTroops) {
    for (let i = 0; i < nTroops; i++) {
        if (i == nTroops / 2) {
            const leaderBug = new LeaderBug(teamColor, 0, 0, leaderBugSize);
            const leaderHorn = new LeaderHorn(leaderBugSize >> 1, color(0, 0, 0));
            leaderBug.addHorn(leaderHorn);
            battleGround.addBug(leaderBug, team);
        } else {
            const bug = new Bug(teamColor, 0, 0, bugSize);
            const horn = new SingleHorn(bugSize >> 1, color(0, 0, 0));
            bug.addHorn(horn);
            battleGround.addBug(bug, team);
        }
    }
}

function setup(){
    createCanvas(width, height);
   
    battleGround = new BattleGround(0, 0, width, height, nTroops);
    
    // team 1 setup
    setupTeam(1, color(255, 0, 0), nTroops);
    
    // team 2 setup
    setupTeam(2, color(0, 0, 255), nTroops);

    battleGround.initTargets();
}

function draw(){
    background("#afa"); 
    battleGround.draw();
}