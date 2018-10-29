import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Constants } from 'expo';
import { createStackNavigator  } from 'react-navigation'; 
import FoodSearch from './components/FoodSearch';
import { Button, FormInput } from 'react-native-elements';
import { styles } from './components/styles';

var globalCalorieCount = 0;
var globalCalorieGoal = 2000;
var globalFoodList = [ ]

/* ******************* HOME SCREEN ******************* */
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caloriesConsumed: globalCalorieCount,
      caloriesRemaining: globalCalorieGoal,
    }
  }

componentDidFocus(payload) {
  this.subs.forEach(sub => sub.remove());
  var newCaloriesRemaining = parseFloat(globalCalorieGoal) - parseFloat(globalCalorieCount);
  this.setState({
    caloriesConsumed: globalCalorieCount,
    caloriesRemaining: newCaloriesRemaining,
  });
}

  listenAndNavigateAddFoodItem() {
    this.subs = [
    this.props.navigation.addListener('willFocus', 
          (payload) => this.componentDidFocus(payload)),
    ]; 
    this.props.navigation.navigate('AddFoodItem');
  }

  listenAndNavigateViewFoodItems() {
    this.subs = [
    this.props.navigation.addListener('willFocus', 
          (payload) =>         this.componentDidFocus(payload)),
    ]; 
    this.props.navigation.navigate('ViewFoodItems');
  }
  
  listenAndNavigateEditCalorieGoal() {
    this.subs = [
    this.props.navigation.addListener('willFocus', 
          (payload) =>         this.componentDidFocus(payload)),
    ]; 
    this.props.navigation.navigate('EditCalorieGoal');
  }

  resetCalorieCount() {
    this.setState({ caloriesConsumed: 0,
      caloriesRemaining: globalCalorieGoal });
    globalCalorieCount = 0;
    globalFoodList = [];
  }

  render() {

    return (
      <View style={styles.containerHome}>
        <View>
          <Text style={styles.header}>
            Calorie Counter
          </Text>
        </View>
        <View>
          <Text style={styles.number} >
            {this.state.caloriesConsumed}
          </Text>
          <Text style={styles.paragraph} >
            calories consumed
          </Text>
        </View>
          <View>
          <Text style={styles.number} >
            {this.state.caloriesRemaining}
          </Text>
          <Text style={styles.paragraph} >
            calories remaining
          </Text>
        </View>
        <View>
          <Button
            title="Add Food Item"
            onPress={() => this.listenAndNavigateAddFoodItem()}
            color='white'
            buttonStyle={{
              backgroundColor: "#6cc",
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 5,
              margin: 5
            }}
          />
          <Button
            title="View Today's Foods"
            onPress={() => this.listenAndNavigateViewFoodItems()}
            color='white'
            buttonStyle={{
              backgroundColor: "#6cc",
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 5,
              margin: 5
            }}
          />
          <Button
            title="Reset Calorie Count"
            onPress={() => this.resetCalorieCount()}
            color='white'
            buttonStyle={{
              backgroundColor: "#6cc",
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 5,
              margin: 5
            }}
          />
          <Button
            title="Edit Calorie Goal"
            onPress={() => this.listenAndNavigateEditCalorieGoal()}
            color='white'
            buttonStyle={{
              backgroundColor: "#6cc",
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 5,
              margin: 5
            }}
          />
        </View>

      </View>
    );
  }
}

/* ******************* ADD FOOD ITEM SCREEN ******************* */
class AddFoodItemScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calories: 0,
    }
  }

  fsdfsd (newcalories) {
      globalCalorieCount += newcalories;
      var caltemp = this.state.calories + newcalories;
      this.setState({calories: caltemp});
  }

  updateState (newFood) {
      globalFoodList.push(newFood);
      globalCalorieCount += parseFloat(newFood.calories);
      var caltemp = this.state.calories + parseFloat(newFood.calories);
      this.setState({calories: caltemp});
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Add Food Item
        </Text>
        <Text style={styles.paragraph}>
          {globalCalorieCount} calories consumed today
        </Text>
        <Text style={styles.paragraph}>
          {this.state.calories} calories added this session
        </Text>
            <FoodSearch updateParentState={this.updateState.bind(this)} />
      </View>
    );
  }
}

/* ******************* VIEW FOOD ITEMS SCREEN ******************* */
class ViewFoodItemsScreen extends React.Component {

  foodRemoved(food) {
    // Remove from calorie count
    globalCalorieCount -= parseFloat(food.calories);
    
    // Remove item from the food list
    var index = globalFoodList.findIndex(k => k.name === food.name);
    globalFoodList.splice(index, 1);
    
    this.forceUpdate();
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Today's Foods
        </Text>
        <Text style={styles.paragraph}>
          {globalCalorieCount} calories consumed today
        </Text>
        <ScrollView>
          {globalFoodList.map(food => {
            return (
              <TouchableOpacity onPress={()=>Alert.alert(
                  'Delete this food?',
                  food.name + ', ' + food.calories + ' calories',
                  [
                    {text: 'Cancel'},
                    {text: 'OK', onPress: () => this.foodRemoved(food)},
                  ],
                  { cancelable: true }
                )} style={styles.listItem}> 
                <View style={{flex:1,flexDirection:'row', width:350}} >
                  <Text style={{paddingRight: 20}}>{food.name}, {food.calories} calories {}</Text>
                  
                </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    );
  }
}

/* ******************* EDIT CALORIE GOAL SCREEN ******************* */
class EditCalorieGoalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calorieGoal: globalCalorieGoal,
      text: '',
    }
  }

  updateState (text) {
    // Update the input text field
    this.setState({text: text});

    // Update calorie goal only if a number
    if (!isNaN(parseFloat(text))) {
      this.setState({ calorieGoal: text })
    globalCalorieGoal = parseFloat(text);
    }
  }
  
  render() {
    return (
      <View style={styles.containerHome}>
        <Text style={styles.header}>
          Edit Calorie Goal
        </Text>
        <View>
          <Text style={styles.paragraph}>
            Current calorie goal:
          </Text>
          <Text style={styles.number}>
            {this.state.calorieGoal}
          </Text>
          <Text style={styles.paragraph}>
            calories
          </Text>
        </View>

        <View>
          <Text style={styles.paragraph}>
              Enter a new calorie goal:
            </Text>
          <FormInput
            placeholder='ENTER A NUMBER'
            inputStyle={{height: 40, borderColor: 'gray', borderWidth: 1, textAlign:'center', alignContent:'center', alignSelf:'center'}}
            onChangeText={(text) => this.updateState(text)}
            value={this.state.text}
          />
        </View>

      </View>
    );
  }
}

const RootStack = createStackNavigator (
  {
    Home: {
      screen: HomeScreen,
    },
    AddFoodItem: {
      screen: AddFoodItemScreen,
    },
    EditCalorieGoal: {
      screen: EditCalorieGoalScreen,
    },
    ViewFoodItems: {
      screen: ViewFoodItemsScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);


export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}