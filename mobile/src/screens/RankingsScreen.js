import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function RankingsScreen() {
  const navigation = useNavigation();

  // Mock data - will be replaced with real API when available
  const mockRankings = [
    {
      id: 1,
      name: 'Rwanda Development Board (RDB)',
      slug: 'rwanda-development-board',
      category: 'Government',
      avgRating: 4.5,
      totalReviews: 12,
      rank: 1,
    },
    {
      id: 2,
      name: 'Kigali International Airport',
      slug: 'kigali-international-airport',
      category: 'Transport',
      avgRating: 4.2,
      totalReviews: 8,
      rank: 2,
    },
    {
      id: 3,
      name: 'Central Hospital',
      slug: 'central-hospital',
      category: 'Healthcare',
      avgRating: 4.0,
      totalReviews: 15,
      rank: 3,
    },
    {
      id: 4,
      name: 'Bank of Kigali',
      slug: 'bank-of-kigali',
      category: 'Finance & Banking',
      avgRating: 3.8,
      totalReviews: 22,
      rank: 4,
    },
    {
      id: 5,
      name: 'Rwanda Education Board',
      slug: 'rwanda-education-board',
      category: 'Education',
      avgRating: 3.5,
      totalReviews: 5,
      rank: 5,
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Trust Rankings</Text>
        <Text style={styles.subtitle}>
          Most rated institutions in Rwanda
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>10+</Text>
          <Text style={styles.statLabel}>Institutions</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>50+</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>6</Text>
          <Text style={styles.statLabel}>Categories</Text>
        </View>
      </View>

      <View style={styles.rankingsSection}>
        <Text style={styles.sectionTitle}>Top Institutions</Text>
        <View style={styles.rankingsList}>
          {mockRankings.map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.rankItem,
                index === 0 && styles.rankItemGold,
                index === 1 && styles.rankItemSilver,
                index === 2 && styles.rankItemBronze,
              ]}
            >
              <View style={styles.rankBadge}>
                <Text style={styles.rankBadgeText}>{item.rank}</Text>
              </View>

              <View style={styles.rankContent}>
                <View style={styles.rankHeader}>
                  <Text style={styles.institutionName}>{item.name}</Text>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={14} color="#F59E0B" />
                    <Text style={styles.ratingText}>{item.avgRating}</Text>
                    <Text style={styles.reviewCountText}>
                      ({item.totalReviews})
                    </Text>
                  </View>
                </View>

                <Text style={styles.categoryText}>{item.category}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Category Rankings */}
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>By Category</Text>
        <View style={styles.categoryRankings}>
          <View style={styles.categoryRankCard}>
            <Ionicons name="briefcase" size={32} color="#0F766E" />
            <Text style={styles.categoryRankName}>Government</Text>
            <Text style={styles.categoryRankCount}>10 institutions</Text>
          </View>
          <View style={styles.categoryRankCard}>
            <Ionicons name="school" size={32} color="#3B82F6" />
            <Text style={styles.categoryRankName}>Education</Text>
            <Text style={styles.categoryRankCount}>5 institutions</Text>
          </View>
          <View style={styles.categoryRankCard}>
            <Ionicons name="heart" size={32} color="#EF4444" />
            <Text style={styles.categoryRankName}>Healthcare</Text>
            <Text style={styles.categoryRankCount}>4 institutions</Text>
          </View>
          <View style={styles.categoryRankCard}>
            <Ionicons name="cash" size={32} color="#10B981" />
            <Text style={styles.categoryRankName}>Finance</Text>
            <Text style={styles.categoryRankCount}>5 institutions</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          * Rankings are based on user reviews and ratings. More data coming soon!
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  statCard: {
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#1F2937',
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F766E',
  },
  statLabel: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 4,
  },
  rankingsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  rankingsList: {
    space: 8,
  },
  rankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
  },
  rankItemGold: {
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  rankItemSilver: {
    borderLeftWidth: 4,
    borderLeftColor: '#9CA3AF',
  },
  rankItemBronze: {
    borderLeftWidth: 4,
    borderLeftColor: '#D97706',
  },
  rankBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankBadgeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  rankContent: {
    flex: 1,
  },
  rankHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  institutionName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  ratingText: {
    color: '#F59E0B',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 2,
  },
  reviewCountText: {
    color: '#64748B',
    fontSize: 12,
    marginLeft: 2,
  },
  categoryText: {
    fontSize: 12,
    color: '#94A3B8',
  },
  categoriesSection: {
    padding: 16,
  },
  categoryRankings: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryRankCard: {
    width: '48%',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  categoryRankName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 4,
  },
  categoryRankCount: {
    fontSize: 11,
    color: '#64748B',
  },
  footer: {
    padding: 16,
    alignItems: 'center',
  },
  footerText: {
    color: '#64748B',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
});
