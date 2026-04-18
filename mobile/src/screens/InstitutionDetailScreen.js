import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchInstitutionBySlug, submitReview } from '../api';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function InstitutionDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { slug } = route.params || {};

  const [institution, setInstitution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  useEffect(() => {
    if (slug) {
      loadInstitution();
    }
  }, [slug]);

  const loadInstitution = async () => {
    try {
      const data = await fetchInstitutionBySlug(slug);
      setInstitution(data);
    } catch (error) {
      console.error('Error loading institution:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRate = (starCount) => {
    setRating(starCount);
  };

  const handleReviewSubmit = async () => {
    if (rating === 0) {
      alert('Please rate the institution');
      return;
    }

    try {
      await submitReview(institution.id, rating, reviewText, null); // Token needed for auth
      alert('Thank you for your review!');
      setRating(0);
      setReviewText('');
      navigation.goBack();
    } catch (error) {
      alert('Failed to submit review. Please try again.');
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0F766E" />
      </View>
    );
  }

  if (!institution) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Institution not found</Text>
      </View>
    );
  }

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => handleRate(i)}>
          <Ionicons
            name={i <= rating ? 'star' : 'star-outline'}
            size={28}
            color={i <= rating ? '#F59E0B' : '#4B5563'}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.headerImage}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>
              {institution.category?.name || 'Uncategorized'}
            </Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{institution.name}</Text>
          {institution.location && (
            <View style={styles.locationRow}>
              <Ionicons name="location" size={16} color="#64748B" />
              <Text style={styles.location}>{institution.location}</Text>
            </View>
          )}
          {institution.website && (
            <TouchableOpacity
              style={styles.websiteContainer}
              onPress={() => Linking.openURL(institution.website)}
            >
              <Ionicons name="globe-outline" size={16} color="#0F766E" />
              <Text style={styles.website}>{institution.website}</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{institution.description}</Text>
        </View>

        {/* Contact Info */}
        {(institution.phone || institution.email) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact</Text>
            {institution.phone && (
              <TouchableOpacity style={styles.touchableRow}>
                <Ionicons name="call-outline" size={18} color="#94A3B8" />
                <Text style={styles.contactText}>{institution.phone}</Text>
              </TouchableOpacity>
            )}
            {institution.email && (
              <TouchableOpacity style={styles.touchableRow}>
                <Ionicons name="mail-outline" size={18} color="#94A3B8" />
                <Text style={styles.contactText}>{institution.email}</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Rating Section */}
        <View style={styles.ratingSection}>
          <Text style={styles.sectionTitle}>Rate & Review</Text>
          <View style={styles.starsContainer}>
            {renderStars()}
          </View>
          {rating > 0 && (
            <Text style={styles.ratingText}>
              {rating} out of 5 stars
            </Text>
          )}
        </View>

        {/* Review Input */}
        <View style={styles.reviewSection}>
          <Text style={styles.reviewLabel}>Your Review</Text>
          <View style={styles.reviewInputContainer}>
            <Text
              style={styles.reviewInput}
              placeholder="Write your review here..."
              placeholderTextColor="#64748B"
              multiline
              numberOfLines={4}
              value={reviewText}
              onChangeText={setReviewText}
            />
          </View>
          <TouchableOpacity
            style={rating > 0 ? styles.submitButton : styles.submitButtonDisabled}
            onPress={handleReviewSubmit}
            disabled={rating === 0}
          >
            <Text style={styles.submitButtonText}>Submit Review</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
  errorText: {
    color: '#94A3B8',
    fontSize: 14,
  },
  header: {
    position: 'relative',
    height: 60,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 12,
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 8,
  },
  headerImage: {
    height: 120,
    backgroundColor: '#1F2937',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryBadge: {
    backgroundColor: '#0F766E',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  location: {
    color: '#94A3B8',
    fontSize: 14,
    marginLeft: 6,
  },
  websiteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  website: {
    color: '#0F766E',
    fontSize: 14,
    marginLeft: 6,
    textDecorationLine: 'underline',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 22,
    textAlign: 'justify',
  },
  touchableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#1F2937',
    borderRadius: 10,
    marginBottom: 8,
  },
  contactText: {
    color: '#94A3B8',
    fontSize: 14,
    marginLeft: 12,
  },
  ratingSection: {
    marginBottom: 24,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  ratingText: {
    color: '#F59E0B',
    fontSize: 14,
    fontWeight: '600',
  },
  reviewSection: {
    marginBottom: 24,
  },
  reviewLabel: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 8,
  },
  reviewInputContainer: {
    backgroundColor: '#1F2937',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  reviewInput: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
    minHeight: 80,
  },
  submitButton: {
    backgroundColor: '#0F766E',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#374151',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    opacity: 0.5,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
