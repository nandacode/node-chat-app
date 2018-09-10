const expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'nanda@example.com';
        var text = 'Hi this is the text';
        var result = generateMessage(from, text);
        
        expect(result).toMatchObject({from, text});
        expect(typeof result.createdAt).toBe('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location message object', () => {
        var from = 'Admin';
        var latitude = 10;
        var longitude = 20;
        var result = generateLocationMessage(from, latitude, longitude);

        expect(result).toMatchObject({
            from,
            url: `https://www.google.com/maps?q=${latitude},${longitude}`
        });

        expect(typeof result.createdAt).toBe('number');
    });
});