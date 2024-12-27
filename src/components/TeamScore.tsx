import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

interface TeamScoreProps {
  teamName: string;
  score: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const TeamScore: React.FC<TeamScoreProps> = ({ teamName, score, onIncrement, onDecrement }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.teamName}>{teamName}</Text>
      <Text style={styles.score}>{score}</Text>
      <View style={styles.buttons}>
        <Button title="+" onPress={onIncrement} />
        <Button title="-" onPress={onDecrement} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  teamName: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
  },
  score: {
    fontSize: 64,
    color: '#ff0000',
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 10,
  },
});

export default TeamScore;
