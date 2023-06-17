import React, { useCallback, useEffect, useMemo, useReducer } from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  removeWholeItem: (id) => {},
});

export default CartContext;

const defaultCartState = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
};

function cartReducer(state, action) {
  let newItems = [...state.items];

  if (action.type === "ADD_ITEM") {
    const itemInArray = newItems.find((item) => item.id === action.item.id);

    if (itemInArray) {
      itemInArray.quantity += 0.5;
    } else {
      newItems.push({ ...action.item, quantity: 1 });
    }

    let newTotalAmount = state.totalAmount + action.item.price;
    if (action.item.sale) {
      newTotalAmount -= action.item.saleAmount;
    }

    const newState = {
      items: newItems,
      totalAmount: newTotalAmount,
      totalQuantity: state.totalQuantity + 1,
    };

    localStorage.setItem("cart-context", JSON.stringify(newState));
    return newState;
  }

  if (action.type === "REMOVE_ITEM") {
    const itemInArray = newItems.find((item) => item.id === action.id);

    if (itemInArray.quantity === 1) {
      newItems = newItems.filter((item) => item.id !== action.id);
    } else {
      itemInArray.quantity -= 0.5;
    }

    let newTotalAmount = state.totalAmount - itemInArray.price;
    if (itemInArray.sale) {
      newTotalAmount += itemInArray.saleAmount;
    }

    const newState = {
      items: newItems,
      totalAmount: newTotalAmount,
      totalQuantity: state.totalQuantity - 1,
    };

    localStorage.setItem("cart-context", JSON.stringify(newState));
    return newState;
  }

  if (action.type === "REMOVE_WHOLE_ITEM") {
    const itemInArray = newItems.find((item) => item.id === action.id);
    newItems = newItems.filter((item) => item.id !== action.id);

    let itemPrice = itemInArray.price;
    if (itemInArray.sale) {
      itemPrice -= itemInArray.saleAmount;
    }

    const newTotalAmount = state.totalAmount - itemInArray.quantity * itemPrice;
    const newTotalQuantity = state.totalQuantity - itemInArray.quantity;

    const newState = {
      items: newItems,
      totalAmount: newTotalAmount,
      totalQuantity: newTotalQuantity,
    };

    localStorage.setItem("cart-context", JSON.stringify(newState));
    return newState;
  }

  if (action.type === "SET_CONTEXT") {
    return action.context;
  }

  return defaultCartState;
}

export function CartProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  useEffect(() => {
    const context = localStorage.getItem("cart-context");
    if (context) {
      const cartContext = JSON.parse(context);
      dispatchCartAction({ type: "SET_CONTEXT", context: cartContext });
    }
  }, []);

  const addItemHandler = useCallback((item) => {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  }, []);

  const removeItemHandler = useCallback((id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  }, []);

  const removeWholeItemHandler = useCallback((id) => {
    dispatchCartAction({ type: "REMOVE_WHOLE_ITEM", id: id });
  }, []);

  const cartContextValue = useMemo(
    () => ({
      items: cartState.items,
      totalAmount: cartState.totalAmount,
      totalQuantity: cartState.totalQuantity,
      addItem: addItemHandler,
      removeItem: removeItemHandler,
      removeWholeItem: removeWholeItemHandler,
    }),
    [cartState, addItemHandler, removeItemHandler, removeWholeItemHandler]
  );

  return (
    <CartContext.Provider value={cartContextValue}>
      {props.children}
    </CartContext.Provider>
  );
}
