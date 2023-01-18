import React from 'react';
import {NativeModules, Button, Text, PermissionsAndroid} from 'react-native';

function DialerComponent() {
  const {CalendarModule} = NativeModules;

  async function requestCallPhonePrrmission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CALL_PHONE,
        {
          title: 'Ultimate Dialer App Permission',
          message: 'Ultimate Dialer need acces to your phone call',
          buttonNeutral: 'Ask me later',
          buttonNegative: 'Denied',
          buttonPositive: 'Grant',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await CalendarModule.makeCall();
      } else {
        console.log('Permission denied');
      }
    } catch (err) {
      console.log(err);
    } finally {
      console.log('end');
    }
  }

  function onPress() {
    console.log('We will invoke the native module here!');

    requestCallPhonePrrmission();
  }

  return (
    <>
      <Button
        title="Click to invoke native module!"
        color="#841584"
        onPress={onPress}
      />
    </>
  );
}

export default DialerComponent;
