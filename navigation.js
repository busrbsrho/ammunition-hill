import {initBiography} from './biography.js';
import {people,portraitSource} from './people.js';
import {language,t,onLanguageChange} from './i18n.js';

// One router owns visibility, titles and return context across all five views.
// Native hash links keep the same navigation working in the offline edition.
export function initNavigation({onLeaveMap,onMap,onFollow}){
  const $=s=>document.querySelector(s);
  const pages={home:$('#homePage'),soldiers:$('#soldiersPage'),guide:$('#guidePage'),map:$('#mapPage'),biography:$('#biographyPage')};
  const headings={home:'#homeTitle',soldiers:'#soldiersTitle',guide:'#guideTitle',map:'#eraTitle',biography:'#biographyTitle'};
  const biography=initBiography({managed:true});
  let current=null,currentKey=null,returnPage='soldiers',returnScroll=0,returnFocus=null;

  function renderCards(){const lang=language();$('#soldierCards').replaceChildren();
    for(const [id,person] of Object.entries(people)){
      const data=person.biography[lang],card=document.createElement('article'),link=document.createElement('a'),photo=document.createElement('span'),img=document.createElement('img'),copy=document.createElement('div'),name=document.createElement('h2'),sub=document.createElement('p'),body=document.createElement('p'),more=document.createElement('span');
      card.className='front-soldier-card';card.dataset.person=id;link.className='front-soldier-link';link.href='#'+id;
      photo.className='front-soldier-photo';img.src=portraitSource(id);img.alt=data.name;photo.append(img);
      copy.className='front-soldier-copy';name.textContent=data.name;sub.className='front-soldier-subtitle';sub.textContent=data.subtitle;body.textContent=person.summary[lang];more.className='front-soldier-more';more.textContent=t('Read his full story →');
      copy.append(name,sub,body,more);link.append(photo,copy);card.append(link);$('#soldierCards').append(card);
    }
  }
  function title(){if(current==='biography')return;
    const text={home:'Ammunition Hill · Memory and people',soldiers:'The soldiers · Ammunition Hill',guide:'Before you enter · Ammunition Hill',map:'Ammunition Hill — Then & Now'}[current];
    if(text)document.title=t(text);
  }
  function returnLink(){const back=$('#backToMap');back.href='#'+returnPage;back.textContent=t(returnPage==='map'?'Return to the battlefield':'Back to the soldiers');}
  function focusHeading(page){$(headings[page])?.focus({preventScroll:true});}
  function route(){
    const hash=location.hash.slice(1),person=Object.hasOwn(people,hash)?hash:null;
    const actionCandidate=hash.endsWith('-action')?hash.slice(0,-7):null;
    const action=actionCandidate&&Object.hasOwn(people,actionCandidate)?actionCandidate:null;
    const next=person?'biography':action?'map':['home','soldiers','guide','map'].includes(hash)?hash:'home';
    const key=person||action&&hash||next;
    if(key===currentKey)return;
    const previous=current;
    if(person&&previous!=='biography'){
      returnPage=previous==='map'?'map':'soldiers';returnScroll=previous?scrollY:0;returnFocus=previous?document.activeElement:null;
    }
    if(next!=='map')onLeaveMap();
    if(next!=='biography')biography.hide();
    for(const [name,page] of Object.entries(pages))page.hidden=name!==next;
    document.body.classList.toggle('bio-view',next==='biography');
    current=next;currentKey=key;
    if(person){biography.show(person);returnLink();}
    else title();
    if(next==='map'){onMap({fromGuide:previous==='guide'});if(action)onFollow(action);}
    if(previous==='biography'&&next===returnPage&&!action){
      window.scrollTo(0,returnScroll);
      if(returnFocus?.isConnected)returnFocus.focus({preventScroll:true});else focusHeading(next);
    }else{
      window.scrollTo(0,0);focusHeading(next);
      if(action)$('#battlePanel').scrollIntoView({block:'center',behavior:'instant'});
    }
  }
  renderCards();onLanguageChange(()=>{renderCards();returnLink();title();});
  window.addEventListener('hashchange',route);route();
  return {page:()=>current};
}
