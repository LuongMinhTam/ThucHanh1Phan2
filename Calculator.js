import React, { useState } from 'react'
import { StatusBar, StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native'
import {Entypo} from '@expo/vector-icons';


function Calculator() {
    const [darkMode, setDarkMode] = useState(false);
    const [currentNumber, setCurrentNumber] = useState('');
    const [lastNumber, setLastNumber] = useState('')

    const keys = ['C', 'DEL', '/', 7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '='];

    function calculator() {
        let lastArr = currentNumber[currentNumber.length-1];
        if(lastArr === '/' || lastArr === '*' || lastArr === '-' || lastArr === '+' || lastArr === '.') {
            setCurrentNumber(currentNumber);
        } else {
            let result = eval(currentNumber).toString();
            setCurrentNumber(result);
            return;
        }
    }

function handleInput(buttonPressed) {
    if(buttonPressed === '+' || buttonPressed === '-' || buttonPressed === '*' || buttonPressed === '/') {
        Vibration.vibrate(35);
        setCurrentNumber(currentNumber + buttonPressed);
        return;
    } 
    else if(buttonPressed === 1 || buttonPressed === 2 || buttonPressed === 3 || buttonPressed === 4 || buttonPressed === 5 || buttonPressed === 6 || buttonPressed === 7 || buttonPressed === 9 || buttonPressed === 9) {
        Vibration.vibrate(35);
    }
    switch(buttonPressed) {
        case 'DEL' :
            Vibration.vibrate(35);
            setCurrentNumber(currentNumber.substring(0, (currentNumber.length-1)));
            return;
        case 'C' :
            Vibration.vibrate(35);
            setLastNumber('');
            setCurrentNumber('');
            return;
        case '=' :
            Vibration.vibrate(35);
            setLastNumber(currentNumber + '=');
            calculator();
            return;
    }
    setCurrentNumber(currentNumber + buttonPressed);
}

  return (
    <View>
        <StatusBar hidden={true}/>
        <View style={[styles.result, {backgroundColor: darkMode? '#282f3b' : '#f5f5f5'}]}>
            <TouchableOpacity style={[styles.themeButton, {backgroundColor: darkMode ? '#7b8084' : '#e5e5e5'}]}>
                <Entypo name={darkMode ? "light-up" : "moon"} size={24} color={darkMode ? 'white' : 'black'}
                onPress={() => darkMode ? setDarkMode(false) : setDarkMode(true)}/>
            </TouchableOpacity>
            <Text style={styles.historyText}>{lastNumber}</Text>
            <Text style={styles.resultText}>{currentNumber}</Text>
        </View>
        <View style={styles.keyboard}>
            {keys.map((button) => 
                button ==='/' || button ==='*' || button ==='+' || button ==='-' || button ==='=' ?
                <TouchableOpacity style={[styles.key, {backgroundColor: '#00b9d6', minWidth: '24%'}]} key={button} onPress={() => handleInput(button)}>
                    <Text style={[styles.textKey, {color: 'white', fontSize: 28}]}>{button}</Text>
                </TouchableOpacity>
                :
                button === '.' || button === 'DEL' ?
                <TouchableOpacity style={[styles.key, {backgroundColor: button === '.' ?
                darkMode ? '#303946' : '#fff' : darkMode === true ? '#414853' : '#ededed', minWidth: '37%'}]} key={button} onPress={() => handleInput(button)}>
                    <Text style={[styles.textKey, {color: darkMode? '#b5b7bb' : '#7c7c7c'}]}>{button}</Text>
                </TouchableOpacity>
                :
                button === "C" ?
                <TouchableOpacity style={[styles.key, {backgroundColor: typeof(button) === 'number' ?
                darkMode ? '#303946' : '#fff' : darkMode === true ? '#414853' : '#ededed', minWidth: '36%'}]} key={button} onPress={() => handleInput(button)}>
                    <Text style={[styles.textKey, {color: darkMode? '#b5b7bb' : '#7c7c7c'}]}>{button}</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={[styles.key, {backgroundColor: typeof(button) === 'number' ?
                darkMode ? '#303946' : '#fff' : darkMode === true ? '#414853' : '#ededed'}]} key={button} onPress={() => handleInput(button)}>
                    <Text style={[styles.textKey, {color: darkMode? '#b5b7bb' : '#7c7c7c'}]}>{button}</Text>
                </TouchableOpacity>
            )}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    result: {
        maxWidth: '100%',
        minHeight: '31%',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    resultText: {
        maxHeight: 45,
        color: '#00b9d6',
        margin: 15,
        fontSize: 35,
    },
    historyText: {
        fontSize: 20,
        marginRight: 10,
        alignSelf: 'flex-end',
    },
    themeButton: {
        alignSelf: 'flex-start',
        bottom: '5%',
        margin: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    keyboard: {
        width: '100%',
        height: '35%',
        flexDirection: 'row',
        flexWrap: 'wrap',

    },
    key: {
        minheight: '54%',
        minWidth: '24%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2
    },
    textKey: {
        fontSize: 28,
    }
})

export default Calculator