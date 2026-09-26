import * as THREE from 'three';
import {OrbitControls} from './OrbitControls.js';
import {historicPaths,historicBunkers,historicBuildings,hp} from './historical-geometry.js';
import {currentGeometry} from './current-geometry.js';

const $=s=>document.querySelector(s);
const host=$('#scene');
let era='1967', labelsVisible=true;
const materials={};
function material(name,color){return materials[name]??=new THREE.MeshStandardMaterial({color,roughness:.96});}
const earth=material('earth',0x9e8865),stone=material('stone',0xb9ab8c),concrete=material('concrete',0xb7b8af),dark=material('dark',0x333a36),roof=material('roof',0x888f83),grass=material('grass',0x667762),pathMaterial=material('path',0xb7afa0);
const groups={},labelSets={},anchors={};
let scene,camera,renderer,controls;

function dist(x,z,a,b){let dx=b[0]-a[0],dz=b[1]-a[1];let t=Math.max(0,Math.min(1,((x-a[0])*dx+(z-a[1])*dz)/(dx*dx+dz*dz||1)));return Math.hypot(x-a[0]-t*dx,z-a[1]-t*dz);}
const segments=paths=>paths.flatMap(p=>p.slice(1).map((b,i)=>[p[i],b]));
function historicHeight(x,z){return .75+1.45*Math.exp(-((x-3)**2/180+(z+6)**2/260));}
function modernHeight(x,z){return .75+1.35*Math.exp(-((x-3)**2/110+(z+6)**2/130));}
function mesh(g,geo,mat,x=0,y=0,z=0){const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;g.add(m);return m;}
function box(g,w,h,d,x,y,z,mat=stone){return mesh(g,new THREE.BoxGeometry(w,h,d),mat,x,y,z);}
function polygon(g,pts,height,mat,base=0){const shape=new THREE.Shape();pts.forEach(([x,z],i)=>i?shape.lineTo(x,-z):shape.moveTo(x,-z));shape.closePath();const geo=new THREE.ExtrudeGeometry(shape,{depth:height,bevelEnabled:false});geo.rotateX(-Math.PI/2);return mesh(g,geo,mat,0,base,0);}
function line(g,pts,width,mat,heightFn){for(let i=1;i<pts.length;i++){const a=pts[i-1],b=pts[i];const len=Math.hypot(b[0]-a[0],b[1]-a[1]);if(!len)continue;let m=box(g,len,.06,width,(a[0]+b[0])/2,heightFn((a[0]+b[0])/2,(a[1]+b[1])/2)+.05,(a[1]+b[1])/2,mat);m.rotation.y=-Math.atan2(b[1]-a[1],b[0]-a[0]);}}
function terrain(g,paths,heightFn,mat,width=48,depth=52){const ss=segments(paths);const geo=new THREE.PlaneGeometry(width,depth,240,260);geo.rotateX(-Math.PI/2);const p=geo.attributes.position;for(let i=0;i<p.count;i++){let x=p.getX(i),z=p.getZ(i),d=Infinity;for(const s of ss)d=Math.min(d,dist(x,z,s[0],s[1]));const cut=d<.32?.7:d<.49?.7*(.49-d)/.17:0;p.setY(i,heightFn(x,z)-cut);}geo.computeVertexNormals();mesh(g,geo,mat).castShadow=false;box(g,width,.8,depth,0,.3,0,material('cutearth',0x665746));
// Simple stone lining follows only the traced centerlines; the courses are illustrative.
const transforms=[];const dummy=new THREE.Object3D();for(const [a,b] of ss){const len=Math.hypot(b[0]-a[0],b[1]-a[1]);if(!len)continue;const nx=-(b[1]-a[1])/len,nz=(b[0]-a[0])/len;for(let t=.2;t<len;t+=.52){const x=a[0]+(b[0]-a[0])*t/len,z=a[1]+(b[1]-a[1])*t/len;for(const side of [-1,1]){dummy.position.set(x+nx*.43*side,heightFn(x,z)-.15,z+nz*.43*side);dummy.rotation.set(0,-Math.atan2(b[1]-a[1],b[0]-a[0]),0);dummy.updateMatrix();transforms.push(dummy.matrix.clone());}}}
const lining=new THREE.InstancedMesh(new THREE.BoxGeometry(.48,.38,.17),stone,transforms.length);transforms.forEach((m,i)=>lining.setMatrixAt(i,m));lining.receiveShadow=true;lining.castShadow=true;g.add(lining);}
function label(text,x,z,heightFn){return {text,point:new THREE.Vector3(x,heightFn(x,z)+1.2,z)};}
function buildHistoric(){const g=groups['1967']=new THREE.Group();scene.add(g);const paths=historicPaths.map(p=>p.points.map(hp));terrain(g,paths,historicHeight,earth);
for(const [px,py] of historicBunkers){const [x,z]=hp([px,py]);box(g,.75,.48,.65,x,historicHeight(x,z)-.01,z,stone);box(g,.49,.15,.06,x,historicHeight(x,z)+.02,z+.34,dark);}
for(const b of historicBuildings){const [x,z]=hp([b.x,b.y]),w=b.w/10,d=b.d/10;box(g,w,.9,d,x,historicHeight(x,z)+.3,z,stone);if(b.name==='Barracks'){const r=new THREE.CylinderGeometry(d/2,d/2,w,24,1,false,0,Math.PI);const m=mesh(g,r,roof,x,historicHeight(x,z)+.78,z);m.rotation.z=Math.PI/2;}else box(g,w+.08,.12,d+.08,x,historicHeight(x,z)+.82,z,roof);}
const [bx,bz]=hp([196,208]);box(g,1.05,.52,1.1,bx,historicHeight(bx,bz)+.03,bz,concrete);
const [wx,wz]=hp([285,288]);for(const dx of [-.35,.35])for(const dz of [-.35,.35])box(g,.1,1.6,.1,wx+dx,historicHeight(wx,wz)+.8,wz+dz,concrete);mesh(g,new THREE.CylinderGeometry(.6,.6,.7,24),concrete,wx,historicHeight(wx,wz)+1.95,wz);
labelSets['1967']=[label('WESTERN TRENCH',-10,9,historicHeight),label('EASTERN TRENCH',17,0,historicHeight),label('CENTRAL TRENCH',7,10,historicHeight),label('GREAT BUNKER',bx-2,bz-1,historicHeight),label('N',0,-25,historicHeight)];anchors['1967']=new THREE.Vector3(-6.7,historicHeight(-6.7,-.5)+.3,-.5);}

function buildModern(){const g=groups.today=new THREE.Group();scene.add(g);g.visible=false;
// This preserves only an interpreted western route. It is deliberately not a
// claim of a surveyed survival boundary or an intact historical eastern trench.
const west=[[-10,6],[-7,3],[-6,0],[-5,-3],[-4,-5],[-2,-7],[0,-9],[2,-11],[5,-13],[8,-13],[10,-12],[12,-10]];
terrain(g,[west],modernHeight,material('modernGround',0x7f8b70));
for(const f of currentGeometry){const t=f.tags,pts=f.points;if(pts.some(([x,z])=>Math.abs(x)>24||Math.abs(z)>26))continue;
if(t.building){const cx=pts.reduce((a,p)=>a+p[0],0)/pts.length,cz=pts.reduce((a,p)=>a+p[1],0)/pts.length;const y=modernHeight(cx,cz);const h=f.id==='280268884'?1.15:1.0;polygon(g,pts,h,concrete,y-.15);polygon(g,pts,.09,roof,y+h-.15);
// Three broad curved shells approximate the documented museum roof form.
if(f.id==='280268884'){for(let i=0;i<3;i++){const m=mesh(g,new THREE.CylinderGeometry(.83,.83,2.0,24,1,true,0,Math.PI),concrete,cx-.8+i*.62,y+1.02,cz-1.6+i*1.5);m.rotation.z=Math.PI/2;m.rotation.y=-.18;}}
}else if(t.highway==='footway'||t.highway==='path'||t.highway==='pedestrian'){line(g,pts,.22,pathMaterial,modernHeight);}else if(t.highway==='service'||t.highway==='tertiary'){line(g,pts,t.highway==='tertiary'?1.0:.6,material('roads',0x566361),modernHeight);}else if(t.historic==='battlefield'){line(g,pts,.13,material('boundary',0xb4ad82),modernHeight);}}
labelSets.today=[label('MUSEUM · ROOF FORM APPROXIMATE',5,-3,modernHeight),label('SURVIVING WESTERN TRENCH · APPROX.',-6,-8,modernHeight),label('MODERN SITE OUTLINE',-10,14,modernHeight),label('N',0,-25,modernHeight)];anchors.today=new THREE.Vector3(-5.8,modernHeight(-5.8,-1)+.3,-1);
}

function reset(){camera.position.set(42,52,67);controls.target.set(0,0,0);controls.update();}
function resize(){camera.aspect=host.clientWidth/host.clientHeight;camera.updateProjectionMatrix();renderer.setSize(host.clientWidth,host.clientHeight);}
function switchEra(next){era=next;Object.entries(groups).forEach(([key,g])=>g.visible=key===era);$('#era1967').setAttribute('aria-pressed',era==='1967');$('#eraToday').setAttribute('aria-pressed',era==='today');const h=era==='1967';$('#eraCaption').textContent=h?'THE BATTLEFIELD · 1967':'THE MEMORIAL · PARTIAL MODEL';$('#eraTitle').textContent=h?'Before the memorial':'A place of remembrance';$('#eraDescription').textContent=h?'Follow the western, central and eastern trenches of the Jordanian outpost. The main routes are traced from the historical battle map.':'Explore mapped building footprints and paths. The western trench largely survives; much of the eastern trench was covered.';$('#accuracyText').textContent=h?'Trench layout follows a published diagram. Heights, widths and building forms are estimates.':'Mapped footprints with estimated heights. Surviving trench alignment is approximate; current details are incomplete.';$('#modeStatus').textContent=h?'Historical plan · Hand-traced layout':'Modern map data · Partial reconstruction';$('#mapCredit').textContent=h?'Trench plan: Ammunition Hill museum / Wikimedia · CC BY-SA 2.5':'Map data © OpenStreetMap contributors · ODbL';$('#mapButton').hidden=!h;createLabels();closeStory();}
function createLabels(){$('#labels').replaceChildren();for(const l of labelSets[era]){l.el=document.createElement('span');l.el.className='model-label';l.el.textContent=l.text;$('#labels').append(l.el);}}
let pinned=false,hoverTimer;const portrait=$('#portrait'),story=$('#story'),marker=$('#marker');
function openStory(){clearTimeout(hoverTimer);story.hidden=false;portrait.setAttribute('aria-expanded','true');}
function closeStory(){clearTimeout(hoverTimer);story.hidden=true;pinned=false;portrait.setAttribute('aria-expanded','false');}
function leaveStory(){if(!pinned)hoverTimer=setTimeout(()=>{if(!story.matches(':hover')&&!marker.matches(':hover'))closeStory();},500);}
marker.addEventListener('mouseenter',openStory);marker.addEventListener('mouseleave',leaveStory);story.addEventListener('mouseenter',()=>clearTimeout(hoverTimer));story.addEventListener('mouseleave',leaveStory);portrait.addEventListener('focus',openStory);portrait.addEventListener('click',()=>{if(pinned)closeStory();else{pinned=true;openStory();}});$('#close').onclick=closeStory;document.addEventListener('keydown',e=>{if(e.key==='Escape')closeStory();});document.addEventListener('focusin',e=>{if(!marker.contains(e.target)&&!story.contains(e.target)&&!pinned)closeStory();});
for(const [button,dialog] of [['#sourcesButton','#sourcesDialog'],['#mapButton','#mapDialog']]){$(button).onclick=()=>{closeStory();$(dialog).showModal();};$(dialog).querySelector('.dialog-close').onclick=()=>$(dialog).close();$(dialog).addEventListener('click',e=>{if(e.target===$(dialog)){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();}});}
try{scene=new THREE.Scene();camera=new THREE.PerspectiveCamera(40,1,.1,220);renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.setClearColor(0,0);host.appendChild(renderer.domElement);controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.enablePan=true;controls.minDistance=18;controls.maxDistance=125;controls.maxPolarAngle=Math.PI*.47;controls.minPolarAngle=.02;
scene.add(new THREE.HemisphereLight(0xd2e6e9,0x4a4636,2.3));const sun=new THREE.DirectionalLight(0xffe4b5,2.7);sun.position.set(-25,45,25);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-40,right:40,top:40,bottom:-40,near:.1,far:130});sun.shadow.normalBias=.045;scene.add(sun);buildHistoric();buildModern();resize();reset();createLabels();$('#loading').hidden=true;
$('#era1967').onclick=()=>switchEra('1967');$('#eraToday').onclick=()=>switchEra('today');$('#reset').onclick=reset;$('#top').onclick=()=>{camera.position.set(0,80,.1);controls.target.set(0,0,0);controls.update();};function zoom(f){const v=camera.position.clone().sub(controls.target);v.setLength(THREE.MathUtils.clamp(v.length()*f,controls.minDistance,controls.maxDistance));camera.position.copy(controls.target).add(v);}$('#zoomIn').onclick=()=>zoom(.8);$('#zoomOut').onclick=()=>zoom(1.25);$('#labelsButton').onclick=()=>{labelsVisible=!labelsVisible;$('#labelsButton').setAttribute('aria-pressed',labelsVisible);$('#labels').hidden=!labelsVisible;};window.addEventListener('resize',resize);
const p=new THREE.Vector3();function place(el,point){p.copy(point).project(camera);el.style.left=(host.offsetLeft+(p.x*.5+.5)*host.clientWidth)+'px';el.style.top=(host.offsetTop+(-p.y*.5+.5)*host.clientHeight)+'px';el.style.visibility=Math.abs(p.x)>1||Math.abs(p.y)>1||p.z>1?'hidden':'visible';}
function animate(){requestAnimationFrame(animate);controls.update();renderer.render(scene,camera);place(marker,anchors[era]);for(const l of labelSets[era])place(l.el,l.point);}animate();
renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();$('#loading').hidden=false;$('#loading').textContent='The 3D view paused. Reload the page to restore it.';});
}catch(e){$('#loading').textContent='The 3D view could not start. Please use a browser with WebGL enabled.';console.error(e);}
