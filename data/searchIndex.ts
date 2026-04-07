import { cityKnowledge } from "./cityKnowledge";
import { mountainKnowledge } from "./mountainKnowledge";
import { riverKnowledge } from "./riverKnowledge";

export type SearchItem = {
  id: string;
  type: "mountain" | "river" | "city";
  title: {
    en: string;
    kn: string;
    hi: string;
  };
  keywords: string[];
  importance: number;
};

const cities: SearchItem[] = Object.values(cityKnowledge).map((city) => ({
  id: city.id,
  type: "city",
  title: city.title,
  keywords: [
    city.id,
    ...city.title.en.toLowerCase().split(" "),
    ...city.tagline.en.toLowerCase().split(" "),
    ...city.meta.en.toLowerCase().split(" "),
    ...city.identity.region.en.toLowerCase().split(" "),
    ...(city.id === "ayodhya" ? ["ram janmabhoomi", "saryu", "rama", "birthplace"] : []),
    ...(city.id === "takshashila" ? ["university", "learning", "gandhara", "taxila"] : []),
    ...(city.id === "amritsar" ? ["golden temple", "sikhism", "punjab", "harmandir"] : []),
    ...(city.id === "mathura" ? ["krishna", "birthplace", "yamuna", "vrindavan", "braj"] : []),
    ...(city.id === "indraprastha" ? ["pandavas", "delhi", "mahabharata", "epic"] : []),
    ...(city.id === "prayag" ? ["sangam", "confluence", "triveni", "kumbh", "allahabad"] : []),
    ...(city.id === "vaishali" ? ["republic", "buddha", "mahavira", "jainism"] : []),
    ...(city.id === "patliputra" ? ["patna", "magadha", "maurya", "gupta", "empire"] : []),
    ...(city.id === "gaya" ? ["moksha", "pind daan", "ancestors", "phalgu", "shradh"] : []),
    ...(city.id === "dwarka" ? ["krishna", "submerged", "coastal", "char dham", "gujarat"] : []),
    ...(city.id === "somnath" ? ["jyotirlinga", "shiva", "shrine", "prabhas patan"] : []),
    ...(city.id === "avanthika" ? ["ujjain", "mahakal", "jyotirlinga", "shipra", "vikramaditya"] : []),
    ...(city.id === "nagpur" ? ["vidarbha", "center", "maharashtra"] : []),
    ...(city.id === "puri" ? ["jagannath", "chariot", "odisha", "east", "char dham"] : []),
    ...(city.id === "vijayanagar" ? ["hampi", "ruins", "tunga", "empire", "karnataka"] : []),
    ...(city.id === "kanchi" ? ["kanchipuram", "silk", "pallava", "temple city", "tamil nadu"] : []),
  ],
  importance: city.id === "prayag" || city.id === "ayodhya" || city.id === "avanthika" || city.id === "mathura" ? 10 : 8,
}));

const mountains: SearchItem[] = Object.values(mountainKnowledge).map((m) => ({
  id: m.id,
  type: "mountain",
  title: m.title,
  keywords: [
    m.id,
    ...m.title.en.toLowerCase().split(" "),
    ...m.subtitle.en.toLowerCase().split(" "),
    ...(m.id === "himalaya" ? ["snow", "shiva", "everest", "highest", "range", "north", "himavat"] : []),
    ...(m.id === "sahyadri" ? ["western ghats", "coastal", "monsoon", "shivaji", "maratha"] : []),
    ...(m.id === "aravalli" ? ["ancient", "rajasthan", "desert", "hills", "guru shikhar"] : []),
    ...(m.id === "vindhya" ? ["central", "divide", "barrier", "forest", "agastya"] : []),
    ...(m.id === "malaya" ? ["south", "sandalwood", "hills", "fragrant", "breeze"] : []),
    ...(m.id === "mahendra" ? ["eastern ghats", "parashurama", "odisha", "mahendragiri"] : []),
  ],
  importance: m.id === "himalaya" ? 10 : 7,
}));

const rivers: SearchItem[] = Object.values(riverKnowledge).map((r) => ({
  id: r.id,
  type: "river",
  title: r.title,
  keywords: [
    r.id,
    ...r.title.en.toLowerCase().split(" "),
    ...r.subtitle.en.toLowerCase().split(" "),
    ...(r.id === "sindhu" ? ["indus", "origin", "civilization", "north", "sapta sindhu"] : []),
    ...(r.id === "ganga" ? ["ganges", "holy", "purity", "mother", "shiva", "bhagirathi"] : []),
    ...(r.id === "saraswati" ? ["lost", "vedic", "invisible", "knowledge", "ghaggar"] : []),
    ...(r.id === "yamuna" ? ["jamuna", "krishna", "tributary", "kalindi"] : []),
    ...(r.id === "narmada" ? ["rewa", "central", "parikrama", "shiva", "mekala"] : []),
    ...(r.id === "brahmaputra" ? ["tsangpo", "east", "assam", "massive"] : []),
    ...(r.id === "godavari" ? ["dakshin ganga", "south", "nasik", "trimbak"] : []),
    ...(r.id === "krishna" ? ["deccan", "vijayawada", "south", "venna"] : []),
    ...(r.id === "kaveri" ? ["cauvery", "south", "holy", "karnataka", "tamil nadu", "ponni"] : []),
    ...(r.id === "gandaki" ? ["shaligram", "nepal", "tributary", "narayani"] : []),
    ...(r.id === "mahanadi" ? ["chhattisgarh", "odisha", "delta"] : []),
  ],
  importance: r.id === "ganga" || r.id === "saraswati" || r.id === "sindhu" ? 10 : 8,
}));

export const SEARCH_INDEX: SearchItem[] = [...cities, ...mountains, ...rivers];
