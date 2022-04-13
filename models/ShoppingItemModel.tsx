import { Model, ModelObject } from 'objection';

export default class ShoppingItemModel extends Model {
    static tableName = 'shopping_items';

    name!: string;
    amount!: number;
    listId!: number;
}

//type UserShape = ModelObject<UserModel>;