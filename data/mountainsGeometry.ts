export interface MountainGeometry {
  id: string;
  title: {
    en: string;
    kn: string;
    hi: string;
  };
  path: [number, number][];
  labelCoords: [number, number];
}

export const mountainsGeometry: MountainGeometry[] = [
  {
    id: "himalaya",
    title: { en: "Himalaya", kn: "ಹಿಮಾಲಯ", hi: "हिमालय" },
    path: [
      [34.5, 72.5], [34.2, 74.0], [33.8, 76.0], [33.5, 78.0],
      [33.2, 80.0], [32.8, 82.0], [32.3, 84.0], [31.8, 86.0],
      [31.5, 88.0], [31.2, 90.0], [30.8, 92.0], [30.5, 94.0]
    ],
    labelCoords: [32.8, 82.0]
  },
  {
    id: "sahyadri",
    title: { en: "Sahyadri", kn: "ಸಹ್ಯಾದ್ರಿ", hi: "सह्याद्रि" },
    path: [
      [20.5, 72.8], [19.0, 73.05], [17.5, 73.45],
      [16.0, 74.05], [14.5, 74.45], [13.0, 75.05], [11.5, 75.45]
    ],
    labelCoords: [16.0, 74.05]
  },
  {
    id: "malaya",
    title: { en: "Malaya", kn: "ಮಲಯಾ", hi: "मलया" },
    path: [
      [10.5, 76.6], [9.6, 77.1], [8.4, 77.4]
    ],
    labelCoords: [9.6, 77.1]
  },
  {
    id: "mahendra",
    title: { en: "Mahendra", kn: "ಮಹೇಂದ್ರ", hi: "महेंद्र" },
    path: [
      [18.5, 83.5], [19.45, 84.55], [20.55, 85.45],
      [21.45, 86.55], [22.5, 87.5]
    ],
    labelCoords: [19.45, 84.55]
  },
  {
    id: "aravalli",
    title: { en: "Aravalli", kn: "ಅರಾವಳಿ", hi: "अरावली" },
    path: [
      [24.8, 72.8], [25.95, 73.85], [27.25, 74.75],
      [28.45, 75.85], [29.8, 76.8]
    ],
    labelCoords: [27.25, 74.75]
  },
  {
    id: "vindhya",
    title: { en: "Vindhya", kn: "ವಿಂಧ್ಯ", hi: "विंध्य" },
    path: [
      [22.5, 74.0], [22.35, 76.0], [22.15, 78.0],
      [22.05, 80.0], [21.8, 82.0]
    ],
    labelCoords: [22.35, 76.0]
  }
];