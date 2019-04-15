//Modules
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//Styles
import styles from './styles'

//Componenets
import NumberButtons from './components/NumberButtons/NumberButtons.js'
import HistoryView from './components/HistoryView/HistoryView.js'

const buttons = [
  ['Clear','Delete'],
  ['7','8','9','÷'],
  ['4','5','6','x'],
  ['1','2','3','+'],
  ['.','0','=','-']
]

const initialOutput = '0';
const maxLength = 57;

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      _output: initialOutput,
      _mathExpression: '',
      _history: []
    }
    this._handleEvent = this._handleEvent.bind(this);
    this._clearHistory = this._clearHistory.bind(this);
  }


  // Handles all button press actions
  _handleEvent = (value) => {
    if(!isNaN(value) || value=='.'){
      this._concatToOutput(value);
    }
    else{
      switch(value) {

        case buttons[0][0]:
          this._initOutput();
          break;
        
        case buttons[0][1]:
          if (this.state._output.length === 1){
            this._initOutput();
          }
          else {
            this._replaceLastIndex('');
          }
          break;

        case buttons[4][2]:
          this._evaluate();
          break;

        default:
          let strLastChar = this.state._output.slice(-1);
          if(isNaN(strLastChar)){
            this._replaceLastIndex(value)
          }
          else{
            this._concatToOutput(value);
          }
          break;
      }
    }
  }

    //Display user input on screen
    _concatToOutput = (value) => {
      if(this.state._output.length>=maxLength){
        this._showToast('Maximum Expression Length of ' + maxLength + ' is reached.');
      }
      else{
        if(this.state._output !== initialOutput){
          this.setState({_output: this.state._output + '' + value + ''})
        }
        else{
          this.setState({_output: value + ''})
        }
      }
    }

      //Function to replace the last index of the output
  _replaceLastIndex = (value) => {
    var str1 = this.state._output.replace(/.$/,value)
    this.setState({
      _output: str1
    })
  }

  //Validate and Calculate the output state as a Mathematical expression
  _evaluate = () => {
    try{
      let strCurOutput = this.state._output;
      if(isNaN(strCurOutput)){
        let dEval = eval(this._convertToMathExpression(this.state._output));

        let aHistory = [...this.state._history];
        aHistory.push([strCurOutput, dEval])

        this.setState({
          _output: ''+dEval,
          _history: aHistory
        })
      }
    }
    catch(exception){
      /* console.log('exception: ' + exception); */
      this._showToast('Invalid format used.');
    }
  }

  //Convert state into a mathematical function
  _convertToMathExpression = (value) => {
     let strTemp = value.replace(new RegExp(this._escapeRegExp(buttons[1][3]), 'g'), '/');
     strTemp = strTemp.replace(new RegExp(this._escapeRegExp(buttons[2][3]), 'g'), '*');
    return strTemp;
  }

  _escapeRegExp = (str) => {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }

  //Function to initialize output state
  _initOutput = () => {
    this.setState({
      _output: initialOutput
    })
  }

  //Clear History
  _clearHistory = () => {
    console.log('inside _clearHistory function');
    const emptyArray = [];
    this.setState({
      _history: emptyArray
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contHistory}>
          <HistoryView data={this.state._history} onClear={this._clearHistory} />
        </View>

        <View style={styles.contOutput}>
          <View style={styles.placeHolderOutput}>
            <Text style={styles.txtDefault}>{this.state._output}</Text>
          </View>
        </View>

        <View style={styles.contButtons}>
          <NumberButtons onBtnPress={this._handleEvent} buttons={buttons} />
        </View>

      </View>
    );
  } 
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
