import { LanguageRule } from "./types";

export const mobileRules: LanguageRule[] = [
  /**
   * ===========================
   * Dart
   * ===========================
   */

  {
    language: "dart",
    patterns: [/void main\(\)/i],
  },

  {
    language: "dart",
    patterns: [/import 'package:/i],
  },

  /**
   * ===========================
   * Flutter
   * ===========================
   */

  {
    language: "flutter",
    patterns: [/StatelessWidget/i],
  },

  {
    language: "flutter",
    patterns: [/StatefulWidget/i],
  },

  {
    language: "flutter",
    patterns: [/MaterialApp/i],
  },

  {
    language: "flutter",
    patterns: [/Scaffold/i],
  },

  {
    language: "flutter",
    patterns: [/BuildContext/i],
  },

  /**
   * ===========================
   * React Native
   * ===========================
   */

  {
    language: "react-native",
    patterns: [/react-native/i],
  },

  {
    language: "react-native",
    patterns: [/SafeAreaView/i],
  },

  {
    language: "react-native",
    patterns: [/StyleSheet\.create/i],
  },

  {
    language: "react-native",
    patterns: [/TouchableOpacity/i],
  },

  /**
   * ===========================
   * Kotlin
   * ===========================
   */

  {
    language: "kotlin",
    patterns: [/fun main/i],
  },

  {
    language: "kotlin",
    patterns: [/println/i],
  },

  {
    language: "kotlin",
    patterns: [/val /i],
  },

  /**
   * ===========================
   * Swift
   * ===========================
   */

  {
    language: "swift",
    patterns: [/import SwiftUI/i],
  },

  {
    language: "swift",
    patterns: [/struct .*: View/i],
  },

  {
    language: "swift",
    patterns: [/var body: some View/i],
  },
];