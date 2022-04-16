import { getSession } from 'lib/get-session';
import MenuModel from 'models/MenuModel';
import isValid from 'date-fns/isValid';
;
export default async function handler(req, res) {
    const session = await getSession(req, res);

    if(!session.user) {
        return res.status(401).json({ success: false, message: "You aren't logged in." });
    }
    if(!req.body.date) {
        return res.status(401).json({ success: false, message: "Missing date parameter." });
    }
    if(!req.body.name) {
        return res.status(401).json({ success: false, message: "Missing name parameter." });
    }

    const date = new Date(req.body.date);
    if(!isValid(date)) {
        return res.status(401).json({ success: false, message: "Date parameter is invalid." });
    }

    await MenuModel.query().insert({
        userId: session.user.userId,
        date: date,
        name: req.body.name
    })

    res.status(200).json({ success: true });
}