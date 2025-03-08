import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { connectToMQTT } from './src/mqttService';

const App = () => {
  const [vehicleId, setVehicleId] = useState('');
  const [accessId, setAccessId] = useState('');

  const handleSend = () => {
    if (!vehicleId.trim() || !accessId.trim()) {
      console.log('Please enter both vehicle ID and access ID.');
      return;
    }

    console.log(`Sending Vehicle ID: ${vehicleId}, Access ID: ${accessId}`);
    connectToMQTT(vehicleId, accessId);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>IoT Parking System</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Vehicle ID"
        value={vehicleId}
        onChangeText={setVehicleId}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Access ID"
        value={accessId}
        onChangeText={setAccessId}
      />
      <Button
        title="Send"
        onPress={handleSend}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
  },
});

export default App;
