import { StatusBar } from 'expo-status-bar';
import { useRef } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, TouchableNativeFeedback, TouchableWithoutFeedback, View } from 'react-native';

export default function App() {
  const viewStyles = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
  };

  const textStyles = {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  };

  const buttonStyles = {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    margin: 10,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  };

  const keys = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [0, '.', '='],
  ];

  const inputRef = useRef(null);


  function onKeyPressed(key) {
    inputRef.current.focus();
    inputRef.current.value = key.toString();
    console.log(inputRef.current.value);
  }

  return (
    <View style={viewStyles}>
      <TextInput ref={inputRef} style={textStyles} placeholderTextColor="white" placeholder='0'></TextInput>

      {/* keys */}
      {
        keys.map((row, index) => {
          return (
            <View key={index} style={{ flexDirection: 'row' }}>
              {
                row.map((key, index) => {
                  return (
                    <TouchableNativeFeedback key={index} onPress={() => onKeyPressed(key)}>
                      <View style={buttonStyles}>
                        <Text style={textStyles}>{key}</Text>
                      </View>
                    </TouchableNativeFeedback>
                  )
                })
              }
            </View>
          )
        })
          
      }

    </View>
  );
}

