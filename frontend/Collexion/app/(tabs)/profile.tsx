import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import { useClerk, useUser } from '@clerk/expo';

const Logout = () => {
  const { signOut } = useClerk();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Pressable onPress={handleLogout}>
      <Text style={styles.logout}>Logout</Text>
    </Pressable>
  );
};

const Profile = () => {
  const { user } = useUser();
  const userName = user?.firstName || 'UserName';
  const userEmail =
    user?.primaryEmailAddress?.emailAddress || 'user@example.com';
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/background3.jpg')}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.overlay}>
          <Text style={styles.text}>Profile</Text>
          <ScrollView>
            <View style={styles.heading}>
              <View style={styles.headingLeft}>
                <Image
                  source={
                    user?.imageUrl
                      ? { uri: user.imageUrl }
                      : require('@/assets/images/user.png')
                  }
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
              </View>
              <View style={styles.headingRight}>
                <Text style={styles.textHeader}>{userName}</Text>
                <Text style={styles.textHeaderemail}>{userEmail}</Text>
                <Text
                  style={[
                    styles.textHeaderemail,
                    { marginBottom: 10, fontSize: 14 },
                  ]}
                >
                  Member since: {user?.createdAt?.toDateString()}
                </Text>
                <Text style={styles.textHeaderemail}>
                  0 Items in collection
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.link}>
                Edit Profile <Text>&gt;</Text>
              </Text>
              <Text style={styles.link}>
                Change Password <Text>&gt;</Text>
              </Text>
              <Text style={styles.link}>
                Privacy Settings <Text>&gt;</Text>
              </Text>
              <Text style={styles.link}>
                Notification Settings <Text>&gt;</Text>
              </Text>
              <Text style={styles.link}>
                Connected Accounts <Text>&gt;</Text>
              </Text>

              <Text style={styles.link}>
                Wishlist <Text>&gt;</Text>
              </Text>
              <Text style={styles.link}>
                Saved Items <Text>&gt;</Text>
              </Text>
              <Logout />
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    paddingHorizontal: 20,
  },

  image: {
    width: '100%',
    height: '100%',

    resizeMode: 'cover',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  textHeader: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textHeaderemail: {
    color: 'white',
    fontSize: 16,
    marginBottom: 0,
  },
  linkContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
  },
  link: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'space-between',
  },
  searchContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  searchInput: {
    color: 'white',
    fontSize: 15,
    backgroundColor: 'rgba(15, 15, 15, 0.5)',
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
    marginBottom: 10,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
    borderRadius: 8,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  headingLeft: {},
  headingRight: {},
  logout: {
    color: 'rgb(247, 0, 0)',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: 'rgba(168, 4, 4, 0.5)',
    width: '100%',
    textAlign: 'center',
  },
});
