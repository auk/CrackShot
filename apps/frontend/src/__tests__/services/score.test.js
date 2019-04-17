import * as IPSC from '../../constants/score.js';

describe('Test IPSC scores', () => {
  it('Valid scores', () => {
    expect(IPSC.getResultScore(IPSC.POWER_FACTOR.MINOR, IPSC.RESULT.A)).toEqual(5);
    expect(IPSC.getResultScore(IPSC.POWER_FACTOR.MINOR, IPSC.RESULT.C)).toEqual(3);
    expect(IPSC.getResultScore(IPSC.POWER_FACTOR.MINOR, IPSC.RESULT.D)).toEqual(1);

    expect(IPSC.getResultScore(IPSC.POWER_FACTOR.MAJOR, IPSC.RESULT.A)).toEqual(5);
    expect(IPSC.getResultScore(IPSC.POWER_FACTOR.MAJOR, IPSC.RESULT.C)).toEqual(4);
    expect(IPSC.getResultScore(IPSC.POWER_FACTOR.MAJOR, IPSC.RESULT.D)).toEqual(2);
  });

  it('Invalid scores', () => {
    expect(function(){ IPSC.getResultScore('fake', IPSC.RESULT.A) }).toThrow();
    expect(function(){ IPSC.getResultScore(null, IPSC.RESULT.A) }).toThrow();
    expect(function(){ IPSC.getResultScore(IPSC.POWER_FACTOR.MINOR, 'fake') }).toThrow();
    expect(function(){ IPSC.getResultScore(IPSC.POWER_FACTOR.MINOR, null) }).toThrow();
  });
});