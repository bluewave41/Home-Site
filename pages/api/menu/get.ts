import { getSession } from 'lib/get-session';
import { validateField, validateDate } from 'lib/Validator'; 
import MenuModel from 'models/MenuModel';
import addMonths from 'date-fns/addMonths';
import { raw } from 'objection';
import { dateToString } from 'lib/DateHandler';

export default async function handler(req, res) {
    const session = await getSession(req, res);

    if(!validateField(session.user)) {
        return res.status(401).json({ success: false, message: "You aren't logged in." });
    }
    if(!validateField(req.body.date)) {
        return res.status(401).json({ success: false, message: "Missing date parameter." });
    }

    const date = validateDate(req.body.date);
    console.log({date})
    if(!date) {
        return res.status(400).json({ success: false, message: 'Date parameter is invalid.' });
    }

    const startString = dateToString(date);
    console.log(startString);

    let endDate = addMonths(date, 1);
    const endString = dateToString(endDate);

    const menus = await MenuModel.query().select('name', 'date')
        .where('userId', session.user.userId)
        .where(raw(`"date" between '${startString}' and '${endString}'`));

    console.log(menus);

    res.status(200).json({ success: true, menus: menus });
}