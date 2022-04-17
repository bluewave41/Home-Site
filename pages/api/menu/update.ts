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
    if(date) {
        return res.status(401).json({ success: false, message: "Date parameter is invalid." });
    }

    const record = await MenuModel.query().select()
        .findOne('userId', session.user.userId)
        .findOne('date', date);

    if(!record) {
        return res.status(401).json({ success: false, message: "No record exists for that date" });
    }

    await MenuModel.query().update ({
        name: req.body.name
    })
    .where('date', date)
    .where('userId', session.user.userId);
    
    res.status(200).json({ success: true });
}