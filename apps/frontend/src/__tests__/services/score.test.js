'use strict';

import { Enums } from '@startext/ipsc';

describe('Test IPSC scores', () => {
  it('scores from component', () => {
    expect(Enums.getResultScore(Enums.PowerFactors.MINOR, Enums.Results.A)).toEqual(5);
    expect(Enums.getResultScore(Enums.PowerFactors.MINOR, Enums.Results.C)).toEqual(3);
    expect(Enums.getResultScore(Enums.PowerFactors.MINOR, Enums.Results.D)).toEqual(1);

    expect(Enums.getResultScore(Enums.PowerFactors.MAJOR, Enums.Results.A)).toEqual(5);
    expect(Enums.getResultScore(Enums.PowerFactors.MAJOR, Enums.Results.C)).toEqual(4);
    expect(Enums.getResultScore(Enums.PowerFactors.MAJOR, Enums.Results.D)).toEqual(2);
  })

  it('scores from component', () => {
    expect(Enums.getResultScore(Enums.PowerFactors.MINOR, Enums.Result.of('A'))).toEqual(5);
    expect(Enums.getResultScore(Enums.PowerFactors.MINOR, Enums.Result.of('C'))).toEqual(3);
    expect(Enums.getResultScore(Enums.PowerFactors.MINOR, Enums.Result.of('D'))).toEqual(1);

    expect(Enums.getResultScore(Enums.PowerFactors.MAJOR, Enums.Results.A)).toEqual(5);
    expect(Enums.getResultScore(Enums.PowerFactors.MAJOR, Enums.Results.C)).toEqual(4);
    expect(Enums.getResultScore(Enums.PowerFactors.MAJOR, Enums.Results.D)).toEqual(2);
  })
});