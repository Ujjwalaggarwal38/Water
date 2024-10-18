import React, { useState } from 'react';
import { Alert, Button, Dimensions, Image, StyleSheet, Text, TextInput, View,TouchableWithoutFeedback,Keyboard,TouchableOpacity } from 'react-native';

const mockData: { [key: string]: { grey: number; blue: number; green: number } } = {
  apple: { grey: 265, blue: 260, green: 295 },
  orange: { grey: 190, blue: 150, green: 220 },
  banana: { grey: 110, blue: 100, green: 330 },
  tomato: { grey: 80, blue: 60, green: 120 },
  broccoli: { grey: 60, blue: 50, green: 160 },
  cauliflower: { grey: 300, blue: 600, green: 300 },
  maize: { grey: 500, blue: 600, green: 450 },
  carrot: { grey: 70, blue: 55, green: 100 },
  radish: { grey: 300, blue: 450, green: 150 },
'bottle-gourd': { grey: 375, blue: 600, green: 225 },
};


const Calculator = ({navigation}) => {
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

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


  // 
  const calculateWaterFootprint = () => {
    if (!validateInputs()) return;

    const productLower = product.toLowerCase().trim();
    const productData = mockData[productLower];

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
        ` Green: ${greenFootprint} liters \n`+
        ` Total: ${greyFootprint + blueFootprint + greenFootprint} liters`

      );
    } else {
      Alert.alert('Error', 'Data not available for this product.');
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
<View style={styles.container2}>
<Text style={styles.instructions}>
        Enter the product/crop name and quantity to calculate its water footprint.
      </Text>

</View>
<View style={styles.container3}>
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
<Button title="Calculate" onPress={calculateWaterFootprint}  />
</View>
</View>
     
      
<View style={styles.container4}>
{result && <Text style={styles.result}>{result}</Text>} 
</View>
     
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: Dimensions.get('window').width * 0.04, 
    fontWeight: 'bold',
    color: 'black', 
    backgroundColor: '#A5DFE1'
  },
  container2:{
    margin:30,
  },
  instructions: {
    fontSize: Dimensions.get('window').width * 0.05, 
    textAlign: 'center',
    marginVertical: 20,
  },
  container3:{
    margin:40,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    fontSize: Dimensions.get('window').width * 0.045, // Responsive font size
  },
  button:{
    marginStart:50,
    marginEnd:50,
  },
  container4:{
    flex:1,
    alignItems:'center',
  },
  result: {
    height:170,
    width:210,
    padding:20,
    backgroundColor:'#BEC3C4',
    fontSize: Dimensions.get('window').width * 0.045, 
    color: 'white',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginVertical: 5,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    borderRadius:10,
  },
  footerText: {
    fontSize: 16,
    color: '#4CAF50',
  },
});

export default Calculator;
