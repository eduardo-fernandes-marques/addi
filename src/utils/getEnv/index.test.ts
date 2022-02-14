import { getEnv } from '.';

describe('utils > getEnv', () => {
  it('should return prd when REACT_APP_PRD is true', () => {
    process.env.REACT_APP_PRD = 'true';

    expect(getEnv()).toBe('prd');
  });

  it("should return dev when didn't recognize the current env", () => {
    expect(getEnv()).toBe('dev');
  });
});
