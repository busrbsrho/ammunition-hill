// Original bilingual paraphrases. Family recollections are attributed to their
// published interviews; none of the song's lyrics are reproduced here.
export const eitanSources = [
  {
    id: 'eitan-wikipedia', url: 'https://he.wikipedia.org/wiki/איתן_נאוה',
    title: {en: 'Eitan Naveh · Hebrew Wikipedia', he: 'איתן נאוה · ויקיפדיה העברית'},
    kind: {en: 'Biographical overview', he: 'סקירה ביוגרפית'}
  },
  {
    id: 'eitan-izkor', url: 'https://www.izkor.gov.il/איתן%20נאוֶה/en_6f1ae28db9cce8f51c79819b05be3215',
    title: {en: 'Ministry of Defense · official memorial and award citation', he: 'משרד הביטחון · יזכור ותעודת עיטור הגבורה'},
    kind: {en: 'Official record', he: 'תיעוד רשמי'}
  },
  {
    id: 'eitan-commendation', url: 'https://www.gvura.org/a346626-סיפורו-של-איתור-ציון-לשבח-נשכח',
    title: {en: 'Ofer Drori · Recovering a forgotten commendation', he: 'עפר דרורי · סיפורו של איתור ציון לשבח נשכח'},
    kind: {en: 'Archival research account', he: 'תיאור מחקר ארכיוני'}
  },
  {
    id: 'eitan-rina', url: 'https://www.yediot.co.il/articles/0,7340,L-5504574,00.html',
    title: {en: 'Yediot Aharonot · Rina Sela remembers her brother, 2019', he: 'ידיעות אחרונות · רינה סלע זוכרת את אחיה, 2019'},
    kind: {en: 'Published family interview', he: 'ראיון משפחתי שפורסם בעיתונות'}
  },
  {
    id: 'eitan-doron-idf', url: 'https://www.idf.il/97987',
    title: {en: 'IDF · Doron Naveh on his father and the song, 2020', he: 'אתר צה״ל · דורון נאוה על אביו ועל השיר, 2020'},
    kind: {en: 'Published family interview', he: 'ראיון משפחתי שפורסם באתר צה״ל'}
  },
  {
    id: 'eitan-doron-2021', url: 'https://www.israelhayom.co.il/magazine/hashavua/article/542865',
    title: {en: 'Israel Hayom · Returning with the children of the fallen, 2021', he: 'ישראל היום · בחזרה לגבעה עם ילדי הנופלים, 2021'},
    kind: {en: 'Published family interview', he: 'ראיון משפחתי שפורסם בעיתונות'}
  }
];

export const eitanBiography = {
  en: {
    eyebrow: 'A life remembered',
    name: 'Eitan Naveh',
    subtitle: '1 June 1944 – 6 June 1967 · Moledet · Reserve paratrooper',
    intro: 'Eitan’s story begins in the fields of Moledet and continues through his family’s memories, his military service and his final action on Ammunition Hill.',
    sections: [
      {
        title: 'Home in Moledet',
        body: 'Eitan was born in Moledet to Walter and Clara Naveh, immigrants from Germany who worked in agriculture. He attended the local primary school and helped with farm work. Machinery especially interested him, and he became skilled with tractors and other motorized equipment.',
        sourceIds: ['eitan-wikipedia']
      },
      {
        title: 'Service and a new family',
        body: 'He enlisted in February 1962 and volunteered for the paratroopers. A leg operation ended his parachuting, and he transferred to the Almagor Nahal outpost. There he met his future wife. After service he returned to Moledet, where they raised their son.',
        sourceIds: ['eitan-wikipedia']
      },
      {
        title: 'An earlier act of service',
        body: 'A lesser-known commendation recognized his part in fighting a field fire during his service at Almagor. Researcher Ofer Drori later traced a reference in an old memorial film through local archives and recovered the certificate. It named Eitan alongside six fellow servicemen and women. This earlier episode adds another part of his life to the better-known battlefield story.',
        sourceIds: ['eitan-commendation']
      },
      {
        title: 'His final action',
        body: 'On 6 June 1967, he left the trench, covering his comrades from exposed ground until he was killed. His Medal of Valor was awarded posthumously in 1973.',
        sourceIds: ['eitan-izkor']
      },
      {
        title: 'His sister’s memories',
        body: 'He left his wife, Shalva, and their infant son, Doron. In a 2019 interview, his sister Rina Sela recalled their close bond and described an industrious, ambitious and daring brother. She was seventeen when he died. Decades later, she said his absence remained part of daily life. Running and cycling in his memory connected the family with the agricultural landscapes he had loved; she imagined that he would have welcomed this active form of remembrance.',
        sourceIds: ['eitan-rina']
      },
      {
        title: 'A son grows up with the story',
        body: 'Doron told an IDF interviewer in 2020 that he grew up knowing his father through other people’s stories. Hearing “Ammunition Hill” on the radio brought silence to the family car: public remembrance also meant hearing his father’s last moments described again. He expressed both pride and pain. Becoming a father helped him share the memory with his own children. Family visits to the hill and his work with the memorial became ways to carry it forward.',
        sourceIds: ['eitan-doron-idf']
      },
      {
        title: 'Returning to the hill',
        body: 'In a 2021 interview, Doron described walking the route associated with his father whenever he visited. He also explained that quietly returning with his children could transmit memory without grand declarations. For him, Jerusalem Day carried the weight of a personal memorial day. His account reminds visitors that a nationally remembered battle remains an intimate family loss, and that the place holds grief alongside pride for those who return to it.',
        sourceIds: ['eitan-doron-2021']
      }
    ],
    sourcesHeading: 'Sources and family accounts'
  },
  he: {
    eyebrow: 'זוכרים את חייו',
    name: 'איתן נאוה',
    subtitle: '1 ביוני 1944 – 6 ביוני 1967 · מולדת · צנחן במילואים',
    intro: 'סיפורו של איתן מתחיל בשדות מולדת, ונמשך בזיכרונות משפחתו, בשירותו הצבאי ובפעולתו האחרונה בגבעת התחמושת.',
    sections: [
      {
        title: 'הבית במולדת',
        body: 'איתן נולד במולדת לוולטר ולקלרה נאוה, יוצאי גרמניה שעסקו בחקלאות. הוא למד בבית הספר היסודי במושב ועזר בעבודות המשק. הכלים הממונעים עניינו אותו במיוחד, והוא רכש מיומנות בעבודה בטרקטורים ובציוד חקלאי.',
        sourceIds: ['eitan-wikipedia']
      },
      {
        title: 'השירות והקמת המשפחה',
        body: 'בפברואר 1962 התגייס והתנדב לצנחנים. בעקבות ניתוח ברגלו נאסרה עליו הצניחה, והוא עבר להיאחזות הנח״ל אלמגור. שם הכיר את אשתו לעתיד. לאחר שירותו חזר למולדת, שם הקימו את ביתם וגידלו את בנם.',
        sourceIds: ['eitan-wikipedia']
      },
      {
        title: 'צל״ש שקדם לקרב',
        body: 'צל״ש מוכר פחות הוענק לו על חלקו בכיבוי שרפת שדות בתקופת שירותו באלמגור. החוקר עפר דרורי מצא אזכור לכך בסרט זיכרון ישן, ובעזרת ארכיונים מקומיים איתר את התעודה. לצד איתן הופיעו בה עוד שישה חיילים וחיילות. הפרשה הזאת מוסיפה לתיאור חייו מעשה נוסף, שקדם לסיפור הקרב המוכר.',
        sourceIds: ['eitan-commendation']
      },
      {
        title: 'פעולתו האחרונה',
        body: 'ב־6 ביוני 1967 יצא מהתעלה וחיפה על חבריו מן השטח החשוף, עד שנהרג. בשנת 1973 הוענק לו לאחר מותו עיטור הגבורה.',
        sourceIds: ['eitan-izkor']
      },
      {
        title: 'הזיכרונות של אחותו',
        body: 'איתן הותיר אחריו את אשתו שלוה ואת בנם התינוק דורון. בראיון מ־2019 סיפרה אחותו רינה סלע על הקרבה ביניהם ותיארה אח חרוץ, שאפתן ונועז. היא הייתה בת שבע־עשרה כשנפל. גם עשרות שנים לאחר מכן, לדבריה, חסרונו ליווה אותה מדי יום. ריצה ורכיבה לזכרו חיברו את המשפחה לנופים החקלאיים שאהב; היא דמיינה שהיה שמח בדרך הפעילה הזאת להנצחתו.',
        sourceIds: ['eitan-rina']
      },
      {
        title: 'בן שגדל עם הסיפור',
        body: 'בראיון לאתר צה״ל ב־2020 סיפר דורון כי הכיר את אביו דרך סיפוריהם של אחרים. כאשר השיר ״גבעת התחמושת״ נשמע ברדיו, השתררה דממה במכונית המשפחתית: ההנצחה הציבורית השמיעה שוב גם את רגעיו האחרונים של אביו. הוא תיאר כאב לצד גאווה. כשהפך לאב, מצא דרך להעביר את הזיכרון לילדיו. הביקורים המשפחתיים בגבעה ופעילותו באתר ההנצחה נעשו חלק מהמשכיות הזיכרון.',
        sourceIds: ['eitan-doron-idf']
      },
      {
        title: 'לחזור אל הגבעה',
        body: 'בראיון מ־2021 תיאר דורון כיצד הוא הולך במסלול המזוהה עם אביו בכל ביקור בגבעה. הוא הסביר שגם ביקורים שקטים עם ילדיו מעבירים את הזיכרון, בלי הצהרות גדולות. עבורו, יום ירושלים נושא משמעות של יום זיכרון אישי. עדותו מזכירה כי קרב שנחרת בזיכרון הלאומי נשאר גם אובדן משפחתי עמוק, וכי המקום מחזיק כאב לצד גאווה עבור השבים אליו.',
        sourceIds: ['eitan-doron-2021']
      }
    ],
    sourcesHeading: 'מקורות ועדויות משפחתיות'
  }
};
