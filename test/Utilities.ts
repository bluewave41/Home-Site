import assert from 'assert';
import { chunk, capitalize } from '../lib/Utilities';

describe('Utilities', function () {
    describe('#chunk()', function () {
        it('should return a chunked 2D array from a valid array', function () {
            let chunks = chunk([1, 2, 3, 4, 5, 6], 3);
            assert.deepEqual([1, 2, 3], chunks[0]);
            assert.deepEqual([4, 5, 6], chunks[1]);
        });
        it('should pad an array of a size where the length % size is not 0', function () {
            let chunks = chunk([1, 2, 3, 4, 5, 6, 7], 3);
            assert.deepEqual([1, 2, 3], chunks[0]);
            assert.deepEqual([4, 5, 6], chunks[1]);
            assert.deepEqual([7, '', ''], chunks[2]);
        });
    });
    describe('#capitalize()', function () {
        it('should capitalize a string', function () {
            let capitalized = capitalize('hello world');
            assert.equal(capitalized, 'Hello world');
        });
    });
});