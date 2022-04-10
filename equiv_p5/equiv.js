let b = [ "","","", "","","", "","","" ];
let b_0 = [ "","","", "","","", "","","" ];
let es = [];

function setup(){
  let can = createCanvas(400, 650);
  can.mouseClicked(FunctionThatClicksWhenyouClick);

  button = createButton('Start Over');
  button.position(100, 50);
  button.mousePressed(startOver);

  equiv = createButton('Show equivalents');
  equiv.position(200, 50);
  equiv.mousePressed(showEquiv)
}

function startOver(){
    b = Array.from(b_0);
    es = [];
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
  
function draw_board( bd, sw ) {
  strokeWeight(sw);

  line( 160, 80, 160, 320 )
  line( 240, 80, 240, 320 )
  line( 80, 160, 320, 160 )
  line( 80, 240, 320, 240 )

  textSize(40)
  fill(255)
  text( bd[0], 100, 130 )
  text( bd[1], 182, 130 )
  text( bd[2], 264, 130 )
  text( bd[3], 100, 215 )
  text( bd[4], 182, 215 )
  text( bd[5], 264, 215 )
  text( bd[6], 100, 300 )
  text( bd[7], 182, 300 )
  text( bd[8], 264, 300 )
}
function draw(){
  background(0)
  stroke(255);
 
  draw_board( b, 1 );
  
  push();
  translate( 50, 350 );
  scale( 0.3 );
  for(let i=0; i<es.length; i++){
    draw_board( es[i], 2);
    translate( 300, 0 );
    if( (i+1) % 3 == 0 ){
      translate( -900, 300);
    }
  }
  pop();
}

function g_rotate( b ){
    return([b[6], b[3], b[0], b[7], b[4], b[1], b[8], b[5], b[2] ]);
}

//reflects the board over the vertical axis  
function g_reflect( b ){
    return ([b[2], b[1], b[0], b[5], b[4], b[3], b[8], b[7], b[6] ]);
}

//Retuns all the logically equivalent boards in a set
function g_equiv( b ) {
  rv = new Set([JSON.stringify(b), 
            JSON.stringify(g_rotate(b)),
            JSON.stringify(g_rotate( g_rotate( b ) )),
            JSON.stringify(g_rotate( g_rotate( g_rotate( b )))), 
            JSON.stringify(g_reflect(b)),
            JSON.stringify(g_rotate( g_reflect(b) )),
            JSON.stringify(g_rotate( g_rotate( g_reflect(b) ))),
            JSON.stringify(g_rotate( g_rotate( g_rotate( g_reflect(b))))) ]);

  rv =  Array.from( rv ); 
  rv.forEach( (el, index) => rv[index]= JSON.parse(el));
  return( rv );
}         

function showEquiv(){
  es = g_equiv(b);
}