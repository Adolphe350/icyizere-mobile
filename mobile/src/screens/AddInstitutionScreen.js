import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function AddInstitutionScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    website: '',
    category: 'government',
    phone: '',
    email: '',
  });

  const categories = [
    { id: 'government', name: 'Government' },
    { id: 'education', name: 'Education' },
    { id: 'finance', name: 'Finance & Banking' },
    { id: 'health', name: 'Healthcare' },
    { id: 'transport', name: 'Transport' },
    { id: 'utilities', name: 'Utilities & Services' },
  ];

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Please enter the institution name');
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement actual API call when auth is ready
      console.log('Submitting institution:', formData);
      Alert.alert(
        'Success',
        'Institution submitted for approval! We will review and publish it shortly.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Institutions'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit institution. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Add Institution</Text>
          <Text style={styles.subtitle}>
            Help us expand our database by adding a Rwandan institution
          </Text>
        </View>

        <View style={styles.formSection}>
          {/* Logo Upload */}
          <View style={styles.logoContainer}>
            <View style={styles.logoPlaceholder}>
              <Ionicons name="building-outline" size={40} color="#64748B" />
              <Text style={styles.logoText}>Institution Logo</Text>
            </View>
          </View>

          {/* Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Institution Name *</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="business-outline" size={18} color="#64748B" style={styles.inputIcon} />
              <Text
                style={styles.input}
                placeholder="Enter institution name"
                placeholderTextColor="#64748B"
                value={formData.name}
                onChangeText={(text) => handleChange('name', text)}
              />
            </View>
          </View>

          {/* Category */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Category *</Text>
            <View style={styles.categoryContainer}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.categoryButton,
                    formData.category === cat.id && styles.categoryButtonActive,
                  ]}
                  onPress={() => handleChange('category', cat.id)}
                >
                  <Text style={[
                    styles.categoryButtonText,
                    formData.category === cat.id && styles.categoryButtonTextActive,
                  ]}>
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Location */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Location</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="location-outline" size={18} color="#64748B" style={styles.inputIcon} />
              <Text
                style={styles.input}
                placeholder="City or area (e.g., Kigali)"
                placeholderTextColor="#64748B"
                value={formData.location}
                onChangeText={(text) => handleChange('location', text)}
              />
            </View>
          </View>

          {/* Website */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Website</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="globe-outline" size={18} color="#64748B" style={styles.inputIcon} />
              <Text
                style={styles.input}
                placeholder="https://example.com"
                placeholderTextColor="#64748B"
                value={formData.website}
                onChangeText={(text) => handleChange('website', text)}
              />
            </View>
          </View>

          {/* Description */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <View style={styles.textareaContainer}>
              <Ionicons name="document-text-outline" size={18} color="#64748B" style={styles.inputIcon} />
              <Text
                style={[styles.input, { minHeight: 100 }]}
                placeholder="Brief description of the institution"
                placeholderTextColor="#64748B"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                value={formData.description}
                onChangeText={(text) => handleChange('description', text)}
              />
            </View>
          </View>

          {/* Contact Info */}
          <View style={styles.contactSection}>
            <Text style={styles.sectionTitle}>Contact Information</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="call-outline" size={18} color="#64748B" style={styles.inputIcon} />
                <Text
                  style={styles.input}
                  placeholder="+250..."
                  placeholderTextColor="#64748B"
                  value={formData.phone}
                  onChangeText={(text) => handleChange('phone', text)}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={18} color="#64748B" style={styles.inputIcon} />
                <Text
                  style={styles.input}
                  placeholder="contact@example.com"
                  placeholderTextColor="#64748B"
                  value={formData.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={(text) => handleChange('email', text)}
                />
              </View>
            </View>
          </View>

          {/* Submit Button */}
          <View style={styles.submitContainer}>
            <TouchableOpacity
              style={loading ? styles.submitButtonDisabled : styles.submitButton}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <>
                  <Ionicons name="send" size={20} color="#FFFFFF" />
                  <Text style={styles.submitButtonText}>Submit Institution</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={20} color="#0F766E" />
          <Text style={styles.infoText}>
            Submitted institutions are reviewed by our team before publishing. You'll receive a notification when it's live.
          </Text>
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
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
  },
  formSection: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 8,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    color: '#94A3B8',
    marginBottom: 8,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: '#374151',
  },
  textareaContainer: {
    backgroundColor: '#111827',
    borderRadius: 10,
    paddingHorizontal: 12,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#374151',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  categoryButton: {
    backgroundColor: '#374151',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#0F766E',
  },
  categoryButtonText: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  categoryButtonTextActive: {
    color: '#FFFFFF',
  },
  contactSection: {
    borderTopWidth: 1,
    borderColor: '#374151',
    paddingTop: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  submitContainer: {
    marginTop: 16,
  },
  submitButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F766E',
    paddingVertical: 14,
    borderRadius: 10,
  },
  submitButtonDisabled: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#374151',
    paddingVertical: 14,
    borderRadius: 10,
    opacity: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#1F2937',
    borderRadius: 10,
    padding: 16,
    marginTop: 16,
  },
  infoText: {
    color: '#94A3B8',
    fontSize: 13,
    marginLeft: 12,
    lineHeight: 18,
    flex: 1,
  },
});
