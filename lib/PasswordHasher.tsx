import bcrypt from 'bcrypt';

async function hashPassword(password: string) {
    let response = await bcrypt.hash(password, 10);
    //TODO: handler error here
    return response;
}

async function comparePassword(password: string, hash: string) {
    let response = await bcrypt.compare(password, hash);
    //TODO: handler error here
    return response;
}

export { hashPassword, comparePassword }