const expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'nanda@example.com';
        var text = 'Hi this is the text';
        var result = generateMessage(from, text);
        
        expect(result).toMatchObject({from, text});
        expect(typeof result.createdAt).toBe('number');
    });
});