let b = [ "","","", "","","", "","","" ];
let b_0 = [ "","","", "","","", "","","" ];
let num_players = 1;
let slider = null;
let myPing = null;
let myPong = null;

function preload() {
    // set the global sound formats
 //   soundFormats('wav');
  
 //   myPing = loadSound('asse4ts/ping.wav');
 //   myPong = loadSound('assets/pong.wav');
  }

function setup(){
  let can = createCanvas(600, 400);
  can.mouseClicked(FunctionThatClicksWhenyouClick);

  button = createButton('Start Over');
  button.position(450, 300);
  button.mousePressed(() => (b = Array.from(b_0)));

  slider = createSlider(0, 2, 1);
  slider.position(450, 200);
  slider.style('width', '80px');

  play_next_move();
}

function nextPly(){
  [os, xs] = counts()
  if( os == xs ){
    return( "O")
  } else{
    return( "X")
  }
}

function next_states( b ){
    const rv = new Array();

    if( !terminal_state( b )[ "terminal" ]){  
        next = nextPly();
        for( let i=0; i<9; i++){
            tmp = Array.from(b);
            if( tmp[i] == ""){
                tmp[i] = next;
                rv.push( tmp );
            }
        }
    }
    return( rv );
}

function counts(){
  os = xs = 0;
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
    c=counts();
    if(b[0] != "" && b[0]==b[1] && b[1]==b[2]) {        
      rv = {"terminal": true, "type": "win", "player": b[0], "direction": "r1" }
    }  
    else if(b[0] != "" && b[0]==b[3] && b[3]==b[6]) {        
        rv = {"terminal": true, "type": "win", "player": b[0], "direction": "c1" }
    }      
    else if(b[0] != "" && b[0]==b[4] && b[4]==b[8]) {        
    rv = {"terminal": true, "type": "win", "player": b[0], "direction": "d2" }
    }      
    else if(b[4]!="" && b[3]==b[4] && b[4]==b[5]){
        rv = {"terminal": true, "type": "win", "player": b[4], "direction": "r2" }
    }
    else if(b[4]!="" && b[1]==b[4] && b[4]==b[7]){
        rv = {"terminal": true, "type": "win", "player": b[4], "direction": "c2" }
    }
    else if(b[4]!="" && b[2]==b[4] && b[4]==b[6]){
        rv = {"terminal": true, "type": "win", "player": b[4], "direction": "d1"  }
    }
    else if( b[6]!="" && b[6]==b[7] && b[7]==b[8]){
        rv = {"terminal": true, "type": "win", "player": b[6], "direction": "r3" }
    }
    else if(b[2]!="" && b[2]==b[5] && b[5]==b[8]){
        rv = {"terminal": true, "type": "win", "player": b[2], "direction": "c3" }
    }
    else if(c[0]+c[1]== 9 ){
        rv = {"terminal": true, "type": "draw", "player": "" }
    }
    else{
        rv = {"terminal": false, "type": "", "player": "" }
    }
    return( rv )
}

function FunctionThatClicksWhenyouClick(){
  if( !terminal_state(b)["terminal"]){
    next = nextPly();

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
    console.log( terminal_state(b))
    console.log( next_states(b)) 
  }
  
function draw(){
    num_players = slider.value();

  background(0)
  stroke(255);
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

  textSize(12);
  text( "Num players", 450, 160 );
  text( "0", 450, 210 );
  text( "1", 480, 210 );
  text( "2", 510, 210 ); 

  dir = terminal_state(b)[ "direction" ];
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

    if( (num_players == 0) || (num_players==1 && nextPly()=="X") ){
        ns = next_states(b);
        if (ns.length > 0){
            // get random index value
            const randomIndex = Math.floor(Math.random() * ns.length);
    
            // get random item
            b = ns[randomIndex];
        }
    }

    setTimeout( play_next_move, 700);
}
