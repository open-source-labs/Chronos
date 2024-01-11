export enum EventTypes {
  USER_CREATED = 'USER_CREATED',
  ITEM_CREATED = 'ITEM_CREATED',
  ITEM_UPDATED = 'ITEM_UPDATED',
  ITEM_DELETED = 'ITEM_DELETED',
  INVENTORY_CREATED = 'INVENTORY_CREATED',
  INVENTORY_UPDATED = 'INVENTORY_UPDATED',
  INVENTORY_DELETED = 'INVENTORY_DELETED',
  ORDER_CREATED = 'ORDER_CREATED',
  ORDER_DELETED = 'ORDER_DELETED',
}

export type Events =
  | {
      type: EventTypes.USER_CREATED;
      payload: {
        id: string;
        username: string;
      };
    }
  | {
      type: EventTypes.ITEM_CREATED;
      payload: {
        id: string;
        itemName: string;
        sellerId: string;
        unitPrice: number;
      };
    }
  | {
      type: EventTypes.ITEM_UPDATED;
      payload: {
        id: string;
        itemName: string;
        sellerId: string;
        unitPrice: number;
      };
    }
  | {
      type: EventTypes.ITEM_DELETED;
      payload: {
        id: string;
      };
    }
  | {
      type: EventTypes.INVENTORY_CREATED;
      payload: {
        id: string;
        itemId: string;
        itemName: string;
        sellerId: string;
        unitPrice: number;
        units: number;
      };
    }
  | {
      type: EventTypes.INVENTORY_UPDATED;
      payload: {
        id: string;
        itemId: string;
        itemName: string;
        sellerId: string;
        unitPrice: number;
        units: number;
      };
    }
  | {
      type: EventTypes.INVENTORY_DELETED;
      payload: {
        itemId: string;
      };
    }
  | {
      type: EventTypes.ORDER_CREATED;
      payload: {
        itemId: string;
        amount: number;
      };
    }
  | {
      type: EventTypes.ORDER_DELETED;
      payload: {
        itemId: string;
        amount: number;
      };
    };
