import { getSession } from 'lib/get-session';
import MenuModel from 'models/MenuModel';
import { validateField, validateDate } from 'lib/Validator';

export default async function handler(req, res) {
    const session = await getSession(req, res);

    if(!validateField(session.user)) {
        return res.status(401).json({ success: false, message: "You aren't logged in." });
    }
    if(!validateField(req.body.date)) {
        return res.status(401).json({ success: false, message: "Missing date parameter." });
    }
    if(!validateField(req.body.name)) {
        return res.status(401).json({ success: false, message: "Missing name parameter." });
    }

    const date = validateDate(req.body.date);
    if(!date) {
        return res.status(401).json({ success: false, message: "Date parameter is invalid." });
    }

    await MenuModel.query().insert({
        userId: session.user.userId,
        date: date,
        name: req.body.name
    })

    res.status(200).json({ success: true });
}