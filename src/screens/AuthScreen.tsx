import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import {
  TextInput,
  useTheme,
  Text,
  Button,
  HelperText,
} from "react-native-paper";
import { AuthContext } from "../contexts";

export function AuthScreen() {
  const theme = useTheme();
  const { setConfig } = useContext(AuthContext);

  const [serverUrl, setServerUrl] = React.useState("");
  const [apiToken, setApiToken] = React.useState("");

  const isDisabled = !serverUrl || !apiToken;

  const onLogin = () => {
    try {
      setConfig({ serverUrl, apiToken });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        ...styles.mainContainer,
      }}
    >
      <View style={styles.innerContainer}>
        <Text variant="headlineMedium" style={styles.title}>
          Linkaty
        </Text>
        <View style={styles.formContainer}>
          <View>
            <TextInput
              mode="outlined"
              label="Your Server's URL"
              value={serverUrl}
              onChangeText={value => setServerUrl(value)}
            />
            <HelperText type="info">
              The base URL of your Linkding's server. eg.
              https://linkding.example.com
            </HelperText>
          </View>
          <View>
            <TextInput
              mode="outlined"
              label="API Token"
              value={apiToken}
              onChangeText={value => setApiToken(value)}
            />
            <HelperText type="info">
              You can find your token in the settings page.
            </HelperText>
          </View>
          <Button
            mode="contained"
            style={styles.loginButton}
            onPress={onLogin}
            disabled={isDisabled}
          >
            Login
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    width: "80%",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  formContainer: {
    display: "flex",
    gap: 10,
  },
  serverUrlHelperText: {
    opacity: 0.8,
    margin: 4,
  },
  loginButton: {
    marginTop: 15,
  },
});
