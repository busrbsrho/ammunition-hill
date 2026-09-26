// Image-pixel anchors follow historical-geometry.js and its museum-attributed
// schematic. They are not surveyed coordinates or verified building entrances.
// Narrative sources are listed per card; geometry attribution applies globally.
export const sources = {
  map: {
    title: 'Museum-attributed battle diagram · CC BY-SA 2.5',
    url: 'https://commons.wikimedia.org/wiki/File:HATAHMOSHET1.JPG'
  },
  education: {
    title: 'Ministry of Education · site guide, pages 6–11',
    url: 'https://meyda.education.gov.il/files/noar/shalu16.pdf'
  },
  maarachot: {
    title: 'IDF Maarachot · The Campaign for Jerusalem, pages 21–22',
    url: 'https://fliphtml5.com/gcjnv/esqo/223/21/'
  },
  battleAccount: {
    title: 'Aryeh Yitzhaki · battle history, Tel Mond memorial archive',
    url: 'https://www.rishonim.org.il/telmond/info/hi_show.aspx?id=3905'
  },
  courageCitation: {
    title: 'Yaakov Haimovitch · Medal of Courage citation',
    url: 'https://www.gvura.org/a3909-%D7%98%D7%95%D7%A8%D7%90%D7%99-%D7%99%D7%A7%D7%99-%D7%97%D7%A5-%D7%97%D7%99%D7%99%D7%9E%D7%95%D7%91%D7%99%D7%A5'
  },
  eitanCitation: {
    title: 'Ministry of Defense Izkor · Eitan Naveh and his citation',
    url: 'https://www.izkor.gov.il/%D7%90%D7%99%D7%AA%D7%9F%20%D7%A0%D7%90%D7%95%D6%B6%D7%94/en_6f1ae28db9cce8f51c79819b05be3215'
  }
};

export const landmarks = [
  {
    id: 'western-trench', title: 'Western trench', category: 'trench',
    point: [211, 365],
    summary: 'The most strongly fortified trench.',
    detail: 'Nir Nitzan led soldiers through its positions. They eventually joined the other attacking groups near the Great Bunker.',
    confidence: 'Mapped route · schematic alignment',
    sourceIds: ['education']
  },
  {
    id: 'eastern-trench', title: 'Eastern trench', category: 'trench',
    point: [431, 236],
    summary: 'Dadi Yaakobi and Miller’s route.',
    detail: 'Their advance stalled near Television House.',
    confidence: 'Mapped route · schematic alignment',
    sourceIds: ['battleAccount']
  },
  {
    id: 'central-trench', title: 'Central trench', category: 'trench',
    point: [334, 358],
    summary: 'An interior route toward the quarters.',
    detail: 'Yoram Elishiv’s platoon advanced here; Dani Yitzhaki’s men followed.',
    confidence: 'Mapped route · schematic alignment',
    sourceIds: ['maarachot']
  },
  {
    id: 'shallow-trench', title: 'Shallow trench', category: 'trench',
    point: [268, 309],
    summary: 'A transverse approach toward the west.',
    detail: 'The Fire Triangle covered this route.',
    confidence: 'Mapped route · schematic alignment',
    sourceIds: ['battleAccount']
  },
  {
    id: 'police-school-approach', title: 'Police School approach', category: 'trench',
    point: [68, 455],
    summary: 'Link to the Police School.',
    detail: 'Dudik Rothenberg’s company cleared this connecting trench.',
    confidence: 'Approximate context anchor · not the school footprint',
    sourceIds: ['maarachot']
  },
  {
    id: 'great-bunker', title: 'Great Bunker', category: 'defence',
    point: [196, 208],
    summary: 'A fortified position overcome with explosives.',
    detail: 'Yaakov Haimovitch maintained fire and contacted soldiers approaching from another direction. Explosives were brought to the entrance and detonated. His actions earned the Medal of Courage.',
    confidence: 'Mapped bunker · dimensions are estimated',
    sourceIds: ['courageCitation', 'map']
  },
  {
    id: 'command-bunker', title: 'Command bunker', category: 'defence',
    point: [370, 180],
    summary: 'Jordanian underground command position.',
    detail: 'Ailon’s squad cleared it.',
    confidence: 'Uncertain anchor · exact location not established here',
    sourceIds: ['maarachot']
  },
  {
    id: 'television-house', title: 'Television House', category: 'building',
    point: [471, 87],
    summary: 'Named for its rooftop antennas.',
    detail: 'Fire here stalled Miller’s platoon.',
    confidence: 'Mapped building · form and height are estimated',
    sourceIds: ['battleAccount']
  },
  {
    id: 'barracks', title: 'Soldiers’ quarters', category: 'building',
    point: [309, 196],
    summary: 'Two buildings at the centre.',
    detail: 'Elishiv’s men captured these quarters.',
    confidence: 'Mapped buildings · roof forms are illustrative',
    sourceIds: ['maarachot']
  },
  {
    id: 'water-tower', title: 'Water tower', category: 'building',
    point: [285, 288],
    summary: 'Tower among the central buildings.',
    detail: 'No specific combat role is documented here.',
    confidence: 'Mapped feature · height and structure are estimated',
    sourceIds: ['battleAccount']
  },
  {
    id: 'three-houses', title: 'Three Houses', category: 'building',
    point: [232, 455],
    summary: 'An assembly area on the southern approach.',
    detail: 'Dudik’s men paused here after clearing the connecting trenches. Dadi’s company then advanced into the hill.',
    confidence: 'Approximate group anchor · individual identification uncertain',
    sourceIds: ['education']
  },
  {
    id: 'fire-triangle', title: 'Fire Triangle', category: 'defence',
    point: [246, 316],
    summary: 'Three positions covered the shallow-trench area.',
    detail: 'Repeated attacks suffered heavy losses before Yoav Tzur’s men overcame the positions, with tanks now present.',
    confidence: 'Approximate area · three positions, not one building',
    sourceIds: ['education']
  },
  {
    id: 'casualty-junction', title: 'Casualty junction', category: 'trench',
    point: [211, 309],
    summary: 'Wounded soldiers gathered at this junction.',
    detail: 'Yoav Tzur was killed nearby after fighting through the Fire Triangle.',
    confidence: 'Approximate junction · schematic location',
    sourceIds: ['education']
  },
  {
    id: 'firing-positions', title: 'Fortified firing positions', category: 'defence',
    point: [405, 184],
    summary: 'Around forty positions and bunkers defended the hill.',
    detail: 'Elevated central positions could fire into lower connecting trenches, making movement through the network dangerous.',
    confidence: 'Representative mapped position · system-wide context',
    sourceIds: ['education']
  },
  {
    id: 'defences', title: 'Wire and minefields', category: 'defence',
    point: [389, 25],
    summary: 'Obstacles protected the position.',
    detail: 'The Police School approach had four fences; attackers expected three.',
    confidence: 'Context anchor · no minefield boundaries asserted',
    sourceIds: ['battleAccount']
  },
  {
    id: 'jordanian-defenders', title: 'Jordanian defenders', category: 'people',
    point: [366, 270],
    summary: 'Jordanian infantry held the complex.',
    detail: 'Two platoons occupied the hill; others held nearby positions.',
    confidence: 'Context anchor · not a troop or headquarters location',
    sourceIds: ['battleAccount']
  },
  {
    id: 'eitan-naveh', title: 'Eitan Naveh', category: 'people',
    point: [208, 278],
    summary: 'He provided covering fire from exposed ground.',
    detail: 'On 6 June 1967, Naveh left the trench so his comrades could keep advancing. He moved alongside them until enemy fire killed him. His posthumous Medal of Valor citation recognises this action. This marker represents his role along the western trench, not a verified point of death.',
    confidence: 'Approximate commemorative anchor · action documented',
    sourceIds: ['eitanCitation']
  },
  {
    id: 'recoilless-gun', title: 'Recoilless-gun position', category: 'defence',
    point: [338, 77],
    summary: 'A Jordanian gun in the northern sector.',
    detail: 'Tzvika Magen hit it with a bazooka after Elishiv was mortally wounded.',
    confidence: 'Approximate position · exact emplacement uncertain',
    sourceIds: ['maarachot']
  },
  {
    id: 'ammunition-bunker', title: 'Ammunition bunker', category: 'defence',
    point: [322, 153],
    summary: 'A separate bunker near the northern fighting.',
    detail: 'Elishiv’s men cleared it before reaching the northern perimeter.',
    confidence: 'Approximate anchor · bunker identity requires verification',
    sourceIds: ['maarachot']
  }
];
