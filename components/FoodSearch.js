import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import SearchInput, { createFilter } from 'react-native-search-filter';
import * as foodsjson from '../assets/foods.json';
var foodlist = foodsjson.report.foods;
const KEYS_TO_FILTER = ['name'];
import Icon from 'react-native-vector-icons/Feather';
import { styles } from './styles';

var calories = 0;

export default class FoodSearch extends Component<{}> {
 constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      calories: 0
    }
  }
  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }

  updateParentState(data) {
      this.props.updateParentState(data);
  }

  foodAdded(newFood) {
    var caltemp = parseFloat(newFood.calories);
    this.setState({ calories: caltemp });
    var obj = { name: "New Food", calories: 70 };
    this.updateParentState(newFood);
  }

  render() {
    const filteredFoods = foodlist.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTER))
    return (
      <View style={styles.container}>

        <SearchInput 
          onChangeText={(term) => { this.searchUpdated(term) }} 
          style={styles.searchInput}
          placeholder="Search"
          clearIcon={this.state.searchTerm!==''&&<Icon name="x" size={23} />}
          />
          <View style={{ flex: 1, alignItems: 'center'}}>
        <ScrollView>
          {filteredFoods.map(food => {
            return (
              <TouchableOpacity onPress={()=>Alert.alert(
                  'Add this food?',
                  food.name + ', ' + food.nutrients[0].value + ' calories',
                  [
                    {text: 'Cancel', style: 'cancel'},
                    {text: 'OK', onPress: () => 
                        this.foodAdded({name: food.name, calories: food.nutrients[0].value})},
                  ],
                  { cancelable: true }
                )} style={styles.listItem}> 
                <View style={{flex:1,flexDirection:'row', width:350}} >
                  <Text style={{paddingRight: 20}}>{food.name}, {food.nutrients[0].value} calories {}</Text>
                  
                </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
        </View>
      </View>
    );
  }
}