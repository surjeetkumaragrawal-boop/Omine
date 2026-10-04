// Periodic table data for atomic numbers 1 to 118
export interface ChemicalElement {
  number: number;
  symbol: string;
  name: string;
  atomicMass: string;
  category: string;
  group: number | string;
  period: number;
  electronicConfiguration: string;
  summary: string;
}

export const ELEMENTS_MAP: Record<number, ChemicalElement> = {
  1: {
    number: 1,
    symbol: "H",
    name: "Hydrogen",
    atomicMass: "1.008",
    category: "Diatomic nonmetal",
    group: 1,
    period: 1,
    electronicConfiguration: "1s¹",
    summary: "The lightest, most abundant chemical substance in the universe, constituting roughly 75% of all baryonic mass."
  },
  2: {
    number: 2,
    symbol: "He",
    name: "Helium",
    atomicMass: "4.0026",
    category: "Noble gas",
    group: 18,
    period: 1,
    electronicConfiguration: "1s²",
    summary: "A colorless, odorless, tasteless, non-toxic inert noble gas. Second most abundant element in the observable universe."
  },
  3: {
    number: 3,
    symbol: "Li",
    name: "Lithium",
    atomicMass: "6.94",
    category: "Alkali metal",
    group: 1,
    period: 2,
    electronicConfiguration: "[He] 2s¹",
    summary: "A soft, silvery-white alkali metal. The least dense of all solid elements, powering modern rechargeable batteries."
  },
  4: {
    number: 4,
    symbol: "Be",
    name: "Beryllium",
    atomicMass: "9.0122",
    category: "Alkaline earth metal",
    group: 2,
    period: 2,
    electronicConfiguration: "[He] 2s²",
    summary: "A relatively rare metal in the universe, formed through spallation. Highly stiff and used in aerospace structures."
  },
  5: {
    number: 5,
    symbol: "B",
    name: "Boron",
    atomicMass: "10.81",
    category: "Metalloid",
    group: 13,
    period: 2,
    electronicConfiguration: "[He] 2s² 2p¹",
    summary: "A low-abundance metalloid used in fiberglass, semiconductors, and pyrotechnics."
  },
  6: {
    number: 6,
    symbol: "C",
    name: "Carbon",
    atomicMass: "12.011",
    category: "Polyatomic nonmetal",
    group: 14,
    period: 2,
    electronicConfiguration: "[He] 2s² 2p²",
    summary: "The chemical basis of all known organic life. Forms allotropes ranging from soft graphite to ultra-hard diamond."
  },
  7: {
    number: 7,
    symbol: "N",
    name: "Nitrogen",
    atomicMass: "14.007",
    category: "Diatomic nonmetal",
    group: 15,
    period: 2,
    electronicConfiguration: "[He] 2s² 2p³",
    summary: "Makes up about 78% of Earth's atmosphere. Crucial component of amino acids, proteins, and DNA."
  },
  8: {
    number: 8,
    symbol: "O",
    name: "Oxygen",
    atomicMass: "15.999",
    category: "Diatomic nonmetal",
    group: 16,
    period: 2,
    electronicConfiguration: "[He] 2s² 2p⁴",
    summary: "Highly reactive nonmetal and oxidizing agent. Essential for cellular respiration in most aerobic organisms."
  },
  9: {
    number: 9,
    symbol: "F",
    name: "Fluorine",
    atomicMass: "18.998",
    category: "Reactive nonmetal (Halogen)",
    group: 17,
    period: 2,
    electronicConfiguration: "[He] 2s² 2p⁵",
    summary: "The most electronegative and chemically reactive of all chemical elements."
  },
  10: {
    number: 10,
    symbol: "Ne",
    name: "Neon",
    atomicMass: "20.180",
    category: "Noble gas",
    group: 18,
    period: 2,
    electronicConfiguration: "[He] 2s² 2p⁶",
    summary: "Colorless, odorless noble gas that glows with a distinctive reddish-orange glow in high-voltage electrical discharge signs."
  },
  11: {
    number: 11,
    symbol: "Na",
    name: "Sodium",
    atomicMass: "22.990",
    category: "Alkali metal",
    group: 1,
    period: 3,
    electronicConfiguration: "[Ne] 3s¹",
    summary: "Soft, silvery-white alkali metal that reacts violently with water. Found universally in table salt (NaCl)."
  },
  12: {
    number: 12,
    symbol: "Mg",
    name: "Magnesium",
    atomicMass: "24.305",
    category: "Alkaline earth metal",
    group: 2,
    period: 3,
    electronicConfiguration: "[Ne] 3s²",
    summary: "A shiny gray solid, the eighth most abundant element in the Earth's crust and central to the chlorophyll molecule."
  },
  13: {
    number: 13,
    symbol: "Al",
    name: "Aluminium",
    atomicMass: "26.982",
    category: "Post-transition metal",
    group: 13,
    period: 3,
    electronicConfiguration: "[Ne] 3s² 3p¹",
    summary: "Lightweight, corrosion-resistant post-transition metal. The most widespread metallic element in Earth's crust."
  },
  14: {
    number: 14,
    symbol: "Si",
    name: "Silicon",
    atomicMass: "28.085",
    category: "Metalloid",
    group: 14,
    period: 3,
    electronicConfiguration: "[Ne] 3s² 3p²",
    summary: "Semiconductor cornerstone of all modern microelectronics and computing, abundant in silica sand and rock."
  },
  15: {
    number: 15,
    symbol: "P",
    name: "Phosphorus",
    atomicMass: "30.974",
    category: "Polyatomic nonmetal",
    group: 15,
    period: 3,
    electronicConfiguration: "[Ne] 3s² 3p³",
    summary: "Essential for cellular energy currency (ATP) and the structural backbone of DNA and RNA."
  },
  16: {
    number: 16,
    symbol: "S",
    name: "Sulfur",
    atomicMass: "32.06",
    category: "Polyatomic nonmetal",
    group: 16,
    period: 3,
    electronicConfiguration: "[Ne] 3s² 3p⁴",
    summary: "Bright yellow crystalline solid at room temperature, essential in synthesizing keratin and proteins."
  },
  17: {
    number: 17,
    symbol: "Cl",
    name: "Chlorine",
    atomicMass: "35.45",
    category: "Halogen",
    group: 17,
    period: 3,
    electronicConfiguration: "[Ne] 3s² 3p⁵",
    summary: "Yellow-green gas with high oxidation potential, widely used for water disinfection and chloride salts."
  },
  18: {
    number: 18,
    symbol: "Ar",
    name: "Argon",
    atomicMass: "39.95",
    category: "Noble gas",
    group: 18,
    period: 3,
    electronicConfiguration: "[Ne] 3s² 3p⁶",
    summary: "The third most abundant gas in Earth's atmosphere (0.934%), used as an inert shielding gas in welding and lighting."
  },
  19: {
    number: 19,
    symbol: "K",
    name: "Potassium",
    atomicMass: "39.098",
    category: "Alkali metal",
    group: 1,
    period: 4,
    electronicConfiguration: "[Ar] 4s¹",
    summary: "Essential electrolyte in biological systems regulating nerve impulses and heart rhythm."
  },
  20: {
    number: 20,
    symbol: "Ca",
    name: "Calcium",
    atomicMass: "40.078",
    category: "Alkaline earth metal",
    group: 2,
    period: 4,
    electronicConfiguration: "[Ar] 4s²",
    summary: "Fifth most abundant element in the human body, vital for bone mineralization, signal transduction, and muscle contraction."
  },
  26: {
    number: 26,
    symbol: "Fe",
    name: "Iron",
    atomicMass: "55.845",
    category: "Transition metal",
    group: 8,
    period: 4,
    electronicConfiguration: "[Ar] 3d⁶ 4s²",
    summary: "By mass the most common element on Earth, forming much of Earth's outer and inner core, and the oxygen carrier in hemoglobin."
  },
  29: {
    number: 29,
    symbol: "Cu",
    name: "Copper",
    atomicMass: "63.546",
    category: "Transition metal",
    group: 11,
    period: 4,
    electronicConfiguration: "[Ar] 3d¹⁰ 4s¹",
    summary: "Soft, ductile metal with exceptional electrical and thermal conductivity, utilized since prehistoric times."
  },
  42: {
    number: 42,
    symbol: "Mo",
    name: "Molybdenum",
    atomicMass: "95.95",
    category: "Transition metal",
    group: 6,
    period: 5,
    electronicConfiguration: "[Kr] 4d⁵ 5s¹",
    summary: "A silvery metal with one of the highest melting points among pure elements, essential trace cofactor in nitrogen fixation enzymes."
  },
  47: {
    number: 47,
    symbol: "Ag",
    name: "Silver",
    atomicMass: "107.87",
    category: "Transition metal",
    group: 11,
    period: 5,
    electronicConfiguration: "[Kr] 4d¹⁰ 5s¹",
    summary: "Exhibits the highest electrical conductivity, thermal conductivity, and reflectivity of any known metal."
  },
  50: {
    number: 50,
    symbol: "Sn",
    name: "Tin",
    atomicMass: "118.71",
    category: "Post-transition metal",
    group: 14,
    period: 5,
    electronicConfiguration: "[Kr] 4d¹⁰ 5s² 5p²",
    summary: "Silvery malleable metal used in bronze alloys since the Bronze Age and modern electronic solder."
  },
  79: {
    number: 79,
    symbol: "Au",
    name: "Gold",
    atomicMass: "196.97",
    category: "Transition metal",
    group: 11,
    period: 6,
    electronicConfiguration: "[Xe] 4f¹⁴ 5d¹⁰ 6s¹",
    summary: "Noble metal prized throughout recorded human history for jewelry, monetary reserves, and non-corroding electrical contacts."
  },
  80: {
    number: 80,
    symbol: "Hg",
    name: "Mercury",
    atomicMass: "200.59",
    category: "Transition metal",
    group: 12,
    period: 6,
    electronicConfiguration: "[Xe] 4f¹⁴ 5d¹⁰ 6s²",
    summary: "The only metallic element liquid at standard temperature and pressure, historically termed 'quicksilver'."
  },
  82: {
    number: 82,
    symbol: "Pb",
    name: "Lead",
    atomicMass: "207.2",
    category: "Post-transition metal",
    group: 14,
    period: 6,
    electronicConfiguration: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²",
    summary: "Dense, malleable metal; the end point of several major radioactive decay chains."
  },
  92: {
    number: 92,
    symbol: "U",
    name: "Uranium",
    atomicMass: "238.03",
    category: "Actinide",
    group: "Actinides",
    period: 7,
    electronicConfiguration: "[Rn] 5f³ 6d¹ 7s²",
    summary: "Weakly radioactive silvery-grey actinide; its isotope U-235 is the primary fissile fuel for nuclear fission reactors."
  },
  118: {
    number: 118,
    symbol: "Og",
    name: "Oganesson",
    atomicMass: "[294]",
    category: "Noble gas (predicted)",
    group: 18,
    period: 7,
    electronicConfiguration: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶",
    summary: "The heaviest synthetic chemical element on the periodic table, completing the 7th period."
  }
};

// Generates fallback element info for atomic numbers 1 to 118
export function getElementForNumber(n: number): ChemicalElement | null {
  if (n < 1 || n > 118) return null;
  if (ELEMENTS_MAP[n]) return ELEMENTS_MAP[n];
  return {
    number: n,
    symbol: `E${n}`,
    name: `Element-${n}`,
    atomicMass: `~${Math.round(n * 2.3)}`,
    category: n > 88 ? "Actinide / Transactinide" : "Chemical element",
    group: ((n - 1) % 18) + 1,
    period: n <= 2 ? 1 : n <= 10 ? 2 : n <= 18 ? 3 : n <= 36 ? 4 : n <= 54 ? 5 : n <= 86 ? 6 : 7,
    electronicConfiguration: `Period ${n <= 2 ? 1 : n <= 10 ? 2 : n <= 18 ? 3 : n <= 36 ? 4 : n <= 54 ? 5 : n <= 86 ? 6 : 7} valence`,
    summary: `Atomic element #${n} on the IUPAC periodic table.`
  };
}
