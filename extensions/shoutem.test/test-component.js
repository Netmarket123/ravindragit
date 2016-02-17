import React, {
    View,
    Text,
} from 'react-native';

export default class TestComponent extends React.Component {
    testMethod() {
        return 5;
    }
    render() {
        return (
            <View>
                <Text>I wonder if there will be any problems...</Text>
            </View>
        );
    }
}
