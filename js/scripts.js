 /* 
       ___           __                ___      
      /\_ \         /\ \              /\_ \     
   __ \//\ \     ___\ \ \____     __  \//\ \    
 /'_ `\ \ \ \   / __`\ \ '__`\  /'__`\  \ \ \   
/\ \L\ \ \_\ \_/\ \L\ \ \ \L\ \/\ \L\.\_ \_\ \_ 
\ \____ \/\____\ \____/\ \_,__/\ \__/.\_\/\____\
 \/___L\ \/____/\/___/  \/___/  \/__/\/_/\/____/
   /\____/                                      
   \_/__/ 
 */
 
    var ctx, mPos, WIDTH=500, HEIGHT=500;
    var isShft = false;
    var rX, rY, rW, rH, bX, bY; 		//for canvas
    var curCode='';	 			//for console
    
    setup();
    //setInterval(draw, 1000 / 60);
    
    function setup() {
        var canvas = document.getElementById('canvas');
            ctx = canvas.getContext('2d');
            document.addEventListener('mousemove', onDocumentMouseMove, false);
            document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	    document.addEventListener('keydown',doKeyDown,false);
	    document.addEventListener('keyup',doKeyUp,false);
    }

/*
                             __             
                            /\ \__          
   __   __  __     __    ___\ \ ,_\   ____  
 /'__`\/\ \/\ \  /'__`\/' _ `\ \ \/  /',__\ 
/\  __/\ \ \_/ |/\  __//\ \/\ \ \ \_/\__, `\
\ \____\\ \___/ \ \____\ \_\ \_\ \__\/\____/
 \/____/ \/__/   \/____/\/_/\/_/\/__/\/___/ 

*/    
    
    function doKeyDown(evt){
      switch (evt.keyCode) {
        case 16:  isShft=true; break; // shift
        case 83:  updateCanvas(); break; // s
	case 90: undo(); break; // z
      }
    }
    
    function doKeyUp(evt){
      switch (evt.keyCode) {
        case 16:  isShft=false; break; //shift
      }
    }
    
    function onDocumentMouseMove(event) { mPos = [event.clientX,event.clientY]; }
    function onDocumentMouseDown(event) {
	//event.preventDefault();
        rX = mPos[0]; rY = mPos[1];
       
        if(isShft==false && rX<500 && rY<500){ //if mouse is over canvas && no shift
          target();
         // outputConsole(rX,rY,0,0);
        }
        
        if(isShft==true && rX<500 && rY<500){ //if mouse is over canvas && shift held down
	    var chkFill = document.getElementById('fill').checked;
	    var chkStroke = document.getElementById('stroke').checked;
	    if(chkFill == true){ drawRect(); }
	    if(chkStroke == true){ strokeRect(); }          
	    outputConsole(bX,bY,mPos[0]-bX,mPos[1]-bY);  // b = saved coordinates from target  i.e.'before'
        }       
       
    }


/*                                                                                                
  ___     __      ___   __  __     __      ____  
 /'___\ /'__`\  /' _ `\/\ \/\ \  /'__`\   /',__\ 
/\ \__//\ \L\.\_/\ \/\ \ \ \_/ |/\ \L\.\_/\__, `\
\ \____\ \__/.\_\ \_\ \_\ \___/ \ \__/.\_\/\____/
 \/____/\/__/\/_/\/_/\/_/\/__/   \/__/\/_/\/___/
 
*/
  
    
    function target() {
      //ctx.clearRect(0,0,WIDTH,HEIGHT);
      ctx.fillRect(rX,rY,4,1);
      ctx.fillRect(rX,rY,-3,1);
      ctx.fillRect(rX,rY,1,4);
      ctx.fillRect(rX,rY,1,-3);
      bX = rX; bY = rY;		//save current x,y coordinates in 'b' vars
    }
    
    function drawRect() {
      ctx.fillRect(bX,bY,mPos[0]-bX,mPos[1]-bY);
    }

    function strokeRect() {
      ctx.strokeRect(bX,bY,mPos[0]-bX,mPos[1]-bY);
    }    
    
    function updateCanvas() {
	ctx.clearRect(0,0,WIDTH,HEIGHT); 	
	return eval(cnsl.value);
    }
    
    
/*
                                     ___             
                                    /\_ \            
  ___    ___     ___     ____    ___\//\ \      __   
 /'___\ / __`\ /' _ `\  /',__\  / __`\\ \ \   /'__`\ 
/\ \__//\ \L\ \/\ \/\ \/\__, `\/\ \L\ \\_\ \_/\  __/ 
\ \____\ \____/\ \_\ \_\/\____/\ \____//\____\ \____\
 \/____/\/___/  \/_/\/_/\/___/  \/___/ \/____/\/____/
                                                     

*/


 
    var cnsl = document.getElementById('cnsl');
    
    var clr = document.getElementById('fill_color');
    var strk = document.getElementById('stroke_color');

    
    function outputConsole(x,y,w,h) {
	var chkFill = document.getElementById('fill').checked;
	var chkStroke = document.getElementById('stroke').checked;
	if(chkStroke == true) { curCode += "\nctx.strokeRect("+x+","+y+","+w+","+h+");"; }
	if(chkFill == true) { curCode += "\nctx.fillRect("+x+","+y+","+w+","+h+");"; }
	cnsl.value = curCode;
    }
    
    function addClr() {
	curCode += '\nctx.fillStyle = "'+clr.value+'";';
	cnsl.value = curCode;
	return eval(curCode);
    }

    function addSkClr() {
	curCode += '\nctx.strokeStyle = "'+strk.value+'";';
	cnsl.value = curCode;
	return eval(curCode);
    }    
    
    function undo() {
	var string = cnsl.value;				
	var new_string = string.replace(/\.[^\.]+\.?$/,'');	// remove last line up to '.'
	var rmv_ctx = new_string.slice(0,-4);			// remove '\n ctx'
	cnsl.value = rmv_ctx;					// update console
	curCode = rmv_ctx; 					// update curCode
	updateCanvas();
    }
    
    


//<3 ../n!ck