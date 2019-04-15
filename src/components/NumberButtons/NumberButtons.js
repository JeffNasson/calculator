import React, {Component} from 'react';
import {View,Text,TouchableNativeFeedback, TouchableHighlight} from 'react-native';

import styles from './styles'

export default class NumberButtons extends Component{

    // Component should only render once
    shouldComponentUpdate(nextProps, nextState){
        return false
    }

    // call the bound function from parent to handle button press event
    _handleOnPress = (value) =>{
        requestAnimationFrame(()=>{
            this.props.onBtnPress(value)
        })
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.props.buttons.map((row, index) => (
                        <View key={index} style={styles.contRow}>
                            { 
                                row.map((col,index) => (
                                    <TouchableHighlight
                                        key={index}
                                        onPress={() => this._handleOnPress(col)}
                                        >
                                        <View style={styles.contButton}>
                                            <Text style={styles.txtDefault}>{col}</Text>
                                        </View>
                                    </TouchableHighlight>
                                ))
                            }
                        </View>
                    ))
                }
            </View>
        );
    }
}