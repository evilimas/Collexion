import React, { useState } from 'react';
import {
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WishlistScreen() {
	const [items, setItems] = useState<{ id: string; name: string }[]>([]);
	const [newItem, setNewItem] = useState('');

	const addItem = () => {
		const name = newItem.trim();
		if (!name) return;
		setItems((currentItems) => [...currentItems, { id: `${Date.now()}`, name }]);
		setNewItem('');
	};

	return (
		<SafeAreaView style={styles.safeArea} edges={['top']}>
			<View style={styles.container}>
				<View style={styles.header}>
					<View>
						<Text style={styles.eyebrow}>YOUR COLLECTION</Text>
						<Text style={styles.title}>Wishlist</Text>
					</View>
					<Pressable accessibilityRole="button" accessibilityLabel="Wishlist options" style={styles.moreButton}>
						<Text style={styles.more}>···</Text>
					</Pressable>
				</View>

				<Text style={styles.subtitle}>Keep the things you love close.</Text>

				<View style={styles.summary}>
					<View>
						<Text style={styles.summaryLabel}>SAVED ITEMS</Text>
						<Text style={styles.summaryValue}>{items.length} <Text style={styles.summaryUnit}>items</Text></Text>
					</View>
					<Text style={styles.heart}>♡</Text>
				</View>

				<View style={styles.sectionHeader}>
					<Text style={styles.sectionTitle}>Your saved list</Text>
					<Text style={styles.count}>{items.length}</Text>
				</View>

				<View style={styles.addRow}>
					<TextInput
						value={newItem}
						onChangeText={setNewItem}
						placeholder="Add an item to your wishlist"
						placeholderTextColor="#99968E"
						style={styles.input}
						returnKeyType="done"
						onSubmitEditing={addItem}
						accessibilityLabel="New wishlist item"
					/>
					<Pressable style={styles.addButton} onPress={addItem} accessibilityRole="button" accessibilityLabel="Add to wishlist">
						<Text style={styles.addButtonText}>＋</Text>
					</Pressable>
				</View>

				<FlatList
					data={items}
					keyExtractor={(item) => item.id}
					contentContainerStyle={styles.listContent}
					renderItem={({ item }) => (
						<View style={styles.itemCard}>
							<View style={styles.itemIcon}><Text style={styles.emptyHeart}>♡</Text></View>
							<Text style={styles.itemName}>{item.name}</Text>
						</View>
					)}
					ListEmptyComponent={
						<View style={styles.emptyCard}>
							<View style={styles.emptyIcon}>
								<Text style={styles.emptyHeart}>♡</Text>
							</View>
							<Text style={styles.emptyTitle}>A little room for{ '\n' }your next favourite</Text>
							<Text style={styles.emptyText}>
								Save pieces you find while exploring and they’ll be waiting for you here.
							</Text>
							<Pressable style={styles.button} accessibilityRole="button">
								<Text style={styles.buttonText}>Explore collections</Text>
								<Text style={styles.buttonArrow}>→</Text>
							</Pressable>
						</View>
					}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: { flex: 1, backgroundColor: '#F7F5F0' },
	container: { flex: 1, paddingHorizontal: 24, paddingTop: 16 },
	header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
	eyebrow: { color: '#8B877E', fontSize: 10, fontWeight: '700', letterSpacing: 1.8 },
	title: { color: '#22231F', fontSize: 34, fontWeight: '700', letterSpacing: -1.2, marginTop: 5 },
	moreButton: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#EEECE6', alignItems: 'center', justifyContent: 'center' },
	more: { color: '#34352F', fontSize: 25, lineHeight: 25, fontWeight: '700', marginTop: -8 },
	subtitle: { color: '#77766F', fontSize: 14, marginTop: 8 },
	summary: { backgroundColor: '#29382F', borderRadius: 20, padding: 20, marginTop: 26, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
	summaryLabel: { color: '#C6CEC5', fontSize: 10, fontWeight: '700', letterSpacing: 1.5 },
	summaryValue: { color: '#FFFFFF', fontSize: 27, fontWeight: '700', marginTop: 5 },
	summaryUnit: { color: '#C6CEC5', fontSize: 13, fontWeight: '400' },
	heart: { color: '#D5B58D', fontSize: 38 },
	sectionHeader: { flexDirection: 'row', alignItems: 'center', marginTop: 30, marginBottom: 14 },
	sectionTitle: { color: '#292A25', fontSize: 17, fontWeight: '700' },
	count: { color: '#77766F', fontSize: 12, marginLeft: 9, backgroundColor: '#EAE8E1', overflow: 'hidden', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
	addRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
	input: { flex: 1, height: 48, backgroundColor: '#FFFFFF', borderRadius: 14, borderWidth: 1, borderColor: '#EFEEE9', paddingHorizontal: 15, color: '#292A25', fontSize: 14 },
	addButton: { width: 48, height: 48, borderRadius: 14, backgroundColor: '#29382F', alignItems: 'center', justifyContent: 'center', marginLeft: 10 },
	addButtonText: { color: '#FFFFFF', fontSize: 26, lineHeight: 28 },
	listContent: { flexGrow: 1, paddingBottom: 24 },
	itemCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginBottom: 10, borderWidth: 1, borderColor: '#EFEEE9' },
	itemIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F5F1E9', alignItems: 'center', justifyContent: 'center', marginRight: 13 },
	itemName: { flex: 1, color: '#292A25', fontSize: 15, fontWeight: '600' },
	emptyCard: { flex: 1, minHeight: 300, backgroundColor: '#FFFFFF', borderRadius: 22, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 26, paddingVertical: 32, borderWidth: 1, borderColor: '#EFEEE9' },
	emptyIcon: { width: 62, height: 62, borderRadius: 31, backgroundColor: '#F5F1E9', alignItems: 'center', justifyContent: 'center', marginBottom: 18 },
	emptyHeart: { color: '#A47C50', fontSize: 34 },
	emptyTitle: { color: '#282923', fontSize: 21, lineHeight: 27, fontWeight: '700', textAlign: 'center' },
	emptyText: { color: '#77766F', fontSize: 13, lineHeight: 20, textAlign: 'center', marginTop: 10, maxWidth: 270 },
	button: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#29382F', borderRadius: 14, paddingVertical: 14, paddingHorizontal: 18, marginTop: 22 },
	buttonText: { color: '#FFFFFF', fontSize: 13, fontWeight: '600' },
	buttonArrow: { color: '#FFFFFF', fontSize: 18, marginLeft: 12, marginTop: -2 },
});
