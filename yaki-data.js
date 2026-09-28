// Original bilingual paraphrases. Interview memories are attributed to their
// publication; historical dates do not imply a claim about present status.
export const yakiSources = [
  {
    id: 'yaki-wikipedia', url: 'https://he.wikipedia.org/wiki/יעקב_חץ',
    title: {en: 'Yaakov Hetz · Hebrew Wikipedia', he: 'יעקב חץ · ויקיפדיה העברית'},
    kind: {en: 'Biographical overview', he: 'סקירה ביוגרפית'}
  },
  {
    id: 'yaki-idf', url: 'https://www.idf.il/אתרי-יחידות/בעוז-רוחם/מלחמת-ששת-הימים/מלחמת-ששת-הימים-עיטור-העוז/',
    title: {en: 'IDF · Yaki Hetz’s Medal of Courage citation', he: 'אתר צה״ל · תעודת עיטור העוז של יקי חץ'},
    kind: {en: 'Official award record', he: 'תיעוד רשמי של העיטור'}
  },
  {
    id: 'yaki-oral-history', url: 'https://kipur.localtimeline.com/index.php?id=238&option=com_localstory&showAsset=video&showId=330&tmpl=component&view=event&lang=he',
    title: {en: 'Dor Kippur · Yaki and Hani Hetz’s recorded oral history', he: 'דור כיפור · עדות מצולמת בבית יקי וחני חץ'},
    kind: {en: 'Recorded interview and archive summary', he: 'ראיון מצולם ותקציר ארכיוני'}
  },
  {
    id: 'yaki-interview', url: 'https://emeknews.co.il/עומד-בחוד-החנית-לשמירה-על-המורשת/',
    title: {en: 'Emek News · Interview with Yaki Hetz, 2015', he: 'עמקניוז · ראיון עם יקי חץ, 2015'},
    kind: {en: 'Published personal interview', he: 'ראיון אישי שפורסם בעיתונות'}
  },
  {
    id: 'yaki-testimony', url: 'https://www.gvura.org/a347771-הגיבורים-שבחייהם-ובמותם-כתבו-את-גבעת-התחמושת',
    title: {en: 'National Library · Testimonies revisited, 2022 · Gvura reprint', he: 'הספרייה הלאומית · בחזרה לעדויות, 2022 · העתק באתר הגבורה'},
    kind: {en: 'Interview and reproduced 1967 testimony', he: 'ראיון ועדות משנת 1967 המובאת במלואה'}
  }
];

export const yakiBiography = {
  en: {
    eyebrow: 'A soldier’s life beyond the battle',
    name: 'Yaki Hetz',
    subtitle: 'Born 6 February 1946 · Yaakov Haimovitz · Reserve paratrooper',
    intro: 'Yaki survived the fighting at the Great Bunker. His story continues through family, engineering, further military service and decades spent sharing his experience of Ammunition Hill.',
    sections: [
      {
        title: 'From Tel Aviv to the Technion',
        body: 'Born in Tel Aviv, Yaakov Haimovitz, later known as Yaki Hetz, attended Yehuda HaMaccabi primary school and Ironi D high school. After regular military service, he began studying at the Technion. As a reservist in Battalion 66 of Paratroopers Brigade 55, he was called into the fighting in Jerusalem during the Six-Day War.',
        sourceIds: ['yaki-wikipedia']
      },
      {
        title: 'Taking the lead',
        body: 'In a 2015 interview, Yaki recalled taking over a wounded soldier’s bazooka and advancing with platoon commander Yoram Elishiv. After Elishiv was hit, Yaki led the men onward through the trench. He remembered acting despite uncertainty about the directions, until they reached the Great Bunker.',
        sourceIds: ['yaki-interview']
      },
      {
        title: 'The Great Bunker',
        body: 'The official citation records that casualties left him alone beside the fortified position. He fired into it and contacted another group. Together they brought explosives to its entrance; he entered after the blast. His Medal of Courage citation is dated April 1973.',
        sourceIds: ['yaki-idf']
      },
      {
        title: 'What survival carried',
        body: 'A 2022 National Library article returned to the testimony he gave to Bamachane in 1967. In that early account, fear surfaced after the immediate fighting, when he thought about how close he had come to death. In the later interview, he described the battle’s painful aftermath and credited meeting his future wife with helping him rebuild his life.',
        sourceIds: ['yaki-testimony']
      },
      {
        title: 'Family, service and engineering',
        body: 'His recorded oral history traces a life that continued well beyond Jerusalem. Yaki and Hani married in 1969 and raised eight children. He completed mechanical-engineering studies at the Technion and joined Rafael in 1970. After an accelerated officers’ course, he served as a platoon commander in the War of Attrition and again in 1973. Wounded in the arm west of the Suez Canal, he was hospitalized and later returned to his battalion. The interview also describes his subsequent work sharing battle history with officer cadets.',
        sourceIds: ['yaki-oral-history']
      },
      {
        title: 'Passing memory between generations',
        body: 'In 2015, Yaki joined a Brigade 55 relay alongside other veterans. He described running as something his sons had encouraged him to begin. His work with the brigade’s heritage and the Ammunition Hill association connected his personal memories with younger generations.',
        sourceIds: ['yaki-interview']
      }
    ],
    sourcesHeading: 'Biography and testimony sources'
  },
  he: {
    eyebrow: 'חייו של לוחם מעבר לקרב',
    name: 'יקי חץ',
    subtitle: 'נולד ב־6 בפברואר 1946 · יעקב חיימוביץ · צנחן במילואים',
    intro: 'יקי שרד את הלחימה בבונקר הגדול. סיפורו נמשך במשפחה שהקים, בעבודתו כמהנדס, בשירות צבאי נוסף ובשנים שבהן שיתף אחרים בחוויותיו מגבעת התחמושת.',
    sections: [
      {
        title: 'מתל אביב לטכניון',
        body: 'יעקב חיימוביץ, שנודע בהמשך כיקי חץ, נולד בתל אביב ולמד בבית הספר היסודי יהודה המכבי ובתיכון עירוני ד׳. לאחר שירותו הסדיר החל ללמוד בטכניון. כאיש מילואים בגדוד 66 של חטיבת הצנחנים 55 נקרא להשתתף בלחימה בירושלים במלחמת ששת הימים.',
        sourceIds: ['yaki-wikipedia']
      },
      {
        title: 'עובר אל ראש הכוח',
        body: 'בראיון משנת 2015 סיפר יקי כי לקח את הבזוקה של לוחם שנפצע והתקדם עם מפקד המחלקה יורם אלישיב. לאחר שאלישיב נפגע הוביל יקי את האנשים בתעלה. הוא זכר שפעל למרות חוסר הוודאות לגבי הכיוונים, עד שהגיעו אל הבונקר הגדול.',
        sourceIds: ['yaki-interview']
      },
      {
        title: 'הבונקר הגדול',
        body: 'תעודת העיטור מתארת כיצד נותר לבדו ליד העמדה המבוצרת לאחר שחבריו נפגעו. הוא ירה לתוכה ויצר קשר עם כוח נוסף. יחד הביאו חומר נפץ לפתח, ולאחר הפיצוץ נכנס פנימה. תעודת עיטור העוז שלו נושאת את התאריך אפריל 1973.',
        sourceIds: ['yaki-idf']
      },
      {
        title: 'החיים לאחר ההישרדות',
        body: 'כתבה של הספרייה הלאומית משנת 2022 חזרה לעדות שמסר לבמחנה ב־1967. בעדות המוקדמת תיאר פחד שהתעורר לאחר הלחימה עצמה, כשחשב עד כמה היה קרוב למוות. בראיון המאוחר סיפר על התקופה הכואבת שאחרי הקרב ועל כך שהמפגש עם מי שתהיה אשתו עזר לו לשוב ולבנות את חייו.',
        sourceIds: ['yaki-testimony']
      },
      {
        title: 'משפחה, שירות והנדסה',
        body: 'עדותו המצולמת מתארת חיים שנמשכו הרחק מעבר לקרב בירושלים. יקי וחני נישאו ב־1969 וגידלו שמונה ילדים. הוא השלים לימודי הנדסת מכונות בטכניון והחל לעבוד ברפאל ב־1970. לאחר קורס קצינים מזורז שירת כמפקד מחלקה במלחמת ההתשה ושוב ב־1973. הוא נפצע בידו ממערב לתעלת סואץ, אושפז ובהמשך חזר לגדודו. הראיון מתאר גם את עיסוקו המאוחר בהעברת מורשת הקרב לצוערי קורס קצינים.',
        sourceIds: ['yaki-oral-history']
      },
      {
        title: 'זיכרון שעובר בין דורות',
        body: 'ב־2015 השתתף יקי במרוץ שליחים של חטיבה 55 לצד ותיקים נוספים. הוא סיפר שהתחיל לרוץ בעקבות בניו. פעילותו בשימור מורשת החטיבה ובעמותת גבעת התחמושת חיברה בין זיכרונותיו האישיים לבין הדורות הצעירים.',
        sourceIds: ['yaki-interview']
      }
    ],
    sourcesHeading: 'מקורות לביוגרפיה ולעדויות'
  }
};
