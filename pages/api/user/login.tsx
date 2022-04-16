import UserModel from 'models/UserModel';
import { comparePassword } from 'lib/PasswordHasher';
import { getSession } from "lib/get-session";

export default async function handler(req, res) {
    const session = await getSession(req, res);
    const { username, password } = req.body;

    //check that passed data is valid
    if(!username) {
        return res.status(400).json({ success: false, message: 'Missing username parameter.' });
    }
    if(!password) {
        return res.status(400).json({ success: false, message: 'Missing password parameter.' });
    }
    //data is valid

    //does the user exist?
    const user = await UserModel.query().select()
        .findOne('username', username);

    if(!user) {
        return res.status(401).json({ success: false, message: 'Username or password are incorrect.' });
    }

    if(await comparePassword(password, user.password)) {
        session.user = {
            userId: user.userId,
            username: user.username
        }
        console.log(session);
        return res.status(200).json({ success: true, message: 'Logged in.' });
    }
    else {
        return res.status(401).json({ success: false, message: 'Username or password are incorrect.' });
    }
}