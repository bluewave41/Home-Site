// ./lib/get-session.js
import nextSession from "next-session";
import RedisClient from 'lib/RedisClient';

const options = {
    store: new RedisClient()
}

export const getSession = nextSession(options);