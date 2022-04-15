import { getSession } from 'lib/get-session';
import ListModel from 'models/ListModel';
import { listItemSecondaryActionClasses } from '@mui/material';

export default async function handler(req, res) {
    const session = await getSession(req, res);
    const { uuid } = req.body.uuid;

    if(!session.user) {
        return res.status(401).json({ success: false, message: "You aren't logged in." });
    }
    if(!uuid) {
        return res.status(401).json({ success: false, message: "Missing uuid parameter." });
    }

    const list = await ListModel.query().select('ownerId')
        .findOne('uuid', uuid);

    if(list.ownedId != session.user.userId) {
        return res.status(403).json({ success: false, message: "That isn't your list. You can't delete it." });
    }

    await ListModel.query().delete()
        .where('uuid', uuid);
}