export interface CityGeometry {
  id: string;
  name: string;
  coords: [number, number];
}

export const citiesGeometry: CityGeometry[] = [
  { id: "takshashila", name: "Takshashila", coords: [33.745, 72.787] },
  { id: "amritsar", name: "Amritsar", coords: [31.634, 74.872] },
  { id: "indraprastha", name: "Indraprastha", coords: [28.6139, 77.2090] },
  { id: "mathura", name: "Mathura", coords: [27.4924, 77.6737] },
  { id: "ayodhya", name: "Ayodhya", coords: [26.7999, 82.2042] },
  { id: "vaishali", name: "Vaishali", coords: [25.9870, 85.1290] },
  { id: "patliputra", name: "Patliputra", coords: [25.5941, 85.1376] },
  { id: "prayag", name: "Prayag", coords: [25.4358, 81.8463] },
  { id: "gaya", name: "Gaya", coords: [24.7955, 85.0002] },
  { id: "avanthika", name: "Avanthika", coords: [23.1765, 75.7885] },
  { id: "dwarka", name: "Dwarka", coords: [22.2442, 68.9685] },
  { id: "somnath", name: "Somanath", coords: [20.8880, 70.4012] },
  { id: "nagpur", name: "Nagpur", coords: [21.1458, 79.0882] },
  { id: "puri", name: "Puri", coords: [19.8135, 85.8312] },
  { id: "vijayanagar", name: "Vijaynagar", coords: [15.3350, 76.4600] },
  { id: "kanchi", name: "Kanchi", coords: [12.8342, 79.7036] }
];
