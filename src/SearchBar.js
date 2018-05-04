import React, { Component } from 'react';
import ArtistDisplay from './ArtistDisplay';
import styled from 'styled-components';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();
const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: black;
  background: lightgrey;
  border: none;
  border-radius: 3px;
`;

const Form = styled.form`
  background: lightgreen;
`;
const List = styled.ul`
    float: left;
    display: inline-block;
    margin: 0;
    padding: 0;
    zoom:1;
    width: 20%;
    *display: inline;
`;
const Item = styled.div`
  background-color: #222;
  color: white;
  padding: 0.25em 1em;
  &:hover {
    background-color: yellow;
    color: grey;
  }
`;


const InfoContainer = styled.div`
  display: block;
`;

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      artistinfo: null,
      artistlist: [],
    };

    //spotifyApi.setAccessToken(props.token)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.pickedArtist = this.pickedArtist.bind(this);
    this.apiCall = this.apiCall.bind(this);
  }


  apiCall(name){
    console.log('api call HELLO'+ name)
    let currentComponent = this;

    spotifyApi.searchArtists(name,  function(err, data) {
      if (err) console.error(err);
      else {
        console.log('Artist results', data.artists.items);
        currentComponent.setState({
          artistlist: data.artists.items,
          //artist: data.artists.items[0]
        });

      }
    });

  }

  handleChange(event) {
    // console.log('handlechange')
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);
    this.apiCall(this.state.value);
    let currentComponent = this;
    currentComponent.setState({
      value: '',
      artistinfo: null,
      artistlist: []
    });
    event.preventDefault();
  }

/*
Param: id of artist
Function: performs get request to recieve artist information
Changes state of artistinfo
*/
  pickedArtist(id) {
    console.log('Artist picked!!'+id);
    let currentComponent = this;
    spotifyApi.getArtist(id,  function(err, data) {
      if (err) console.error(err);
      else {
        console.log('Artist results', data);
        currentComponent.setState({
          artistinfo: data
        });

      }
    });
  }

  render() {
    // console.log('nameform render '+this.props.token);
    spotifyApi.setAccessToken(this.props.token);
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <label>
            Enter an artist name:
            <Input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
        </Form>
        <InfoContainer>
          <List>
            {this.state.artistlist.map((letter,index) =>
              <Item key={index} value={letter.name} onClick={()=>this.pickedArtist(letter.id)}>
                {letter.name}
              </Item>
            )}

          </List>
          <ArtistDisplay artistinfo={this.state.artistinfo}/>
        </InfoContainer>
      </div>

    );
  }
}
export default SearchBar;
