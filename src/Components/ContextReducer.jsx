import React, { createContext, useReducer, useContext } from 'react';

// Create Contexts
const CartStateContext = createContext();
const CartDispatchContext = createContext();

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      // Add item to the cart
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          price: action.price,
          Qty: action.Qty,
          size: action.size,
        },
      ];

    case "REMOVE":
      // Remove item from the cart by filtering
      return state.filter((item, index) => index !== action.index);
 
    case "UPDATE":
      // Update item quantity and size in the cart
      return state.map((item) =>
        item.id === action.id
          ? { ...item, Qty: action.Qty, size: action.size }
          : item
      );

    case "CLEAR":
      // Clear the cart
      return [];

    default:
      console.error("Error: Unknown action type in Cart reducer");
      return state;
  }
};

// Cart Provider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []); // Initial state is an empty array

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

// Custom Hooks
export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
