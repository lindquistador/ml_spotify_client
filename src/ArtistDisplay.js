import React, { Component } from 'react';
import styled from 'styled-components';

const Logo = styled.img`
  height: 300px;
`;

const Title = styled.h1`
  font-size: 1.5em;
  color: lightgray;
`;

const Display = styled.div`

  border: 3px;
  float:right;
  width:80%
`;

/*
expects Artist Info as props
*/
class ArtistDisplay extends React.Component{
  render(){
    let x=this.props.artistinfo;
    let info=null;
    let image=null;
    if(x!=null){
      console.log('render its not null!'+x);
      let images=x.images;

      console.log('after '+image);
      if(images.length!==0){
        console.log("images not []"+ images);
        // chooses the first image
        let imageurl=images[0].url;
        console.log("there are images"+imageurl);
        image=(<Logo src={imageurl} />);
      }
      else{
        image=(<Logo src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png' />);
      }

      info = (<Title>
        <div>{x.name}</div>
        <div>Popularity: {x.popularity}</div>
        <div> Followers: {x.followers.total} </div>
        </Title>);
    }
    else{
      info=null;
    }
    return(
      <Display>{info} {image}</Display>

    );
  }
}
export default ArtistDisplay;
