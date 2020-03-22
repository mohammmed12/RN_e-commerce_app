import React from "react";
import { FlatList, Button, StyleSheet, Text, View } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import * as cartActions from "../../store/actions/cart";

import * as orderActions from "../../store/actions/orders";

const CartScreen = props => {
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);

  const dispatch = useDispatch();

  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for (const k in state.cart.items) {
      transformedCartItems.push({
        productId: k,
        productTitle: state.cart.items[k].productTitle,
        productPrice: state.cart.items[k].productPrice,
        quantity: state.cart.items[k].quantity,
        sum: state.cart.items[k].sum
      });
    }
    return transformedCartItems;
  });

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          title="Order Now"
          disabled={cartItems.length === 0}
          onPress={() => {
            dispatch(orderActions.addOrder(cartItems, cartTotalAmount));
          }}
        />
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={item => item.productId}
        renderItem={itemData => (
          <CartItem
            title={itemData.item.productTitle}
            quantity={itemData.item.quantity}
            amount={itemData.item.sum}
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: "Your Cart"
};

export default CartScreen;

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white"
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18
  },
  amount: {
    color: Colors.accent
  }
});
