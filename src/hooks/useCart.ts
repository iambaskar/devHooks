import { useReducer } from "react";

interface CartItem{
    [key: string]:any
}

interface CartAction{
    type: "addToCart" | "removeFromCart" | "clearCart",
    payload: CartItem
}

const cartReducer = (cartItems: CartItem[], action: CartAction): CartItem[] => {
    switch(action.type){
        case 'addToCart':
            if(cartItems.find((item) => item.id === action.payload.id)){
                return cartItems.map((item) => item.id === action.payload.id ? {...item, quantity: item.quantity + 1 }  : item)
            }
            return [...cartItems, { ...action.payload, quantity: 1 }];
        case 'removeFromCart':
            if(cartItems.find((item) => item.id === action.payload.id && item.quantity > 1)){
                return cartItems.map((item) => item.id === action.payload.id ? {...item, quantity: item.quantity - 1} : item);
            }
            return cartItems.filter((item) => item.id != action.payload.id);
        case 'clearCart':
            return [];
        default:
            return cartItems;
    };
};

export default function useCart(){
    const  [cartItems, dispatchItem] = useReducer(cartReducer,[] as CartItem[]);

    const handleAdd = (selectedItem: CartItem) => dispatchItem({ type: 'addToCart', payload: selectedItem });
    const handleRemove = (selectedItem: CartItem) => dispatchItem({ type: 'removeFromCart', payload: selectedItem });
    const handleClear = () => dispatchItem({ type: 'clearCart', payload: {} as CartItem });
    return { cartItems, handleAdd, handleRemove, handleClear}
}
