# Ammunition Hill — Then & Now

An interactive educational 3D website about Givat HaTahmoshet (Ammunition Hill), Jerusalem. Switch between an interpretation of the June 1967 battlefield and a partial model of the modern memorial, rotate and zoom the landscape, and hover over or tap Eitan Naveh's portrait to read his biography and contribution to the battle.

## Run

No build step or package installation is required. Serve this directory with any static HTTP server. For example, with Python installed:

```sh
python -m http.server 8000
```

Open http://localhost:8000 in a modern browser with WebGL support. The multi-file version uses JavaScript modules and should be served over HTTP.

Alternatively, download and open [`Ammunition-Hill.html`](Ammunition-Hill.html) directly in a browser. It embeds the rendering library, geometry, portrait, and battle map. Google Fonts is optional; system fonts are used without internet access.

## Controls

- Drag to rotate; scroll or pinch to zoom.
- Choose **June 1967** or **Memorial today** to switch landscapes.
- Hover over, focus, or tap Eitan's portrait to open his story.
- Use **Top view**, **Reset view**, or **Labels** to explore the model.
- Open **Sources & accuracy** for the source notes; the historical map is also available in the interface.

## Reconstruction limits

These are reference-based educational interpretations, **not exact reconstructions or measured surveys**.

The 1967 trench centerlines and building positions were traced by hand from a museum-attributed battle diagram. The diagram is not a measured plan. Terrain, trench cross-sections, scale, heights, roofs, firing bays, and underground rooms are simplified, estimated, or omitted.

The modern view uses OpenStreetMap building footprints, paths, and site outline retrieved on 26 September 2026. Retrieval date is not a survey date. Local geometry uses a five-metre unit centered around 31.799017, 35.228080; accuracy depends on the source mapping. Heights and roof forms are estimates. The western trench is an approximate interpretation, most eastern trenches are not modeled, and trees and indoor or underground detail are omitted.

Eitan's marker indicates the general western-trench area, not his exact location at a particular moment. Greater precision would require dated surveys or a 3D scan, archival plans, and verified trench dimensions.

## Files

- `index.html`, `theme.css`, `model.js`: page, presentation, interaction, and model rendering.
- `historical-geometry.js`: hand-traced historical layout.
- `current-geometry.js`: transformed present-day map data.
- `current-map.osm`: the source OpenStreetMap extract.
- `three.module.js`, `OrbitControls.js`: vendored Three.js 0.169.0 rendering components.
- `battle-map.jpg`, `eitan.jpg`: attributed source images.
- `Ammunition-Hill.html`: a self-contained copy of the current game.

The standalone file is a snapshot. Changes to the source files are not automatically reflected in it.

## Sources and attribution

- **Historical battle map:** [HATAHMOSHET1.JPG on Wikimedia Commons](https://commons.wikimedia.org/wiki/File:HATAHMOSHET1.JPG), attributed to Ammunition Hill museum and Kalonimos, with numbered annotations by הגמל התימני. Map and adapted historical layout: [CC BY-SA 2.5](https://creativecommons.org/licenses/by-sa/2.5/). The layout was adapted by hand for this project.
- **Modern map data:** © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright), [ODbL 1.0](https://opendatacommons.org/licenses/odbl/1-0/). The original extract is included in `current-map.osm`; the transformed data in `current-geometry.js` is also offered under ODbL 1.0.
- **Eitan Naveh's biography and portrait:** [official Izkor memorial, Israel Ministry of Defense](https://www.izkor.gov.il/איתן%20נאוֶה/en_6f1ae28db9cce8f51c79819b05be3215). Portrait rights remain with the source; the portrait is not openly licensed and is not covered by the map or software licenses.
- **Surviving and covered trenches:** [2022 walking-tour account](https://idsf.org.il/en/tours-en/a-tour-of-ammunition-hill/).
- **Memorial architecture:** [original plans and architect interview](https://michaelarch.wordpress.com/2010/12/23/סיבוב-באתר-גבעת-התחמושת/). Historical plans are not evidence of current as-built conditions.
- **Older visitor route:** [Ministry of Education visitor map, page 9](https://meyda.education.gov.il/files/noar/shalu16.pdf).
- **Further research:** [Ammunition Hill official archive](https://g-h.org.il/ארכיון-מאגר-מידע/).
- **Three.js and OrbitControls:** version 0.169.0, copyright 2010–2024 Three.js Authors, [MIT license](threejs-MIT.txt); [upstream version](https://github.com/mrdoob/three.js/tree/r169).

Third-party assets retain their respective rights and licenses. No blanket license is granted for all repository contents.
