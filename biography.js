import {eitanBiography,eitanSources} from './eitan-data.js';
import {language,t,onLanguageChange} from './i18n.js';

export function initBiography({onOpen,onReturn,onFollow}){
  const $=s=>document.querySelector(s);let opened=false,returnScroll=0,returnFocus=null;
  function render(){const lang=language(),data=eitanBiography[lang];
    $('#biographyEyebrow').textContent=data.eyebrow;$('#biographyTitle').textContent=data.name;
    $('#biographySubtitle').textContent=data.subtitle;$('#biographyIntro').textContent=data.intro;
    $('#biographySections').replaceChildren();
    for(const section of data.sections){const el=document.createElement('section'),title=document.createElement('h2'),body=document.createElement('p'),refs=document.createElement('div');title.textContent=section.title;body.textContent=section.body;refs.className='biography-references';
      for(const id of section.sourceIds||[]){const source=eitanSources.find(s=>s.id===id);if(!source)continue;const a=document.createElement('a');a.href=source.url;a.target='_blank';a.rel='noopener';a.textContent=source.title[lang]+' ↗';refs.append(a);}
      el.append(title,body,refs);$('#biographySections').append(el);
    }
    $('#biographySourcesHeading').textContent=data.sourcesHeading;$('#biographySources').replaceChildren();
    for(const source of eitanSources){const a=document.createElement('a'),title=document.createElement('b'),kind=document.createElement('span');a.href=source.url;a.target='_blank';a.rel='noopener';title.textContent=source.title[lang]+' ↗';kind.textContent=source.kind[lang];a.append(title,kind);$('#biographySources').append(a);}
    if(opened)document.title=data.name+' · '+t('Eitan’s story');
  }
  function route(){const next=location.hash==='#eitan';
    if(next&&!opened){returnScroll=scrollY;returnFocus=document.activeElement;opened=true;onOpen();$('#mapPage').hidden=true;$('#biographyPage').hidden=false;document.body.classList.add('bio-view');render();window.scrollTo(0,0);$('#biographyTitle').focus({preventScroll:true});}
    else if(!next&&opened){opened=false;$('#mapPage').hidden=false;$('#biographyPage').hidden=true;document.body.classList.remove('bio-view');document.title=language()==='he'?'גבעת התחמושת — אז והיום':'Ammunition Hill — Then & Now';onReturn();window.scrollTo(0,returnScroll);if(returnFocus?.isConnected)returnFocus.focus({preventScroll:true});}
    if(location.hash==='#eitan-action'){onFollow();$('#battlePanel').scrollIntoView({block:'center',behavior:'instant'});}
  }
  onLanguageChange(render);window.addEventListener('hashchange',route);render();route();
  return {isOpen:()=>opened};
}
