import React from 'react';
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons';
import {
  Image, Header,
} from 'semantic-ui-react';
import './ParralaxSection.css';

class ParralaxSection extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <Parallax
        style={{
          minHeight: '100vh', backgroundColor: 'black', marginTop: '-20px',
        }}
        ref={(ref) => { this.parallax = ref; }}
        pages={3}
      >
        <ParallaxLayer offset={0.1} speed={0.9}>
          <Header as="h1" inverted textAlign="center"> Welcome on WebsiteName </Header>
        </ParallaxLayer>
        <ParallaxLayer offset={0.2} speed={-0.1}>
          <Image src="https://images-na.ssl-images-amazon.com/images/I/51poKKV63GL.jpg" style={{ width: '17%', marginLeft: '25%' }} />
        </ParallaxLayer>
        <ParallaxLayer offset={0.25} speed={0.2}>
          <Image src="http://images2.fanpop.com/images/photos/3200000/Movie-poster-the-spirit-3205417-334-500.jpg" style={{ width: '17%', marginLeft: '43%' }} />
        </ParallaxLayer>
        <ParallaxLayer offset={0.2} speed={-0.1}>
          <Image src="https://m.media-amazon.com/images/M/MV5BOTE3NzkyMjAyNF5BMl5BanBnXkFtZTgwMDc5MTE0MDE@._V1_SY500_CR0,0,334,500_AL_.jpg" style={{ width: '17%', marginLeft: '60%' }} />
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0.2}>
          <div className="background-color left">
            <p>We work for your entertainment.</p>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={1.3} speed={0.3}>
          <div className="background-color right">
            <p>Keeping you always updated.</p>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={1.8} speed={0.5}>
          <div className="background-color right">
            <p>With latest movies.</p>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={2} speed={2}>
          <div>
            <Header as="h2" inverted textAlign="center">Contact at blabla@bla.bla for dcma request or other things </Header>
          </div>
        </ParallaxLayer>
      </Parallax>

    );
  }
}

export default ParralaxSection;
