import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, toggleFavorite } from '../redux/eventSlice';
import { windowWidth } from '../theme/appConstant';

export default function EventsScreen() {
  const dispatch = useDispatch();
  const { events, loading, error, favorites } = useSelector((state) => state.event);
  const [searchItems, setSearchItems] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  useEffect(() => {
    if (events?.events) {
      if (query) {
        const filteredItems = events.events.filter((event) =>
          event.event_name.toLowerCase().includes(query.toLowerCase())
        );
        setSearchItems(filteredItems);
      } else {
        setSearchItems(events.events);
      }
    }
  }, [events, query]);

  const favoriteEvents = events?.events?.filter((event) =>
    favorites.includes(event.event_date_id)
  );

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.eventDetails}>
        <Text style={styles.eventName}>{item.event_name}</Text>
        <Text style={styles.eventDescription}>{item.description}</Text>
      </View>
      <TouchableOpacity onPress={() => dispatch(toggleFavorite(item.event_date_id))}>
        <Text style={styles.heart}>
          {favorites.includes(item.event_date_id) ? '❤️' : '🤍'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.error}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <TextInput
        placeholder="Search"
        placeholderTextColor="blue"
        color="black"
        value={query}
        onChangeText={(text) => setQuery(text)}
        style={styles.searchInput}
      />

      {/* All Events List */}
      <FlatList
        data={searchItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.event_date_id.toString()}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No events found</Text>
        )}
      />

      {/* Favorites List */}
      <Text style={styles.sectionTitle}>Favorites</Text>
      <FlatList
        data={favoriteEvents}
        renderItem={({ item }) => (
          <View style={styles.favoriteItem}>
            <Text style={styles.favoriteText}>{item.event_name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.event_date_id.toString()}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No favorite items</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  eventDetails: {
    width: windowWidth(380),
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
  },
  heart: {
    fontSize: 24,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  favoriteItem: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 5,
    borderRadius: 5,
  },
  favoriteText: {
    color: 'red',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});