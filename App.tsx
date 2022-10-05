/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState, type PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import io from 'socket.io-client';

const socket = io('https://realtime-g2g4oq25qa-uc.a.run.app');

const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [pong, setPong] = useState<any>({});
  const [ping, setPing] = useState<any>({});

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('s:status', (message: any) => {
      setPong({
        ...message,
        time: new Date().getTime(),
      });
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);

  const sendPing = () => {
    const ping = {
      message: 'ping',
      time: new Date().getTime(),
    };
    setPing(ping);
    socket.emit('c:move', ping);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Text style={styles.title}>Hi Scorpiana!</Text>
      <Text>Is connected {Boolean(isConnected)}</Text>
      <Text>Ping {JSON.stringify(ping || {})}</Text>
      <Text>Pong {JSON.stringify(pong || {})}</Text>
      <Button title="Send ping" onPress={sendPing}></Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
});

export default App;
