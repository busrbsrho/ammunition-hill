import {historicPaths} from './historical-geometry.js';

// Routes are schematic movements on the museum-attributed diagram, in image
// pixels. They are not surveyed positions, individual soldiers or timed tracks.
const path = name => historicPaths.find(p => p.name === name).points;
const segment = (name, start, end) => {
  const points = path(name);
  return (start <= end ? points.slice(start, end + 1) : points.slice(end, start + 1).reverse()).map(p => [...p]);
};
const join = (...routes) => routes.flat().filter((p, i, a) => !i || p[0] !== a[i - 1][0] || p[1] !== a[i - 1][1]);
const track = (id, label, side, route) => ({id, label, side, route});
const still = (id, label, side, point) => track(id, label, side, [[...point]]);
const defenders = () => [
  still('jordan-west', 'Jordanian defenders · west', 'jordanian', [211, 246]),
  still('jordan-north', 'Jordanian defenders · north', 'jordanian', [301, 85]),
  still('jordan-east', 'Jordanian defenders · east', 'jordanian', [429, 174])
];
const easternAdvance = () => join([[334, 387]], segment('Eastern trench', 14, 0));

export const battleSources = {
  idfDiary: {
    title: 'IDF · Six-Day War diary',
    url: 'https://www.idf.il/אתרי-יחידות/מלחמת-ששת-הימים/יומן-מלחמה/',
    type: 'Official overview'
  },
  idfHistory: {
    title: 'IDF historical study · Maarachot 223, June 1972, pp. 20–22',
    url: 'https://www.maarachot.idf.il/media/4elm2qa0/המערכה_על_ירושלים.pdf',
    type: 'Historical study'
  },
  yesodot: {
    title: 'Yossi Langotsky · Yesodot 6, pp. 3 and 30',
    url: 'https://www.idf.il/media/eevddkye/yesodot_6_-langotsky_05jun24-1-1-53.pdf',
    type: 'IDF history journal'
  },
  memorialAccount: {
    title: 'Aryeh Yitzhaki · battle account reproduced by a memorial archive',
    url: 'https://www.rishonim.org.il/telmond/info/hi_show.aspx?id=3905',
    type: 'Historical narrative'
  },
  reinforcement: {
    title: 'Memorial archive · Company A reinforcement',
    url: 'https://refua.gal-ed.co.il/Web/He/WarsVictims/Info/Default.aspx?ID=23590&connect=3905&key=25122&moretxt=1&type=info',
    type: 'Historical narrative'
  },
  heritage: {
    title: 'Israel heritage programme · Ammunition Hill',
    url: 'https://www.landmarks.gov.il/גבעת-התחמושת-בירושלים',
    type: 'Government heritage account'
  },
  battleOverview: {
    title: 'Battle of Ammunition Hill · detailed Hebrew overview',
    url: 'https://www.hamichlol.org.il/קרב_גבעת_התחמושת',
    type: 'Secondary cross-check'
  },
  eitan: {
    title: 'Ministry of Defense · Eitan Na’eh, official memorial and citation',
    url: 'https://www.izkor.gov.il/איתן%20נאוֶה/en_6f1ae28db9cce8f51c79819b05be3215',
    type: 'Official award citation'
  },
  hetz: {
    title: 'IDF · Yaki Hetz, Medal of Courage citation',
    url: 'https://www.idf.il/אתרי-יחידות/בעוז-רוחם/מלחמת-ששת-הימים/מלחמת-ששת-הימים-עיטור-העוז/',
    type: 'Official award citation'
  },
  battleMap: {
    title: 'Museum-attributed battle diagram · Wikimedia Commons',
    url: 'https://commons.wikimedia.org/wiki/File:HATAHMOSHET1.JPG',
    type: 'Schematic map · CC BY-SA 2.5'
  }
};

export const battleNote = '6 June 1967. These phases overlap: movement speed is illustrative, and each marker represents a group, not a soldier count. Routes show broad movements on the historical diagram; defender markers indicate sectors, not verified individual positions. The Police School and initial breach lie outside this hill model. Published accounts differ on the attack start (including 02:30 and 03:10); the final bunker is usually placed around 06:15. Intermediate phase times are approximate.';

export const battlePhases = [
  {
    id: 'defended-hill', title: 'A defended hill', time: 'Night of 5–6 June',
    summary: 'A Jordanian position of connected trenches and bunkers.',
    detail: 'Infantry from the Al-Hussein Battalion defended the Police School–hill complex. Givat HaMivtar overlooked it from the north.',
    sourceIds: ['heritage', 'battleMap'], focus: [315, 245],
    tracks: defenders()
  },
  {
    id: 'preparatory-fire', title: 'Before the advance', time: 'Before ≈02:30',
    summary: 'Supporting fire precedes the infantry assault.',
    detail: 'The IDF public diary places shelling at 01:00 and the paratroopers’ movement at 02:30. These are reference times, not a synchronized battlefield clock.',
    sourceIds: ['idfDiary', 'yesodot'], focus: [260, 380],
    tracks: [still('b-approach', 'Battalion 66 · southern approach', 'israeli', [53, 471]), ...defenders()]
  },
  {
    id: 'breach', title: 'Crossing the urban line', time: '≈02:30–03:15',
    summary: 'Company D opens the way; Company B enters.',
    detail: 'A fourth fence disrupts the crossing. The school approach is outside this model.',
    sourceIds: ['memorialAccount', 'battleMap'], focus: [135, 442],
    tracks: [
      still('d-breach', 'D · Giora Ashkenazi · breach off-map', 'israeli', [53, 471]),
      track('b-approach', 'B · Dudik Rotenberg', 'israeli', segment('Southern connecting trench', 0, 7)),
      ...defenders()
    ]
  },
  {
    id: 'southern-approach', title: 'The southern approach', time: 'Around 03:15–03:30',
    summary: 'B secures the approach; C follows.',
    detail: 'Company A clears the Police School. Dadi Yaakobi’s C Company approaches from the south.',
    sourceIds: ['memorialAccount'], focus: [294, 407],
    tracks: [
      track('b-approach', 'B · connecting trench', 'israeli', segment('Southern connecting trench', 7, 12)),
      track('c-approach', 'C · Dadi Yaakobi', 'israeli', segment('Central trench', 0, 3)),
      still('a-school', 'A · Gabi Magal · school off-map', 'israeli', [53, 471]),
      ...defenders()
    ]
  },
  {
    id: 'c-divides', title: 'Company C divides', time: 'After ≈03:30',
    summary: 'The advance separates into eastern and central routes.',
    detail: 'Miller and Dadi take the eastern trench. Yoram Elishiv advances through the centre, with Dani Yitzhaki following. The west is initially unentered.',
    sourceIds: ['idfHistory', 'battleMap'], focus: [363, 299],
    tracks: [
      track('c-east', 'C · Dadi / Miller · east', 'israeli', join([[334, 387]], segment('Eastern trench', 14, 10))),
      track('c-centre', 'C · Yoram / Dani · centre', 'israeli', segment('Central trench', 3, 9)),
      ...defenders()
    ]
  },
  {
    id: 'resistance', title: 'The advance slows', time: 'During the night',
    summary: 'Resistance divides the assaulting groups.',
    detail: 'The Fire Triangle and northern positions cause heavy losses. Central troops reach the barracks; the eastern force is checked near the Television House.',
    sourceIds: ['battleOverview', 'battleMap'], focus: [362, 167],
    tracks: [
      track('c-east', 'C · eastern element', 'israeli', segment('Eastern trench', 10, 2)),
      track('c-centre', 'C · central element', 'israeli', segment('Central trench', 9, 17)),
      still('jordan-west', 'Jordanian defenders · west', 'jordanian', [211, 246]),
      still('jordan-north', 'Jordanian defenders · north', 'jordanian', [301, 85]),
      still('jordan-east', 'Jordanian defenders · northeast', 'jordanian', [407, 113])
    ]
  },
  {
    id: 'a-reinforces', title: 'A platoon joins from the east', time: 'Toward dawn · approximate',
    summary: 'Ofer Feniger’s platoon from Company A reinforces C.',
    detail: 'The platoon enters the eastern trench and continues toward the northern perimeter. Its arrival overlaps other fighting; an exact minute is uncertain.',
    sourceIds: ['reinforcement', 'battleMap'], focus: [413, 221],
    tracks: [
      track('a-reinforcement', 'A · Ofer Feniger', 'israeli', easternAdvance()),
      still('c-centre', 'C · northern element', 'israeli', [341, 98]),
      still('c-east', 'C · eastern element', 'israeli', [425, 151]),
      still('jordan-west', 'Jordanian defenders · west', 'jordanian', [211, 246])
    ]
  },
  {
    id: 'b-reinforces', title: 'Company B enters the hill', time: 'Toward dawn · approximate',
    summary: 'Dudik’s reserve joins the fighting on the hill.',
    detail: 'B fights around the Fire Triangle. Yoav Tzuri’s men and supporting tanks help overcome this position. Other groups continue around the northern perimeter.',
    sourceIds: ['battleOverview', 'battleMap'], focus: [267, 361],
    tracks: [
      track('b-approach', 'B · reinforcements', 'israeli', segment('Southern connecting trench', 0, 12)),
      track('a-reinforcement', 'A / C · northern perimeter', 'israeli', segment('Western trench', 26, 12)),
      still('jordan-west', 'Jordanian defenders · west', 'jordanian', [211, 246])
    ]
  },
  {
    id: 'western-trench', title: 'Along the western trench', time: 'Dawn · approximate',
    summary: 'Nir Nitzan’s group advances northward.',
    detail: 'Eitan Na’eh covers the advancing soldiers from exposed ground above the trench. He is killed while providing that cover.',
    sourceIds: ['idfHistory', 'eitan', 'battleMap'], focus: [212, 299],
    tracks: [
      track('b-west', 'B · Nir Nitzan · west', 'israeli', segment('Western trench', 0, 11)),
      still('a-reinforcement', 'A / C · northern group', 'israeli', [216, 186]),
      still('jordan-bunker', 'Jordanian defenders · Great Bunker', 'jordanian', [196, 210])
    ]
  },
  {
    id: 'great-bunker', title: 'The Great Bunker', time: 'Around 06:15',
    summary: 'The converging groups overcome the final major position.',
    detail: 'Yaki Hetz maintains pressure at the bunker. Soldiers approaching from another direction bring explosives, enabling its destruction.',
    sourceIds: ['hetz', 'idfHistory', 'yesodot'], focus: [210, 207],
    tracks: [
      still('b-west', 'B · western group', 'israeli', [213, 237]),
      still('a-reinforcement', 'A / C · northern group', 'israeli', [216, 186]),
      still('c-centre', 'C · supporting group', 'israeli', [241, 215]),
      still('jordan-bunker', 'Jordanian defenders · Great Bunker', 'jordanian', [196, 210])
    ]
  },
  {
    id: 'aftermath', title: 'Consolidation and evacuation', time: 'Morning · from ≈06:15',
    summary: 'The hill is captured; casualty evacuation follows.',
    detail: 'Survivors search the trenches. Fire from Givat HaMivtar continues.',
    sourceIds: ['memorialAccount', 'yesodot'], focus: [289, 251],
    tracks: [
      still('b-west', 'Survivors · western trench', 'israeli', [211, 271]),
      still('c-centre', 'Survivors · central area', 'israeli', [334, 245]),
      still('a-reinforcement', 'Survivors · northern area', 'israeli', [301, 85])
    ]
  }
];
