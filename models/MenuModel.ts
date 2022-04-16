import { Model, ModelObject } from 'objection';

export default class MenuModel extends Model {
    static tableName = 'menus';
    static idColumn = ['userId', 'date'];

    userId!: number;
    date!: Date;
    name!: string;
}

//type UserShape = ModelObject<UserModel>;