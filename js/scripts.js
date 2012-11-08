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
    var isCntrl = false;
    var curCode =' ';	 			//for console
    var rX, rY, rW, rH, bX, bY; 		//for canvas
    var mvPath = false;				//for path 
    
    setup();
    
    function setup() {
        var canvas = document.getElementById('canvas');
            ctx = canvas.getContext('2d');
            document.addEventListener('mousemove', onDocumentMouseMove, false);
            document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	    document.addEventListener('keydown',doKeyDown,false);
	    document.addEventListener('keyup',doKeyUp,false);
    }
    
    function sqr(x) { x*x; return x; }

/*
                             __             
                            /\ \__          
   __   __  __     __    ___\ \ ,_\   ____  
 /'__`\/\ \/\ \  /'__`\/' _ `\ \ \/  /',__\ 
/\  __/\ \ \_/ |/\  __//\ \/\ \ \ \_/\__, `\
\ \____\\ \___/ \ \____\ \_\ \_\ \__\/\____/
 \/____/ \/__/   \/____/\/_/\/_/\/__/\/___/ 

*/
    document.addEventListener("keydown", function(e) { // PREVENT DEFAULT SAVE 
      if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) { e.preventDefault(); }
    }, false);
    
    function doKeyDown(evt){
      switch (evt.keyCode) {
        case 16: if(rX<500 && rY<500){ isShft=true; } break; 	// shift
	case 91: isCntrl = true; break; 			//cntrl
        case 83: if(isCntrl==true){ updateCanvas(); } break; 	// cntrl + s
	case 90: if(isCntrl==true){ undo(); } break; 		// cntrl + z
	case 67: if(rX<500 && rY<500){ clsPath(); } break; 	// c
	case 70: if(rX<500 && rY<500){ pFill(); } break; 	// f
	case 75: if(rX<500 && rY<500){ pStroke(); } break; 	// k
      }
    }
	
    function doKeyUp(evt){
      switch (evt.keyCode) {
        case 16:  isShft = false; break; 	//shift
	case 91:  isCntrl = false; break;	//cntrl
      }
    }
    
    function onDocumentMouseMove(event) { mPos = [event.clientX,event.clientY]; }
    function onDocumentMouseDown(event) {
	var chkFill = document.getElementById('fill').checked;
	var chkStroke = document.getElementById('stroke').checked;
	var chkPath = document.getElementById('path').checked;
	var chkFCir = document.getElementById('fCircle').checked;
	var chkSCir = document.getElementById('sCircle').checked;

        rX = mPos[0]; rY = mPos[1];
	       
        if(isShft==false && rX<500 && rY<500){ //if mouse is over canvas && NO SHIFT
	    target();
	    if(chkPath == true && mvPath == false){
	        startPath();
		mvPath = true;
	    } 
        }
        
        if(isShft==true && rX<500 && rY<500){ //if mouse is over canvas && SHIFT held down
	    if(chkFill == true){ drawRect(rX,rY); }
	    if(chkStroke == true){ strokeRect(rX,rY); }
	    if(chkPath == true && mvPath == true){
		target();
	        setPnt();
	    }
	    if(chkFCir == true || chkSCir == true){
		var a = (rX-bX) * (rX-bX);
		var b = (rY-bY) * (rY-bY);
		var s = Math.sqrt(a+b);
		if(chkFCir == true && chkSCir == true){ drawCir(Math.round(s)); }
		else { chkFCir==true ? fillCir(Math.round(s)) : strokeCir(Math.round(s)); }
	    }
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
    
    function updateCanvas() {
	ctx.clearRect(0,0,WIDTH,HEIGHT); 	
	return eval(cnsl.value);
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
    
    // RECTANGLE
    
    function drawRect(rX,rY) {
	curCode += '\nctx.fillRect('+bX+','+bY+','+(rX-bX)+','+(rY-bY)+');';
	cnsl.value = curCode;
	return eval(curCode);
    }

    function strokeRect(rX,rY) {
        curCode += '\nctx.strokeRect('+bX+','+bY+','+(rX-bX)+','+(rY-bY)+');';
	cnsl.value = curCode;
	return eval(curCode);
    }
    
    // DRAWING PATHS
    
    function startPath() {
	curCode += '\nctx.beginPath();\nctx.moveTo('+bX+','+bY+')';
	cnsl.value = curCode;
	return eval(curCode);
    }
    
    function setPnt() {
	curCode += '\nctx.lineTo('+bX+','+bY+');';
	cnsl.value = curCode;
	return eval(curCode);
    }
    
    function clsPath() {
	curCode += '\nctx.closePath();';
	cnsl.value = curCode;
	return eval(curCode);
    }
    
   function pFill() {
	curCode += '\nctx.fill();';
	cnsl.value = curCode;
	return eval(curCode);
    }  

   function pStroke() {
	curCode += '\nctx.stroke();';
	cnsl.value = curCode;
	return eval(curCode);
    }
    
    // ARCS
    
    function fillCir(s) {
	curCode += '\nctx.beginPath();\nctx.arc('+bX+','+bY+','+s+',0,Math.PI*2,true);\nctx.fill();';
	cnsl.value = curCode;
	return eval(curCode);
    }
    
    function strokeCir(s) {
	curCode += '\nctx.beginPath();\nctx.arc('+bX+','+bY+','+s+',0,Math.PI*2,true);\nctx.stroke();';
	cnsl.value = curCode;
	return eval(curCode);
    }   

    function drawCir(s) {
	curCode += '\nctx.beginPath();\nctx.arc('+bX+','+bY+','+s+',0,Math.PI*2,true);\nctx.fill();\nctx.stroke();';
	cnsl.value = curCode;
	return eval(curCode);
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
     
        
    function undo() {
	var string = cnsl.value;				
	var new_string = string.replace(/\.[^\.]+\.?$/,'');	// remove last line up to '.'
	var rmv_ctx = new_string.slice(0,-4);			// remove '\n ctx'
	cnsl.value = rmv_ctx;					// update console
	curCode = rmv_ctx; 					// update curCode
	updateCanvas();
	if(curCode.search('ctx.beginPath()') == -1) { mvPath = false;} 	// if no beginPath, reset mvPath
    }
    
     
    
    function clkPath() {
	document.getElementById('fill').checked = false;
	document.getElementById('stroke').checked = false;
	document.getElementById('fCircle').checked = false;
	document.getElementById('sCircle').checked = false;
    }
    
    function clkRect() {
	document.getElementById('path').checked = false;
	document.getElementById('fCircle').checked = false;
	document.getElementById('sCircle').checked = false;
    }

    function clkCir() {
	document.getElementById('path').checked = false;
	document.getElementById('fill').checked = false;
	document.getElementById('stroke').checked = false;
    }




//<3 ../n!ck