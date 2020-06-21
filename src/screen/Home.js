import React, {useEffect, useState} from 'react';
import {StatusBar, Dimensions} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import styled from 'styled-components/native';

import Header from '../components/Header';
import Hero from '../components/Hero';
import Movies from '../components/Movies';

import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder';
import AsyncStorage from '@react-native-community/async-storage';

import {useProfileContext} from '../context/ProfileContext';
import {translate} from '../locale';

const api = [
  require('../assets/movies/movie1.jpg'),
  require('../assets/movies/movie2.jpg'),
  require('../assets/movies/movie3.jpg'),
  require('../assets/movies/movie4.jpg'),
];

const listMovies = require('../assets/Movies.json');
const profileMovies = require('../assets/ResumeMovies.json');

const Container = styled.ScrollView`
  flex: 1;
  background-color: #000;
`;

const Poster = styled.ImageBackground`
  width: 100%;
  height: ${(Dimensions.get('window').height * 81) / 100}px;
`;

const Gradient = styled(LinearGradient)`
  height: 100%;
`;

const currentPossition = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (location) => {
        resolve(location);
      },
      (erro) => {
        reject(erro);
      },
    );
  });
};

const getLocation = async () => {
  const position = await currentPossition();
  return await Geocoder.geocodePosition({
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  });
};

const Home = () => {
  const [position, setPosition] = useState(null);
  const [nationalMovies, setNationalMovies] = useState([]);
  const [movies, setMovies] = useState(listMovies);

  const [state, dispach] = useProfileContext();

  useEffect(() => {
    const loadingPosition = async () => {
      const local = await getLocation();
      console.log(local);
      setPosition(local);
    };

    const getStateLocalStorage = async (state, newState) => {
      try {
        const data = await AsyncStorage.getItem('@userState');
        if (data !== null) {
          const jsonValue = JSON.parse(data);
          dispach({
            type: 'changePerfil',
            data: jsonValue,
          });
        }
      } catch (e) {
        console.log(e);
      }
    };
    getStateLocalStorage();
    loadingPosition();
  }, []);

  useEffect(() => {
    const loadingMovies = async () => {
      if (position != null) {
        const national = listMovies.filter((item) =>
          item.Country.includes(position[0].country),
        );

        const titlesNational = national.map((item) => item.Title);

        const international = movies.filter(
          (item) => !titlesNational.includes(item.Title),
        );

        setMovies(international);
        setNationalMovies(national);
      }
    };
    loadingMovies();
  }, [position]);

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Container>
        <Poster source={require('../assets/poster.jpg')}>
          <Gradient
            locations={[0, 0.2, 0.6, 0.93]}
            colors={[
              'rgba(0,0,0,0.5)',
              'rgba(0,0,0,0.0)',
              'rgba(0,0,0,0.0)',
              'rgba(0,0,0,1)',
            ]}>
            <Header />
            <Hero />
          </Gradient>
        </Poster>
        <Movies label={translate('recomendados')} item={movies} />
        {nationalMovies && nationalMovies.length > 0 && (
          <Movies label={translate('nacionais')} item={nationalMovies} />
        )}
        {state?.name != undefined && (
          <Movies
            label={`${translate('continuarVendo')} ${state?.name}`}
            item={profileMovies[state?.name]}
          />
        )}
      </Container>
    </>
  );
};

export default Home;
