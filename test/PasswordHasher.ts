import assert from 'assert';
import { hashPassword, comparePassword } from '../lib/PasswordHasher';

describe('PasswordHasher', function () {
    describe('#hashPassword()', function () {
        it('should hash and compare a password', async function () {
            const hashed = await hashPassword("Hello");
            const result = await comparePassword("Hello", hashed);
            assert(result);
        });
    });
});