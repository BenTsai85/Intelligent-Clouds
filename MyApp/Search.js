import React, { Component } from 'react';
import {
  Text,
  FlatList,
  TextInput,
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

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: '',
      keywordSearch: '',
      movies: [],
      page: 1,
      loading: false,
    };
  }

  onSearch = async() => {
    this.setState({ loading: true });
    await this.setState({ movies: [], keywordSearch: this.state.keyword, page: 1 });
    await theMovieDb.search.getMovie( { 'query': this.state.keywordSearch }, movies => {
      const temp = JSON.parse( movies );
      if( temp.total_pages === 1 )
        this.setState({ loading: false });
      this.setState({ movies: temp.results });
    }, err => {} );
  }

  onRefresh = async() => {
    await this.setState({ page: this.state.page + 1 });
    await theMovieDb.search.getMovie( { 'query': this.state.keywordSearch, 'page': this.state.page }, movies => {
      const temp = JSON.parse( movies );
      if( temp.page === temp.total_pages )
        this.setState({ loading: false });
      this.setState({ movies: this.state.movies.concat( temp.results ) });
    }, err => {} );
  }

  onChangeText = ( text ) => {
    this.setState({ keyword: text });
  }
  onCancel = () => {
    this.setState({ keyword: '' });
  }

  render() {
    return (
      <View style={ styles.container }>
        <StatusBar hidden={ true }/>
        <View style={ styles.searchbox }>
          <TextInput
            style={ [ styles.input, this.props.placeholderTextColor, { paddingLeft: 20 } ] }
            value={ this.state.keyword }
            onChangeText={ this.onChangeText }
            placeholder={ 'Search' }
            placeholderTextColor={ styles.placeholderColor }
            onSubmitEditing={ this.onSearch }
            blurOnSubmit={ true }
            returnKeyType={ 'search' }
            keyboardType={ 'default' }
            autoCorrect={ false }
            underlineColorAndroid='transparent'
          />
          <Image source={ require( './img/search.png' ) } style={ [ styles.iconSearch, this.props.tintColorSearch, { left: 10 } ] }/>
          <View style={ [ styles.cancelButton, { left: 10 } ] }>
            <Text style={ [ styles.cancelButtonText, this.props.titleCancelColor ] } onPress={ this.onCancel }>
              Cancel
            </Text>
          </View>
        </View>
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
  searchbox: {
    backgroundColor: 'grey',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5,
  },
  input: {
    height: 30,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 20,
    borderColor: '#444',
    backgroundColor: '#f7f7f7',
    borderRadius: 5,
    fontSize: 13,
    width: width - 70,
  },
  placeholderColor: 'grey',
  iconSearch: {
    flex: 1,
    position: 'absolute',
    top: 13,
    height: 14,
    width: 14,
  },
  cancelButton: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    width: 60,
    height: 50,
  },
  cancelButtonText: {
    fontSize: 14,
    color: '#fff'
  },
  scrollBox: {
    backgroundColor: 'black',
  },
};