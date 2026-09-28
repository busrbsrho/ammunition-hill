import {eitanBiography,eitanSources} from './eitan-data.js';
import {yakiBiography,yakiSources} from './yaki-data.js';

// Portraits resolve from HTML so the offline edition embeds the same assets.
export const people = {
  eitan: {
    biography:eitanBiography, sources:eitanSources, photoId:'eitanPhoto',
    photoCredit:{en:'Photograph: Ministry of Defense / Izkor. Rights remain with the source.',he:'תצלום: משרד הביטחון / יזכור. הזכויות שמורות למקור.'},
    photoUrl:eitanSources.find(s=>s.id==='eitan-izkor').url,
    follow:{en:'Follow Eitan’s part in the battle',he:'עקבו אחר חלקו של איתן בקרב'},
    summary:{en:'On 6 June 1967, Eitan left the trench and fired from exposed ground to cover his comrades. He was killed during this action, aged 23, and received the Medal of Valor posthumously in 1973.',he:'ב־6 ביוני 1967 יצא איתן מהתעלה וירה מן השטח החשוף כדי לחפות על חבריו. הוא נהרג במהלך הפעולה, בן 23, וב־1973 הוענק לו לאחר מותו עיטור הגבורה.'},
  },
  yaki: {
    biography:yakiBiography, sources:yakiSources, photoId:'yakiPhoto',
    photoCredit:{en:'Yaki Hetz at Ammunition Hill, 7 February 2022. Photo: Tal Eidelman (טל אידלמן), Wikimedia Commons · CC BY-SA 3.0. Original file retained; small portraits use a display crop.',he:'יקי חץ בגבעת התחמושת, 7 בפברואר 2022. צילום: טל אידלמן, ויקישיתוף · CC BY-SA 3.0. הקובץ המקורי נשמר; התמונות הקטנות מוצגות בחיתוך.'},
    photoLicense:'https://creativecommons.org/licenses/by-sa/3.0/',
    photoUrl:'https://commons.wikimedia.org/wiki/File:Yaki_Hetz.jpg',
    follow:{en:'Follow Yaki’s part in the battle',he:'עקבו אחר חלקו של יקי בקרב'},
    summary:{en:'During the attack on the Great Bunker, Yaki carried explosives forward under fire and helped direct their use. He entered after the blast and received the Medal of Courage for his action. He survived the battle.',he:'בקרב על הבונקר הגדול נשא יקי חומר נפץ קדימה תחת אש וסייע בהנחיית הפעלתו. אחרי הפיצוץ נכנס לבונקר. על פעולתו הוענק לו עיטור העוז. הוא שרד את הקרב.'},
  },
};

export function portraitSource(id){return document.getElementById(people[id].photoId).src;}
