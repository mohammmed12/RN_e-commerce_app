import React from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  Image
} from "react-native";

import { useSelector } from "react-redux";

const ProductDetailScreen = props => {
  const productId = props.navigation.getParam("productId");

  const allProducts = useSelector(state => state.products.availableProducts);

  const selectedProduct = allProducts.find(prod => prod.id === productId);

  return (
    <View>
      <Text>{selectedProduct.title}</Text>
    </View>
  );
};

ProductDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam("productTitle")
  };
};

export default ProductDetailScreen;

const styles = StyleSheet.create({});
