import * as THREE from 'three';
import {hp,historicPaths} from './historical-geometry.js';
import {landmarks,sources} from './landmarks.js';
import {battlePhases,battleSources,battleNote} from './battle-data.js';
import {createPlayback} from './playback.js';

// Screen markers and animation follow the source diagram. Neither unit tokens
// nor their animation speed represent measured positions, strength or time.
export function createExplorer({group,camera,canvas,height,place,closeStory}) {
  const $=s=>document.querySelector(s);
  const layer=$('#hotspots'), card=$('#landmarkCard'), unitLayer=$('#unitLabels');
  let active=true, markersVisible=true, pinned=false, selected=null, closeTimer, pointerDown=false;
  const allSources={...sources,...battleSources};
  function sourceLinks(node,ids){node.replaceChildren();for(const id of ids||[]){const s=allSources[id];if(!s)continue;const a=document.createElement('a');a.href=s.url;a.target='_blank';a.rel='noopener';a.textContent=s.title+' ↗';node.append(a);}}
  const markers=landmarks.map((item,i)=>{
    const [x,z]=hp(item.point), point=new THREE.Vector3(x,height(x,z)+1,z);
    const button=document.createElement('button');button.className='hotspot';button.textContent=i+1;button.setAttribute('aria-label',item.title);button.setAttribute('aria-controls','landmarkCard');button.setAttribute('aria-expanded','false');button.title=item.title;layer.append(button);
    const entry=document.createElement('button');entry.className='landmark-entry';entry.innerHTML='<span></span><b></b>';entry.firstChild.textContent=String(i+1).padStart(2,'0');entry.lastChild.textContent=item.title;entry.setAttribute('aria-controls','landmarkCard');entry.setAttribute('aria-expanded','false');$('#landmarkList').append(entry);
    for(const trigger of [button,entry]){trigger.addEventListener('pointerenter',e=>{if(e.pointerType!=='touch')open(item,false);});trigger.addEventListener('pointerleave',scheduleClose);trigger.addEventListener('focus',()=>open(item,false));trigger.addEventListener('click',()=>open(item,true));}
    return {item,point,button,entry};
  });
  function open(item,pin){if(!active||pointerDown)return;if(pinned&&!pin&&selected!==item.id)return;clearTimeout(closeTimer);closeStory();selected=item.id;pinned=pin||pinned;card.hidden=false;$('#landmarkCategory').textContent=item.category;$('#landmarkTitle').textContent=item.title;$('#landmarkSummary').textContent=item.summary;$('#landmarkDetail').textContent=item.detail||'';$('#landmarkConfidence').textContent=item.confidence;sourceLinks($('#landmarkSources'),item.sourceIds);for(const m of markers){const match=m.item.id===selected;m.button.classList.toggle('selected',match);m.button.setAttribute('aria-expanded',String(match));m.entry.setAttribute('aria-expanded',String(match));}}
  function close(){clearTimeout(closeTimer);card.hidden=true;pinned=false;selected=null;for(const m of markers){m.button.classList.remove('selected');m.button.setAttribute('aria-expanded','false');m.entry.setAttribute('aria-expanded','false');}}
  function scheduleClose(){if(!pinned){clearTimeout(closeTimer);closeTimer=setTimeout(()=>{if(!card.matches(':hover')&&!card.contains(document.activeElement))close();},350);}}
  card.addEventListener('pointerenter',()=>clearTimeout(closeTimer));card.addEventListener('pointerleave',scheduleClose);$('#closeLandmark').onclick=()=>{const trigger=markers.find(m=>m.item.id===selected)?.button;close();trigger?.focus();close();};
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
  document.addEventListener('focusin',e=>{if(!layer.contains(e.target)&&!$('#landmarkList').contains(e.target)&&!card.contains(e.target)&&!pinned)close();});
  $('#portrait').addEventListener('focus',close);$('#portrait').addEventListener('click',close);
  $('#hotspotsButton').onclick=()=>{markersVisible=!markersVisible;layer.hidden=!markersVisible;$('#hotspotsButton').setAttribute('aria-pressed',String(markersVisible));close();};

  // Transparent hit surfaces let readers point directly at buildings and routes.
  const pickers=[], ray=new THREE.Raycaster(), pointer=new THREE.Vector2();
  const pickMaterial=new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false});
  const pathIds=['western-trench','eastern-trench','central-trench','police-school-approach'];
  historicPaths.slice(0,4).forEach((path,i)=>{for(let n=1;n<path.points.length;n++){const a=hp(path.points[n-1]),b=hp(path.points[n]);const x=(a[0]+b[0])/2,z=(a[1]+b[1])/2;const p=new THREE.Mesh(new THREE.BoxGeometry(Math.hypot(b[0]-a[0],b[1]-a[1]),.55,.95),pickMaterial);p.position.set(x,height(x,z),z);p.rotation.y=-Math.atan2(b[1]-a[1],b[0]-a[0]);p.userData.id=pathIds[i];group.add(p);pickers.push(p);}});
  for(const m of markers.filter(m=>m.item.category==='building'||['great-bunker','water-tower','barracks','television-house','ammunition-bunker'].includes(m.item.id))){const p=new THREE.Mesh(new THREE.SphereGeometry(.85,8,6),pickMaterial);p.position.copy(m.point);p.position.y-=.5;p.userData.id=m.item.id;group.add(p);pickers.push(p);}
  canvas.addEventListener('pointerdown',()=>{pointerDown=true;});window.addEventListener('pointerup',()=>{pointerDown=false;});window.addEventListener('pointercancel',()=>{pointerDown=false;});
  canvas.addEventListener('pointermove',e=>{if(!active||pointerDown||e.pointerType==='touch'||pinned)return;const r=canvas.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,1-(e.clientY-r.top)/r.height*2);ray.setFromCamera(pointer,camera);const hit=ray.intersectObjects(pickers,false)[0];const item=hit&&landmarks.find(l=>l.id===hit.object.userData.id);canvas.style.cursor=item?'help':'';if(item)open(item,false);else scheduleClose();});canvas.addEventListener('pointerleave',scheduleClose);

  const movement=new THREE.Group();group.add(movement);let tracks=[],currentIndex=-1,speed=1;
  function vector(pixel,lift=.5){const [x,z]=hp(pixel);return new THREE.Vector3(x,height(x,z)+lift,z);}
  function clearMovement(){movement.traverse(o=>{o.geometry?.dispose();if(o.material)o.material.dispose();});movement.clear();unitLayer.replaceChildren();tracks=[];}
  function rebuild(phase){clearMovement();for(const t of phase.tracks||[]){const pts=t.route.map(p=>vector(p)),color=t.side==='jordanian'?0xe7ae71:0x82cfe2;
    if(pts.length>1){const geo=new THREE.BufferGeometry().setFromPoints(pts);const path=new THREE.Line(geo,new THREE.LineDashedMaterial({color,transparent:true,opacity:.7,dashSize:.35,gapSize:.2}));path.computeLineDistances();movement.add(path);}
    const token=new THREE.Mesh(new THREE.CylinderGeometry(.36,.36,.2,t.side==='jordanian'?4:24),new THREE.MeshBasicMaterial({color}));movement.add(token);
    const label=document.createElement('span');label.className='unit-label '+t.side;label.textContent=t.label.replace('Jordanian defenders','Jordanian');unitLayer.append(label);
    const lengths=[0];for(let i=1;i<pts.length;i++)lengths.push(lengths[i-1]+pts[i].distanceTo(pts[i-1]));tracks.push({pts,lengths,token,label});
  }}
  function positionTrack(t,progress){if(t.pts.length===1)return t.pts[0];const distance=t.lengths.at(-1)*progress;let i=1;while(i<t.lengths.length-1&&distance>t.lengths[i])i++;return t.pts[i-1].clone().lerp(t.pts[i],(distance-t.lengths[i-1])/(t.lengths[i]-t.lengths[i-1]||1));}
  for(const [i,phase] of battlePhases.entries()){const option=document.createElement('option');option.value=i;option.textContent=String(i+1).padStart(2,'0')+' · '+phase.title;$('#phaseSelect').append(option);const button=document.createElement('button');button.className='phase-dot';button.setAttribute('aria-label','Phase '+(i+1)+': '+phase.title);button.title=phase.title;button.textContent=i+1;button.onclick=()=>playback.seek(i);$('#phaseSteps').append(button);}
  function render(state){const phase=battlePhases[state.index];if(currentIndex!==state.index){currentIndex=state.index;$('#phaseTitle').textContent=phase.title;$('#phaseTime').textContent=phase.time;$('#phaseSummary').textContent=phase.summary;$('#phaseDetail').textContent=phase.detail||'';$('#phaseSelect').value=state.index;$('#phaseProgress').textContent='PHASE '+(state.index+1)+' / '+battlePhases.length;sourceLinks($('#phaseSources'),phase.sourceIds);rebuild(phase);[...$('#phaseSteps').children].forEach((b,i)=>{b.setAttribute('aria-current',i===state.index?'step':'false');b.classList.toggle('complete',i<state.index);});}
    $('#playBattle').textContent=state.playing?'Ⅱ Pause':state.ended?'↻ Replay':'▶ Play';$('#playBattle').setAttribute('aria-label',state.playing?'Pause battle replay':state.ended?'Replay battle':'Play battle replay');$('#previousPhase').disabled=state.index===0;$('#nextPhase').disabled=state.index===battlePhases.length-1;$('#playStatus').textContent=state.ended?'Complete':state.playing?'Playing':'Paused';$('#phaseBar').style.width=(state.progress*100)+'%';
    for(const t of tracks)t.token.position.copy(positionTrack(t,state.progress));
  }
  const playback=createPlayback({count:battlePhases.length,duration:9000,onChange:render});render(playback.snapshot());
  $('#playBattle').onclick=()=>{close();playback.snapshot().playing?playback.pause():playback.play();};$('#stopBattle').onclick=()=>playback.stop();$('#previousPhase').onclick=()=>playback.previous();$('#nextPhase').onclick=()=>playback.next();$('#phaseSelect').onchange=e=>playback.seek(Number(e.target.value));$('#replaySpeed').onchange=e=>speed=Number(e.target.value);
  $('#battleNote').textContent=battleNote;
  document.addEventListener('visibilitychange',()=>{if(document.hidden)playback.pause();});
  for(const [id,s] of Object.entries(allSources)){const p=document.createElement('p'),a=document.createElement('a');a.href=s.url;a.target='_blank';a.rel='noopener';a.textContent=s.title+' ↗';p.append(a);$('#researchSources').append(p);}
  return {update(delta){if(active)playback.tick(Math.min(delta,100)*speed);for(const m of markers)place(m.button,m.point);if(active)for(const t of tracks)place(t.label,t.token.position);},setEra(historical){active=historical;if(!active)playback.pause();layer.hidden=!active||!markersVisible;unitLayer.hidden=!active;$('#battlePanel').hidden=!active;$('#landmarkBrowser').hidden=!active;$('#hotspotsButton').hidden=!active;close();},close};
}
