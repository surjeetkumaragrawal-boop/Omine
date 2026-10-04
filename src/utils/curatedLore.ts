export interface NumberLorePayload {
  trivia: string[];
  historicalSignificance: string;
  quotesOrSayings: string[];
  cosmicOrPhysicsFact: string;
}

export const FAMOUS_LORE: Record<string, NumberLorePayload> = {
  '0': {
    trivia: [
      "The invention of zero as both a placeholder and an independent numerical value in 5th-century India transformed global arithmetic.",
      "Zero is the only real number that is neither positive nor negative, and dividing by it leads to mathematical undefinedness.",
      "In digital logic and information theory, zero represents the ground state or off-bit, fundamental to binary computing."
    ],
    historicalSignificance: "Indian mathematician Brahmagupta in 628 CE first defined arithmetic operations involving zero in the Brahmasphutasiddhanta, eventually transmitted via al-Khwarizmi to Europe.",
    quotesOrSayings: [
      "Zero is the silence from which all numbers speak.",
      "God created everything out of nothing, but the nothingness shows through. — Paul Valéry"
    ],
    cosmicOrPhysicsFact: "Absolute Zero (0 Kelvin / -273.15°C) is the thermodynamic threshold where all classical molecular kinetic movement halts."
  },
  '1': {
    trivia: [
      "One is the multiplicative identity: any number multiplied by 1 remains unchanged.",
      "In ancient Greek philosophy (Pythagoreanism), the Monad (1) represented the ultimate indivisible source of all creation.",
      "1 is neither a prime nor a composite number; it is classified in ring theory as a 'unit'."
    ],
    historicalSignificance: "Euclid's Elements foundational definitions begin with the Monad as 'that by virtue of which each of the things that exist is called one'.",
    quotesOrSayings: [
      "He who knows that the Monad is unity, understands the root of all truth. — Pythagoras"
    ],
    cosmicOrPhysicsFact: "The universe's cosmic density parameter Ω = 1 denotes a spatially flat universe, exactly balanced between perpetual expansion and eventual recollapse."
  },
  '2': {
    trivia: [
      "Two is the only even prime number and the smallest prime in existence.",
      "Serves as the foundation of binary arithmetic, digital electronics, and Boolean logic upon which modern computation runs.",
      "Any integer power of 2 represents a doubling step in exponential geometric progressions."
    ],
    historicalSignificance: "The Dyad in Pythagorean philosophy symbolized duality, mutability, and the bridge between unity and multiplicity.",
    quotesOrSayings: [
      "Two are better than one, because they have a good return for their labor. — Ecclesiastes",
      "Duality is the condition of all intellectual apprehension. — C.G. Jung"
    ],
    cosmicOrPhysicsFact: "Quantum mechanics dictates that fermions obey the Pauli Exclusion Principle, allowing at most 2 electrons of opposing spin per spatial orbital."
  },
  '3': {
    trivia: [
      "Three is the first odd prime and the smallest number of sides required to form a closed polygon in Euclidean 2D space (triangle).",
      "A natural harmony number across human folklore, architecture (trilithons), and classical storytelling (three wishes, Rule of Three).",
      "In topology, 3 is the dimension of the spatial manifold in which macro-scale physical reality unfolds."
    ],
    historicalSignificance: "Pythagoreans called 3 the 'Triad' and considered it the first true number because it possesses a beginning, a middle, and an end.",
    quotesOrSayings: [
      "Omne trium perfectum: Everything that comes in threes is perfect. — Latin proverb"
    ],
    cosmicOrPhysicsFact: "Baryonic matter (protons and neutrons) is composed of triplets of valence quarks bound together by quantum chromodynamic gluons."
  },
  '7': {
    trivia: [
      "Seven is the fourth prime number and the largest single-digit Mersenne prime (2³ - 1 = 7).",
      "Historically associated with the seven classical planets visible to the naked eye (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn).",
      "Forms the basis of the 7-day week, standardized across Babylonian, Roman, and global calendars."
    ],
    historicalSignificance: "From the Seven Wonders of the Ancient World to Newton's division of the visible spectrum into 7 colors, seven has recurrent cultural and optical significance.",
    quotesOrSayings: [
      "The seven liberal arts formed the core curriculum of classical and medieval university education."
    ],
    cosmicOrPhysicsFact: "There are 7 crystal systems in crystallography describing all symmetric 3D repeating lattices in solid-state physics."
  },
  '12': {
    trivia: [
      "Twelve is a sublime number with 6 divisors (1, 2, 3, 4, 6, 12), and its divisors sum to 28 (both 6 and 28 are perfect numbers).",
      "Used as the base in duodecimal counting, favored for having 4 non-trivial integer divisors (2, 3, 4, 6) compared to decimal's 2.",
      "Defines the hours of day and night, the months of the solar year, and the signs of the zodiac."
    ],
    historicalSignificance: "The ancient Sumerians and Babylonians used base-12 and base-60 systems, which still partition our clocks into 12 hours and 60 minutes.",
    quotesOrSayings: [
      "A dozen represents the most divisible compact grouping in trade and measurement."
    ],
    cosmicOrPhysicsFact: "The Standard Model of particle physics contains exactly 12 fundamental fermions (6 quarks and 6 leptons)."
  },
  '13': {
    trivia: [
      "Thirteen is the sixth prime number and a Fibonacci number (0, 1, 1, 2, 3, 5, 8, 13).",
      "The irrational fear of the number 13 is known as triskaidekaphobia, frequently leading to omitted 13th floors in architecture.",
      "An Archimedean solid has 13 distinct semi-regular convex polyhedral forms."
    ],
    historicalSignificance: "The Mayan calendar Tzolk'in utilized a cycle of 13 trecenas combined with 20 day names to structure sacred ritual time.",
    quotesOrSayings: [
      "Thirteen is considered unlucky by superstition, yet stands among the purest Fibonacci primes in mathematics."
    ],
    cosmicOrPhysicsFact: "The observable universe is approximately 13.787 billion years old according to Planck satellite cosmological measurements."
  },
  '28': {
    trivia: [
      "Twenty-eight is the second perfect number: 1 + 2 + 4 + 7 + 14 = 28.",
      "28 is the 7th triangular number: T₇ = 1 + 2 + 3 + 4 + 5 + 6 + 7 = 28.",
      "Approximates the orbital period of the Moon around Earth (27.3 sidereal days / 29.5 synodic days)."
    ],
    historicalSignificance: "Euclid proved in Elements Book IX that 2ᵖ⁻¹(2ᵖ - 1) generates an even perfect number whenever (2ᵖ - 1) is prime (for p = 3, 4 × 7 = 28).",
    quotesOrSayings: [
      "A perfect number is one which is equal to the sum of its own parts. — Euclid"
    ],
    cosmicOrPhysicsFact: "Nickel-28 is a nuclear magic number; nuclei with 28 protons or neutrons exhibit anomalously elevated binding energies and stability."
  },
  '42': {
    trivia: [
      "In Douglas Adams's 'The Hitchhiker's Guide to the Galaxy', 42 is the Answer to the Ultimate Question of Life, the Universe, and Everything.",
      "42 is the 5th Catalan number, which counts the number of ways to correctly parenthesize 4 pairs of parentheses.",
      "In 2019, mathematicians Andrew Booker and Andrew Sutherland solved the 65-year-old Diophantine problem: 42 was expressed as the sum of three cubes: (-80538738812075974)³ + 80435758145817515³ + 12602123297335631³ = 42."
    ],
    historicalSignificance: "The Gutenberg Bible, the first major book printed using mass-produced movable metal type in the West, was printed with 42 lines per column (the '42-line Bible').",
    quotesOrSayings: [
      "The Answer to the Ultimate Question of Life, the Universe, and Everything is 42. — Deep Thought, Douglas Adams",
      "There are 42 principles of Ma'at in ancient Egyptian mythology."
    ],
    cosmicOrPhysicsFact: "Rainbows form at an exact critical optical internal reflection angle of 42 degrees between sunlight and water droplets."
  },
  '73': {
    trivia: [
      "73 is the 21st prime number; its mirror, 37, is the 12th prime number, whose mirror is 21, which is the product of 7 and 3.",
      "In binary, 73 is a palindrome: 1001001₂ reads the same backwards and forwards.",
      "Known as the 'Sheldon Prime' from popular culture, proven by mathematicians Carl Pomerance and Chris Spicer in 2015 to be the unique number satisfying the Sheldon conjecture."
    ],
    historicalSignificance: "In radio communications and amateur telegraphy, 73 has been the standard Morse code abbreviation for 'Best Regards' since the 1859 National Telegraphic Convention.",
    quotesOrSayings: [
      "73 is the 21st prime. Its mirror, 37, is the 12th, and its mirror, 21, is the product of multiplying 7 and 3. In binary, 73 is a palindrome. — Sheldon Cooper"
    ],
    cosmicOrPhysicsFact: "Tantalum-73 is among the rarest stable elements in the universe, synthesized in the cores of asymptotic giant branch stars."
  },
  '108': {
    trivia: [
      "108 is a hyperfactorial: H(3) = 1¹ × 2² × 3³ = 1 × 4 × 27 = 108.",
      "In geometry, the interior angle of a regular planar pentagon is exactly 108 degrees.",
      "In Vedic cosmology, Buddhism, and Hinduism, 108 is sacred: prayer beads (malas) contain 108 beads, and sacred temples feature 108 steps or shrines."
    ],
    historicalSignificance: "Sanskrit traditions identify 108 marma points (vital energy intersections) in human anatomy and 108 Upanishads in classical philosophy.",
    quotesOrSayings: [
      "The sacred ratio of 108 unites geometry, the human form, and stellar distances."
    ],
    cosmicOrPhysicsFact: "The distance between the Earth and the Sun is roughly 108 times the diameter of the Sun, and the distance from Earth to the Moon is roughly 108 times the diameter of the Moon."
  },
  '137': {
    trivia: [
      "137 is the 33rd prime number and closely approximates the inverse of the fine-structure constant (α ≈ 1/137.035999).",
      "Physicist Richard Feynman called 137 'one of the greatest damn mysteries of physics: a magic number that comes to us with no understanding by man.'",
      "Wolfgang Pauli was obsessed with 137, collaborating with Carl Jung on its archetypal significance, and died in hospital room 137."
    ],
    historicalSignificance: "Introduced by Arnold Sommerfeld in 1916, 1/137 measures the coupling strength of electromagnetic interactions between elementary charged particles.",
    quotesOrSayings: [
      "There is a most profound and beautiful question associated with the observed coupling constant... It has been a mystery ever since it was discovered. — Richard Feynman"
    ],
    cosmicOrPhysicsFact: "Relativistic quantum mechanics shows that an element with atomic number Z = 137 (Untriseptium) would require 1s electrons to orbit faster than the speed of light in a Bohr model."
  },
  '144': {
    trivia: [
      "144 is 12² (one gross) and the 12th Fibonacci number; it is the only non-trivial Fibonacci number whose index matches its square root (F₁₂ = 12²).",
      "144 is a Harshad number: divisible by the sum of its digits (1 + 4 + 4 = 9, 144 / 9 = 16).",
      "A regular 144-sided polygon has an interior angle of 177.5 degrees."
    ],
    historicalSignificance: "Traditional commercial trade adopted the 'gross' (144 items) as a bulk shipping standard throughout Europe and the Americas.",
    quotesOrSayings: [
      "144 marks the confluence of the Fibonacci spiral with classical dozenal arithmetic."
    ],
    cosmicOrPhysicsFact: "The wavelength of neutral hydrogen radio emission in deep interstellar space (21 cm) corresponds to a photon frequency near 1,420 MHz."
  },
  '256': {
    trivia: [
      "256 is 2⁸, the exact number of distinct values representable by a single 8-bit digital byte (0 to 255).",
      "A composite power of two: 256 = 16² = 4⁴ = 2⁸.",
      "Central to RGB digital color spaces, where 256 gradations per color channel produce 16,777,216 distinct 24-bit colors."
    ],
    historicalSignificance: "The 8-bit microcomputer revolution (MOS 6502, Zilog Z80) was defined by 256-byte page boundaries and memory architecture.",
    quotesOrSayings: [
      "In binary computing, 256 represents the fundamental threshold of byte addressability."
    ],
    cosmicOrPhysicsFact: "In information theory, 256 states provide exactly 8 shannons (bits) of Shannon information entropy."
  },
  '1729': {
    trivia: [
      "Known worldwide as the Hardy-Ramanujan Taxicab Number: the smallest number expressible as the sum of two positive cubes in two different ways: 1729 = 1³ + 12³ = 9³ + 10³.",
      "When G.H. Hardy visited Srinivasa Ramanujan in hospital, he remarked that taxi number 1729 seemed dull; Ramanujan instantly replied that it was a very interesting number.",
      "1729 is also a Carmichael number (a pseudoprime satisfying Fermat's Little Theorem for all coprime bases) and a Harshad number (1 + 7 + 2 + 9 = 19; 1729 / 19 = 91)."
    ],
    historicalSignificance: "The famous hospital exchange between Hardy and Ramanujan in 1918 became one of the most celebrated anecdotes in the history of mathematics.",
    quotesOrSayings: [
      "It is a very interesting number; it is the smallest number expressible as the sum of two cubes in two different ways. — Srinivasa Ramanujan"
    ],
    cosmicOrPhysicsFact: "Diophantine elliptic curves associated with Ramanujan's cubic identities find deep applications in quantum field theory and string theory compactification."
  },
  '6174': {
    trivia: [
      "Known as Kaprekar's Constant. Taking any 4-digit number with at least two distinct digits, ordering digits descending then ascending and subtracting, always reaches 6174 in at most 7 steps.",
      "Once 6174 is reached, 7641 - 1467 = 6174 (an arithmetic black hole attractor).",
      "Discovered in 1949 by Indian recreational mathematician Dattatreya Ramachandra Kaprekar."
    ],
    historicalSignificance: "D.R. Kaprekar presented this discovery at the 1949 Mathematical Conference in Madras, demonstrating profound recursive structure in simple base-10 arithmetic.",
    quotesOrSayings: [
      "6174 is the inevitable numerical black hole of four-digit base-10 arithmetic."
    ],
    cosmicOrPhysicsFact: "Attractor dynamics in recursive arithmetic mirror limit cycles and strange attractors found in non-linear dynamical chaos theory."
  },
  '2026': {
    trivia: [
      "2026 factors into 2 × 1013, making it a semiprime (the product of two distinct primes).",
      "2026 is an untouchable candidate and deficient number: its proper divisors are 1, 2, and 1013, which sum to 1016 (less than 2026).",
      "The year 2026 in the Gregorian calendar began on a Thursday."
    ],
    historicalSignificance: "2026 marks humanity's accelerating era of artificial intelligence systems, quantum computing milestones, and planned crewed lunar exploration missions under the Artemis program.",
    quotesOrSayings: [
      "The future is already here — it's just not evenly distributed. — William Gibson"
    ],
    cosmicOrPhysicsFact: "In 2026, astronomical observatories such as the Vera C. Rubin Observatory and James Webb Space Telescope explore dark matter and the cosmic dawn."
  }
};

function isPrimeNumber(n: number): boolean {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

export function generateAlgorithmicLore(val: string): NumberLorePayload {
  const cleanVal = val.trim();
  if (FAMOUS_LORE[cleanVal]) {
    return FAMOUS_LORE[cleanVal];
  }

  const num = Number(cleanVal);
  const isInt = Number.isInteger(num);
  const absNum = Math.abs(num);

  const trivia: string[] = [];

  if (isInt) {
    const primeStatus = isPrimeNumber(absNum);

    if (primeStatus) {
      trivia.push(`${num} is a fundamental prime number, indivisible except by 1 and itself, forming one of the immutable building blocks of arithmetic.`);
    } else if (num % 2 === 0) {
      trivia.push(`${num} is an even integer, divisible symmetrically into two equal parts of ${num / 2}.`);
    } else {
      trivia.push(`${num} is an odd composite integer, leaving a remainder of 1 upon Euclidean division by 2.`);
    }

    if (num > 0) {
      const sq = num * num;
      trivia.push(`Its square is ${sq.toLocaleString()}, and its cube is ${(sq * num).toLocaleString()}.`);
    }

    // Binary bit count
    const binStr = absNum.toString(2);
    const ones = binStr.split('').filter(c => c === '1').length;
    trivia.push(`In binary notation, ${cleanVal} is encoded as ${binStr}₂, possessing a Hamming weight of ${ones} set bit${ones === 1 ? '' : 's'}.`);

    // Digital root
    const digits = String(absNum).split('');
    const dSum = digits.reduce((a, b) => a + parseInt(b, 10), 0);
    const digitalRoot = ((absNum - 1) % 9) + 1;
    trivia.push(`The sum of its decimal digits is ${dSum}, yielding a digital root of ${digitalRoot}.`);
  } else if (!isNaN(num)) {
    trivia.push(`${num} represents a real continuous quantity, positioned between ${Math.floor(num)} and ${Math.ceil(num)} on the number line.`);
    trivia.push(`Its reciprocal (1/x) is ${(1 / num).toPrecision(6)}, foundational in harmonic analysis and inverse proportion.`);
    trivia.push(`Expressed in normalized scientific notation, it is written as ${num.toExponential(4)}.`);
  } else {
    trivia.push(`Mathematical constant and symbolic representation: ${cleanVal}.`);
    trivia.push(`Quantities of this class govern analytical functions, geometry, and transcendental algebra.`);
  }

  const historicalSignificance = isInt
    ? `From ancient Babylonian clay tablets and Pythagorean number theory to modern cryptography, integers like ${cleanVal} structure how human civilizations quantify resources, time, and coordinates.`
    : `In the evolution of mathematical analysis from Archimedes to Newton and Leibniz, continuous quantities like ${cleanVal} paved the way for infinitesimal calculus and physics.`;

  return {
    trivia,
    historicalSignificance,
    quotesOrSayings: [
      "Numbers rule the universe. — Pythagoras",
      "God created the integers, all else is the work of man. — Leopold Kronecker"
    ],
    cosmicOrPhysicsFact: isInt && num > 0 && num <= 118
      ? `On the periodic table of elements, atomic number Z = ${num} corresponds to the chemical element and nuclear structure of ${cleanVal} protons.`
      : `In physical cosmology, dimensionless ratios and numeric scale factors dictate the fundamental stability of atoms and stellar nucleosynthesis across the cosmos.`
  };
}
