import { getSession } from 'lib/get-session';
import ListModel from 'models/ListModel';
import { validateField } from 'lib/Validator';

export default async function handler(req, res) {
    const session = await getSession(req, res);
    const { uuid } = req.body;

    if(!validateField(session.user)) {
        return res.status(401).json({ success: false, message: "You aren't logged in." });
    }
    if(!validateField(uuid)) {
        return res.status(401).json({ success: false, message: "Missing uuid parameter." });
    }

    const list = await ListModel.query().select('ownerId')
        .findOne('uuid', uuid);

    if(list.ownerId != session.user.userId) {
        return res.status(403).json({ success: false, message: "That isn't your list. You can't delete it." });
    }

    await ListModel.query().delete()
        .where('uuid', uuid);

    res.status(200).json({ success: true });
}