import mqtt from 'mqtt';

const authorizedVehicles = [
  { vehicle_id: 'ABC123', access_id: 'ACCESS456' },
  { vehicle_id: 'XYZ789', access_id: 'ACCESS789' },
  { vehicle_id: 'DEF456', access_id: 'ACCESS123' },
];

export const connectToMQTT = (vehicleId, accessId) => {
  const brokerUrl = 'wss://021b0aed7bdb4e7eb3b16aa3983d6cb4.s1.eu.hivemq.cloud:8884/mqtt';
  const username = 'VarshaIoT';
  const password = 'IoTProjectv1';

  const client = mqtt.connect(brokerUrl, {
    username: username,
    password: password,
  });

  client.on('connect', () => {
    console.log('Connected to HiveMQ!');

    const isAuthorized = authorizedVehicles.some(
      (entry) => entry.vehicle_id === vehicleId && entry.access_id === accessId
    );

    const payload = {
      vehicle_id: vehicleId,
      access_id: accessId,
      auth: isAuthorized,
    };

    client.publish('parking/entry', JSON.stringify(payload));
    console.log(`Message sent: ${JSON.stringify(payload)}`);
  });

  client.on('error', (error) => {
    console.log('MQTT Error:', error);
  });
};
