import { createAppContainer } from "react-navigation";

import React from "react";

import { createStackNavigator } from "react-navigation-stack";
import { Platform } from "react-native";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";

import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import { createDrawerNavigator } from "react-navigation-drawer";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : ""
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: {
      screen: ProductsOverviewScreen
    },
    productDetail: {
      screen: ProductDetailScreen
    },
    Cart: CartScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons name="md-cart" size={23} color={drawerConfig.tintColor} />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const OrdersNavigator = createStackNavigator(
  {
    orders: OrdersScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons name="md-list" size={23} color={drawerConfig.tintColor} />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const shopNavigator = createDrawerNavigator(
  {
    products: ProductsNavigator,
    Orders: OrdersNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    }
  }
);

export default createAppContainer(shopNavigator);
