import { getSession } from "lib/get-session";

export default async function handler(req, res) {
    const session = await getSession(req, res);
    console.log(session);
    res.end();
}