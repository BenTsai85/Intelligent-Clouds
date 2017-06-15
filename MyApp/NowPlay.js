import React, { Component } from 'react';
import {
  Text,
  FlatList,
  Dimensions,
  Image,
  View,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import theMovieDb from 'themoviedb-javascript-library';
import MovieRow from './MovieRow';

theMovieDb.common.api_key = 'ebd9a86c1b0685dbfe874676e9826f3a';

const { width, height } = Dimensions.get('window');

export default class NowPlay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      page: 1,
      loading: true,
    };
  }

  componentWillMount = async() => {
    await theMovieDb.movies.getNowPlaying( {}, movies => {
      this.setState({ movies: JSON.parse( movies ).results });
    }, err => {} );
  }

  onRefresh = async() => {
    await this.setState({ page: this.state.page + 1 });
    await theMovieDb.movies.getNowPlaying( { 'page': this.state.page }, movies => {
      const temp = JSON.parse( movies );
      if( temp.page === temp.total_pages )
        this.setState({ loading: false });
      this.setState({ movies: this.state.movies.concat( temp.results ) });
    }, err => {} );
  }

  render() {
    return (
      <View style={ styles.container }>
        <StatusBar hidden={ true }/>
        <FlatList
          style={ styles.scrollBox }
          data={ this.state.movies }
          renderItem={ ({ item }) =>
            <MovieRow item={ item }/>
          }
          onEndReached={ this.onRefresh }
          onEndReachedThreshold={ 0.5 }
          getItemLayout={ ( data, index ) => (
            { length: 140, offset: 140 * index, index }
          )}
          ListFooterComponent={ () => 
            <ActivityIndicator size={ 'large' } style={{ opacity: this.state.loading ? 1.0 : 0.0 }}/>  
          }
        />
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    height: height,
  },
  scrollBox: {
    backgroundColor: 'black',
  },
};