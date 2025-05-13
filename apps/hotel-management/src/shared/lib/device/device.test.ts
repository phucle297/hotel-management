import { describe, expect, it, vi } from 'vitest';

import { deviceLib } from './device.lib';

describe('Device libraries', () => {
	describe('Check if touch device', () => {
		it('should return true when navigator.maxTouchPoints is greater than 1', () => {
			//Arrange
			vi.stubGlobal('navigator', { maxTouchPoints: 2 }); // Mock navigator
			//Act
			const touchDevice = deviceLib.isTouchDevice();
			//Assert
			expect(touchDevice).toBe(true);
		});

		it('should return false when navigator.maxTouchPoints is 0', () => {
			//Arrange
			vi.stubGlobal('navigator', { maxTouchPoints: 0 });
			//Act
			const touchDevice = deviceLib.isTouchDevice();
			//Assert
			expect(touchDevice).toBe(false);
		});

		it('should return false if navigator is undefined', () => {
			//Arrange
			vi.stubGlobal('navigator', undefined);
			//Act
			const touchDevice = deviceLib.isTouchDevice();
			//Assert
			expect(touchDevice).toBe(false);
		});
	});
});
