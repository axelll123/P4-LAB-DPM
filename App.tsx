import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, Modal } from 'react-native';

const App: React.FC = () => {
  const [teamAScore, setTeamAScore] = useState(0);
  const [teamBScore, setTeamBScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const startGame = () => {
    if (!intervalId && !isGameOver) {
      const newIntervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);

        const randomChance = Math.random();
        if (randomChance < 0.05) {
          setTeamAScore((prevScore) => {
            if (prevScore + 1 === 10) endGame();
            return prevScore + 1;
          });
        } else if (randomChance < 0.1) {
          setTeamBScore((prevScore) => {
            if (prevScore + 1 === 10) endGame();
            return prevScore + 1;
          });
        }
      }, 1000);

      setIntervalId(newIntervalId);
    }
  };

  const resetGame = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setTeamAScore(0);
    setTeamBScore(0);
    setTimer(0);
    setIsGameOver(false);
  };

  const endGame = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setIsGameOver(true);
  };

  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  const incrementScore = (team: 'A' | 'B') => {
    if (team === 'A') {
      setTeamAScore((prevScore) => {
        if (prevScore + 1 === 10) endGame();
        return prevScore + 1;
      });
    }
    if (team === 'B') {
      setTeamBScore((prevScore) => {
        if (prevScore + 1 === 10) endGame();
        return prevScore + 1;
      });
    }
  };

  const decrementScore = (team: 'A' | 'B') => {
    if (team === 'A' && teamAScore > 0) setTeamAScore((prevScore) => prevScore - 1);
    if (team === 'B' && teamBScore > 0) setTeamBScore((prevScore) => prevScore - 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.scoreboard}>
        {/* Team A Section */}
        <View style={styles.teamContainer}>
          <Text style={styles.teamName}>SIREGAR FC</Text>
          <Text style={styles.score}>{teamAScore}</Text>
          <View style={styles.manualControls}>
            <TouchableOpacity onPress={() => incrementScore('A')} style={styles.manualButton}>
              <Text style={styles.manualButtonText}>+1</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => decrementScore('A')} style={styles.manualButton}>
              <Text style={styles.manualButtonText}>-1</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Timer Section */}
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{formatTime(timer)}</Text>
        </View>

        {/* Team B Section */}
        <View style={styles.teamContainer}>
          <Text style={styles.teamName}>SINAGA FC</Text>
          <Text style={styles.score}>{teamBScore}</Text>
          <View style={styles.manualControls}>
            <TouchableOpacity onPress={() => incrementScore('B')} style={styles.manualButton}>
              <Text style={styles.manualButtonText}>+1</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => decrementScore('B')} style={styles.manualButton}>
              <Text style={styles.manualButtonText}>-1</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <Text style={styles.controlsText1} onPress={startGame}>Kick Off</Text>
        <Text style={styles.controlsText2} onPress={resetGame}>Reset Match</Text>
      </View>

      {/* Full Time Modal */}
      <Modal
        visible={isGameOver}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsGameOver(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>⚽ Full Time ⚽</Text>
            <View style={styles.modalScoreBoard}>
              <Text style={styles.modalScore}>{teamAScore}</Text>
              <Text style={styles.modalVersus}>VS</Text>
              <Text style={styles.modalScore}>{teamBScore}</Text>
            </View>
            <Text style={styles.modalMessage}>Thank you for playing!</Text>
            <TouchableOpacity onPress={resetGame} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Restart Match</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  scoreboard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#000',
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  teamContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  teamName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 10,
  },
  score: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'red',
  },
  manualControls: {
    flexDirection: 'row',
    marginTop: 10,
  },
  manualButton: {
    backgroundColor: 'orange',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  manualButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  timerContainer: {
    marginTop: -20,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 30,
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'orange',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontWeight: 'heavy',
    width: '94%',
    marginTop: 20,
  },
  controlsText1: {
    fontSize: 18,
    borderColor: 'green',
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
    color: 'green',
    fontWeight: 'bold',
  },
  controlsText2: {
    fontSize: 18,
    borderColor: 'red',
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
    color: 'red',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalContent: {
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#222',
    padding: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'red',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'orange',
    marginBottom: 20,
  },
  modalScoreBoard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalScore: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'red',
    marginHorizontal: 14,
  },
  modalVersus: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  modalMessage: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;
