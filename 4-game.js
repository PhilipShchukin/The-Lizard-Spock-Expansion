let crypto = require('crypto');

let parameters = [],
 pcMove = null,
 userMove = null,
 pcMoveIndex = null,
 userMoveIndex = null
 isValid = false;

for(let i = 2; i < process.argv.length; i++){
    parameters.push(process.argv[i]);
}

class Hash{
    constructor(pcMove){
        this.pcMove=pcMove;
    }

    createSha3(){
        const id = crypto.createHash('sha256').digest("hex");
        const sha3 = crypto.createHash('sha256').update(pcMove + id).digest("hex");
        console.log(`HMAC: \n${sha3}`);
        return id;
    }    
}
let hfArr = Math.floor(parameters.length/2);
class CalculateWin {
    constructor(computerMoveIndex, userMoveIndex){
        this.computerMoveIndex = computerMoveIndex;
        this.userMoveIndex = userMoveIndex;
    }

    calсulate() {
        if(this.computerMoveIndex == this.userMoveIndex){
            console.log('Draw');
        } else if(this.computerMoveIndex < this.userMoveIndex){
            if(this.userMoveIndex <= this.computerMoveIndex + hfArr){
                console.log('You lose!'); 
            } else {
                console.log('You win!');
            }
        } else {
            if(this.computerMoveIndex <= this.userMoveIndex + hfArr){
                console.log('You win!');
            } else {
                console.log('You lose!');
            }
        }
    }
}

class Table {
    constructor(rock,paper,scissors,lizard,Spock){
        this.rock=rock;
        this.paper=paper;
        this.scissors=scissors;
        this.lizard=lizard;
        this.Spock=Spock;
    }

    tableGenerated(){
        let items = {};
        items.rock = new Table('draw','win','win','lose','lose');
        items.paper = new Table('lose','draw','win','win','lose');
        items.scissors = new Table('lose','lose','draw','win','win');
        items.lizard = new Table('win','lose','lose','draw','win');
        items.Spock = new Table('win','win','lose','lose','draw');
        console.table(items);
    }
}

validateParameters();

if(isValid){
    pcMoves();

    const hash = new Hash(pcMove);

    const key = hash.createSha3();

    showAvailableMoves();

    userStep();

    showUserMove();

    if(userMove != 0 && userMove != '?'){
        showComputerMove();

        const calculateWin = new CalculateWin(pcMoveIndex, userMoveIndex);
        calculateWin.calсulate();
        console.log(key);
    }
}

function checkIfDuplicateExists(w){
    return new Set(w).size !== w.length 
}

function pcMoves(){
    pcMoveIndex = Math.floor(Math.random() * parameters.length);
    pcMove = parameters[pcMoveIndex];
}

function userStep(){
    const reader = require("readline-sync");
    for(let i = 0; i < 1; i++){
        userMove = reader.question("Enter your move: ");
        if(userMove == '?' || userMove == '0' || (userMove >= 1 && userMove <= parameters.length)){
            break;
        } else {
            i--;
        }
    }
}

function showComputerMove(){
    console.log(`Computer move: ${pcMove}`);
}

function showAvailableMoves() {
    console.log('Available moves:');
    for(let i = 0; i < parameters.length; i++){
        console.log(`${i+1} - ${parameters[i]}`);
    }
    console.log('0 - exit');
    console.log('? - help');
}

function validateParameters(){
    if(parameters.length < 3){
        console.log('Please enter at least 3 parameters.\nExampe: rock scissors paper lizard spock');
    } else if(parameters.length % 2 == 0) {
        console.log('Please enter an uneven number of parameters.\nExampe: rock scissors paper lizard spock');
    } else if(checkIfDuplicateExists(parameters)){
        console.log('Parameters cannot be repeated.\nExampe: rock scissors paper lizard spock');
    } else {
        isValid = true;
    }
}

function showUserMove(){
    if(userMove != 0 && userMove != '?'){
        userMoveIndex = userMove - 1;
        console.log(`Your move: ${parameters[userMove-1]}`);
    } else if (userMove == '?'){
        const table = new Table();
        table.tableGenerated();
    }
}