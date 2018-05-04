import React, { Component } from 'react';
import styled from 'styled-components';
/*
expects Artist Info as props
*/
const Logo = styled.img`
  height: 300px;
`;

const Title = styled.h1`
  font-size: 1.5em;
  color: lightgray;
`;

class ArtistDisplay extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    let x = this.props.artistinfo;
    let display = null;
    let image = (<div>no img available</div>);
    if(x!=null){
      console.log('render its not null!'+x);
      let images = x.images;
      if(images != null){

        // chooses the first image
        let imageurl = images[0].url
        console.log("there are images"+imageurl);
        image = (<Logo src= {imageurl} />)
      }

      display = (<Title>
        <div>{x.name}</div>
        <div>Popularity: {x.popularity}</div>
        <div> Followers:{x.followers.total} </div>
        </Title>);
    }
    else{
      display = (<p>No Artist Chosen</p>);
    }
    return(
      <div>{display} {image}</div>

    );
  }
}
export default ArtistDisplay;
