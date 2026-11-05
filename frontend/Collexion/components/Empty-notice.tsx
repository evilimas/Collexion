import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

interface EmptyNoticeProps {
  name: string;
  onAdd: () => void;
}

const EmptyNotice = ({ name, onAdd }: EmptyNoticeProps) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`Theres no ${name} in your collection.`}</Text>
      <Text style={styles.text}>
        {`Add some ${name} to your collection to see them here.`}
      </Text>
      <Text style={styles.text}>Click here to add {name}</Text>
      <Pressable style={styles.recentLink} onPress={onAdd}>
        <Text style={styles.textPlus}>+</Text>
      </Pressable>
    </View>
  );
};

export default EmptyNotice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#3a3a3a',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 6,
    marginTop: 15,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 8,
  },
  textPlus: {
    color: 'gray',
    textAlign: 'center',
    fontSize: 24,
    marginVertical: 8,
  },
  recentLink: {
    marginTop: 10,
    backgroundColor: '#0DDCFD',
    padding: 1,
    paddingHorizontal: 18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3a3a3a',
  },
});
