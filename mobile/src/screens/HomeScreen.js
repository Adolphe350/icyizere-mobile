import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchInstitutions, fetchCategories } from '../api';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [institutions, setInstitutions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [institutionsData, categoriesData] = await Promise.all([
        fetchInstitutions(1, 10),
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

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0F766E" />
        <Text style={styles.loadingText}>Loading institutions...</Text>
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
          <View style={styles.badgeContainer}>
            <View style={[styles.badge, { backgroundColor: '#1F2937' }]}>
              <Text style={styles.badgeText}>{item.category?.name || 'Uncategorized'}</Text>
            </View>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
      </View>
      <Text style={styles.institutionDescription} numberOfLines={2}>
        {item.description}
      </Text>
      <View style={styles.institutionFooter}>
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={14} color="#64748B" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>TrustMeter</Text>
        <Text style={styles.headerSubtitle}>Rate & Review Institutions in Rwanda</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Institutions</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Institutions')}
            style={styles.seeAllButton}
          >
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={institutions}
          renderItem={renderInstitution}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Browse by Category</Text>
        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              onPress={() => navigation.navigate('Institutions', { category: category.slug })}
            >
              <View style={styles.categoryIconWrapper}>
                <Ionicons
                  name={getCategoryIcon(category.slug)}
                  size={24}
                  color="#0F766E"
                />
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryCount}>
                {category._count?.institutions || 0} institutions
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

function getCategoryIcon(slug) {
  const icons = {
    government: 'briefcase',
    education: 'school',
    finance: 'cash',
    health: 'heart',
    transport: 'tram',
    utilities: 'lightning',
  };
  return icons[slug] || 'grid';
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
  loadingText: {
    color: '#94A3B8',
    marginTop: 10,
    fontSize: 14,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#94A3B8',
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  seeAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#374151',
    borderRadius: 6,
  },
  seeAllText: {
    color: '#0F766E',
    fontWeight: '600',
    fontSize: 12,
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
  badgeContainer: {
    flexDirection: 'row',
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
  institutionFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  locationText: {
    color: '#64748B',
    fontSize: 12,
    marginLeft: 4,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  categoryIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 10,
    color: '#64748B',
  },
});
