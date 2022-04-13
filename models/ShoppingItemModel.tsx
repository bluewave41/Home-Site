import { Model } from 'objection';

class ShoppingItemModel extends Model {
    static get tableName() {
        return 'shopping_items';
    }
}

export default ShoppingItemModel;