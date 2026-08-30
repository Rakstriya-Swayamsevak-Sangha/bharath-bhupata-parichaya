export interface MahapurushaAnchor {
  id: string;
  name: {
    en: string;
    kn: string;
    hi: string;
  };
  category: 'mahapurusha';
  coords: [number, number]; // [lat, lng]
  associationType: 'traditional' | 'verified';
  associationWording: {
    en: string;
    kn: string;
    hi: string;
  };
}

export const mahapurushasGeometry: MahapurushaAnchor[] = [
  {
    id: "chanakya",
    name: {
      en: "Chanakya",
      kn: "ಚಾಣಕ್ಯ",
      hi: "चाणक्य"
    },
    category: "mahapurusha",
    coords: [33.746, 72.839], // Taxila archaeological region
    associationType: "traditional",
    associationWording: {
      en: "Traditionally associated with Taxila",
      kn: "ಪರಂಪರೆಯ ಪ್ರಕಾರ ತಕ್ಷಶಿಲೆಯೊಂದಿಗೆ ಸಂಬಂಧಿಸಲಾಗಿದೆ",
      hi: "परंपरागत रूप से तक्षशिला से संबद्ध"
    }
  }
];
