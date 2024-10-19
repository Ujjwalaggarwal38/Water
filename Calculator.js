import React, { useState } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet, Keyboard, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

const API_BASE_URL = 'http://192.168.171.178:3000'; 

const Calculator = ({ navigation }) => {
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    if (!product.trim() || !quantity.trim()) {
      setError('Both fields are required.');
      return false;
    }
    if (isNaN(Number(quantity))) {
      setError('Quantity must be a valid number.');
      return false;
    }
    setError('');
    return true;
  };

  const fetchProductData = async (productName) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/products/${productName.toLowerCase()}`);
      const data = await response.json();
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      console.error('Error fetching product data:', error);
      Alert.alert('Error', 'Failed to fetch product data.');
      return null;
    }
  };

  const calculateWaterFootprint = async () => {
    if (!validateInputs()) return;

    const productData = await fetchProductData(product.trim());

    if (productData) {
      const { grey, blue, green } = productData;
      const quantityNum = Number(quantity);

      const greyFootprint = grey * quantityNum;
      const blueFootprint = blue * quantityNum;
      const greenFootprint = green * quantityNum;

      setResult(
        `Water footprint for ${quantity} kg of ${product}:\n` +
        ` Grey: ${greyFootprint} liters\n` +
        ` Blue: ${blueFootprint} liters\n` +
        ` Green: ${greenFootprint} liters\n` +
        ` Total: ${greyFootprint + blueFootprint + greenFootprint} liters`
      );
    } else {
      setResult(null);
    }
  };

  const dismissKeyboardAndError = () => {
    Keyboard.dismiss();
    setError('');
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboardAndError}>
      <View style={styles.container}>
        <Text style={styles.instructions}>
          Enter the product/crop name and quantity to calculate its water footprint.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Product/Crop Name"
          value={product}
          onChangeText={setProduct}
        />

        <TextInput
          style={styles.input}
          placeholder="Quantity (kg)"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.button}>
          <Button title={loading ? 'Calculating...' : 'Calculate'} onPress={calculateWaterFootprint} disabled={loading} />
        </View>

        {result && <Text style={styles.result}>{result}</Text>}

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.footerText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => console.log('Rewards clicked')}>
            <Text style={styles.footerText}>Rewards</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => console.log('Community clicked')}>
            <Text style={styles.footerText}>Community</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => console.log('Settings clicked')}>
            <Text style={styles.footerText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  instructions: { fontSize: 18, textAlign: 'center', marginVertical: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 10, borderRadius: 5 },
  button: { marginVertical: 20 },
  result: { marginTop: 20, fontSize: 16, backgroundColor: '#ddd', padding: 10, textAlign: 'center' },
  errorText: { color: 'red', textAlign: 'center', marginTop: 10 },
  footer: {
    flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15,
    borderTopWidth: 1, borderColor: '#ccc', backgroundColor: '#fff', position: 'absolute', bottom: 0, width: '100%'
  },
  footerText: { fontSize: 16, color: '#4CAF50' }
});

export default Calculator;
