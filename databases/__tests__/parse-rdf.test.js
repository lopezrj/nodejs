'use strict';

const fs = require('fs');
const parseRDF = require('../lib/parse-rdf.js');

const rdf = fs.readFileSync(`${__dirname}/pg132.rdf`);

describe('parseRDF', () => {
    test('should be a function', () => {
        expect(parseRDF).toBeInstanceOf(Function)
    });
    test('should parse RDF content', () => {
        const book = parseRDF(rdf);
        expect(book).toBeInstanceOf(Object);
        expect(book).toHaveProperty('id', 132);
        expect(book).toHaveProperty('title', 'The Art of War');
        expect(book.authors).toEqual(expect.arrayContaining(
            ['Sunzi, active 6th century B.C.', 'Giles, Lionel']
        ));
        expect(book.subjects).toEqual(expect.arrayContaining(
            ['Military art and science -- Early works to 1800',
        'War -- Early works to 1800']
        ));
    });
});