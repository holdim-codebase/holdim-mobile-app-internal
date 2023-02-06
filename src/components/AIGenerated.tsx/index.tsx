import React from 'react';
import {
    View,
    Text,
  } from 'react-native'
import { styles } from './styles';
  
type AiGenerated = {
    icon: JSX.Element
  }
const AiGeneratedText = ({icon}: AiGenerated) => {
    return (
        <View style={styles.aiExlam}>
            <Text style={styles.aiExlamText}>
                ai generated
            </Text>
            {icon}
        </View>
    );
};

export default AiGeneratedText;