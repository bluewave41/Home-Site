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

    const date = validateDate(req.body.date);
    if(!date) {
        return res.status(401).json({ success: false, message: "Date parameter is invalid." });
    }

    await MenuModel.query().delete()
        .where('userId', session.user.userId)
        .where('date', date);

    res.status(200).json({ success: true });
}