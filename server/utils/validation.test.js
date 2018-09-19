const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString validation', () => {

    it('should reject non-string value', () => {
        var output = isRealString(356454);
        expect(output).toBeFalsy();
    });

    it('should reject string with only spaces', () => {
        expect(isRealString('               ')).toBeFalsy();
    });

    it('should allow valid string with non space values', () => {
        expect(isRealString('Nanda')).toBeTruthy();
    });
});