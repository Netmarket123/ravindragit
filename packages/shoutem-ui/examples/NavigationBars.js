import React from 'react';

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

export function NavigationBars() {
  return (
    <View styleName="vertical collapsed">
      <Heading styleName="sm-gutter">02 - Navigation bars</Heading>
      <Stage title="Navbar / Solid">
        <View
          style={{
            width: 375,
            height: 70,
          }}
        >
          <NavigationBar
            centerComponent={<Title>TITLE</Title>}
          />
        </View>
      </Stage>
      <Stage title="Navbar / Clear (Solid color)">
        <View
          style={{
            backgroundColor: '#1a70d5',
            width: 375,
            height: 70,
          }}
        >
          <NavigationBar
            styleName="clear"
            centerComponent={<Title>TITLE</Title>}
          />
        </View>
      </Stage>
      <Stage title="Navbar / Clear (Image)">
        <Image
          source={require('../assets/examples/road.png')}
          style={{
            width: 375,
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
        <View
          style={{
            backgroundColor: '#1a70d5',
            width: 375,
            height: 70,
          }}
        >
          <NavigationBar
            styleName="fade"
            centerComponent={<Title>TITLE</Title>}
          />
        </View>
      </Stage>
      <Stage title="Navbar/ Fade (Gradient overlay + Image)">
        <Image
          source={require('../assets/examples/road.png')}
          style={{
            width: 375,
            height: 70,
          }}
        >
          <NavigationBar
            styleName="fade"
            centerComponent={<Title>TITLE</Title>}
          />
        </Image>
      </Stage>
      <Heading styleName="sm-gutter">02.1 - Navigation bar variations</Heading>
      <Stage title="Navbar + Drawer nav">
        <View
          style={{
            width: 375,
            height: 70,
          }}
        >
          <NavigationBar
            leftComponent={<Icon name="sidebar" />}
            centerComponent={<Title>TITLE</Title>}
          />
        </View>
      </Stage>
      <Stage title="Navbar + Picker">
        <View
          style={{
            width: 375,
            height: 70,
          }}
        >
          {/*
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
           */}
        </View>
      </Stage>
      <Stage title="Navbar + Action">
        <View
          style={{
            width: 375,
            height: 70,
          }}
        >
          <NavigationBar
            leftComponent={<Icon name="sidebar" />}
            centerComponent={<Title>TITLE</Title>}
            rightComponent={(
            <Button styleName="clear">
              <Text>List</Text>
            </Button>
          )}
          />
        </View>
      </Stage>
      <Stage title="Navbar + Icon">
        <View
          style={{
            width: 375,
            height: 70,
          }}
        >
          <NavigationBar
            leftComponent={<Icon name="sidebar" />}
            centerComponent={<Title>TITLE</Title>}
            rightComponent={(
              <Button>
                <Icon name="cart" />
              </Button>
            )}
          />
        </View>
      </Stage>
      <Stage title="Navbar (Sublevel) + Icon">
        <View
          style={{
            width: 375,
            height: 70,
          }}
        >
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
        </View>
      </Stage>
      <Stage title="Navbar (Sublevel) + Action (no border)">
        <View
          style={{
            width: 375,
            height: 70,
          }}
        >
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
        </View>
      </Stage>
      <Stage title="Navbar (Sublevel) + Action">
        <View
          style={{
            width: 375,
            height: 70,
          }}
        >
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
        </View>
      </Stage>
      <Stage title="Navbar (Modal) + Icon">
        <View
          style={{
            width: 375,
            height: 70,
          }}
        >
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
        </View>
      </Stage>
      <Stage title="Navbar (Modal) + Action">
        <View
          style={{
            width: 375,
            height: 70,
          }}
        >
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
        </View>
      </Stage>
      <Stage title="Navbar (Modal) + Action 2">
        <View
          style={{
            width: 375,
            height: 70,
          }}
        >
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
        </View>
      </Stage>
      <Stage title="Navbar (Modal) + Action 2_disabled">
        <View
          style={{
            width: 375,
            height: 70,
          }}
        >
          <NavigationBar
            leftComponent={(
              <Button>
                <Text>Cancel</Text>
              </Button>
            )}
            title="TITLE"
            rightComponent={(
              <Button styleName="disabled">
                <Text>Done</Text>
              </Button>
            )}
          />
        </View>
      </Stage>
      <Stage title="Navbar / On primary color / back + share">
        <View
          style={{
            width: 375,
            height: 70,
            backgroundColor: '#1a70d5',
          }}
        >
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
        </View>
      </Stage>
    </View>
  );
}
