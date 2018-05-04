import React, { Component } from 'react';
import styled from 'styled-components';
import spotify_logo from './spotify_logo.png';
import SearchBar from './SearchBar'
//import './App.css';
var request = require('request'); // "Request" library

var client_id = '2b58202679ff410b9fd0687b83188b67'; // Your client id
var client_secret = 'e15243811a1b4e9b8b8a7c4574d8a970'; // Your secret
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  // mode: 'cors',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
    'Access-Control-Allow-Origin': 'http://localhost:3000'
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

const Title = styled.h1`
  font-size: 2em;
  color: lightgray;
`;

const Header = styled.header`
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;
`;

const Page = styled.div`
  text-align: center;
  height: '100%';
`;
const Logo = styled.img`
  height: 80px;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token : 'no token',
    }
  }
  componentDidMount(){
    console.log('CA MONTED');
    var r = this;
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        r.setState({token: body.access_token});
        // use the access token to access the Spotify Web API
        var token = body.access_token;
        var options = {
          url: 'https://api.spotify.com/v1/users/12157823425',
          headers: {
            'Authorization': 'Bearer ' + token
          },
          json: true
        };
        request.get(options, function(error, response, body) {
          console.log(body);
        });
      }
      else{
        console.log(error)
      }
    });
  }
  render() {
    return (
      <Page>
        <Header>
          <Logo src={spotify_logo}/>
          <Title>Welcome to Spotify Client</Title>
        </Header>
        <SearchBar token={this.state.token}/>
      </Page>
    );
  }
}

export default App;
