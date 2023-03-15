import { Component } from "react";
import coffeeImg from './images/coffee.png';
import hulkImg from './images/hulk.jpg';

class Profile extends Component {

  render() {
    /* TODO: render information about the developers */
    return (
      <>
      <img src={ coffeeImg } alt='this is Coffee from Cowboy Bebop'></img>
      <div className='about'><p>Hi, I'm Cheryl, an older student who has been studying front-end development since 2009, though you'll never know because I still act and feel like a neophyte. </p>
      <img src={ hulkImg } alt="this is Hulk Hogan - Mo's alter ego"></img>
      <p>My backend partner we call Mo, is an Audio Engineer from Everett WA, aspiring to become the next power-play billionaire.</p></div>
        
      </>
    )
  }
};

export default Profile;
