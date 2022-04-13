import { Model, ModelObject } from 'objection';

export default class UserModel extends Model {
    static tableName = 'users';

    userId!: number;
    username!: string;
    password!: string;
}

//type UserShape = ModelObject<UserModel>;