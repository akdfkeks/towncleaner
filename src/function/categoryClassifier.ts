const category = {
	생활폐기물: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 25], // 1
	불연성건설폐기물: [1, 2, 3, 9], // 2
	가연성건설폐기물: [5, 7, 10], // 3
	혼합건설폐기물: [6], // 4
	사업장일반폐기물: [4, 8], // 5
};

export function categoryClassifier(code: number): number {
	if (category.생활폐기물.includes(code)) return 1;
	if (category.불연성건설폐기물.includes(code)) return 2;
	if (category.가연성건설폐기물.includes(code)) return 3;
	if (category.혼합건설폐기물.includes(code)) return 4;
	if (category.사업장일반폐기물.includes(code)) return 5;
	return 100;
}
