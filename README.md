# Ammunition Hill — Then & Now

An interactive educational 3D website about Givat HaTahmoshet (Ammunition Hill), Jerusalem. Switch between an interpretation of the June 1967 battlefield and a partial model of the modern memorial, rotate and zoom the landscape, explore 19 historical landmarks, and follow an 11-phase battle replay. Eitan Naveh's portrait moves during his documented western-trench covering action and opens a dedicated biography with official records, Wikipedia and published family recollections. Yaki Hetz’s portrait illustrates his documented Great Bunker action and opens a separate biography with his own testimony and life after the battle. The full interface and both biographies are available in English and Hebrew.

## Run

No build step or package installation is required. Serve this directory with any static HTTP server. For example, with Python installed:

```sh
python -m http.server 8000
```

Open http://localhost:8000 in a modern browser with WebGL support. The multi-file version uses JavaScript modules and should be served over HTTP.

Alternatively, download and open [`Ammunition-Hill.html`](Ammunition-Hill.html) directly in a browser. It embeds the rendering library, geometry, both portraits, and battle map. Google Fonts is optional; system fonts are used without internet access.

## Controls

- Drag to rotate; scroll or pinch to zoom.
- Choose **June 1967** or **Memorial today** to switch landscapes.
- Hover over or tap the numbered map pins, trench routes and buildings for sourced historical context. The **Explore 19 places** list and keyboard focus offer the same cards.
- Hover over or focus either soldier’s map or sidebar portrait for a short introduction. Click/tap it, or the portrait in the sidebar, to open his full biography page. Returning preserves the selected phase and leaves playback paused.
- **Jump to Eitan’s action** selects the western-trench phase. Press Play to animate his portrait along an illustrative route outside the trench. His earlier individual locations are not plotted; later phases show a stationary memorial.
- **Jump to Yaki’s action** selects the Great Bunker phase. Press Play to follow the short illustrative approach to the bunker. Yaki survived: the following phase retains his last illustrated position without claiming his later whereabouts.
- **EN / עברית** switches the entire interface, historical cards, replay narrative and biography. Hebrew uses right-to-left reading order. The preference is remembered when browser storage is available. `?lang=he` selects Hebrew directly.
- The biographies have their own `#eitan` and `#yaki` routes, including in the single-file download; browser Back and **Return to the battlefield** work without a server page transition.
- **Play / Pause** runs or pauses the battle sequence. **Stop** returns to phase 1. The arrow buttons step backward or forward and pause; the numbered strip and phase selector jump directly to an event.
- Choose 0.5×, 1× or 2× playback speed. Switching to the modern view or leaving the browser tab pauses playback. Ended sequences can be replayed.
- **Evidence & context** gives the narrative and citations for each phase. Tokens show groups and broad sectors, not numbers of soldiers.
- Use **Top view**, **Reset view**, or **Labels** to explore the model.
- Open **Sources & accuracy** for the source notes; the historical map is also available in the interface.

## Reconstruction limits

These are reference-based educational interpretations, **not exact reconstructions or measured surveys**.

The 1967 trench centerlines and building positions were traced by hand from a museum-attributed battle diagram. The diagram is not a measured plan. Terrain, trench cross-sections, scale, heights, roofs, firing bays, and underground rooms are simplified, estimated, or omitted.

The modern view uses OpenStreetMap building footprints, paths, and site outline retrieved on 26 September 2026. Retrieval date is not a survey date. Local geometry uses a five-metre unit centered around 31.799017, 35.228080; accuracy depends on the source mapping. Heights and roof forms are estimates. The western trench is an approximate interpretation, most eastern trenches are not modeled, and trees and indoor or underground detail are omitted.

The 11-phase replay presents a sourced sequence from the defended position, preparation and approach, through the central/eastern advances and reinforcements, to the western trench, Great Bunker and casualty evacuation. Several phases overlap. The first introductory phases show static positions. Equal nine-second phases at 1× are a reading aid, not a historical clock. The arrow controls step between phases; they do not reverse individual frames.

Sources disagree about the beginning of the attack (including 02:30 and 03:10). The Great Bunker and capture are placed around 06:15 in the IDF histories. Intermediate times are approximate. Unit routes, defender sectors and many landmark anchors are schematic. The Police School and initial fence breach are off-map; their labels sit at the approach boundary. No exact casualty totals, individual enemy movements, underground rooms or minefield boundaries are asserted. Wire arcs are hand-traced from the diagram; fence construction and defensive architecture are illustrative.

Eitan's animated route illustrates the action described by his official award citation: exposed covering fire beside the western trench. The selected segment, endpoints and animation speed are not a measured personal route, a death location or a historical clock. Before that action his individual position is explicitly unlocated; after it the avatar is commemorative and stationary. Seeking backward restores his phase-appropriate state. Published family interviews are attributed paraphrases, not invented quotations. Greater precision would require dated surveys or a 3D scan, archival plans, and verified trench dimensions.

Yaki’s route illustrates only the local Great Bunker action supported by his award citation. It does not reconstruct his earlier personal route, exact entrance bearing, timing or the underground interior. The portrait was taken at Ammunition Hill on 7 February 2022. His account and Eitan’s family accounts remain separately attributed.

## Files

- `index.html`, `theme.css`, `model.js`: page, presentation, interaction, and model rendering.
- `explorer.js`, `landmarks.js`, `battle-data.js`, `playback.js`: landmark interaction, cited history, schematic movement routes and deterministic playback.
- `eitan-motion.js`, `yaki-motion.js`: deterministic individual avatar routes.
- `eitan-data.js`, `yaki-data.js`, `people.js`, `biography.js`: bilingual biographies, shared identities, portrait credits and biography routing.
- `i18n.js`, `history-he.js`: interface language switching and Hebrew historical content.
- `historical-geometry.js`: hand-traced historical layout.
- `current-geometry.js`: transformed present-day map data.
- `current-map.osm`: the source OpenStreetMap extract.
- `three.module.js`, `OrbitControls.js`: vendored Three.js 0.169.0 rendering components.
- `battle-map.jpg`, `eitan.jpg`, `yaki.jpg`: attributed source images.
- `Ammunition-Hill.html`: a self-contained copy of the current game.

The standalone file is a snapshot. Changes to the source files are not automatically reflected in it.

## Sources and attribution

- **Historical battle map:** [HATAHMOSHET1.JPG on Wikimedia Commons](https://commons.wikimedia.org/wiki/File:HATAHMOSHET1.JPG), attributed to Ammunition Hill museum and Kalonimos, with numbered annotations by הגמל התימני. Map and adapted historical layout: [CC BY-SA 2.5](https://creativecommons.org/licenses/by-sa/2.5/). The layout was adapted by hand for this project.
- **Modern map data:** © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright), [ODbL 1.0](https://opendatacommons.org/licenses/odbl/1-0/). The original extract is included in `current-map.osm`; the transformed data in `current-geometry.js` is also offered under ODbL 1.0.
- **Eitan Naveh's biography and portrait:** [official Izkor memorial, Israel Ministry of Defense](https://www.izkor.gov.il/איתן%20נאוֶה/en_6f1ae28db9cce8f51c79819b05be3215). Portrait rights remain with the source; the portrait is not openly licensed and is not covered by the map or software licenses.
- **Surviving and covered trenches:** [2022 walking-tour account](https://idsf.org.il/en/tours-en/a-tour-of-ammunition-hill/).
- **Memorial architecture:** [original plans and architect interview](https://michaelarch.wordpress.com/2010/12/23/סיבוב-באתר-גבעת-התחמושת/). Historical plans are not evidence of current as-built conditions.
- **Older visitor route:** [Ministry of Education visitor map, page 9](https://meyda.education.gov.il/files/noar/shalu16.pdf).
- **Battle sequence:** [IDF historical study, Maarachot 223 (1972)](https://www.maarachot.idf.il/media/4elm2qa0/המערכה_על_ירושלים.pdf), [Yossi Langotsky, Yesodot 6 (2024), timing and source caveats](https://www.idf.il/media/eevddkye/yesodot_6_-langotsky_05jun24-1-1-53.pdf), and official medal citations linked in the app. Additional event and landmark sources are listed alongside their claims in the interface and in the data modules.
- **Eitan’s life and family recollections:** [Hebrew Wikipedia](https://he.wikipedia.org/wiki/איתן_נאוה), [Doron Naveh interviewed by the IDF, 2020](https://www.idf.il/97987), [Rina Sela, Yediot Aharonot, 2019](https://www.yediot.co.il/articles/0,7340,L-5504574,00.html), [Doron Naveh, Israel Hayom, 2021](https://www.israelhayom.co.il/magazine/hashavua/article/542865), and [Ofer Drori’s research on an earlier commendation](https://www.gvura.org/a346626-סיפורו-של-איתור-ציון-לשבח-נשכח). Each biography section links to its source.
- **Yaki’s portrait:** [Yaki Hetz.jpg on Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Yaki_Hetz.jpg), photographed by Tal Eidelman (טל אידלמן) at Ammunition Hill, 7 February 2022, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). The original 4600 × 4000 image is included unchanged. Small portraits are cropped for display with CSS; those display adaptations retain CC BY-SA 3.0.
- **Yaki’s biography:** [Hebrew Wikipedia](https://he.wikipedia.org/wiki/יעקב_חץ), [official IDF award citation](https://www.idf.il/אתרי-יחידות/בעוז-רוחם/מלחמת-ששת-הימים/מלחמת-ששת-הימים-עיטור-העוז/), and the oral-history archive and published personal interviews linked beside each biography section.
- **Further research:** [Ammunition Hill official archive](https://g-h.org.il/ארכיון-מאגר-מידע/).
- **Three.js and OrbitControls:** version 0.169.0, copyright 2010–2024 Three.js Authors, [MIT license](threejs-MIT.txt); [upstream version](https://github.com/mrdoob/three.js/tree/r169).

Third-party assets retain their respective rights and licenses. No blanket license is granted for all repository contents.
