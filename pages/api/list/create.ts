import ListModel from 'models/ListModel';
import ShoppingItemModel from 'models/ShoppingItemModel';
import { getSession } from 'lib/get-session';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
    const session = await getSession(req, res);
    const { items } = req.body;
    if(!session.user) {
        return res.status(401).json({ success: false, message: "You aren't logged in." });
    }
    if(!items) {
        return res.status(400).json({ success: false, message: 'Missing items parameter.' });
    }

    //create a new list
    const list = await ListModel.query().insert({
        ownerId: session.user.userId,
        uuid: uuidv4()
    });

    items.forEach(el => el.listId = list.listId);

    await ShoppingItemModel.query().insert(items).returning('*');

    console.log(items);

    res.end();
}