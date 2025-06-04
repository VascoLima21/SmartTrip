export function loadWorldMap() {
    const mapScript = document.createElement("script");
    mapScript.src = "../js/map/mapdata.js";
    mapScript.onload = () => {
        const worldMapScript = document.createElement("script");
        worldMapScript.src = "../js/map/worldmap.js";
        document.body.appendChild(worldMapScript);
    };
    document.body.appendChild(mapScript);
}
