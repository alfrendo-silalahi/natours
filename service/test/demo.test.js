import { describe, expect, it } from 'vitest';

describe('Demo Vitest', () => {
  it('Demo test case', () => {
    const response = 5 + 8;
    expect(response).toBe(13);
  });
});
