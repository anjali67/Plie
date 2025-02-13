import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator,Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, toggleFavorite } from '../../redux/eventSlice';
import styles from './styles';

export default function EventsScreen() {
  const dispatch = useDispatch();
  const { events, favorites, loading, error } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.event_name}</Text>
      <View style={{flexDirection:"row",justifyContent:"space-between"}}>
          <Image uri={item.event_profile_img} style={{height:40,width:40}}/>
          <TouchableOpacity onPress={() => dispatch(toggleFavorite(item.id))}>
        <Text style={styles.heart}>{favorites.includes(item.event_id) ? '❤️' : '🤍'}</Text>
      </TouchableOpacity>
      </View>
    
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.error}>Error: {error}</Text>;
  }
  if (!events || !events.data || !events.data.events) {
    return <Text style={styles.error}>No events found</Text>;
  }

  return (
events.data && (
  events.data.events && (
    <FlatList
      data={events.data.events}
      renderItem={renderItem}
    />
  )
)
    
  );
}

