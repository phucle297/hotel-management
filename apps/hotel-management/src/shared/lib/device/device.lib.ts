function isTouchDevice(): boolean {
	return typeof navigator !== 'undefined' && navigator.maxTouchPoints > 1;
}

export const deviceLib = {
	isTouchDevice,
};
