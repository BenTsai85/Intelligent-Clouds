import { AppRegistry } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Upcoming from './Upcoming';
import Search from './Search';
import NowPlay from './NowPlay';
import Popular from './Popular';

const MyApp = TabNavigator( {
  Popular: { screen: Popular },
  NowPlay: { screen: NowPlay },
  Upcoming: { screen: Upcoming },
  Search: { screen: Search },
}, {
  tabBarOptions: {
    indicatorStyle: {
      backgroundColor: 'white',
    },
    labelStyle: {
      fontSize: 13,
      margin: 0,
    },
    tabStyle: {
      height: 50,
    },
    inactiveTintColor: 'black',
    style: {
      backgroundColor: 'purple',
    }
  }
} );

export default MyApp;