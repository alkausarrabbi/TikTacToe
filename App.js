import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, ImageBackground, Pressable, Alert } from 'react-native';
import bg from './assets/bg.jpeg';
import Cell from './Components/Cell';

const emptyMap = [
  ['', '', ''], // 1st row
  ['', '', ''], // 2nd row
  ['', '', ''], // 3rd row
];

export default function App() {
  const [map, setMap] = useState(emptyMap);

  const [currentTurn, setCurrentTurn] = useState('x');



  const onPress = (rowIndex, columnIndex) => {
   
    if(map[rowIndex][columnIndex] !== ""){
      Alert.alert("Position already occupied");
      return;
    }

    setMap((existingMap) => {
      const updatedMap = [...existingMap];
      updatedMap[rowIndex][columnIndex] = currentTurn;
      return updatedMap;
    });

    setCurrentTurn(currentTurn === "x" ? "o" : "x");

    // checkWinningState();
    const winner = getWinner();
    if(winner){
      gameWon(winner);
    } else {
        checkTieState();
    }
  };

  const getWinner = () => {
    // Check Rows
    for (let i = 0; i< 3; i++){

      const isRowXWinning = map[i].every((cell) => cell === 'x');
      const isRowOWinning = map[i].every((cell) => cell === 'o');

      if(isRowXWinning){
        // gameWon('x');
        // Alert.alert(`X won! Row: ${i}`);
        return "X";
      }

      if(isRowOWinning){
        // gameWon('o');
        return "O";
        // Alert.alert(`O won! Row: ${i}`);
      }
    }
    // Check Columns
    for(let col = 0; col < 3; col++){

      let isColumnXWinner = true;
      let isColumnOWinner = true;

      for(let row = 0; row < 3; row++){
        if (map[row][col] !== 'x'){
          isColumnXWinner = false;
        }
        if (map[row][col] !== 'o'){
          isColumnOWinner = false;
        }
      }

      if(isColumnXWinner){
        // Alert.alert(`X won! Col: ${col}`);
        // gameWon('x');
        return "X";
        break;
      }

      if(isColumnOWinner){
        // Alert.alert(`O won! Col: ${col}`);
        // gameWon('o');
        return "O";
        break;
      }
    }
    // Check Diagonals
    let isDiagonal1OWinning = true;
    let isDiagonal1XWinning = true;
    let isDiagonal2OWinning = true;
    let isDiagonal2XWinning = true;

    for(let i = 0; i < 3; i++){
      if (map[i][i] !== 'o'){
        isDiagonal1OWinning = false;
      }
      if (map[i][i] !== 'x'){
        isDiagonal1XWinning = false;
      }

      if (map[i][2 - i] !== 'o'){
        isDiagonal2OWinning = false;
      }
      if (map[i][2 - i] !== 'x'){
        isDiagonal2XWinning = false;
      }
    }
    if (isDiagonal1OWinning){
      // Alert.alert(`O won! Diagonal 1`);
      // gameWon('o');
      return "O";
    }
    if (isDiagonal1XWinning){
      // Alert.alert(`X won! Diagonal 1`);
      // gameWon('x');
      return "X";
    }
    if (isDiagonal2OWinning){
      // Alert.alert(`O won! Diagonal 2`);
      // gameWon('o');
      return "O";
    }
    if (isDiagonal2XWinning){
      // Alert.alert(`X won! Diagonal 2`);
      // gameWon('x');
      return "X";
    }
  }

  const checkTieState = () => {
    if(!map.some(row => row.some(cell => cell === ''))){
      Alert.alert(`It's a tie!!`, `tie`, [
        {
          text: 'Restart',
          onPress: resetGame,
        }
      ]);
    }
  }

  const gameWon =(player) => {
    Alert.alert(`Huraaay`, `Player ${player} won!`, [
      {
        text: 'Restart',
        onPress: resetGame,
      }
    ]);
  };

  const resetGame = () => {
    setMap([
      ['', '', ''], // 1st row
      ['', '', ''], // 2nd row
      ['', '', ''], // 3rd row
    ]);
    setCurrentTurn("x");
  };

  const botTurn = () => {
    // Collect All Possible Options
    const possiblePositions = [];
    map.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) =>{
        if (Cell === ''){
          possiblePositions.push({row: rowIndex, col: columnIndex});
        }
      });
    });
    //  Choose the best option
    const chosenOption = possiblePositions[Math.floor(Math.random() * possiblePositions.length)];
    
    if(chosenOption){
      onPress(chosenOption.row, chosenOption.col);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.bg} resizeMode="contain">
        <Text 
          style={{
            fontSize: 24, 
            color: "#1c87ac", 
            marginBottom: "auto", 
            marginTop: 50,
            position: 'absolute',
            top: 50,
          }}
        >
            Current Turn: {currentTurn.toUpperCase()}
        </Text>
        <View style={styles.map}>
          {map.map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} style={styles.row}>
               {row.map((cell, columnIndex) => (
               
               <Cell 
                key={`row-${rowIndex}-col-${columnIndex}`} 
                cell={cell} 
                onPress={() => onPress(rowIndex, columnIndex)}/>
               ))}
            </View>
          ))}


          
        </View>
        <View >
        <Text style={{
            fontSize: 20, 
            color: "#1c87ac",  
            top: 50,
          }}>Develop By Al Kausar Rabbi</Text>
        </View>
       
      </ImageBackground>

      <StatusBar style="auto" />
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#232D34",
  },
  bg:{
    width: "100%",
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
  },
  map:{
    // borderWidth: 1,
    // borderColor: 'white',
    width: "80%",
    aspectRatio: 1,

    // padding: 5,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    
  },


  
});
