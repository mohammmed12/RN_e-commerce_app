import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import * as cartActions from "../../store/actions/cart";

import ProductItem from "../../components/shop/ProductItem";

import HeaderButton from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);

  const dispatch = useDispatch();

  renderproducts = itemData => {
    return (
      <ProductItem
        image={itemData.item.imageUrl}
        title={itemData.item.title}
        price={itemData.item.price}
        onViewDetail={() => {
          props.navigation.navigate("productDetail", {
            productId: itemData.item.id,
            productTitle: itemData.item.title
          });
        }}
        onAddToCart={() => {
          dispatch(cartActions.addToCart(itemData.item));
        }}
      />
    );
  };

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={renderproducts}
    />
  );
};

ProductsOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: "All Products",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="menu"
          iconName="md-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="add to cart"
          iconName="md-cart"
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    )
  };
};

export default ProductsOverviewScreen;

const styles = StyleSheet.create({});
