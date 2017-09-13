import expect from 'expect';

const add = (a, b) => {

    if (typeof b !== 'number')
        return a + a;

    return a + b;
};

const square = (a) => a * a;

describe('add', function () {
    it('should add two numbers', function () {
        const res = add(1, 2);
        expect(res).toBe(3);
    });

    it('should double', function () {
        const res = add(2);
        expect(res).toBe(4);
    });
});

describe('square', function () {
    it('should square', function () {
        const res = square(3);
        expect(res).toBe(9);
    });
});
