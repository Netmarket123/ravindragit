import React, { View, Text, Component, StyleSheet, Image } from 'react-native';

const style = StyleSheet.create({
  infoSeparator: {
    marginHorizontal: 10,
    flex: 1,
    width: 3,
    height: 3,
  },
  infoText: {
    fontSize: 12,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 30,
  },
});

export default class InfoFields extends Component {
  render() {
    const infoFieldsComponents = [];
    if (this.props.infoFields.length > 0) {
      this.props.infoFields.forEach((info, i) => {
        if (i > 0 && this.props.infoSeparator) {
          infoFieldsComponents.push(
            <Image
              style={style.infoSeparator}
              source={this.props.infoSeparator}
              key={i * -1}
            />
          ); // key i * -1 ?
        }
        infoFieldsComponents.push(
          <Text style={style.infoText} key={i}>
            {info}
          </Text>
        );
      });
    }
    return (<View style={style.info}>{infoFieldsComponents}</View>);
  }
}

InfoFields.propTypes = {
  infoFields: React.PropTypes.array,
  infoSeparator: React.PropTypes.any,
};
