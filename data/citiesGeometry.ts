export interface CityGeometry {
  id: string;
  name: {
    en: string;
    kn: string;
    hi: string;
  };
  coords: [number, number];
}

export const citiesGeometry: CityGeometry[] = [
  { id: "takshashila", name: { en: "Takshashila", kn: "ತಕ್ಷಶಿಲಾ", hi: "तक्षशिला" }, coords: [33.745, 72.787] },
  { id: "amritsar", name: { en: "Amritsar", kn: "ಅಮೃತಸರ", hi: "अमृतसर" }, coords: [31.634, 74.872] },
  { id: "indraprastha", name: { en: "Indraprastha", kn: "ಇಂದ್ರಪ್ರಸ್ಥ", hi: "इंद्रप्रस्थ" }, coords: [28.6139, 77.2090] },
  { id: "mathura", name: { en: "Mathura", kn: "ಮಥುರಾ", hi: "मथुरा" }, coords: [27.4924, 77.6737] },
  { id: "ayodhya", name: { en: "Ayodhya", kn: "ಅಯೋಧ್ಯೆ", hi: "अयोध्या" }, coords: [26.7999, 82.2042] },
  { id: "vaishali", name: { en: "Vaishali", kn: "ವೈಶಾಲಿ", hi: "वैशाली" }, coords: [25.9870, 85.1290] },
  { id: "pataliputra", name: { en: "Pataliputra", kn: "ಪಾಟಲಿಪುತ್ರ", hi: "पाटलिपुत्र" }, coords: [25.5941, 85.1376] },
  { id: "prayag", name: { en: "Prayag", kn: "ಪ್ರಯಾಗ", hi: "प्रयाग" }, coords: [25.4358, 81.8463] },
  { id: "gaya", name: { en: "Gaya", kn: "ಗಯಾ", hi: "गया" }, coords: [24.7955, 85.0002] },
  { id: "ujjain", name: { en: "Avanthika", kn: "ಅವಂತಿಕಾ", hi: "अवंतिका" }, coords: [23.1765, 75.7885] },
  { id: "dwarka", name: { en: "Dwarka", kn: "ದ್ವಾರಕಾ", hi: "द्वारका" }, coords: [22.2442, 68.9685] },
  { id: "somnath", name: { en: "Somanath", kn: "ಸೋಮನಾಥ", hi: "सोमनाथ" }, coords: [20.8880, 70.4012] },
  { id: "nagpur", name: { en: "Nagpur", kn: "ನಾಗಪುರ", hi: "नागपुर" }, coords: [21.1458, 79.0882] },
  { id: "puri", name: { en: "Puri", kn: "ಪುರಿ", hi: "पुरी" }, coords: [19.8135, 85.8312] },
  { id: "vijaya-nagar", name: { en: "Vijaynagar", kn: "ವಿಜಯನಗರ", hi: "विजयनगर" }, coords: [15.3350, 76.4600] },
  { id: "kanchi", name: { en: "Kanchi", kn: "ಕಾಂಚಿ", hi: "कांची" }, coords: [12.8342, 79.7036] }
];
