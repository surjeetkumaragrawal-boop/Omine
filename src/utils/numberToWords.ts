// Number to English Words & Roman Numerals converter

const ONES = [
  "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
  "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"
];

const TENS = [
  "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"
];

const SCALES = [
  "", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion", "sextillion", "septillion", "octillion", "nonillion", "decillion"
];

function convertGroup(n: number): string {
  let str = "";
  const hundreds = Math.floor(n / 100);
  const remainder = n % 100;

  if (hundreds > 0) {
    str += ONES[hundreds] + " hundred";
    if (remainder > 0) str += " ";
  }

  if (remainder >= 20) {
    const tens = Math.floor(remainder / 10);
    const units = remainder % 10;
    str += TENS[tens];
    if (units > 0) str += "-" + ONES[units];
  } else if (remainder > 0) {
    str += ONES[remainder];
  }

  return str;
}

export function numberToWords(value: number | bigint | string): string {
  const strVal = String(value).trim();
  if (strVal === "0" || strVal === "-0") return "zero";

  const isNeg = strVal.startsWith("-");
  const absStr = isNeg ? strVal.slice(1) : strVal;

  // If decimal
  if (absStr.includes(".")) {
    const [intPart, decPart] = absStr.split(".");
    const intWords = numberToWords(intPart);
    const decDigits = decPart.split("").map(d => {
      const dNum = parseInt(d, 10);
      return isNaN(dNum) ? "" : dNum === 0 ? "zero" : ONES[dNum];
    }).join(" ");
    return `${isNeg ? "negative " : ""}${intWords} point ${decDigits}`.trim();
  }

  // Handle large integer strings
  let numStr = absStr.replace(/^0+/, "") || "0";
  if (numStr === "0") return "zero";

  const groups: number[] = [];
  while (numStr.length > 0) {
    const chunk = numStr.slice(-3);
    groups.push(parseInt(chunk, 10));
    numStr = numStr.slice(0, -3);
  }

  const parts: string[] = [];
  for (let i = groups.length - 1; i >= 0; i--) {
    const g = groups[i];
    if (g > 0) {
      const groupText = convertGroup(g);
      const scale = SCALES[i] || `10^${i * 3}`;
      parts.push(scale ? `${groupText} ${scale}` : groupText);
    }
  }

  const result = parts.join(" ").trim();
  return isNeg ? `negative ${result}` : result;
}

export function numberToOrdinal(n: number | bigint): string {
  const num = typeof n === "bigint" ? Number(n) : n;
  if (!Number.isFinite(num) || !Number.isInteger(num)) return "N/A";

  const j = Math.abs(num) % 10;
  const k = Math.abs(num) % 100;
  let suffix = "th";
  if (j === 1 && k !== 11) suffix = "st";
  else if (j === 2 && k !== 12) suffix = "nd";
  else if (j === 3 && k !== 13) suffix = "rd";

  return `${num.toLocaleString()}${suffix}`;
}

export function numberToRoman(num: number | bigint): string {
  let n = typeof num === "bigint" ? Number(num) : num;
  if (!Number.isInteger(n) || n <= 0) return "N/A (Romans had no notation for zero or negatives)";
  if (n > 3999999) return `Over standard Roman Vinculum scale (${n.toLocaleString()})`;

  const romanNumerals: [number, string][] = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"]
  ];

  if (n <= 3999) {
    let result = "";
    for (const [val, roman] of romanNumerals) {
      while (n >= val) {
        result += roman;
        n -= val;
      }
    }
    return result;
  }

  // Vinculum notation for thousands (above 3999)
  const thousands = Math.floor(n / 1000);
  const remainder = n % 1000;
  const thousandsRoman = numberToRoman(thousands);
  const remainderRoman = remainder > 0 ? numberToRoman(remainder) : "";
  return `(${thousandsRoman})·M + ${remainderRoman || "0"}`;
}
