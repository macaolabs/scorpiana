import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MultiTouch from './src/touch-events/multi-touch';
import SingleTouch from './src/touch-events/single-touch';

const Flex = () => {
  return <MultiTouch />;
  // return <SingleTouch/>
};

const styles = StyleSheet.create({});

export default Flex;
