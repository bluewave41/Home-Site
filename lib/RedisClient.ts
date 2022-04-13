import { createClient, RedisClientType } from 'redis';

class RedisClient {
    client!: RedisClientType;

    constructor() {
        this.build();
    }

    build() {
        this.client = createClient();
        this.client.on('error', (err) => console.log('Redis Client Error', err));
        this.client.connect(); 
    }
    async set(sid: string, session: object) {
        await this.client.set(sid, JSON.stringify(session));
    }
    async get(sid: string) {
        let data = await this.client.get(sid);
        return JSON.parse(data);
    }
    async destroy(sid: string) {
        await this.client.del(sid);
    }
    async touch(sid: string, session: object) {
        await this.client.set(sid, JSON.stringify(session));
    }
}

export default RedisClient;