import { describe, expect, it } from 'vitest';
import { getPriceNative } from './money';

// describe => create suite of tests (group of testcases)
describe('getPriceNative', () => {
	// it => define testcase (statement/name, executor)
	it('formats 1001 cents as ₹900.00', () => {
		// expect => create assertions (functions that verify a statement about your code's behavior)
		expect(getPriceNative(1000)).toBe('₹900.00');
	});

	it('forces 2 decimals', () => {
		expect(getPriceNative(1001)).toBe('₹900.90');
		expect(getPriceNative(1002)).toBe('₹901.80');
	});
});
 