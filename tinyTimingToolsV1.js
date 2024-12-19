﻿/*sun date*/
class tinyDate{constructor(mode,diff){this.mode=mode;this.diff=diff;this.daysa=0;this.monthName="index";
this.monthNum=0;this.yearNum=0;this.dayNum=0;this.dayNumOfWeek=0;this.dayNameOfWeek="index";this.Month1stDayNum=0;this.Month1stDayName="index";this.getDate();}
date_diff_indays=function(){if(this.mode=="client"){let dt1=new Date("01/01/2019");let dt2=new Date();this.daysa=Math.floor((Date.UTC(dt2.getFullYear(),dt2.getMonth(),dt2.getDate())-Date.UTC(dt1.getFullYear(),dt1.getMonth(),dt1.getDate()))/(1000*60*60*24));}else if(this.mode=="server"){this.daysa=this.diff;}}
getfullstring(){return this.createdatestring(this.convert2suncaln(this.daysa),this.daysa);}
createdatestring(datestring,daynamex){let x=datestring.split("-");let monthnamea=this.getmonthname(x[1]);let dnamea=this.getdayname(daynamex,"str");
this.yearNum=x[0];this.monthName=monthnamea;this.monthNum=x[1];this.dayNameOfWeek=dnamea;this.dayNumOfWeek=this.getdayname(daynamex,"num");this.dayNum=x[2];
let res="";/*res+=" امروز ";*/res+=dnamea+" ";res+=x[2]+" ";res+=monthnamea+" ماه ";res+=x[0];return res;}
getmonthname(m){let x=["1","2","3","4","5","6","7","8","9","10","11","12"];let y=["فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"];for(let a=0;a<x.length;a++){if(m==x[a]){return y[a];}}}
getdayname(ds,tp){let daynumber=(ds%7);/*var x=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];*/let y=["سه شنبه","چهارشنبه","پنجشنبه","جمعه","شنبه","یکشنبه","دوشنبه"];for(let a=0;a<y.length;a++){if(daynumber==a){return ((tp=="str")? y[a]:((a+4>7)? (a+4-7):(a+4)));}}}
monthMaxDays(y,m){if(m>=1 && m<=6){return 31;}else if(m>=7 && m<12){return 30;}else if(m==12){return this.getlastmonthdays(y);}return 0;}
getlastmonthdays(y){let a=[1,5,9,13,17,22,26,30];for(let i=0;i<a.length;i++){if(y%33==a[i]){return 30;}} /*leap year last day*/return 29;}
isLeapYear(y){return ((this.getlastmonthdays(y)==30)? true:false);}
clearStringDateTimeFormat(str){let t="";for(let b=0;b<str.length;b++){t+=((str[b]=="/" || str[b]==":")? "-":str[b]+"");}return t;}
getDayOfWeekByDate(target,format0){let t=this.clearStringDateTimeFormat(target);t=trimDateFormat(t);return this.getdayname(this.findDaysPast(t),format0);}
convert2suncaln(orgformat){let y=1397;let m=10;let d=11;orgformat++;for(let dcnt=1;dcnt<=orgformat;dcnt++){
if(d>31 && m>=1 && m<=6){d=1; m++; this.Month1stDayNum=this.getdayname(dcnt-1,"num");}else if(d>30 && m>=7 && m<=11){d=1; m++; this.Month1stDayNum=this.getdayname(dcnt-1,"num");}else if(d>this.getlastmonthdays(y) && m==12){d=1; m++; this.Month1stDayNum=this.getdayname(dcnt-1,"num");}
if(m>12){d=1;m=1;y++;this.Month1stDayNum=this.getdayname(dcnt-1,"num");}/*increase year*/if(dcnt<orgformat){d++;}/*last incr must be rejected EX: 1398/6/1 >> 1398/6/32  if not.*/}return y+"-"+m+"-"+d;}
findDaysPast(desx){let des=this.clearStringDateTimeFormat(desx);des=trimDateFormat(des);let y=1397;let m=10;let d=11;let limit=100000;let dcnt=1; for(;dcnt<limit && (y+"-"+m+"-"+d)!=des;dcnt++){d++;/*last incr must be rejected EX: 1398/6/1 >> 1398/6/32  if not.*/
if(d>31 && m>=1 && m<=6){d=1; m++;}else if(d>30 && m>=7 && m<=11){d=1; m++;}else if(d>this.getlastmonthdays(y) && m==12){d=1; m++;}/*leap year*/if(m>12){d=1; m=1; y++;}/*increase year*/}return dcnt-1;}
SunDateDiff(desx,org){let des=this.clearStringDateTimeFormat(desx);des=trimDateFormat(des);let y=org.split("/")[0];let m=org.split("/")[1];let d=org.split("/")[2];let limit=100000;let dcnt=1; 
for(;dcnt<limit && (y+"-"+m+"-"+d)!=des;dcnt++){d++;if(d>31 && m>=1 && m<=6){d=1; m++;}else if(d>30 && m>=7 && m<=11){d=1; m++;}
else if(d>this.getlastmonthdays(y) && m==12){d=1; m++;}if(m>12){d=1; m=1; y++;}}return dcnt-1;}
convertAD2Sun(inputType,crisDate,outputType){let inp=crisDate;if(inputType=="y/m/d"){inp=crisDate.split("/");crisDate=inp[1]+"/"+inp[2]+"/"+inp[0];} /*convet to m/d/y format*/
let dt1=new Date("01/01/2019");let dt2=new Date(crisDate);let daysa=Math.floor((Date.UTC(dt2.getFullYear(),dt2.getMonth(),dt2.getDate())-Date.UTC(dt1.getFullYear(),dt1.getMonth(),dt1.getDate()))/(1000*60*60*24));
let res=this.convert2suncaln(daysa);if(outputType==1){return res.split("-")[2]+" "+this.getmonthname(res.split("-")[1])+" "+res.split("-")[0];}
else if(outputType==2){return this.getDayOfWeekByDate(res,"str")+" "+res.split("-")[2]+" "+this.getmonthname(res.split("-")[1])+" "+res.split("-")[0];}return res.replaceAll('-', '/');}
getDate(){this.date_diff_indays(); /* ******** JS or PHP ******** */return this.getfullstring();}}/*sun date*/ /*sun calendar */let as4df6s4453468364f4rvsd=["0-0-0"];let asd5654efe4f64se4grg64e=["0-0"];let aser254E54rg46er4er41fg=[0];function loadHead(containerx){ let res='';
res+='<div class="dateSelectorTopMain" style="justify-content:space-between;display:flex;">';res+='<input type="button" class="'+containerx+'cls" data-group-name="'+containerx+'" name="nxtbtn" data-cmd="next" value="<<" onclick="nextMonth(this);"/>';
res+='<span class="'+containerx+'cls topDateInFullFormat" data-group-name="'+containerx+'" data-value="monthTB" onclick="showTB(this)">44</span>';res+='<input type="button" class="'+containerx+'cls" data-group-name="'+containerx+'" name="prebtn" data-cmd="previous" value=">>" onclick="previousMonth(this);"/>';res+='</div>';return res;}
function loadFoot(y,m,d,containerx){let res='';res+='<input type="hidden" class="'+containerx+'cls" data-group-name="'+containerx+'" name="datexx" value="'+y+'-'+m+'-'+d+'" />';return res;}
function getDateValueHolder(el){let c=el.getAttribute("data-group-name"); /* get calendar name */let g=document.getElementsByClassName(c+"cls"); /* get get all elements with class=calendar name */
for(let a=0;a<g.length;a++){if(g[a].name=="datexx"){return g[a];}} /* find date holder hidden input */}function getDateValueHolderByName(namex){let c=namex; /* get calendar name */
let g=document.getElementsByClassName(c+"cls"); /* get get all elements with class=calendar name */for(let a=0;a<g.length;a++){if(g[a].name=="datexx"){return g[a].value;}} /* find date holder hidden input value */}
function setDateValueHolder(el,yy,mm,dd){let c=el.getAttribute("data-group-name"); /* get calendar name */let g=document.getElementsByClassName(c+"cls"); /* get get all elements with class=calendar name */for(let a=0;a<g.length;a++){if(g[a].name=="datexx"){g[a].value=yy+'-'+mm+'-'+dd;}} /* find date holder hidden input */}
function nextMonth(el){let c=el.getAttribute("data-group-name"); /* get calendar name */let g=getDateValueHolder(el); /* get last selected date >> default is today */let d=(g.value).split("-");
if(d[1]<12){d[1]++;}else{d[1]=1;d[0]++;} refreshWeekDays(d[0],d[1],1,c); /* refresh calendar */}function previousMonth(el){
let c=el.getAttribute("data-group-name"); /* get calendar name */let g=getDateValueHolder(el); /* get last selected date >> default is today */let d=(g.value).split("-");
if(d[1]>1){d[1]--;}else if(d[0]-1>=1398){d[1]=12;d[0]--;}refreshWeekDays(d[0],d[1],1,c); /* refresh calendar */}function updateDayValue(el){ 
let c=el.getAttribute("data-group-name");/* get calendar name */let g=getDateValueHolder(el);/* get last selected date >> default is today */
let d=(g.value).split("-");d[2]=el.getAttribute("data-mv");refreshWeekDays(d[0],d[1],d[2],c);}function updateMonthValue(el){
let c=el.getAttribute("data-group-name");/* get calendar name */let g=getDateValueHolder(el);/* get last selected date >> default is today */let d=(g.value).split("-");d[1]=el.getAttribute("data-mv");refreshWeekDays(d[0],d[1],1,c);}
function updateYearValue(el){let c=el.getAttribute("data-group-name");/* get calendar name */let g=getDateValueHolder(el);/* get last selected date >> default is today */let d=(g.value).split("-");
d[0]=el.getAttribute("data-mv");let el0=document.createElement("div"); /*creating a virtual element to pass to showTB*/el0.setAttribute("data-value", "monthTB");
el0.setAttribute("data-group-name", c);setDateValueHolder(el,d[0],d[1],1);refreshWeekDays(d[0],d[1],1,c);showTB(el0);}
function showTB(el){let c=el.getAttribute("data-group-name");/* get calendar name */let namex=el.getAttribute("data-value");/* get last selected date >> default is today */let ms=document.getElementsByClassName("selectBoxCLS");
for(let a=0;a<ms.length;a++){if(ms[a].getAttribute("data-group-name")==c){/*if related to this group*/if(ms[a].getAttribute("data-name")!=namex){ms[a].style.display="none";}else {ms[a].style.display="block";}}}}
function monthSelectTB(containerx){let res='';let tmp=new tinyDate("client");/**/let d=tmp.yearNum;
let g=document.getElementsByClassName(containerx+"cls");for(let a=0;a<g.length;a++){if(g[a].name=="datexx"){d=(g[a].value).split("-")[0];break;}}/* get last selected date >> default is today */
res+='<div class="selectBoxCLS monthBox" data-group-name="'+containerx+'" data-name="monthTB" style="display:none;">';res+='<div align="center" class="monthBoxTop" data-group-name="'+containerx+'" data-value="yearTB" onclick="showTB(this)">'+d+' سال </div>';res+='<table class="dateSelectCLS" border="0">';
for(let a=1;a<=12;a++){res+='<tr>';for(let b=0;b<4 && a<=12;b++){res+='<td class="monthcellCLS"><div class="'+containerx+'cls monthcellHoldCLS" data-group-name="'+containerx+'" data-mv="'+a+'" onclick="updateMonthValue(this)">'+tmp.getmonthname(a)+'</div></td>';a++;}res+='</tr>';a--;}
res+='</table>';res+='</div>';return res;}function yearSelectTB(containerx){let res='';let tmp=new tinyDate("client");/**/res+='<div class="selectBoxCLS" data-group-name="'+containerx+'" data-name="yearTB" style="display:none;">';
res+='<table class="dateSelectCLS" border="0">';for(let a=1398;a<=1427;a++){res+='<tr>';for(let b=0;b<5 && a<=1427;b++){
res+='<td class="yearcellCLS"><div class="'+containerx+'cls yearcellHoldCLS" data-group-name="'+containerx+'" data-mv="'+a+'" onclick="updateYearValue(this)">'+a+'</div></td>';a++;}res+='</tr>';a--;}res+='</table>';
res+='</div>';return res;}function clearArrFormat(arr){let ar=new Array();let tmp2="";for(let a=0;a<arr.length;a++){tmp2="";for(let b=0;b<arr[a].length;b++){tmp2+=((arr[a][b]=="/")? "-":arr[a][b]+"");
}ar.push(tmp2);}return ar;}function trimDateFormat(d){let x=d.split("-");x[0]=((x[0]<10)?(x[0]*1):x[0]);x[1]=((x[1]<10)?(x[1]*1):x[1]);
x[2]=((x[2]<10)?(x[2]*1):x[2]);return x[0]+"-"+x[1]+"-"+x[2];}function setOffDatesVarName(containerx,arrName){
return '<input type="hidden" class="'+containerx+'cls" data-group-name="'+containerx+'" name="offdatesxx" value="'+arrName+'" />';}
function getOffDatesVarNameByName(namex){let c=namex;/*get calendar name*/let g=document.getElementsByClassName(c+"cls");/*get get all elements with class=calendar name*/
for(let a=0;a<g.length;a++){if(g[a].name=="offdatesxx"){return g[a].value;}}/*find date holder hidden input value */}
function OffDate(containerx,arrName,d){let res=false;eval('for(let a=0;a<'+arrName+'.length;a++){if(trimDateFormat('+arrName+'[a])=="'+d+'"){res=true;}}');return res;}
function trimDaysOfMonthFormat(d){let x=d.split("-");x[0]=((x[0]<10)?(x[0]*1):x[0]);x[1]=((x[1]<10)?(x[1]*1):x[1]);return x[0]+"-"+x[1];}
function setOffDaysOfMonthVarName(containerx,arrName){return '<input type="hidden" class="'+containerx+'cls" data-group-name="'+containerx+'" name="offdaysofmonthxx" value="'+arrName+'" />';}
function getOffDaysOfMonthVarNameByName(namex){let c=namex;/*get calendar name*/let g=document.getElementsByClassName(c+"cls"); /* get get all elements with class=calendar name */for(let a=0;a<g.length;a++){if(g[a].name=="offdaysofmonthxx"){return g[a].value;}} /* find date holder hidden input value */}
function OffDaysOfMonth(containerx,arrName,d){let res=false;eval('for(let a=0;a<'+arrName+'.length;a++){if(trimDaysOfMonthFormat('+arrName+'[a])=="'+d+'"){res=true;}}');return res;}
function trimDaysOfWeekFormat(d){return d*1;}function setOffDaysOfWeekVarName(containerx,arrName){return '<input type="hidden" class="'+containerx+'cls" data-group-name="'+containerx+'" name="offdaysofweekxx" value="'+arrName+'" />';}function getOffDaysOfWeekVarNameByName(namex){
let c=namex; /* get calendar name */let g=document.getElementsByClassName(c+"cls"); /*get get all elements with class=calendar name*/for(let a=0;a<g.length;a++){if(g[a].name=="offdaysofweekxx"){return g[a].value;}} /* find date holder hidden input value */}
function OffDaysOfWeek(containerx,arrName,d){let res=false;eval('for(let a=0;a<'+arrName+'.length;a++){if(trimDaysOfWeekFormat('+arrName+'[a])=="'+d+'"){res=true;}}');return res;}function readCalendar(namex,typex){
let q=getDateValueHolderByName(namex);let v=q.split("-");let t=(typex)? typex:"y-m-d";if(t=="y-m-d"){return q;}else if(t=="y/m/d"){return v[0]+"/"+v[1]+"/"+v[2];}
else if(t=="y"){return q.split("-")[0];}else if(t=="m"){return q.split("-")[1];}else if(t=="d"){return q.split("-")[2];}return "ERROR";}function loadDateSelector(containerx,arrNameDates,arrNameOffDayMonth,arrNameOffDayWeek){
let d=new tinyDate("client");let z=d.getDate();if(arrNameDates){eval(arrNameDates+"=clearArrFormat("+arrNameDates+");");}else{arrNameDates="as4df6s4453468364f4rvsd";}if(arrNameOffDayMonth){eval(arrNameOffDayMonth+"=clearArrFormat("+arrNameOffDayMonth+");");}else{arrNameOffDayMonth="asd5654efe4f64se4grg64e";}if(!arrNameOffDayWeek){arrNameOffDayWeek="aser254E54rg46er4er41fg";}
let maxD=d.monthMaxDays(d.yearNum,d.monthNum);let e=1;let res='';let tdclassy="";let tddivclassy="";let dateStr=d.yearNum+"-"+d.monthNum+"-"+d.dayNum;let tmp=d.yearNum+"-"+d.monthNum+"-";
res+='<div class="selectBoxCLS" data-group-name="'+containerx+'" data-name="weekTB" style="display:block;">';res+=loadHead(containerx);res+='<table class="dateSelectCLS" border="0">';res+='<tr>';res+='<td class="dateSelectHead" dir="rtl">شنبه</td><td class="dateSelectHead" dir="rtl">1شنبه</td><td class="dateSelectHead" dir="rtl">2شنبه</td><td class="dateSelectHead" dir="rtl">3شنبه</td><td class="dateSelectHead" dir="rtl">4شنبه</td><td class="dateSelectHead" dir="rtl">5شنبه</td><td class="dateSelectHead" dir="rtl">جمعه</td>';
res+='</tr>';res+="<tr></tr>";res+="<tr></tr>";res+='<tr>';for(;e<d.Month1stDayNum;e++){res+='<td>&nbsp;</td>';}e--; /* skip days to reach to 1st day of month matching to week day */for(let a=1;a<=maxD;a++){
for(let b=e;b<7 && a<=maxD;b++){if(a==d.dayNum){tdclassy+=' todayCLS';tddivclassy+=' todayHoldCLS';} /* class creator for today cell */else if(OffDaysOfMonth(containerx,arrNameOffDayMonth,d.monthNum+"-"+a)){tdclassy+=' offDaysOfMonthCLS';tddivclassy+=' offDaysOfMonthHoldCLS';} /* class creator for off days of months cell */
else if(OffDaysOfWeek(containerx,arrNameOffDayWeek,b+1)){tdclassy+=' offDayOfWeekCLS';tddivclassy+=' offDayOfWeekHoldCLS';} /* class creator off days of weeks cell */else if(OffDate(containerx,arrNameDates,tmp+a)){tdclassy+=' offDateCLS';tddivclassy+=' offDateHoldCLS';} /* class creator for off date cell */
else{tdclassy+=' allDaysCellCLS';tddivclassy+=' allDaysCellHoldCLS';}/* class creator for all days cell */res+='<td class="'+tdclassy+' daysCellcls" data-group-name="'+containerx+'" data-mv="'+(a)+'" onclick="updateDayValue(this);"><div class="'+containerx+'cls'+tddivclassy+' daysCellDivcls" data-group-name="'+containerx+'" data-mv="'+(a)+'">'+(a++)+'</div></td>';
tdclassy="";tddivclassy="";}e=0;a--;res+='</tr>';}res+='</table>';res+='</div>';res+=monthSelectTB(containerx);res+=yearSelectTB(containerx);
res+=loadFoot(d.yearNum,d.monthNum,d.dayNum,containerx);res+=setOffDatesVarName(containerx,arrNameDates);res+=setOffDaysOfMonthVarName(containerx,arrNameOffDayMonth);
res+=setOffDaysOfWeekVarName(containerx,arrNameOffDayWeek);document.getElementById(containerx).innerHTML=res;let g=document.getElementsByClassName(containerx+"cls");
g[1].innerHTML=z;}function refreshWeekDays(yy,mm,dd,containerx){let u=new tinyDate("client");let d=new tinyDate("server",u.findDaysPast(yy+"-"+mm+"-"+dd));let z=d.getDate();
let dateStr=u.yearNum+"-"+u.monthNum+"-"+u.dayNum;let tmp=yy+"-"+mm+"-";let maxD=d.monthMaxDays(d.yearNum,d.monthNum);let e=1;
let res='';let tdclassy="";let tddivclassy="";let offDaysVarName=getOffDatesVarNameByName(containerx);/*some special dates*/let offDaysOfMonthVarName=getOffDaysOfMonthVarNameByName(containerx);/*month off days each year*/
let offDaysOfWeekVarName=getOffDaysOfWeekVarNameByName(containerx);/*week off days each month*/res+='<div class="selectBoxCLS" data-group-name="'+containerx+'" data-name="weekTB" style="display:block;">';
res+=loadHead(containerx);res+='<table class="dateSelectCLS" border="0">';res+='<tr>';res+='<td class="dateSelectHead" dir="rtl">شنبه</td><td class="dateSelectHead" dir="rtl">1شنبه</td><td class="dateSelectHead" dir="rtl">2شنبه</td><td class="dateSelectHead" dir="rtl">3شنبه</td><td class="dateSelectHead" dir="rtl">4شنبه</td><td class="dateSelectHead" dir="rtl">5شنبه</td><td class="dateSelectHead" dir="rtl">جمعه</td>';
res+='</tr>';res+="<tr></tr>";res+="<tr></tr>";res+='<tr>';for(;e<d.Month1stDayNum;e++){res+='<td>&nbsp;</td>';}e--; /* skip days to reach to 1st day of month matching to week day */
for(let a=1;a<=maxD;a++){for(let b=e;b<7 && a<=maxD;b++){if(tmp+a==dateStr){tdclassy+=' todayCLS';tddivclassy+=' todayCLS';} /* class creator for today cell */else if(OffDaysOfMonth(containerx,offDaysOfMonthVarName,d.monthNum+"-"+a)){tdclassy+=' offDaysOfMonthCLS';tddivclassy+=' offDaysOfMonthHoldCLS';} /*class creator for class creator for off days of months cell*/
else if(OffDaysOfWeek(containerx,offDaysOfWeekVarName,b+1)){tdclassy+=' offDayOfWeekCLS';tddivclassy+=' offDayOfWeekHoldCLS';} /*class creator off days of weeks cell*/else if(OffDate(containerx,offDaysVarName,tmp+a)){tdclassy+=' offDateCLS';tddivclassy+=' offDateHoldCLS';} /*class creator for off date cell*/
else{tdclassy+=' allDaysCellCLS';tddivclassy+=' allDaysCellHoldCLS';}/*class creator for all days cell*/res+='<td class="'+tdclassy+' daysCellcls" data-group-name="'+containerx+'" data-mv="'+(a)+'" onclick="updateDayValue(this);"><div class="'+containerx+'cls'+tddivclassy+' daysCellDivcls" data-group-name="'+containerx+'" data-mv="'+(a)+'">'+(a++)+'</div></td>';
tdclassy="";tddivclassy="";}e=0;a--;res+='</tr>';}res+='</table>';res+='</div>';res+=monthSelectTB(containerx);res+=yearSelectTB(containerx);res+=loadFoot(d.yearNum,d.monthNum,d.dayNum,containerx);res+=setOffDatesVarName(containerx,offDaysVarName);
res+=setOffDaysOfMonthVarName(containerx,offDaysOfMonthVarName);res+=setOffDaysOfWeekVarName(containerx,offDaysOfWeekVarName);document.getElementById(containerx).innerHTML=res;let g=document.getElementsByClassName(containerx+"cls");
g[1].innerHTML=z;}/*sun calendar */ /*countDown*/class tinyCountDown{constructor(format0,stval,ttf,tef,interval0){this.interval0=((interval0)? interval0:1000);
this.format0=format0;this.stringstval=stval;this.stval=this.calcSeconds(this.clearAllInputs(stval,format0),format0);this.tmp;this.ts;this.daysr;this.hoursr;this.minutesr;this.secondsr;this.intval;this.tef=tef;this.ttf=ttf;this.err=0;}
clearAllInputs(stval,format0){if(format0 != "sec"){let t=this.clearStringDateTimeFormat(stval);t=this.trimInputFormat(t);return t; }return stval;}
clearStringDateTimeFormat(str){let t="";for(let b=0;b<str.length;b++){t+=((str[b]=="/" || str[b]==":")? "-":str[b]+"");}return t;}trimInputFormat(d){let x=d.split("-");let res="";let len=x.length;for(let a=0;a<len;a++){res+=((x[a]<10)?(x[a]*1):x[a]);if(a<len-1){res+="-";}}return res;}
calcSeconds(val0,formatx){/*calculate seconds in any format*/if(formatx=="sec"){return val0;}else if(formatx=="d-h-m-s"){let x=val0.split("-");return ((x[0]*24*3600)+(x[1]*3600)+(x[2]*60)+(x[3]*1));}else if(formatx=="y-m-d-h-n-s"){
let x=val0.split("-");let t=new tinyDate("client");let calcDays=(t.findDaysPast(x[0]+"-"+x[1]+"-"+x[2]))-(t.daysa);/*days between today and target*/return ((calcDays*24*3600)+(x[3]*3600)+(x[4]*60)+(x[5]*1));}else{return 0;}}
serverModeInit(v){if(this.format0=="y-m-d-h-n-s"){let q=this.clearStringDateTimeFormat(this.stringstval);q=this.trimInputFormat(q);let x=q.split("-");let t=new tinyDate("client");let calcDays=(t.findDaysPast(x[0]+"-"+x[1]+"-"+x[2]))-(v);/*days between today and target*/
let tmp=((calcDays*24*3600)+(x[3]*3600)+(x[4]*60)+(x[5]*1));return ((tmp>0)?tmp:0);}else{return 0;}}dotimer(){this.tmp=this.stval;this.ts=this.stval;this.daysr=Math.floor(this.ts/24/3600);this.ts=(this.ts%(24*3600));this.hoursr=Math.floor(this.ts/3600);this.ts=(this.ts%3600);
this.minutesr=Math.floor(this.ts/60);this.ts=(this.ts%60);this.secondsr=Math.floor(this.ts);this.stval--;if(this.stval<0){clearInterval(this.intval);eval(this.ttf);eval(this.tef);}else{eval(this.ttf);}}
timerInit(initMode,v){if(initMode=="server" && this.format0=="y-m-d-h-n-s"){this.stval=this.serverModeInit(v);if(this.stval==0){this.dotimer();return;}}this.dotimer();this.intval=setInterval(this.dotimer.bind(this),this.interval0);}
timerGetString(){return this.daysr+":"+this.hoursr+":"+this.minutesr+":"+this.secondsr;}null0(){}}/*countDown*/