import { Model, ModelObject } from 'objection';

export default class UserModel extends Model {
    static tableName = 'users';
    static idColumn = 'userId';

    userId!: number;
    username!: string;
    password!: string;
}

//type UserShape = ModelObject<UserModel>;