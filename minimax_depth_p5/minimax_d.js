let b = [ "", "O", "", "", "", "O", "X", "X", "O"];
let b_0 = [ "", "O", "", "", "", "O", "X", "X", "O"];
let num_players = 1;
let slider = null;
let rand = null;
let random_play = 0;
let use_depth = false;
let depth = null;
let next_move = null;

//Creates the board and various buttons and sliders
function setup(){
  let can = createCanvas(600, 400);
  can.mouseClicked(FunctionThatClicksWhenyouClick);

  button = createButton('Start Over');
  button.position(450, 150);
  button.mousePressed(startOver);

  next_move = createButton('Next move');
  next_move.position(450, 200);
  next_move.mousePressed(play_next_move);

  depth = createCheckbox( "Use depth", use_depth )
  depth.style( 'color', color("white"));
  depth.position(450, 250);
  depth.changed(toggle_depth);
}
//makes the procces that occurs when you press the start over button.
function startOver(){
    b = Array.from(b_0);
}
function toggle_depth(){
  use_depth = depth.checked()
  }
//Tracks whose turn it is based of a given boardstate. 
function nextPly(b){
  [os, xs] = counts(b)
  if( os == xs ){
    return( "O")
  } else{
    return( "X")
  }
}
//Determins the next states possible from a given board
function next_states( b ){
    const rv = new Array();

    if( !terminal_state( b )[ "terminal" ]){  
        let next = nextPly(b);
        for( let i=0; i<9; i++){
            let tmp = Array.from(b);
            if( tmp[i] == ""){
                tmp[i] = next;
                rv.push( tmp );
            }
        }
    }
    return( rv );
}
//Counts the number of X's and O's in a given boardstate.
function counts(b){
  let os = xs = 0;
  for( const element of b) {
    if(element == "O"){ 
      os += 1;
    } else if( element == "X") {
      xs += 1;
    }
  } 
  return( [os, xs] )
}

function terminal_state( b ){
    let c=counts(b);
    let score;
    let rv; 

    if(b[0] != "" && b[0]==b[1] && b[1]==b[2]) {    
      if( b[0]=="O") {
        score = 10;
      }   
      else{
        score = -10;
      }
      rv = {"terminal": true, "type": "win", "player": b[0], "direction": "r1", "score": score }
    }  
    else if(b[0] != "" && b[0]==b[3] && b[3]==b[6]) {   
      if( b[0]=="O") {
        score = 10;
      }   
      else{
        score = -10;
      }     
        rv = {"terminal": true, "type": "win", "player": b[0], "direction": "c1", "score": score }
    }      
    else if(b[0] != "" && b[0]==b[4] && b[4]==b[8]) {      
      if( b[0]=="O") {
        score = 10;
      }   
      else{
        score = -10;
      }  
    rv = {"terminal": true, "type": "win", "player": b[0], "direction": "d2", "score": score }
    }      
    else if(b[4]!="" && b[3]==b[4] && b[4]==b[5]){
      if( b[4]=="O") {
        score = 10;
      }   
      else{
        score = -10;
      }
        rv = {"terminal": true, "type": "win", "player": b[4], "direction": "r2", "score": score }
    }
    else if(b[4]!="" && b[1]==b[4] && b[4]==b[7]){
      if( b[4]=="O") {
        score = 10;
      }   
      else{
        score = -10;
      }
        rv = {"terminal": true, "type": "win", "player": b[4], "direction": "c2", "score": score }
    }
    else if(b[4]!="" && b[2]==b[4] && b[4]==b[6]){
      if( b[4]=="O") {
        score = 10;
      }   
      else{
        score = -10;
      }
        rv = {"terminal": true, "type": "win", "player": b[4], "direction": "d1", "score": score  }
    }
    else if( b[6]!="" && b[6]==b[7] && b[7]==b[8]){
      if( b[6]=="O") {
        score = 10;
      }   
      else{
        score = -10;
      }
        rv = {"terminal": true, "type": "win", "player": b[6], "direction": "r3", "score": score }
    }
    else if(b[2]!="" && b[2]==b[5] && b[5]==b[8]){
      if( b[2]=="O") {
        score = 10;
      }   
      else{
        score = -10;
      }
        rv = {"terminal": true, "type": "win", "player": b[2], "direction": "c3", "score": score }
    }
    else if(c[0]+c[1]== 9 ){
        rv = {"terminal": true, "type": "draw", "player": "", "score": 0 }
    }
    else{
        rv = {"terminal": false, "type": "", "player": "" }
    }
    return( rv )
}

function FunctionThatClicksWhenyouClick(){
  if( !terminal_state(b)["terminal"]){
    let next = nextPly(b);

    if( (num_players == 1 && next == "O") || num_players == 2){
      /* Row 1 */
      if( mouseY <= 160){
        if(mouseX <= 160 && b[0] == ""){
          b[0] = next
        } else if(mouseX > 160 && mouseX <= 240 && b[1]==""){
          b[1] = next
        } else if(mouseX>240 && b[2]==""){
          b[2] = next
        }
        
      }
      
      /*Row 2*/
      if( mouseY > 160 && mouseY <= 240){
        if(mouseX <= 160 && b[3]==""){
          b[3] = next
        } else if(mouseX > 160  && mouseX <= 240 && b[4]==""){
          b[4] = next
        } else if(mouseX>240 && b[5]==""){
          b[5] = next
        }
        
      }
    
      /*Row 3*/
      if( mouseY > 240 ){
        if(mouseX <= 160 && b[6]=="" ){
          b[6] = next
        } else if(mouseX > 160  && mouseX <= 240 && b[7]==""){
          b[7] = next
        } else if(mouseX>240 && b[8]==""){
          b[8] = next
        }
      }
    }
  }
  }
//Draws the board  
function draw(){
  //This sets the backround value to 0 wich is the black. 
  background(0)
  //This sets the collor of the drawn lines to white.
  stroke(255);
  //This sets the thickness of the drawn lines to 1. Im not sure exactuly how thick this is.
  strokeWeight(1);

  line( 160, 80, 160, 320 )
  line( 240, 80, 240, 320 )
  line( 80, 160, 320, 160 )
  line( 80, 240, 320, 240 )

  textSize(40)
  fill(255)
  text( b[0], 100, 130 )
  text( b[1], 182, 130 )
  text( b[2], 264, 130 )
  text( b[3], 100, 215 )
  text( b[4], 182, 215 )
  text( b[5], 264, 215 )
  text( b[6], 100, 300 )
  text( b[7], 182, 300 )
  text( b[8], 264, 300 )

  let dir = terminal_state(b)[ "direction" ];
  if( dir == "r1"){
    stroke(255, 204, 0);
    strokeWeight(4);
    line( 95, 115, 300, 115);    
  }
  else if( dir == "r2"){
    stroke(255, 204, 0);
    strokeWeight(4);
    line( 95, 200, 300, 200);    
  }  
  else if( dir == "r3"){
    stroke(255, 204, 0);
    strokeWeight(4);
    line( 95, 285, 300, 285);   
  }    
  else if( dir == "c1"){
    stroke(255, 204, 0);
    strokeWeight(4);
    line( 115, 100, 115, 305);     
  }
  else if(dir == "c2"){
    stroke(255, 204, 0);
    strokeWeight(4);
    line( 198, 100, 198, 305);   
  }
  else if(dir == "c3"){
    stroke(255, 204, 0);
    strokeWeight(4);
    line( 280, 100, 280, 305);         
  }
  else if( dir == "d1"){
    stroke(255, 204, 0);
    strokeWeight(4);
    line( 95, 305, 300, 100);     
  }
  else if( dir == "d2"){
    stroke(255, 204, 0);
    strokeWeight(4);
    line( 95, 100, 300, 305);     
  }
}

function play_next_move(){

    if( (num_players == 0) || (num_players==1 && nextPly(b)=="X") ){
        let ns = next_states(b);

        if( ns.length > 0){ 
          if( Math.random()>random_play) {
            let ind = minimax(b,0)[1];
            b = ns[ ind ];
          }
          else {
            console.log( "oops");
           const randomIndex = Math.floor(Math.random() * ns.length);
           b = ns[randomIndex];
          }
        }
    }
}

function minimax( b, depth ){

    let ts = terminal_state(b);
    let opt_score;
    let opt_index;

    if( !use_depth ){
      depth = 0;
    }

    //checks if the current board is a terminal state
    if( ts["terminal"] ){
        opt_score = ts["score"] * (1-depth/20);
        opt_index = 0;
    }
    else {
        //gets the next potential boardstates
        let ns = next_states(b);
        let ss = [];
        //puts all the next states in a list that is then put recusively through the funciton 
        for( const n of ns ){
            //Adds the depth value to each next game. 
            ss.push(minimax(n, depth+1)[0]);
        } 
        //If it is 0's turn, it will find the greatset depth and put it together with the given score.
        if( nextPly(b) == "O") {
          opt_score = Math.max(...ss);
        }
        //If it is X's turn, it will find the smallest depth and put it together with the given score.
        else{
          opt_score = Math.min(...ss);
        }
        opt_index = ss.indexOf(opt_score);
    }
    return( [opt_score, opt_index] );
}
