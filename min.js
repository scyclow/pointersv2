function t(){83===keyCode&&saveCanvas(__canvas,"pointers-"+Date.now(),"png")}let e;function setup(){function t(){return this.start===this.mid1&&this.end===this.mid2}SIZE=min(innerWidth,innerHeight),__canvas=createCanvas(SIZE,SIZE),noiseSeed(h(1e6)+h(1e6)+h(1e3)),SCALE_ADJ=SIZE/800,W=800,H=800,L=0,R=W,T=0,B=H,colorMode(HSB,360,100,100),MINT_SIZE=100,TOKEN_ID=Number(tokenData.tokenId)%1e6,CHAOS=TOKEN_ID/MINT_SIZE,CELLS=b([TOKEN_ID&&7,g(5,8)],[TOKEN_ID&&25,g(8,14)],[TOKEN_ID&&35,g(14,20)],[33,g(20,48)]),CELL_PADDING=h(-.1,.25),CELL_SIZE=W/CELLS,CELL_X=g(2,CELLS),POINT_X=CELL_X*CELL_SIZE,CELL_Y=g(2,CELLS),POINT_Y=CELL_Y*CELL_SIZE,HUE=h(-10,10),MAX_VECTOR_RANGES=b([1,h(3,20)],[4,h(20,200)],[10,h(200,1e3)],[10,1e4]),DASH_RATE=b([3,1],[10,h(.1,.25)],[87,0]),LAYOUT=b([85,0],[TOKEN_ID>5&&10,1],[TOKEN_ID>5&&4,2]),ARROW_MIN_LEN=v(.1)?CELLS:g(1,5),ARROW_MAX_LEN=v(.1)?CELLS:g(1,5)+ARROW_MIN_LEN,ARROW_DRIFT=map(CHAOS,0,1,0,15),ARROW_ANGLE_DRIFT_AMOUNT=map(CHAOS**2,0,1,0,2.5),ARROW_ANGLE_VAR=map(CHAOS,0,1,0,1.2),LAZY_CARROTS=v(CHAOS),CARROT_TURN=map(CHAOS,0,1,0,.1),CARROT_DIST_MIN=map(CHAOS,0,1,0,5),CARROT_DIST_MAX=map(CHAOS,0,1,0,18),SQUIGGLEY=v(.07),SKIP_RATE=map(CHAOS,0,1,0,.3),STROKE_VARIANCE=map(CHAOS,0,1,0,1.1),STROKE_TURBULENCE=map(CHAOS,0,1,0,.25),IS_DARK=v(.25),SMUDGE=v(CHAOS**3)&&!IS_DARK?map(CHAOS,0,1,0,.001)*CHAOS**3:0,DOT_STROKE_MIN=g(1,7*min(1,24/CELLS)),DOT_STROKE_MAX=min(DOT_STROKE_MIN+g(6*CHAOS),9),SHOW_GRID=v(.1),REVERSE_COLORS=v(.03),COLORS=IS_DARK?{stroke:230,bg:15,dot:color(0,57,90,.95),bgS:(t,e,L)=>color(0,0,h(8,18)+map(noise(e/400,L/400),0,1,-2.5,2.5)),grid:color(0,0,90,.25)}:{stroke:color(0,0,h(10,20)),bg:color(HUE+30,5,97),dot:color(0,78,95,.85),bgS:(t,e,L)=>color(HUE+h(25,35),h(3,7)+.5*t+map(noise(e/400,L/400),0,1,0,5),h(93,100)-.5*t-map(noise(e/400,L/400),0,1,0,5)),grid:color(HUE+5,20,18,.2)},REVERSE_COLORS&&([COLORS.dot,COLORS.stroke]=[COLORS.stroke,COLORS.dot]),console.log("What's the point of it all?"),DEBUG_MODE=!1,e={right:{fn:A,start:0,end:CELLS,mid1:CELL_Y,mid2:CELL_Y,isComplete:t},left:{fn:s,start:0,end:CELLS,mid1:CELL_Y,mid2:CELL_Y,isComplete:t},top:{fn:I,start:0,end:CELLS,mid1:CELL_X,mid2:CELL_X,isComplete:t},bottom:{fn:c,start:0,end:CELLS,mid1:CELL_X,mid2:CELL_X,isComplete:t},allComplete(){return this.right.isComplete()&&this.left.isComplete()&&this.top.isComplete()&&this.bottom.isComplete()}}}function draw(){noLoop(),scale(SCALE_ADJ),N(),p(),0===LAYOUT?(A(CELL_Y),s(CELL_Y),c(CELL_X),I(CELL_X),a()):1===LAYOUT?m():u()}const _=(t,e,L)=>U(D(t),D(e),D(t-L),D(e)),o=(t,e,L)=>U(D(t),D(e),D(t+L),D(e)),n=(t,e,L)=>U(D(t),D(e),D(t),D(e+L)),E=(t,e,L)=>U(D(t),D(e),D(t),D(e-L)),C=(t,e,L)=>U(D(t),D(e),D(t+L),D(e+L)),O=(t,e,L)=>U(D(t),D(e),D(t+L),D(e-L)),i=(t,e,L)=>U(D(t),D(e),D(t-L),D(e-L)),S=(t,e,L)=>U(D(t),D(e),D(t-L),D(e+L)),r=(t,e,L,_=0)=>{if(t===CELL_X&&e===CELL_Y)return;const o=D(t),n=D(e),{angle:E}=V(o,n,POINT_X,POINT_Y),[C,O]=G(E+_,L*CELL_SIZE,o,n);U(o,n,C,O)},l=t=>min(g(ARROW_MIN_LEN,ARROW_MAX_LEN),t);function A(t){const e=t;let L,o;for(let t=CELLS-1;t>=CELL_X;t--)if(Y(t,e)||L||(L=t),Y(t,e)&&L){o=t+1;break}if(L===o)return P(L,e,"w");for(let t=L;t>=o;t--)P(t,e,"w");let n=L;for(;n>=o;){let t=l(n-o);n-t===o+1&&(t+=1),_(n,e,t),n-=t+1}}function s(t){const e=t;let L,_;for(let t=1;t<=CELL_X;t++)if(Y(t,e)||L||(L=t),Y(t,e)&&L){_=t-1;break}if(L===_)return P(L,e,"e");for(let t=L;t<=_;t++)P(t,e,"e");let n=L;for(;n<=_;){let t=l(_-n);n+t===_-1&&(t+=1),o(n,e,t),n+=t+1}}function I(t){const e=t;let L,_;for(let t=1;t<=CELL_Y;t++)if(Y(e,t)||L||(L=t),Y(e,t)&&L){_=t-1;break}if(L===_)return P(e,L,"s");for(let t=L;t<=_;t++)P(e,t,"s");let o=L;for(;o<=_;){let t=l(_-o);o+t===_-1&&(t+=1),n(e,o,t),o+=t+1}}function c(t){const e=t;let L,_;for(let t=CELLS-1;t>=CELL_Y;t--)if(Y(e,t)||L||(L=t),Y(e,t)&&L){_=t+1;break}if(L===_)return P(e,L,"n");for(let t=L;t>=_;t--)P(e,t,"n");let o=L;for(;o>=_;){let t=l(o-_);o-t===_+1&&(t+=1),E(e,o,t),o-=t+1}}function f(t){const L=e[t].start!==e[t].mid1,_=e[t].end!==e[t].mid2,o=b([L,["start",g(1,2)]],[L,["mid1",g(1,2)]],[_,["mid2",g(1,2)]],[_,["end",g(1,2)]]);Z(o[1],L=>{e[t][o[0]]+=1,e[t].fn(e[t][o[0]])})}function a(){let t=0;for(;!e.allComplete()&&t<MAX_VECTOR_RANGES;){f(b([!e.right.isComplete(),"right"],[!e.left.isComplete(),"left"],[!e.top.isComplete(),"top"],[!e.bottom.isComplete(),"bottom"])),t++}}function m(){const t=h(.4,.65),e=v(.1)?1:v(.5)?0:h(0,.25),L=v(.1)?1:v(.5)?0:h(0,.25),R=v(.1)?1:v(.5)?0:h(0,.25),l=v(.1)?1:v(.5)?0:h(0,.25),A=v(.1),s=h(0,.15);d((T,I,c,f)=>{if([0,CELLS].includes(c)||[0,CELLS].includes(f))return;let a;A||v(s)?a=r:c===CELL_X&&f===CELL_Y?a=(()=>{}):c===CELL_X&&f>CELL_Y?a=E:c===CELL_X&&f<CELL_Y?a=n:c>CELL_X&&f===CELL_Y?a=_:c<CELL_X&&f===CELL_Y?a=o:c<CELL_X&&f<CELL_Y?a=b([(1-L)/2,o],[(1-L)/2,n],[L,C]):c<CELL_X&&f>CELL_Y?a=b([(1-e)/2,o],[(1-e)/2,E],[e,O]):c>CELL_X&&f>CELL_Y?a=b([(1-R)/2,_],[(1-R)/2,E],[R,i]):c>CELL_X&&f<CELL_Y&&(a=b([(1-l)/2,_],[(1-l)/2,n],[l,S])),a(c,f,t)})}function u(){ARROW_DRIFT*=.1,STROKE_VARIANCE*=.5,DOT_STROKE_MAX=min(DOT_STROKE_MIN+g(3*CHAOS),5);const t=CHAOS**2.5,e=15+30*t,_=30-20*t,o=30+20*t,n=.4*CHAOS,E=4*CELLS;Z(E,t=>{if(v(.66*CHAOS)&&t)return;const C=h(0,500);let O=t*TWO_PI/E,[i,S]=G(O,C+2*h(15,e),POINT_X,POINT_Y),[r,l]=G(O,h(_,o),i,S),A=0;for(;i>L&&i<R&&S>T&&S<B&&A<50;)U(r,l,i,S),O=V(i,S,r,l).angle+map(noise(i/20,S/20),0,1,-n,n),[i,S]=G(O,h(15,e),r,l),[r,l]=G(O,h(_,o),i,S),A++})}function N(){if(background(COLORS.bg),DEBUG_MODE)return;for(let t=T-5;t<B+5;t+=2){let e=2;for(let _=L-5;_<R+5;_+=e)M(_,t,e),v(SMUDGE)&&([x3,y3]=G(h(0,TWO_PI),5,_,t),stroke(COLORS.stroke),x(_,t,x3,y3))}if(SHOW_GRID){push(),stroke(COLORS.grid);for(let t=L;t<=R;t+=CELL_SIZE)line(t,T,t,B);for(let t=T;t<=B;t+=CELL_SIZE)line(L,t,R,t);pop()}}function p(){if(push(),noStroke(),fill(COLORS.dot),DEBUG_MODE)circle(POINT_X,POINT_Y,10);else{const t=9+h(24/CELLS*9);J(POINT_X,POINT_Y,t,!0)}pop(),P(CELL_X,CELL_Y,"r")}function d(t){for(let e=0;e<=CELLS;e++)for(let L=0;L<=CELLS;L++){t(e*CELL_SIZE,L*CELL_SIZE,e,L)}}const D=t=>t*CELL_SIZE;let X={};function Y(t,e){return X[`${t||0},${e||0}`]}function P(t,e,L){return X[`${t||0},${e||0}`]=L,L}function U(t,e,L,_,o=!1){if(stroke(COLORS.stroke),fill(COLORS.stroke),__dotStroke=h(DOT_STROKE_MIN,DOT_STROKE_MAX),DEBUG_MODE)return line(t,e,L,_),void circle(L,_,4);if(v(SKIP_RATE))return;const n=(t=1)=>h(-ARROW_DRIFT/t,ARROW_DRIFT/t),E=n(),C=n(),O=t+E,i=e+C,R=L+(1===LAYOUT?E+n(2):n()),S=_+(1===LAYOUT?C+n(2):n()),{d:r,angle:l}=V(R,S,O,i),[A,s]=G(l+PI,h(CARROT_DIST_MIN,CARROT_DIST_MAX),R,S),T=CARROT_TURN+h(-.005,.005),[I,c]=G(l+T-QUARTER_PI/(2+h(-ARROW_ANGLE_VAR,ARROW_ANGLE_VAR)),min(15,r*h(.23,.27)),A,s),[f,a]=G(l+T+QUARTER_PI/(2+h(-ARROW_ANGLE_VAR,ARROW_ANGLE_VAR)),min(15,r*h(.23,.27)),A,s);push(),x(O,i,R,S,1,v(DASH_RATE),SQUIGGLEY),x(A,s,I,c,.25),x(A,s,f,a,.25),pop()}function M(t,e,L){const _=V(t,e,POINT_X,POINT_Y).d/SIZE;stroke(COLORS.bgS(_,t,e));const o=noise(t,e),[n,E]=G(PI+o+h(-QUARTER_PI,QUARTER_PI),5,t+h(-1,1),e+h(-1,1)),[C,O]=G(o+h(-QUARTER_PI,QUARTER_PI),5,t,e);line(n,E,C,O)}function k(){background("yellow");for(let t=0;t<=W+1;t+=CELL_SIZE)line(t,0,t,H);for(let t=0;t<=H+1;t+=CELL_SIZE)line(0,t,W,t)}let K=parseInt(tokenData.hash.slice(50,58),16);const g=(t,e)=>int(h(t,e));function h(t,e){K^=K<<13,K^=K>>17;const L=((K^=K<<5)<0?1+~K:K)%1e3/1e3;return null!=e?t+L*(e-t):null!=t?L*t:L}function G(t,e,L=0,_=0){return[sin(t)*e+L,cos(t)*e+_]}function Z(t,e){const L=[];for(let _=0;_<t;_++)L.push(e(_));return L}function b(...t){const e=t.reduce((t,e)=>t+e[0],0),L=h();let _=0;for(let o=0;o<t.length;o++){if(L<=(_+=(!0===t[o][0]?1:!1===t[o][0]?0:t[o][0])/e)&&t[o][0])return t[o][1]}}const V=(t,e,L,_)=>({d:dist(t,e,L,_),angle:atan2(L-t,_-e)}),Q=t=>(t%360+360)%360,v=t=>h()<t,F=t=>t[int(h(t.length))],w=t=>F(t)(),y=(t,e,L,_)=>L+noise(t/15,e/15)*(_-L)+h(-.25,.25),$=()=>v(.5)?1:-1;function x(t,e,L,_,o=1,n=!1,E=!1){const{d:C,angle:O}=V(t,e,L,_),i=STROKE_TURBULENCE;let R=t,S=e,r=!1;for(let L=0;L<=C;L++){const[_,l]=G(O+HALF_PI,j(t,e,L/C,E?sin(L/PI)*map(CHAOS,0,1,1,9)*map(DOT_STROKE_MIN,1,7,.5,3):o*C/16),R+h(-i,i),S+h(-i,i));L&&L%10==0&&(r=!r),r&&n||(circle(_,l,y(_,l,__dotStroke*(1-STROKE_VARIANCE),__dotStroke*(1+STROKE_VARIANCE))),[R,S]=G(O,L+1,t,e))}}function J(t,e,L,_=!1){const o=STROKE_VARIANCE*(L/300),n=L*PI*4;_&&beginShape();for(let E=0;E<=n;E++){const C=E*TWO_PI/n,[O,i]=G(C,2,t+1e3,e+1e3),R=G(C,map(noise(O,i),0,1,map(CHAOS,0,1,1,.8)*L/2,L/2),t,e),S=R[0],r=R[1];_||circle(S,r,y(S,r,__dotStroke*(1-o),__dotStroke*(1+o))),_&&curveVertex(S,r)}_&&endShape()}function j(t,e,L,_){const o=ARROW_ANGLE_DRIFT_AMOUNT*_;return map(noise(...G(L*TWO_PI,.15,t,e)),0,1,-o,o)*sin(PI*L)}__dotStroke=1;