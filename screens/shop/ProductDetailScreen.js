import React from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  Image
} from "react-native";

import Colors from "../../constants/Colors";

import { useSelector, useDispatch } from "react-redux";

import * as cartActions from "../../store/actions/cart";

const ProductDetailScreen = props => {
  const productId = props.navigation.getParam("productId");

  const dispatch = useDispatch();

  const allProducts = useSelector(state => state.products.availableProducts);

  const selectedProduct = allProducts.find(prod => prod.id === productId);

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="add to Cart"
          onPress={() => {
            dispatch(cartActions.addToCart(selectedProduct));
          }}
        />
      </View>
      <Text style={styles.price}>${selectedProduct.price}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam("productTitle")
  };
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20
  },
  actions: {
    marginVertical: 10,
    alignItems: "center"
  }
});
