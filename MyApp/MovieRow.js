import React, { PureComponent } from 'react';
import {
  Text,
  Image,
  View,
  Dimensions,
} from 'react-native';
import theMovieDb from 'themoviedb-javascript-library';

theMovieDb.common.api_key = 'ebd9a86c1b0685dbfe874676e9826f3a';

const { width, height } = Dimensions.get('window');

export default class MovieRow extends PureComponent {
  render() {
    const item = this.props.item;
    return (
      <View style={ styles.movieBox }>
        <Image source={{ uri: (
          item.poster_path ?
          theMovieDb.common.images_uri + 'original' + item.poster_path :
          'https://s-media-cache-ak0.pinimg.com/originals/f3/5a/d9/f35ad9427be01af5955e6a6ce803f5dc.jpg' ) }} style={ styles.poster } resizeMethod={ 'scale' } />
        <View style={ styles.introductionBox }>
          <Text style={ styles.title }>{ item.title }</Text>
          <View style={ styles.line }>
            <Text style={ styles.release }>{ "\uD83D\uDCC5" }{ item.release_date }</Text>
            <Text style={ styles.rating }>{ item.vote_average }★</Text>
          </View>
          <Text style={ styles.overview }>
            { item.overview.substr( 0, 110 ) + ( ( item.overview.length > 100 ) ? '...' : '' ) }
          </Text>
        </View>
      </View>
    );
  }
}

const styles = {
  movieBox: {
    backgroundColor: 'white',
    height: 120,
    marginTop: 20,
    flexDirection: 'row',
    width: width * 0.9,
    marginLeft: width * 0.05,
  },
  poster: {
    height: 120,
    width: 90,
  },
  introductionBox: {
    flex: 1,
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    backgroundColor: 'transparent',
  },
  release: {
    fontSize: 12,
    backgroundColor: 'transparent',
  },
  rating: {
    fontSize: 12,
    backgroundColor: 'transparent',
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  overview: {
    margin: 10,
    fontSize: 10,
    backgroundColor: 'transparent',
  },
};