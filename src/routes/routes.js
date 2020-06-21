import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileToEdit from "../screen/ProfileToEdit";
import ChooseIcon from "../screen/ChooseIcon";
import Camera from "../screen/Camera";
import TabNavigation from "./TabNavigation";

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabNavigation"
        component={TabNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileToEdit"
        component={ProfileToEdit}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ChooseIcon" component={ChooseIcon} />
      <Stack.Screen
        name="Camera"
        component={Camera}
        options={{
          title: "Camera",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 16,
          },
          headerStyle: {
            backgroundColor: "black",
            borderBottomColor: "#ffffff",
          },
          headerTintColor: "white",
        }}
      />
    </Stack.Navigator>
  );
};

export default Routes;
