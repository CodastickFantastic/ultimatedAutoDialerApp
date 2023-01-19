import { PermissionsAndroid, NativeModules } from "react-native";

export default function dialer(number) {
  // Native Module Initializer - Dialer + Function that deal phone calls
  const { DialerModule } = NativeModules;

  // Andoid require permision to make calls, here we ask user for that permission if it is not granted.
  async function requestCallPhonePrrmission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CALL_PHONE,
        {
          title: "Ultimate Dialer App Permission",
          message: "Ultimate Dialer need acces to your phone call",
          buttonNeutral: "Ask me later",
          buttonNegative: "Denied",
          buttonPositive: "Grant",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await DialerModule.makeCall(number);
      } else {
        console.log("Permission denied");
      }
    } catch (err) {
      console.log(err);
    }
  }
  requestCallPhonePrrmission();
}
