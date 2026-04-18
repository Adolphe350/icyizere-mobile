import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement logout logic
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            });
          },
        },
      ]
    );
  };

  const settingsSections = [
    {
      title: 'Account',
      items: [
        {
          label: 'Profile',
          icon: 'person-outline',
          action: () => Alert.alert('Profile', 'Edit your profile here'),
        },
        {
          label: 'Notifications',
          icon: 'notifications-outline',
          badge: 3,
          action: () => Alert.alert('Notifications', 'Configure your preferences'),
        },
        {
          label: 'Privacy',
          icon: 'shield-keyhole-outline',
          action: () => Alert.alert('Privacy', 'Manage your privacy settings'),
        },
      ],
    },
    {
      title: 'About',
      items: [
        {
          label: 'About TrustMeter',
          icon: 'information-circle-outline',
          action: () => Alert.alert('About TrustMeter', 'Building transparency in Rwanda'),
        },
        {
          label: 'Help Center',
          icon: 'help-circle-outline',
          action: () => Alert.alert('Help', 'Contact support or browse FAQs'),
        },
        {
          label: 'Rate This App',
          icon: 'star-outline',
          action: () => Alert.alert('Rate Us', 'Please rate us on the app store!'),
        },
        {
          label: 'Share with Friends',
          icon: 'share-outline',
          action: () => Alert.alert('Share', 'Invite friends to join TrustMeter'),
        },
        {
          label: 'Legal',
          icon: 'document-text-outline',
          submenu: [
            { label: 'Privacy Policy', action: () => Alert.alert('Privacy Policy', 'Last updated: March 2026') },
            { label: 'Terms of Service', action: () => Alert.alert('Terms', 'Please read our terms carefully') },
            { label: 'Cookie Policy', action: () => Alert.alert('Cookies', 'We use cookies to improve your experience') },
          ],
        },
      ],
    },
  ];

  const renderMenuItem = (item) => {
    const hasSubmenu = item.submenu && item.submenu.length > 0;

    return (
      <View key={item.label}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            if (hasSubmenu) {
              // For now, just show alert for submenu items
              // In a real app, this would navigate to a submenu screen
              Alert.alert(item.label, 'This section will be implemented soon');
            } else {
              item.action();
            }
          }}
        >
          <View style={styles.menuItemLeft}>
            <Ionicons name={item.icon} size={20} color="#0F766E" />
            <Text style={styles.menuItemText}>{item.label}</Text>
          </View>

          {item.badge ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.badge}</Text>
            </View>
          ) : (
            <Ionicons name="chevron-forward" size={18} color="#64748B" />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={32} color="#FFFFFF" />
          </View>
          <TouchableOpacity style={styles.editAvatar}>
            <Ionicons name="camera" size={14} color="#0F766E" />
          </TouchableOpacity>
        </View>
        <Text style={styles.username}>Adolphe 350</Text>
        <Text style={styles.email}>adolphe@icyizere.rw</Text>
      </View>

      {/* Settings Sections */}
      {settingsSections.map((section, index) => (
        <View key={section.title}>
          {index > 0 && <View style={styles.sectionSeparator} />}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map(renderMenuItem)}
          </View>
        </View>
      ))}

      {/* Logout Button */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* App Version */}
      <View style={styles.footer}>
        <Text style={styles.versionText}>TrustMeter v1.0.0</Text>
        <Text style={styles.footerText}>Made in Rwanda</Text>
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
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#0F766E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editAvatar: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#1F2937',
    borderWidth: 2,
    borderColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  email: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  sectionSeparator: {
    height: 1,
    backgroundColor: '#374151',
    marginVertical: 8,
  },
  section: {
    padding: 16,
    backgroundColor: '#1F2937',
    borderRadius: 12,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
    textTransform: 'uppercase',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    color: '#E5E7EB',
    fontSize: 14,
    marginLeft: 12,
  },
  badge: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  logoutContainer: {
    padding: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: '#374151',
  },
  logoutText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#374151',
  },
  versionText: {
    color: '#64748B',
    fontSize: 12,
  },
  footerText: {
    color: '#4B5563',
    fontSize: 10,
    marginTop: 4,
  },
});
