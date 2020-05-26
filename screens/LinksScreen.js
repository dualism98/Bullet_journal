import React, { Component} from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { w, h} from '../constants/Layout'
import AddButton from '../components/AddButton'
import SpendingItem from '../components/SpendingItem'
import moment from 'moment';

export default class LinksScreen extends Component {
  constructor(props){
    super(props)

    this.state = {
      days: [],
      name: '',
      price: '',
      get: false
    }

    this.AddItem = this.AddItem.bind(this)
    this.GetItem = this.GetItem.bind(this)
    this.Sum = this.Sum.bind(this)
  }
  

  AddItem = async ()=>{

    if (this.state.name !== '' && typeof(this.state.price) === 'number' && this.state.price > 0){
      try{

        const item = [moment().format('DDMMYYYY hh:mm:ss a'), this.state.name, this.state.price]
        this.setState({name: '', price: ''})
        const jsonValue = JSON.stringify(item)
        await AsyncStorage.setItem(item[0], jsonValue)
        this.GetItem()
      } catch(err) {
        console.log(err)
      }

    }
  }

  GetItem = async () =>{
    try {
      this.setState({get: true})
      const keys = await AsyncStorage.getAllKeys()
      var item = []
      for (let i = 0; i < keys.length; i++){
        const jsonValue = await AsyncStorage.getItem(keys[i])
        if (jsonValue != null){
          var smth = JSON.parse(jsonValue)
          item.push(smth)
        }
      }

      item = item.map( thing => {
        var date = []
        date = thing[0].slice(0, 8)
        const variants = ['month', 'months', 'year', 'years']
        date = moment(date, 'DDMMYYYY').fromNow().split(' ')
        if (variants.includes(date[1])){
          return null
        }
        else{
          return thing
        }
      })

      this.setState({days: item, get: false})

    } catch(e) {
      console.log('e')
    }
  }

  Sum(){
    var sum = 0
    for (let i = 0; i < this.state.days.length; i++){
      sum += this.state.days[i][2]
    }
    
    return sum
  }

  render(){
  return (
    <View>
    <ScrollView contentContainerStyle={styles.contentContainer} refreshControl={
          <RefreshControl refreshing={this.state.get} onRefresh={this.GetItem} />}>
      <View style={styles.sumContainer}>
        <Text style={styles.sum_text}>Потрачено за последний месяц: </Text>
        <Text style={styles.sum}>{this.Sum()} ₽</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput placeholder={'Ну и что ты купил?..'} style={styles.input} value={this.state.name} onChangeText={value => this.setState({name: value})} />
        <TextInput placeholder={'И сколько тебе это стоило?..'} style={styles.input} value={this.state.price} onChangeText={value => this.setState({price: Number(value)})}/>
        <AddButton title={'ADD'} onPress={this.AddItem}/>
      </View>
      <View>
        
        {this.state.days.map( (item, index) => {
          console.log(item[0])
          return(
          <SpendingItem title={item[1]} price={item[2]} key={index}/>
        )})}
      </View>

    </ScrollView>
    </View>
  )}
}


const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white'
  },

  add: {
    borderRadius: 10,
  },

  inputView: {
    alignItems: 'center',
    flexDirection: 'column'
  },

  input: {
    width: w * 0.95,
    height: 20,
    height: 40,
    borderColor: "grey",
    borderBottomWidth: 1,
  },

  sumContainer:{
    width: w,
    flexWrap: 'nowrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 15,
    marginTop: 15,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },

  sum_text:{
    maxWidth: w * 0.7,
  },

  sum: {
    position: 'relative',
    maxWidth: w * 0.3,
  },
});
