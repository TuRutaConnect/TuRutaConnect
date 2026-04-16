import L from 'leaflet';

/**
 * Generates a custom Leaflet icon based on the dynamic categories.
 */
export const createCustomIcon = (category, categoryStyles) => {

  const defaultStyle = { color: "#ce7a20ff", iconSvg: "<i class='fa-solid fa-location-dot'></i>" };
  const style = categoryStyles?.[category] || defaultStyle;

  const svgTemplate = `
    <div style="
      width: 25px;
      height: 25px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      display: flex;
      align-items: center;
      justify-content: center;
      border: 3px solid white;
      box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
      background[hover]: #ce7a20ff;
    ">
      <div style="
        transform: rotate(45deg);
        font-size: 20px;
        filter: drop-shadow(0 2px 2px rgba(0,0,0,0.1));
      ">
        ${style.iconSvg}
      </div>
    </div>
  `;

  return L.divIcon({
    html: svgTemplate,
    className: 'custom-marker-icon',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
    popupAnchor: [0, -42],
  });
};

const CustomMarkers = () => null;

export default CustomMarkers;
