import React,{useState} from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Button,
  TouchableOpacity
} from 'react-native';


const Stack = createStackNavigator();
const AppNavigation = ({ navigation  }) => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
          name="Discount Calculator"
          component={App}
					options={{ headerTitleAlign: "center" }}
				/>
        <Stack.Screen name="History" component={History} />
				
			</Stack.Navigator>
		</NavigationContainer>
	);
};

const History = ({navigation ,route}) =>{
  const [history, setHistory] = useState([...route.params.array]);
  navigation.setOptions({
		headerRight: () => (
			<Button color="darkslateblue" title="Clear all" disabled={false} onPress={() => setHistory([])} />
		),
  });
  
  return (
    <View>
      <View style={styles.history_align}>
				<Text style={styles.history_item} >Original Price</Text>
				<Text style={styles.history_item}>Discount %</Text>
				<Text style={styles.history_item}>Final Price</Text>
			</View>
      <View>
        {history.map((items) => (
          <View>
            <TouchableOpacity>
              <View style={styles.history_align}>
                <Text style={styles.history_item}>{items.Oprice}</Text>
                <Text style={styles.history_item}>{items.discount}</Text>
                <Text style={styles.history_item}>{items.Fprice}</Text>

              </View>

              </TouchableOpacity>

            </View>

        ))}
      </View>
      
    </View>
  );

}




const App= ({navigation , route}) =>
{
  const [Price, setPrice]=useState('');
  const [Discount,setDiscount]=useState('');
  const [btn, setbtn]=useState(true);
  const [history_btn,setHistory_btn]=useState(true);
  const [History, setHistory]=useState([
    
  ]);
  navigation.setOptions({
		headerRight: () => (
			<Button
				title="History"
				disabled={history_btn}
        color="darkslateblue"
				onPress={() => navigation.navigate("History", { array: History })}
			/>
		),
	});
  
  const addHistory = ()=>
  {
    setbtn(true);
    setHistory_btn(false);
    setHistory( prevHistory =>{
      return [{Oprice:Price,discount:Discount,Fprice:(Price-((Price*(Discount/100)).toFixed(2))).toFixed(2)},...prevHistory]
    })
  }
  const onchangePrice = textValue=> {
  
    if(textValue >=0 )
    {
      setPrice(textValue);
    }
    else{
      alert("Please Enter only positive number");
      setPrice("");
    }
  }
  const onchangeDiscount= textValue =>{
    
    if(textValue>101)
    {
      alert("Please Enter Amount less than 100");
      setDiscount('')
      
    }
    else if(textValue<101){
      setbtn(false);
      setDiscount(textValue);

    }
    else{
      alert("Please Enter Positive number Only");
      setDiscount('');
    }
    
  }
  

  return (
    <View style={styles.container}>
      <View style={styles.desgin}>
      <View style={styles.rowDesign} >
        <Text>Original Price</Text>
        <TextInput style={styles.textInput} 
        placeholder="Enter Price" 
        keyboardType={'numeric'}
        onChangeText={onchangePrice}
        value={Price}/>
      </View>
      <View style={styles.rowDesign}>
        <Text >   Discount %  </Text>
        <TextInput style={styles.textInput}
        placeholder="Enter Discount"
        keyboardType={'number-pad'}
        maxLength={3}
        onChangeText={onchangeDiscount}
        value={Discount}
        ></TextInput>
       </View>
      <Text style={styles.text_margin}>Save Price: {(Price*(Discount/100)).toFixed(2)}</Text>
      <Text style={styles.text_margin}>After Discount: {(Price-((Price*(Discount/100)).toFixed(2))).toFixed(2)}</Text>
      
      <Button title="Save" disabled= {btn} color="darkslateblue" margin="20"  onPress={addHistory} ></Button>            
      </View>
    </View>

  );

}



const styles = StyleSheet.create({
  container:{
    
  },
  desgin:
  {
    justifyContent:'center',
    alignItems:'center'

  },
  rowDesign:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around'
    

  },
  textInput: {
   borderWidth:3,
   padding:10,
   width:'70%',
   margin:10,
   borderColor:"darkslateblue",
   borderRadius:10
  },
  
 
  text: {
      color:'white',
      fontSize: 23,
      textAlign: 'center'
  },
  history_align:{
    paddingLeft: 5,
		paddingRight: 5,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		height: 50,
		backgroundColor: "darkslateblue",
		marginBottom: 2,

  },
  history_item:{
    color:"white",
    
  },
  text_margin:{
    margin:10,
   
  }
  
  

  
  
  
 
  
});

export default AppNavigation;