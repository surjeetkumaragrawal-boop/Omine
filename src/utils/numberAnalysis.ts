import { numberToWords, numberToOrdinal, numberToRoman } from './numberToWords';
import { getElementForNumber, ChemicalElement } from './elementsData';

export interface PrimeFactorItem {
  factor: number;
  power: number;
}

export interface CollatzResult {
  steps: number;
  peak: number;
  trajectory: number[];
  cycleReached: boolean;
}

export interface HappyResult {
  isHappy: boolean;
  steps: number;
  path: number[];
}

export interface NumberAnalysis {
  rawInput: string;
  parsedNumber: number;
  bigIntValue: bigint | null;
  isInteger: boolean;
  isNegative: boolean;
  isZero: boolean;
  isDecimal: boolean;
  isSafeInteger: boolean;

  // Cardinal & Ordinal
  inWords: string;
  ordinal: string;
  romanNumeral: string;

  // Math Classifications
  sign: 'Positive' | 'Negative' | 'Zero';
  parity: 'Even' | 'Odd' | 'N/A';
  isPrime: boolean;
  isPrimeClassification: string;
  primeIndex: number | null;
  nextPrime: number | null;
  prevPrime: number | null;
  primeFactors: PrimeFactorItem[];
  primeFactorizationFormula: string;

  // Divisors
  divisors: number[];
  divisorCount: number;
  divisorSum: number;
  aliquotSum: number;
  divisorClassification: 'Perfect' | 'Abundant' | 'Deficient' | 'N/A';
  abundanceIndex: number | null;

  // Figurate & Sequences
  isSquare: boolean;
  squareRoot: number;
  isCube: boolean;
  cubeRoot: number;
  isTriangular: boolean;
  triangularRoot: number | null;
  isPentagonal: boolean;
  isHexagonal: boolean;
  isFibonacci: boolean;
  fibonacciIndex: number | null;
  closestFibonacci: [number, number] | null;
  isPowerOfTwo: boolean;
  powerOfTwoExponent: number | null;
  isPowerOfTen: boolean;
  powerOfTenExponent: number | null;
  isFactorial: boolean;
  factorialBase: number | null;

  // Digital & Fun Properties
  isPalindromic10: boolean;
  isPalindromic2: boolean;
  isArmstrong: boolean;
  isHarshad: boolean;
  digitSum: number;
  digitCount: number;
  isAutomorphic: boolean;
  happyStatus: HappyResult;
  collatz: CollatzResult | null;

  // Bases
  binary: string;
  octal: string;
  hexadecimal: string;
  base36: string;
  hammingWeight: number | null; // active bit count
  hexColor: string | null;

  // Notations
  scientificNotation: string;
  engineeringNotation: string;

  // Physics & Real World
  element: ChemicalElement | null;
  asSecondsFormatted: string;
  asBytesFormatted: string;
  asMetersFormatted: string;
  calendarDay: { month: string; day: number; note?: string } | null;
  yearHistoricalNote: string | null;

  // Geometry
  angleRadians: number;
  angleSin: number;
  angleCos: number;
  angleTan: number;
}

// Check square
function isPerfectSquare(n: number): { isSquare: boolean; root: number } {
  if (n < 0) return { isSquare: false, root: NaN };
  const root = Math.round(Math.sqrt(n));
  return { isSquare: root * root === n, root };
}

// Miller-Rabin test for primality up to large numbers
function millerRabin(n: bigint, k: number = 5): boolean {
  if (n <= 1n) return false;
  if (n <= 3n) return true;
  if (n % 2n === 0n || n % 3n === 0n) return false;

  let d = n - 1n;
  let s = 0n;
  while (d % 2n === 0n) {
    d /= 2n;
    s += 1n;
  }

  const bases = [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n];
  for (const a of bases) {
    if (n <= a) break;
    let x = modPow(a, d, n);
    if (x === 1n || x === n - 1n) continue;

    let composite = true;
    for (let r = 1n; r < s; r++) {
      x = modPow(x, 2n, n);
      if (x === n - 1n) {
        composite = false;
        break;
      }
    }
    if (composite) return false;
  }
  return true;
}

function modPow(base: bigint, exp: bigint, mod: bigint): bigint {
  let res = 1n;
  base = base % mod;
  while (exp > 0n) {
    if (exp % 2n === 1n) res = (res * base) % mod;
    base = (base * base) % mod;
    exp /= 2n;
  }
  return res;
}

// Sieve or prime index calculator for small numbers
function getPrimeIndex(n: number): number | null {
  if (n < 2 || n > 100000) return null;
  let count = 0;
  for (let i = 2; i <= n; i++) {
    if (millerRabin(BigInt(i))) {
      count++;
      if (i === n) return count;
    }
  }
  return null;
}

function findNextPrime(n: number): number | null {
  if (n < 2) return 2;
  if (n > 10000000) return null;
  let candidate = Math.floor(n) + 1;
  while (candidate <= n + 1000) {
    if (millerRabin(BigInt(candidate))) return candidate;
    candidate++;
  }
  return null;
}

function findPrevPrime(n: number): number | null {
  if (n <= 2) return null;
  let candidate = Math.floor(n) - 1;
  while (candidate >= 2) {
    if (millerRabin(BigInt(candidate))) return candidate;
    candidate--;
  }
  return null;
}

function computePrimeFactors(n: number): PrimeFactorItem[] {
  let val = Math.abs(Math.floor(n));
  if (val <= 1 || val > 1000000000) return [];
  const factors: Record<number, number> = {};

  while (val % 2 === 0) {
    factors[2] = (factors[2] || 0) + 1;
    val = Math.floor(val / 2);
  }

  let d = 3;
  while (d * d <= val) {
    while (val % d === 0) {
      factors[d] = (factors[d] || 0) + 1;
      val = Math.floor(val / d);
    }
    d += 2;
  }

  if (val > 1) {
    factors[val] = (factors[val] || 0) + 1;
  }

  return Object.entries(factors).map(([f, p]) => ({
    factor: Number(f),
    power: p,
  })).sort((a, b) => a.factor - b.factor);
}

function computeDivisors(n: number): { divisors: number[]; count: number; sum: number } {
  const val = Math.abs(Math.floor(n));
  if (val === 0) return { divisors: [], count: 0, sum: 0 };
  if (val > 10000000) {
    // Large number approximation
    return { divisors: [1, val], count: 2, sum: 1 + val };
  }

  const list: number[] = [];
  let sum = 0;
  const limit = Math.sqrt(val);

  for (let i = 1; i <= limit; i++) {
    if (val % i === 0) {
      list.push(i);
      sum += i;
      const counterpart = val / i;
      if (counterpart !== i) {
        list.push(counterpart);
        sum += counterpart;
      }
    }
  }

  list.sort((a, b) => a - b);
  return { divisors: list, count: list.length, sum };
}

// Collatz orbit
function computeCollatz(n: number): CollatzResult | null {
  if (!Number.isInteger(n) || n <= 0 || n > 1000000000) return null;
  let curr = n;
  const trajectory: number[] = [curr];
  let peak = curr;
  let steps = 0;
  const maxSteps = 1000;

  while (curr !== 1 && steps < maxSteps) {
    if (curr % 2 === 0) {
      curr = curr / 2;
    } else {
      curr = 3 * curr + 1;
    }
    if (curr > peak) peak = curr;
    steps++;
    if (trajectory.length < 250) {
      trajectory.push(curr);
    }
  }

  return {
    steps,
    peak,
    trajectory,
    cycleReached: curr === 1,
  };
}

// Happy number
function computeHappy(n: number): HappyResult {
  const val = Math.abs(Math.floor(n));
  if (val === 0) return { isHappy: false, steps: 0, path: [0] };
  const seen = new Set<number>();
  const path: number[] = [val];
  let curr = val;

  while (curr !== 1 && !seen.has(curr) && path.length < 50) {
    seen.add(curr);
    let next = 0;
    const digits = String(curr).split('');
    for (const d of digits) {
      const dig = parseInt(d, 10);
      next += dig * dig;
    }
    curr = next;
    path.push(curr);
  }

  return {
    isHappy: curr === 1,
    steps: path.length - 1,
    path,
  };
}

// Fibonacci checks
function isFibonacciNumber(n: number): { isFib: boolean; index: number | null; closest: [number, number] | null } {
  if (n < 0 || !Number.isInteger(n)) return { isFib: false, index: null, closest: null };
  if (n === 0) return { isFib: true, index: 0, closest: [0, 1] };
  if (n === 1) return { isFib: true, index: 1, closest: [1, 2] };

  let a = 0;
  let b = 1;
  let idx = 1;
  while (b < n) {
    const next = a + b;
    a = b;
    b = next;
    idx++;
  }

  if (b === n) {
    return { isFib: true, index: idx, closest: [a, a + b] };
  }
  return { isFib: false, index: null, closest: [a, b] };
}

// Scientific & Engineering notation
function toScientific(n: number): string {
  if (n === 0) return '0';
  const exp = Math.floor(Math.log10(Math.abs(n)));
  const mantissa = n / Math.pow(10, exp);
  return `${mantissa.toFixed(4).replace(/\.?0+$/, '')} × 10^${exp}`;
}

function toEngineering(n: number): string {
  if (n === 0) return '0';
  const exp = Math.floor(Math.log10(Math.abs(n)));
  const engExp = Math.floor(exp / 3) * 3;
  const mantissa = n / Math.pow(10, engExp);
  return `${mantissa.toFixed(4).replace(/\.?0+$/, '')} × 10^${engExp}`;
}

// Seconds formatter
function formatSeconds(secs: number): string {
  if (secs <= 0) return '0 seconds';
  const s = Math.abs(secs);
  if (s < 60) return `${s.toFixed(2)} seconds`;
  if (s < 3600) return `${Math.floor(s / 60)}m ${Math.floor(s % 60)}s`;
  if (s < 86400) {
    const hrs = Math.floor(s / 3600);
    const mins = Math.floor((s % 3600) / 60);
    return `${hrs}h ${mins}m`;
  }
  if (s < 31536000) {
    const days = Math.floor(s / 86400);
    const hrs = Math.floor((s % 86400) / 3600);
    return `${days} days ${hrs} hours`;
  }
  const years = (s / 31536000).toFixed(2);
  return `${years} earth years`;
}

// Bytes formatter
function formatBytes(bytes: number): string {
  if (bytes < 0) return 'N/A';
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  if (i >= sizes.length) return `${(bytes / Math.pow(k, sizes.length - 1)).toFixed(2)} ${sizes[sizes.length - 1]}`;
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

// Meters formatter
function formatMeters(m: number): string {
  const absM = Math.abs(m);
  if (absM === 0) return '0 meters';
  if (absM < 1e-9) return `${(absM * 1e12).toFixed(2)} picometers (subatomic)`;
  if (absM < 1e-6) return `${(absM * 1e9).toFixed(2)} nanometers (molecular scale)`;
  if (absM < 1e-3) return `${(absM * 1e6).toFixed(2)} micrometers (cellular scale)`;
  if (absM < 1) return `${(absM * 100).toFixed(2)} centimeters`;
  if (absM < 1000) return `${absM.toFixed(2)} meters`;
  if (absM < 1e6) return `${(absM / 1000).toFixed(2)} km`;
  if (absM < 1e9) return `${(absM / 1000).toLocaleString()} km (planetary distance)`;
  if (absM < 1e12) return `${(absM / 1.496e11).toFixed(3)} Astronomical Units (AU)`;
  return `${(absM / 9.461e15).toExponential(3)} Light-Years`;
}

// Calendar day lookup
function getDayOfYear(n: number): { month: string; day: number; note?: string } | null {
  if (!Number.isInteger(n) || n < 1 || n > 366) return null;
  const d = new Date(2024, 0); // Leap year 2024 has 366 days
  d.setDate(n);
  const month = d.toLocaleString('en-US', { month: 'long' });
  const day = d.getDate();

  let note: string | undefined;
  if (n === 1) note = "New Year's Day";
  else if (n === 73) note = 'Pi Day (March 14 in non-leap years)';
  else if (n === 256) note = "Programmer's Day (2⁸-th day of year)";
  else if (n === 365) note = "New Year's Eve (Day 365)";

  return { month, day, note };
}

// Year in history lookup
function getYearHistoricalNote(y: number): string | null {
  if (!Number.isInteger(y) || y < -10000 || y > 3000) return null;
  const yearNotes: Record<number, string> = {
    0: 'Astronomical year 0 corresponds to 1 BCE.',
    1: 'Traditional start of the Anno Domini (AD) era.',
    42: 'Roman Emperor Claudius begins Roman conquest of Britain (approx 43 AD).',
    108: 'Roman Empire under Emperor Trajan expands to near its territorial zenith.',
    1066: 'Norman Conquest of England (Battle of Hastings).',
    1492: 'Columbus arrives in the Americas; Fall of Granada.',
    1666: 'Great Fire of London and Newton’s Annus Mirabilis in optics/calculus.',
    1776: 'United States Declaration of Independence signed.',
    1789: 'Beginning of the French Revolution and Fall of the Bastille.',
    1914: 'Outbreak of World War I.',
    1928: 'Alexander Fleming discovers Penicillin.',
    1945: 'End of World War II and founding of the United Nations.',
    1969: 'Apollo 11 lands first humans on the Moon; ARPANET created.',
    1989: 'Fall of the Berlin Wall and proposal of the World Wide Web by Tim Berners-Lee.',
    2000: 'The Millennium celebrations and Turn of the 21st Century.',
    2020: 'Global COVID-19 pandemic declared.',
    2024: 'Total Solar Eclipse crosses North America; AI breakthroughs.',
    2026: 'Current year of technological acceleration and space exploration.',
  };
  return yearNotes[y] || (y < 0 ? `${Math.abs(y)} BCE in antiquity` : `Year ${y} CE`);
}

// Main comprehensive analyzer
export function analyzeNumber(input: string): NumberAnalysis {
  const trimmed = input.trim();
  let cleanInput = trimmed;

  // Constants mapping
  const lower = trimmed.toLowerCase();
  if (lower === 'pi' || lower === 'π') cleanInput = String(Math.PI);
  else if (lower === 'e') cleanInput = String(Math.E);
  else if (lower === 'phi' || lower === 'φ' || lower === 'golden') cleanInput = '1.618033988749895';
  else if (lower === 'sqrt(2)' || lower === 'sqrt2') cleanInput = String(Math.SQRT2);
  else if (lower === 'c' || lower === 'light') cleanInput = '299792458';
  else if (lower === 'avogadro') cleanInput = '6.02214076e23';

  // Evaluate simple fractions like "22/7"
  if (cleanInput.includes('/') && !cleanInput.includes('//')) {
    const parts = cleanInput.split('/');
    if (parts.length === 2 && !isNaN(Number(parts[0])) && !isNaN(Number(parts[1])) && Number(parts[1]) !== 0) {
      cleanInput = String(Number(parts[0]) / Number(parts[1]));
    }
  }

  // Remove commas like "1,000,000"
  const normalizedStr = cleanInput.replace(/,/g, '');
  const parsed = Number(normalizedStr);
  const isNaNValue = isNaN(parsed);
  const numValue = isNaNValue ? 0 : parsed;

  const isInteger = Number.isInteger(numValue) && !normalizedStr.includes('.');
  const isNegative = numValue < 0;
  const isZero = numValue === 0;
  const isDecimal = !isInteger && !isNaNValue;
  const isSafeInteger = Number.isSafeInteger(numValue);

  let bigIntValue: bigint | null = null;
  if (isInteger) {
    try {
      bigIntValue = BigInt(normalizedStr);
    } catch {
      bigIntValue = null;
    }
  }

  // Words & Roman
  const inWords = numberToWords(normalizedStr);
  const ordinal = isInteger ? numberToOrdinal(numValue) : 'N/A';
  const romanNumeral = isInteger && numValue > 0 ? numberToRoman(numValue) : 'N/A';

  // Sign & Parity
  const sign = isZero ? 'Zero' : isNegative ? 'Negative' : 'Positive';
  const parity = isInteger ? (Math.abs(numValue) % 2 === 0 ? 'Even' : 'Odd') : 'N/A';

  // Primality
  let isPrime = false;
  let isPrimeClassification = 'Non-Integer';
  let primeIndex: number | null = null;
  let nextPrime: number | null = null;
  let prevPrime: number | null = null;

  if (isInteger) {
    if (numValue < 2) {
      isPrime = false;
      isPrimeClassification = numValue === 1 ? 'Unit (neither prime nor composite)' : numValue === 0 ? 'Zero (neutral absorbant)' : 'Negative Integer';
    } else {
      isPrime = bigIntValue ? millerRabin(bigIntValue) : millerRabin(BigInt(numValue));
      isPrimeClassification = isPrime ? 'Prime Number' : 'Composite Number';
      if (isPrime && numValue <= 50000) {
        primeIndex = getPrimeIndex(numValue);
      }
      if (numValue <= 1000000) {
        nextPrime = findNextPrime(numValue);
        prevPrime = findPrevPrime(numValue);
      }
    }
  }

  // Prime factors & Divisors
  const primeFactors = isInteger && numValue > 1 ? computePrimeFactors(numValue) : [];
  const primeFactorizationFormula = primeFactors.length > 0
    ? primeFactors.map(pf => (pf.power === 1 ? `${pf.factor}` : `${pf.factor}^${pf.power}`)).join(' × ')
    : isPrime ? `${numValue}` : isInteger && numValue === 1 ? '1' : 'None';

  const { divisors, count: divisorCount, sum: divisorSum } = isInteger && numValue > 0
    ? computeDivisors(numValue)
    : { divisors: [], count: 0, sum: 0 };

  const aliquotSum = isInteger && numValue > 0 ? divisorSum - numValue : 0;

  let divisorClassification: 'Perfect' | 'Abundant' | 'Deficient' | 'N/A' = 'N/A';
  let abundanceIndex: number | null = null;

  if (isInteger && numValue > 0) {
    abundanceIndex = Number((divisorSum / numValue).toFixed(4));
    if (aliquotSum === numValue) divisorClassification = 'Perfect';
    else if (aliquotSum > numValue) divisorClassification = 'Abundant';
    else divisorClassification = 'Deficient';
  }

  // Figurate numbers
  const { isSquare, root: squareRoot } = isInteger ? isPerfectSquare(numValue) : { isSquare: false, root: Math.sqrt(numValue) };
  const cubeRootCandidate = Math.round(Math.cbrt(numValue));
  const isCube = isInteger && cubeRootCandidate * cubeRootCandidate * cubeRootCandidate === numValue;
  const cubeRoot = isInteger ? cubeRootCandidate : Math.cbrt(numValue);

  // Triangular: 8n + 1 is square
  let isTriangular = false;
  let triangularRoot: number | null = null;
  if (isInteger && numValue >= 0) {
    const disc = 8 * numValue + 1;
    const { isSquare: discSquare, root: discRoot } = isPerfectSquare(disc);
    if (discSquare && (discRoot - 1) % 2 === 0) {
      isTriangular = true;
      triangularRoot = (discRoot - 1) / 2;
    }
  }

  // Pentagonal: (sqrt(24n + 1) + 1) / 6 is integer
  let isPentagonal = false;
  if (isInteger && numValue >= 1) {
    const disc = 24 * numValue + 1;
    const { isSquare: discSquare, root: discRoot } = isPerfectSquare(disc);
    if (discSquare && (discRoot + 1) % 6 === 0) {
      isPentagonal = true;
    }
  }

  // Hexagonal: (sqrt(8n + 1) + 1) / 4 is integer
  let isHexagonal = false;
  if (isInteger && numValue >= 1) {
    const disc = 8 * numValue + 1;
    const { isSquare: discSquare, root: discRoot } = isPerfectSquare(disc);
    if (discSquare && (discRoot + 1) % 4 === 0) {
      isHexagonal = true;
    }
  }

  // Fibonacci
  const { isFib: isFibonacci, index: fibonacciIndex, closest: closestFibonacci } = isInteger
    ? isFibonacciNumber(numValue)
    : { isFib: false, index: null, closest: null };

  // Powers
  const isPowerOfTwo = isInteger && numValue > 0 && (numValue & (numValue - 1)) === 0;
  const powerOfTwoExponent = isPowerOfTwo ? Math.log2(numValue) : null;

  let isPowerOfTen = false;
  let powerOfTenExponent: number | null = null;
  if (isInteger && numValue > 0) {
    const exp = Math.round(Math.log10(numValue));
    if (Math.pow(10, exp) === numValue) {
      isPowerOfTen = true;
      powerOfTenExponent = exp;
    }
  }

  // Factorial check
  let isFactorial = false;
  let factorialBase: number | null = null;
  if (isInteger && numValue >= 1 && numValue <= 1000000000) {
    let f = 1;
    let i = 1;
    while (f < numValue) {
      i++;
      f *= i;
    }
    if (f === numValue) {
      isFactorial = true;
      factorialBase = i;
    }
  }

  // Palindromic
  const absStr = String(Math.abs(Math.floor(numValue)));
  const isPalindromic10 = isInteger && absStr === absStr.split('').reverse().join('');
  const binStr = isInteger && numValue >= 0 && numValue <= 1e9 ? numValue.toString(2) : '';
  const isPalindromic2 = binStr.length > 0 && binStr === binStr.split('').reverse().join('');

  // Armstrong
  let isArmstrong = false;
  if (isInteger && numValue >= 0 && numValue <= 1e9) {
    const digits = absStr.split('');
    const p = digits.length;
    const sumArm = digits.reduce((acc, d) => acc + Math.pow(parseInt(d, 10), p), 0);
    isArmstrong = sumArm === numValue;
  }

  // Harshad
  const digitSum = isInteger ? absStr.split('').reduce((acc, d) => acc + parseInt(d, 10), 0) : 0;
  const isHarshad = isInteger && digitSum > 0 && numValue % digitSum === 0;

  // Automorphic: square ends in number
  let isAutomorphic = false;
  if (isInteger && numValue >= 0 && numValue <= 100000) {
    const sqStr = String(numValue * numValue);
    isAutomorphic = sqStr.endsWith(String(numValue));
  }

  // Happy number
  const happyStatus = isInteger ? computeHappy(numValue) : { isHappy: false, steps: 0, path: [] };

  // Collatz
  const collatz = isInteger && numValue > 0 ? computeCollatz(numValue) : null;

  // Bases
  let binary = 'N/A';
  let octal = 'N/A';
  let hexadecimal = 'N/A';
  let base36 = 'N/A';
  let hammingWeight: number | null = null;
  let hexColor: string | null = null;

  if (isInteger && numValue >= 0 && numValue <= Number.MAX_SAFE_INTEGER) {
    binary = numValue.toString(2);
    octal = numValue.toString(8);
    const hex = numValue.toString(16).toUpperCase();
    hexadecimal = `0x${hex}`;
    base36 = numValue.toString(36).toUpperCase();
    hammingWeight = (binary.match(/1/g) || []).length;

    // Hex color: pad to 6 digits if small enough
    if (numValue <= 0xFFFFFF) {
      hexColor = `#${hex.padStart(6, '0')}`;
    }
  }

  // Notations
  const scientificNotation = toScientific(numValue);
  const engineeringNotation = toEngineering(numValue);

  // Physics, Element, Calendar
  const element = isInteger ? getElementForNumber(numValue) : null;
  const asSecondsFormatted = formatSeconds(numValue);
  const asBytesFormatted = formatBytes(numValue);
  const asMetersFormatted = formatMeters(numValue);
  const calendarDay = isInteger ? getDayOfYear(numValue) : null;
  const yearHistoricalNote = isInteger ? getYearHistoricalNote(numValue) : null;

  // Geometry / Trigonometry (treating number as degrees)
  const angleRadians = (numValue * Math.PI) / 180;
  const angleSin = Number(Math.sin(angleRadians).toFixed(6));
  const angleCos = Number(Math.cos(angleRadians).toFixed(6));
  const angleTan = Math.abs(angleCos) < 1e-10 ? NaN : Number(Math.tan(angleRadians).toFixed(6));

  return {
    rawInput: input,
    parsedNumber: numValue,
    bigIntValue,
    isInteger,
    isNegative,
    isZero,
    isDecimal,
    isSafeInteger,
    inWords,
    ordinal,
    romanNumeral,
    sign,
    parity,
    isPrime,
    isPrimeClassification,
    primeIndex,
    nextPrime,
    prevPrime,
    primeFactors,
    primeFactorizationFormula,
    divisors,
    divisorCount,
    divisorSum,
    aliquotSum,
    divisorClassification,
    abundanceIndex,
    isSquare,
    squareRoot,
    isCube,
    cubeRoot,
    isTriangular,
    triangularRoot,
    isPentagonal,
    isHexagonal,
    isFibonacci,
    fibonacciIndex,
    closestFibonacci,
    isPowerOfTwo,
    powerOfTwoExponent,
    isPowerOfTen,
    powerOfTenExponent,
    isFactorial,
    factorialBase,
    isPalindromic10,
    isPalindromic2,
    isArmstrong,
    isHarshad,
    digitSum,
    digitCount: absStr.length,
    isAutomorphic,
    happyStatus,
    collatz,
    binary,
    octal,
    hexadecimal,
    base36,
    hammingWeight,
    hexColor,
    scientificNotation,
    engineeringNotation,
    element,
    asSecondsFormatted,
    asBytesFormatted,
    asMetersFormatted,
    calendarDay,
    yearHistoricalNote,
    angleRadians,
    angleSin,
    angleCos,
    angleTan,
  };
}
