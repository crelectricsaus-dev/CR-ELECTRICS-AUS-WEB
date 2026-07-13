type PhotoSource =
  | { source: "picsum"; id: number }
  | { source: "unsplash"; id: string }
  | { source: "pexels"; id: number };

export const placeholderPhotos = {
  // Generic architecture stand-ins — shown with a dark/blue duotone treatment
  // since the content itself isn't electrical-specific.
  skyline: { source: "picsum", id: 1067 },
  towers: { source: "picsum", id: 1048 },
  bridge: { source: "picsum", id: 43 },
  // Genuine electrical-trade photography — shown in natural colour.
  electrician: { source: "unsplash", id: "1621905251189-08b45d6a269e" },
  switchboard: { source: "unsplash", id: "1635335874521-7987db781153" },
  lineman: { source: "unsplash", id: "1597502310092-31cdaa35b46d" },
  luxuryHome: { source: "unsplash", id: "1748063578185-3d68121b11ff" },
  luxuryKitchen: { source: "unsplash", id: "1682888813913-e13f18692019" },
  officeWorkstations: { source: "unsplash", id: "1718220216044-006f43e3a9b1" },
  industrialPanel: { source: "unsplash", id: "1576446470246-499c738d1c8e" },
  medicalClinic: { source: "unsplash", id: "1782397132123-0166b524d6bc" },
  cctv: { source: "unsplash", id: "1496368077930-c1e31b4e5b44" },
  melbourneSkyline: { source: "unsplash", id: "1595434971780-79d5c20c5090" },
  factoryInterior: { source: "unsplash", id: "1776090188275-72957bae4ed7" },
  warehouseWorkers: { source: "unsplash", id: "1772298783095-be38fa901232" },
  hospitalCorridor: { source: "unsplash", id: "1777269749032-d8d458ae594d" },
  panelCloseWork: { source: "unsplash", id: "1660330590022-9f4ff56b63f6" },
  breakerScrewdriver: { source: "pexels", id: 257736 },
  controlCabinetPliers: { source: "pexels", id: 33694019 },
  multimeterDiagnosis: { source: "pexels", id: 34054464 },
  domeCameraClose: { source: "pexels", id: 7364948 },
  pendantLighting: { source: "unsplash", id: "1770816307528-67e404552dcf" },
  architecturalBlueprints: { source: "pexels", id: 34573691 },
} as const satisfies Record<string, PhotoSource>;

export type PlaceholderPhotoKey = keyof typeof placeholderPhotos;

export function isOnTopicPhoto(key: PlaceholderPhotoKey) {
  return placeholderPhotos[key].source !== "picsum";
}

export function photoUrl(key: PlaceholderPhotoKey, width = 1920) {
  const photo = placeholderPhotos[key];
  if (photo.source === "picsum") {
    return `https://picsum.photos/id/${photo.id}/${width}/${Math.round((width * 9) / 16)}`;
  }
  if (photo.source === "pexels") {
    return `https://images.pexels.com/photos/${photo.id}/pexels-photo-${photo.id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
  }
  return `https://images.unsplash.com/photo-${photo.id}?w=${width}&q=80&auto=format&fit=crop`;
}
