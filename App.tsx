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
import io from 'socket.io-client';
import {BasicWorld} from './src/basic-world';

const socket = io('https://realtime-g2g4oq25qa-uc.a.run.app');

const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [pong, setPong] = useState<any>({});
  const [ping, setPing] = useState<any>({});

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
    <>
      <BasicWorld></BasicWorld>
    </>
  );
};

export default App;
