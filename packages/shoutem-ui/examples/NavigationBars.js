import React from 'react';
import { Dimensions } from 'react-native';

import { View } from '../components/View';
import { Stage } from './Stage';
import {
  Heading,
  NavigationBar,
  Title,
  Text,
  Image,
  Button,
  Icon,
  DropDownMenu,
} from '../index';

const window = Dimensions.get('window');

function NavBarStageContainer(props) {
  return (
    <View
      {...props}
      style={{
        width: window.width,
        height: 70,
        ...props.style,
      }}
    />
  );
}

export function NavigationBars() {
  return (
    <View styleName="vertical collapsed">
      <Heading styleName="sm-gutter">02 - Navigation bars</Heading>
      <Stage title="Navbar / Solid">
        <NavBarStageContainer>
          <NavigationBar
            centerComponent={<Title>TITLE</Title>}
          />
        </NavBarStageContainer>
      </Stage>
      <Stage title="Navbar / Clear (Solid color)">
        <NavBarStageContainer style={{ backgroundColor: '#1a70d5', }}>
          <NavigationBar
            styleName="clear"
            centerComponent={<Title>TITLE</Title>}
          />
        </NavBarStageContainer>
      </Stage>
      <Stage title="Navbar / Clear (Image)">
        <Image
          source={require('../assets/examples/road.png')}
          style={{
            width: window.width,
            height: 70,
          }}
        >
          <NavigationBar
            styleName="clear"
            centerComponent={<Title>TITLE</Title>}
          />
        </Image>
      </Stage>
      <Stage title="Navbar/ Fade (Gradient overlay + Solid color)">
        <NavBarStageContainer style={{ backgroundColor: '#1a70d5', }}>
          <NavigationBar
            styleName="fade clear"
            centerComponent={<Title>TITLE</Title>}
          />
        </NavBarStageContainer>
      </Stage>
      <Stage title="Navbar/ Fade (Gradient overlay + Image)">
        <Image
          source={require('../assets/examples/road.png')}
          style={{
            width: window.width,
            height: 70,
          }}
        >
          <NavigationBar
            styleName="fade clear"
            centerComponent={<Title>TITLE</Title>}
          />
        </Image>
      </Stage>
      <Heading styleName="sm-gutter">02.1 - Navigation bar variations</Heading>
      <Stage title="Navbar + Drawer nav">
        <NavBarStageContainer>
          <NavigationBar
            leftComponent={<Icon name="sidebar" />}
            centerComponent={<Title>TITLE</Title>}
          />
        </NavBarStageContainer>
      </Stage>
      <Stage title="Navbar + Picker">
        <NavBarStageContainer>
           <NavigationBar
             leftComponent={<Icon name="sidebar" />}
             centerComponent={<Title>TITLE</Title>}
             rightComponent={<DropDownMenu
               options={[
               { name: 'All', value: 1 },
               { name: 'Sport', value: 1 },
               { name: 'World', value: 1 },
               { name: 'Lifestyle', value: 1 },
               { name: 'Food', value: 1 },
               { name: 'Music', value: 1 },
               { name: 'Movies', value: 1 },
               { name: 'Tech', value: 1 },
               { name: 'Fun', value: 1 },
               { name: 'Fashion', value: 1 },
               ]}
               titleProperty="name"
               valueProperty="value"
             />}
           />
        </NavBarStageContainer>
      </Stage>
      <Stage title="Navbar + Action">
        <NavBarStageContainer>
          <NavigationBar
            leftComponent={<Icon name="sidebar" />}
            centerComponent={<Title>TITLE</Title>}
            rightComponent={(
            <Button styleName="clear">
              <Text>List</Text>
            </Button>
          )}
          />
        </NavBarStageContainer>
      </Stage>
      <Stage title="Navbar + Icon">
        <NavBarStageContainer>
          <NavigationBar
            leftComponent={<Icon name="sidebar" />}
            centerComponent={<Title>TITLE</Title>}
            rightComponent={(
              <Button>
                <Icon name="cart" />
              </Button>
            )}
          />
        </NavBarStageContainer>
      </Stage>
      <Stage title="Navbar (Sublevel) + Icon">
        <NavBarStageContainer>
          <NavigationBar
            hasHistory
            navigateBack={() => {}}
            title="TITLE"
            share={{
              link: 'http://shoutem.github.io',
              text: 'This is the best',
              title: 'Super cool UI Toolkit',
            }}
          />
        </NavBarStageContainer>
      </Stage>
      <Stage title="Navbar (Sublevel) + Action (no border)">
        <NavBarStageContainer>
          <NavigationBar
            hasHistory
            navigateBack={() => {}}
            title="TITLE"
            share={{
              link: 'http://shoutem.github.io',
              text: 'This is the best',
              title: 'Super cool UI Toolkit',
            }}
          />
        </NavBarStageContainer>
      </Stage>
      <Stage title="Navbar (Sublevel) + Action">
        <NavBarStageContainer>
          <NavigationBar
            hasHistory
            navigateBack={() => {}}
            title="TITLE"
            rightComponent={(
              <Button styleName="clear">
                <Text>Report</Text>
              </Button>
            )}
          />
        </NavBarStageContainer>
      </Stage>
      <Stage title="Navbar (Modal) + Icon">
        <NavBarStageContainer>
          <NavigationBar
            leftComponent={(
              <Button>
                <Icon name="close" />
              </Button>
            )}
            title="TITLE"
            share={{
              link: 'http://shoutem.github.io',
              text: 'This is the best',
              title: 'Super cool UI Toolkit',
            }}
          />
        </NavBarStageContainer>
      </Stage>
      <Stage title="Navbar (Modal) + Action">
        <NavBarStageContainer>
          <NavigationBar
            leftComponent={(
              <Button>
                <Icon name="close" />
              </Button>
            )}
            title="TITLE"
            rightComponent={(
              <Button styleName="clear">
                <Text>Post</Text>
              </Button>
            )}
          />
        </NavBarStageContainer>
      </Stage>
      <Stage title="Navbar (Modal) + Action 2">
        <NavBarStageContainer>
          <NavigationBar
            leftComponent={(
              <Button>
                <Text>Cancel</Text>
              </Button>
            )}
            title="TITLE"
            rightComponent={(
              <Button>
                <Text>Done</Text>
              </Button>
            )}
          />
        </NavBarStageContainer>
      </Stage>
      <Stage title="Navbar (Modal) + Action 2_disabled">
        <NavBarStageContainer>
          <NavigationBar
            leftComponent={(
              <Button>
                <Text>Cancel</Text>
              </Button>
            )}
            title="TITLE"
            rightComponent={(
              <Button styleName="muted">
                <Text>Done</Text>
              </Button>
            )}
          />
        </NavBarStageContainer>
      </Stage>
      <Stage title="Navbar / On primary color / back + share">
        <NavBarStageContainer style={{ backgroundColor: '#1a70d5', }}>
          <NavigationBar
            styleName="clear"
            hasHistory
            navigateBack={() => {}}
            title="TITLE"
            share={{
              link: 'http://shoutem.github.io',
              text: 'This is the best',
              title: 'Super cool UI Toolkit',
            }}
          />
        </NavBarStageContainer>
      </Stage>
    </View>
  );
}
