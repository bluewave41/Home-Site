import { Model, ModelObject } from 'objection';

export default class ListModel extends Model {
    static tableName = 'lists';
    static idColumn = 'listId';

    listId!: number;
    ownedId!: string;
    uuid!: string;
    created_at!: string;
    updated_at!: string;

    $beforeInsert() {
        this.created_at = new Date().toISOString();
    }

    $beforeUpdate() {
        this.updated_at = new Date().toISOString();
    }

}

//type UserShape = ModelObject<UserModel>;