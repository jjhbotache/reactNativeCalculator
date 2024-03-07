import React, { useEffect, useRef, useState } from 'react';
import { TouchableNativeFeedback, View, Text, TextInput } from 'react-native';
import Constants from 'expo-constants';

export default function Main() {
  const viewStyles = {
    backgroundColor: '#222',
    marginTop: Constants.statusBarHeight,
    height: '100%',
    padding: 10,
  };

  const textStyles = {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  };

  const buttonStyles = {
    flexGrow: 1,
    height: 100,
    backgroundColor: 'red',
    margin: 10,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  };

  const keys = [
    ["+", "-", "*", "/"],
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ["C","◀",0, '='],
  ];

  const [screenNumber, setScreenNumber] = useState(0);

  useEffect(() => {
    // get numbers from screenNumber
    
    let numbers = [screenNumber];
    let operator = [];
    try{
      let numbers = screenNumber.split(/[\+\-\*\/]/);
      let operator = screenNumber.split(/[0-9\.]+/).filter(Boolean);
      numbers.some(number=>number.startsWith('0') && number.length>1) && numbers.forEach((number, index) => {
        if (number.startsWith('0')) {
          numbers[index] = number.slice(1);
          const newValue = numbers.join(operator);
          console.log("setting to ",newValue);
          setScreenNumber(newValue);
        }
      });
    }
    catch(e){
      console.log('error', e);
    }
    
    // for each number, if starts with 0, remove it


    console.log('numbers', numbers);
  }, [screenNumber]);


  function onKeyPressed(key) {
    if (["+", "-", "*", "/","="].includes(key)) {
      let result = 0;


      try {
        result = parseFloat(eval(screenNumber))
        // raise error if result is NaN
        if (isNaN(result) || !isFinite(result)) {
          throw new Error('Invalid operation');
        }
      }
      catch (error) {
        console.log('error', error)
        result = 0;
      }


      key != "="
        ?setScreenNumber(`${result}${key}`)
        :setScreenNumber(result);
    }
    else if (key == "C") {
      setScreenNumber(0);
    }
    else if (key == "◀") {
      if (screenNumber.length == 1) {
        setScreenNumber(0);
      }else{
        setScreenNumber(screenNumber.toString().slice(0, -1));
      }
    }
    else{
      setScreenNumber(`${screenNumber}${key}`);
    }
  }
  
  return(
    <View style={viewStyles}>
      <Text style={textStyles}>{screenNumber}</Text>

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
  )
};
