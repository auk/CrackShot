export const SCORE_A = 'A';
export const SCORE_C = 'C';
export const SCORE_D = 'D';
export const SCORE_MISS = 'MISS';
export const SCORE_NS = 'NS';
export const SCORE_PE = 'PENALTY';

export const POWER_FACTOR = Object.freeze({
  MINOR: Symbol('Minor'),
  MAJOR: Symbol('Major')
});

export const RESULT = Object.freeze({
  A: Symbol('A'),
  C: Symbol('C'),
  D: Symbol('D'),
  MISS: Symbol('Miss'),
  NS: Symbol('No-shoot'),
  PENALTY: Symbol('Penalty')
});

const rates = {
  [ POWER_FACTOR.MINOR ] : {
    [ RESULT.A ]: 5,
    [ RESULT.C ]: 3,
    [ RESULT.D ]: 1,
    [ RESULT.MISS ]: -10,
    [ RESULT.NS ]: -10,
    [ RESULT.PENALTY ]: -10
  },
  [ POWER_FACTOR.MAJOR ] : {
    [ RESULT.A ]: 5,
    [ RESULT.C ]: 4,
    [ RESULT.D ]: 2,
    [ RESULT.MISS ]: -10,
    [ RESULT.NS ]: -10,
    [ RESULT.PENALTY ]: -10
  }
}

export function getResultScore(factor, result) {
  if (!rates.hasOwnProperty(factor))
    throw new Error("Unsupported power factor: " + factor);

  const powerFactorRates = rates[factor];
  console.assert(powerFactorRates);

  if (!powerFactorRates.hasOwnProperty(result))
    throw new Error("Unsupported result: " + result);

  return powerFactorRates[result];
}