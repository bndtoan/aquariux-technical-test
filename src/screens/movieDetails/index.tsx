import { StyleSheet, View } from 'react-native';
import { MyText } from '../../components';

export default function MovieDetailsScreen() {
  return (
    <View style={styles.container} >
      <MyText.Regular>MovieDetails</MyText.Regular>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
