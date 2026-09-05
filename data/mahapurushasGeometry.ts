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
  },
  {
    id: "chandragupta_maurya",
    name: {
      en: "Chandragupta Maurya",
      kn: "ಚಂದ್ರಗುಪ್ತ ಮೌರ್ಯ",
      hi: "चंद्रगुप्त मौर्य"
    },
    category: "mahapurusha",
    coords: [25.61, 85.14],
    associationType: "verified",
    associationWording: {
      en: "Pataliputra, the Mauryan capital",
      kn: "ಮೌರ್ಯರ ರಾಜಧಾನಿಯಾದ ಪಾಟಲಿಪುತ್ರ",
      hi: "मौर्य राजधानी पाटलिपुत्र"
    }
  },
  {
    id: "vikramaditya",
    name: {
      en: "Vikramaditya",
      kn: "ವಿಕ್ರಮಾದಿತ್ಯ",
      hi: "विक्रमादित्य"
    },
    category: "mahapurusha",
    coords: [23.18, 75.78],
    associationType: "traditional",
    associationWording: {
      en: "Ujjain, traditionally associated with Vikramaditya",
      kn: "ವಿಕ್ರಮಾದಿತ್ಯರೊಂದಿಗೆ ಪರಂಪರೆಯಿಂದ ಸಂಬಂಧಿಸಲ್ಪಟ್ಟ ಉಜ್ಜಯಿನಿ",
      hi: "परंपरा में विक्रमादित्य से संबद्ध उज्जयिनी"
    }
  }
];
