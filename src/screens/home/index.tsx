import { StyleSheet, View } from 'react-native';
import { MyText } from '../../components';

export default function HomeScreen() {
  return (
    <View style={styles.container} >
      <MyText.Regular>Home</MyText.Regular>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
