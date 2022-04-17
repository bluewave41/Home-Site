import assert from 'assert';
import { validateField, validateDate } from '../lib/Validator';

describe('Validator', function () {
    describe('#validateField()', function () {
        it('should pass for valid value', function () {
            assert(validateField('a'));
        });
        it('should fail for empty string', function () {
            assert(!validateField(''));
        });
        it('should fail for null', function () {
            assert(!validateField(null));
        });
        it('should fail for undefined', function () {
            assert(!validateField(undefined));
        });
    });
    describe('#validateDate()', function () {
        it('should pass for valid date', function () {
            const date = validateDate('1995/01/01');
            assert(date instanceof Date);
        });
        it('should fail for invalid date', function () {
            const date = validateDate('today');
            assert(!(date instanceof Date));
        });
    });
});