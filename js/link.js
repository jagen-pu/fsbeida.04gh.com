
function srcMarquee(){ 
this.ID = document.getElementById(arguments[0]); 
if(!this.ID){this.ID = -1;return;} 
this.Direction = this.Width = this.Height = this.DelayTime = this.WaitTime = this.Correct = this.CTL = this.StartID = this.Stop = this.MouseOver = 0; 
this.Step = 1; 
this.Timer = 20; 
this.DirectionArray = {"top":0 , "bottom":1 , "left":2 , "right":3}; 
if(typeof arguments[1] == "number")this.Direction = arguments[1]; 
if(typeof arguments[2] == "number")this.Step = arguments[2]; 
if(typeof arguments[3] == "number")this.Width = arguments[3]; 
if(typeof arguments[4] == "number")this.Height = arguments[4]; 
if(typeof arguments[5] == "number")this.Timer = arguments[5]; 
if(typeof arguments[6] == "number")this.DelayTime = arguments[6]; 
if(typeof arguments[7] == "number")this.WaitTime = arguments[7]; 
if(typeof arguments[8] == "number")this.ScrollStep = arguments[8] 
this.ID.style.overflow = this.ID.style.overflowX = this.ID.style.overflowY = "hidden"; 
this.ID.noWrap = true; 
this.IsNotOpera = (navigator.userAgent.toLowerCase().indexOf("opera") == -1); 
if(arguments.length >= 7)this.Start(); 
} 
srcMarquee.prototype.Start = function(){ 
if(this.ID == -1)return; 
if(this.WaitTime < 910)this.WaitTime = 910; 
if(this.Timer < 20)this.Timer = 20; 
if(this.Width == 0)this.Width = parseInt(this.ID.style.width); 
if(this.Height == 0)this.Height = parseInt(this.ID.style.height); 
if(typeof this.Direction == "string")this.Direction = this.DirectionArray[this.Direction.toString().toLowerCase()]; 
this.HalfWidth = Math.round(this.Width / 2); 
this.BakStep = this.Step; 
this.ID.style.width = this.Width; 
this.ID.style.height = this.Height; 
if(typeof this.ScrollStep != "number")this.ScrollStep = this.Direction > 1 ? this.Width : this.Height; 
var msobj = this; 
var timer = this.Timer; 
var delaytime = this.DelayTime; 
var waittime = this.WaitTime; 
msobj.StartID = function(){msobj.Scroll()} 
msobj.Continue = function(){ 
if(msobj.MouseOver == 1){ 
setTimeout(msobj.Continue,delaytime); 
} 
else{ clearInterval(msobj.TimerID); 
msobj.CTL = msobj.Stop = 0; 
msobj.TimerID = setInterval(msobj.StartID,timer); 
} 
} 
msobj.Pause = function(){ 
msobj.Stop = 1; 
clearInterval(msobj.TimerID); 
setTimeout(msobj.Continue,delaytime); 
} 
msobj.Begin = function(){ 
msobj.ClientScroll = msobj.Direction > 1 ? msobj.ID.scrollWidth : msobj.ID.scrollHeight; 
if((msobj.Direction <= 1 && msobj.ClientScroll <msobj.Height) || (msobj.Direction > 1 && msobj.ClientScroll <msobj.Width))return; 
msobj.ID.innerHTML += msobj.ID.innerHTML; 
msobj.TimerID = setInterval(msobj.StartID,timer); 
if(msobj.ScrollStep < 0)return; 
msobj.ID.onmousemove = function(event){ 
if(msobj.ScrollStep == 0 && msobj.Direction > 1){ 
var event = event || window.event; 
if(window.event){ 
if(msobj.IsNotOpera){msobj.EventLeft = event.srcElement.id == msobj.ID.id ? event.offsetX - msobj.ID.scrollLeft : event.srcElement.offsetLeft - msobj.ID.scrollLeft + event.offsetX;} 
else{msobj.ScrollStep = null;return;} 
} 
else{msobj.EventLeft = event.layerX - msobj.ID.scrollLeft;} 
msobj.Direction = msobj.EventLeft > msobj.HalfWidth ? 3 : 2; 
msobj.AbsCenter = Math.abs(msobj.HalfWidth - msobj.EventLeft); 
msobj.Step = Math.round(msobj.AbsCenter * (msobj.BakStep*2) / msobj.HalfWidth); 
} 
} 
msobj.ID.onmouseover = function(){ 
if(msobj.ScrollStep == 0)return; 
msobj.MouseOver = 1; 
clearInterval(msobj.TimerID); 
} 
msobj.ID.onmouseout = function(){ 
if(msobj.ScrollStep == 0){ 
if(msobj.Step == 0)msobj.Step = 1; 
return; 
} 
msobj.MouseOver = 0; 
if(msobj.Stop == 0){ 
clearInterval(msobj.TimerID); 
msobj.TimerID = setInterval(msobj.StartID,timer); 
}}} 
setTimeout(msobj.Begin,waittime); 
} 
srcMarquee.prototype.Scroll = function(){ 
switch(this.Direction){ 
case 0: 
this.CTL += this.Step; 
if(this.CTL >= this.ScrollStep && this.DelayTime > 0){ 
this.ID.scrollTop += this.ScrollStep + this.Step - this.CTL; 
this.Pause(); 
return; 
} 
else{ 
if(this.ID.scrollTop >= this.ClientScroll){this.ID.scrollTop -= this.ClientScroll;} 
this.ID.scrollTop += this.Step; 
} 
break; 
case 1: 
this.CTL += this.Step; 
if(this.CTL >= this.ScrollStep && this.DelayTime > 0){ 
this.ID.scrollTop -= this.ScrollStep + this.Step - this.CTL; 
this.Pause(); 
return; 
} 
else{ 
if(this.ID.scrollTop <= 0){this.ID.scrollTop += this.ClientScroll;} 
this.ID.scrollTop -= this.Step; 
} 
break; 
case 2: 
this.CTL += this.Step; 
if(this.CTL >= this.ScrollStep && this.DelayTime > 0){ 
this.ID.scrollLeft += this.ScrollStep + this.Step - this.CTL; 
this.Pause(); 
return; 
} 
else{ 
if(this.ID.scrollLeft >= this.ClientScroll){this.ID.scrollLeft -= this.ClientScroll;} 
this.ID.scrollLeft += this.Step; 
} 
break; 
case 3: 
this.CTL += this.Step; 
if(this.CTL >= this.ScrollStep && this.DelayTime > 0){ 
this.ID.scrollLeft -= this.ScrollStep + this.Step - this.CTL; 
this.Pause(); 
return; 
} 
else{ 
if(this.ID.scrollLeft <= 0){this.ID.scrollLeft += this.ClientScroll;} 
this.ID.scrollLeft -= this.Step; 
} 
break; 
} 
} 
