import { StyleSheet, View } from 'react-native';
import { MyText } from '../../components';

export default function WatchListScreen() {
  return (
    <View style={styles.container} >
      <MyText.Regular>WatchList</MyText.Regular>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
