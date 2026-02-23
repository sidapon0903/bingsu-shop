export type CartItem = {
  name: string;
  price: number;
  qty: number;
};

export function getCart(): CartItem[] {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

export function addToCart(item: CartItem) {
  const cart = getCart();
  const existing = cart.find(c => c.name === item.name);

  if (existing) existing.qty += item.qty;
  else cart.push(item);

  localStorage.setItem("cart", JSON.stringify(cart));
}

export function clearCart() {
  localStorage.removeItem("cart");
}
