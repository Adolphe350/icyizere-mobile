import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchInstitutions, fetchCategories, fetchInstitutionsByCategory } from '../api';
import { useNavigation } from '@react-navigation/native';

export default function InstitutionsScreen() {
  const [institutions, setInstitutions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [institutionsData, categoriesData] = await Promise.all([
        fetchInstitutions(1, 50),
        fetchCategories(),
      ]);
      setInstitutions(institutionsData.institutions || []);
      setCategories(categoriesData || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterByCategory = async (categorySlug) => {
    setSelectedCategory(categorySlug);
    try {
      const data = await fetchInstitutionsByCategory(categorySlug);
      setInstitutions(data.institutions || []);
    } catch (error) {
      console.error('Error filtering by category:', error);
    }
  };

  const resetFilter = () => {
    setSelectedCategory(null);
    loadData();
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0F766E" />
      </View>
    );
  }

  const renderInstitution = ({ item }) => (
    <TouchableOpacity
      style={styles.institutionCard}
      onPress={() => navigation.navigate('InstitutionDetail', { slug: item.slug })}
    >
      <View style={styles.institutionHeader}>
        <View style={styles.institutionInfo}>
          <Text style={styles.institutionName}>{item.name}</Text>
          {item.category && (
            <View style={[styles.badge, { backgroundColor: '#374151' }]}>
              <Text style={styles.badgeText}>{item.category.name}</Text>
            </View>
          )}
        </View>
        <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
      </View>
      <Text style={styles.institutionDescription} numberOfLines={2}>
        {item.description}
      </Text>
      {item.location && (
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={14} color="#64748B" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
      )}
      {item.website && (
        <TouchableOpacity style={styles.websiteButton}>
          <Ionicons name="globe-outline" size={14} color="#0F766E" />
          <Text style={styles.websiteText}>Visit Website</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Institutions</Text>
        <Text style={styles.subtitle}>Browse and review Rwandan organizations</Text>
      </View>

      {/* Categories Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScroll}
        contentContainerStyle={styles.categoriesContainer}
      >
        <TouchableOpacity
          style={[styles.categoryChip, selectedCategory === null && styles.categoryChipActive]}
          onPress={resetFilter}
        >
          <Text style={[styles.categoryChipText, selectedCategory === null && styles.categoryChipTextActive]}>All</Text>
        </TouchableOpacity>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryChip,
              selectedCategory === category.slug && styles.categoryChipActive,
            ]}
            onPress={() => filterByCategory(category.slug)}
          >
            <Text style={[styles.categoryChipText, selectedCategory === category.slug && styles.categoryChipTextActive]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Institutions List */}
      <FlatList
        data={institutions}
        renderItem={renderInstitution}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="building-outline" size={48} color="#64748B" />
            <Text style={styles.emptyText}>No institutions found</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111827',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 2,
  },
  categoriesScroll: {
    paddingVertical: 12,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  categoryChip: {
    backgroundColor: '#374151',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: '#0F766E',
  },
  categoryChipText: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  institutionCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  institutionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  institutionInfo: {
    flex: 1,
  },
  institutionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    color: '#E5E7EB',
    fontSize: 10,
    textTransform: 'capitalize',
  },
  institutionDescription: {
    fontSize: 13,
    color: '#9CA3AF',
    lineHeight: 18,
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    color: '#64748B',
    fontSize: 12,
    marginLeft: 4,
  },
  websiteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    width: 'auto',
  },
  websiteText: {
    color: '#0F766E',
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    color: '#64748B',
    marginTop: 16,
    fontSize: 14,
  },
});
