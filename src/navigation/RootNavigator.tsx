import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { NavigationContainerRefWithCurrent } from "@react-navigation/native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { colors, gradients } from "@/constants/theme";
import { useAppSession } from "@/store/AppProvider";
import { HistoryScreen } from "@/screens/HistoryScreen";
import { HomeScreen } from "@/screens/HomeScreen";
import { IncidentDetailScreen } from "@/screens/IncidentDetailScreen";
import { IntroScreen } from "@/screens/IntroScreen";
import { OnboardingScreen } from "@/screens/OnboardingScreen";
import { ProfileScreen } from "@/screens/ProfileScreen";
import { ProtectionDetailsScreen } from "@/screens/ProtectionDetailsScreen";
import { RiskScreen } from "@/screens/RiskScreen";
import { SignInScreen } from "@/screens/SignInScreen";
import type { RootStackParamList, RootTabParamList } from "@/types";

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.ink,
    card: colors.ink,
    border: "rgba(255,255,255,0.08)",
    primary: colors.electric,
    text: colors.text,
    notification: colors.danger
  }
};

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: colors.text,
      tabBarInactiveTintColor: colors.muted,
      tabBarLabelStyle: {
        fontSize: 11,
        fontWeight: "600",
        marginTop: 3,
        marginBottom: 2
      },
      tabBarItemStyle: {
        paddingTop: 6
      },
      tabBarStyle: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 82,
        paddingBottom: 10,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: "rgba(255,255,255,0.06)",
        backgroundColor: "transparent",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        elevation: 0
      },
      tabBarBackground: () => (
        <LinearGradient
          colors={gradients.tab as [string, string]}
          style={{
            flex: 1,
            borderTopWidth: 1,
            borderTopColor: "rgba(255,255,255,0.04)"
          }}
        />
      ),
      tabBarIcon: ({ color, size, focused }) => {
        const iconName =
          route.name === "Home"
            ? focused
              ? "home-sharp"
              : "home-outline"
            : route.name === "History"
              ? focused
                ? "card-sharp"
                : "card-outline"
              : route.name === "Risk"
                ? focused
                  ? "analytics-sharp"
                  : "analytics-outline"
                : focused
                  ? "person-circle-sharp"
                  : "person-circle-outline";

        return <Ionicons color={color} name={iconName as never} size={focused ? size + 1 : size} />;
      }
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="History" component={HistoryScreen} />
    <Tab.Screen name="Risk" component={RiskScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

export const RootNavigator = ({ navigationRef }: { navigationRef: NavigationContainerRefWithCurrent<RootStackParamList> }) => {
  const { isAuthenticated, onboardingComplete } = useAppSession();

  if (isAuthenticated === null || onboardingComplete === null) {
    return null;
  }

  return (
    <NavigationContainer ref={navigationRef} theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.ink } }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={MainTabs} />
        ) : (
          <>
            <Stack.Screen name="Intro" component={IntroScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          </>
        )}
        <Stack.Screen name="IncidentDetail" component={IncidentDetailScreen} />
        <Stack.Screen name="ProtectionDetails" component={ProtectionDetailsScreen} options={{ presentation: "modal" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
