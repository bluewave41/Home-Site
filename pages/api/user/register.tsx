import UserModel from 'models/UserModel';
import { hashPassword } from 'lib/PasswordHasher';

export default async function handler(req, res) {
    const { username, password } = req.body;
    if(!username) {
        return res.status(400).json({ success: false, message: 'Missing username parameter.' });
    }
    if(!password) {
        return res.status(400).json({ success: false, message: 'Missing password parameter.' });
    }
    if(!username.length || username.length > 20) {
        return res.status(400).json({ success: false, message: 'Usernames must be between 1 - 20 characters long.' });
    }

    //does the username exist?
    let user = await UserModel.query().select().findOne('username', username);
    if(user) {
        return res.status(200).json({ success: false, message: 'Username already exists.' });
    }

    try {
        const hashedPassword = await hashPassword(password);
        await UserModel.query().insert({
            username: username,
            password: hashedPassword
        });
        return res.status(200).json({ success: true });
    }
    catch(e) {
        console.log(e);
        //TODO: how should this be handled?
    }
}