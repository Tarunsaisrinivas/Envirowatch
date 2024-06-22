import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const About = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.header}>About Us</Text>
        <Text style={styles.paragraph}>
          Welcome to ENVIROWATCH – your partner in fostering economic sustainability and community-driven action.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.header}>Our Mission</Text>
        <Text style={styles.paragraph}>
          At EnviroWatch, we believe in the power of collective effort to create a sustainable future. Our mission is to empower individuals and communities to maintain economic sustainability by providing a platform where local issues can be addressed promptly and effectively.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.header}>What We Do</Text>
        <Text style={styles.paragraph}>
          EnviroWatch is a dynamic app designed to bridge the gap between communities, non-governmental organizations (NGOs), and government agencies. Our platform allows users to post issues related to their specific region, whether it’s environmental concerns, infrastructure problems, social welfare needs, or any other local challenges. These issues are then visible to relevant NGOs and government bodies, enabling them to take timely and appropriate action.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.header}>How We Work</Text>
        <Text style={styles.paragraph}>
          - Identify and Report Issues: Users can easily report local problems by posting detailed descriptions, photos, and location tags. This ensures that the issues are clearly communicated to those who can help.
        </Text>
        <Text style={styles.paragraph}>
          - Connect with NGOs and Government: Our app connects users with a network of NGOs and government agencies committed to sustainable development. Once an issue is posted, these organizations are notified and can respond directly through the app.
        </Text>
        <Text style={styles.paragraph}>
          - Track Progress: Users can track the progress of their reported issues in real-time, providing transparency and accountability. Updates and resolutions are shared within the app, keeping the community informed.
        </Text>
        <Text style={styles.paragraph}>
          - Promote Sustainability: By addressing local issues, we promote economic sustainability. Whether it’s repairing a road, cleaning up a polluted area, or providing resources to those in need, each action contributes to a more sustainable and resilient community.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.header}>Why Choose Us?</Text>
        <Text style={styles.paragraph}>
          - User-Friendly Interface: Our app is designed to be intuitive and easy to use, ensuring that everyone, regardless of technical expertise, can participate in making their community better.
        </Text>
        <Text style={styles.paragraph}>
          - Real-Time Updates: Stay informed with real-time notifications and updates on the issues you care about.
        </Text>
        <Text style={styles.paragraph}>
          - Community Empowerment: We believe in the power of people. By giving a voice to local communities, we enable grassroots solutions to emerge.
        </Text>
        <Text style={styles.paragraph}>
          - Collaborative Approach: Our platform fosters collaboration between citizens, NGOs, and government bodies, creating a unified effort towards sustainability.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.header}>Join Us</Text>
        <Text style={styles.paragraph}>
          Be a part of the change. Download EnviroWatch today and help us create a sustainable future, one issue at a time. Together, we can make a difference.
        </Text>
        <Text style={styles.contact}>
          For more information, support, or partnership inquiries, please contact us at 9999995556.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff1e6',
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#b07d62',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  contact: {
    fontSize: 16,
    color: '#b07d62',
    textAlign: 'center',
  },
});

export default About;
