import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
  ActivityIndicator
} from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { useState } from "react";
import { API_URL } from "../../constants/api";
import { styles } from "../../assets/styles/create.styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const CATEGORIES = [
  { id: "food", name: "Food & Drinks", icon: "fast-food" },
  { id: "shopping", name: "Shopping", icon: "cart" },
  { id: "transportation", name: "Transportation", icon: "car" },
  { id: "entertainment", name: "Entertainment", icon: "film" },
  { id: "bills", name: "Bills", icon: "receipt" },
  { id: "income", name: "Income", icon: "cash" },
  { id: "other", name: "Other", icon: "ellipsis-horizontal" },
];

const Create = () => {
  const router = useRouter();
  const { user } = useUser();

  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [isExpense, setIsExpense] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    if (!title) return Alert.alert("Error", "Please enter a transaction title");
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0)
      return Alert.alert("Error", "Please enter a valid amount");
    if (!category) return Alert.alert("Error", "Please select a category");

    setIsLoading(true);

    try {
      const formattedAmount = isExpense
        ? -Math.abs(parseFloat(amount))
        : Math.abs(parseFloat(amount));

      const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: formattedAmount,
          title,
          user_id: user.id,
          category,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error(errorData.error || "Failed to create the transaction");
      }

      Alert.alert("Success", "Transaction created successfully");
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to create the transaction");
      console.log(error, "Error in creating the transaction");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraScrollHeight={100}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Transaction</Text>
          <TouchableOpacity
            style={[
              styles.saveButtonContainer,
              isLoading && styles.saveButtonDisabled,
            ]}
            onPress={handleCreate}
            disabled={isLoading}
          >
            <Text style={styles.saveButton}>
              {isLoading ? "Saving" : "Save"}
            </Text>
            {!isLoading && (
              <Ionicons name="checkmark" size={20} color={COLORS.primary} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <View style={styles.typeSelector}>
            <TouchableOpacity
              style={[styles.typeButton, isExpense && styles.typeButtonActive]}
              onPress={() => setIsExpense(true)}
            >
              <Ionicons
                style={styles.typeIcon}
                name="arrow-down-circle"
                size={22}
                color={isExpense ? COLORS.white : COLORS.expense}
              />
              <Text
                style={[
                  styles.typeButtonText,
                  isExpense && styles.typeButtonTextActive,
                ]}
              >
                Expense
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.typeButton, !isExpense && styles.typeButtonActive]}
              onPress={() => setIsExpense(false)}
            >
              <Ionicons
                style={styles.typeIcon}
                name="arrow-up-circle"
                size={22}
                color={!isExpense ? COLORS.white : COLORS.income}
              />
              <Text
                style={[
                  styles.typeButtonText,
                  !isExpense && styles.typeButtonTextActive,
                ]}
              >
                Income
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              placeholderTextColor={COLORS.textLight}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons
              name="create-outline"
              size={22}
              style={styles.inputIcon}
              color={COLORS.textLight}
            />
            <TextInput
              style={styles.input}
              placeholder="Transaction Title"
              placeholderTextColor={COLORS.textLight}
              value={title}
              onChangeText={setTitle}
            />
          </View>
          <Text style={styles.sectionTitle}>
            <Ionicons name="pricetag-outline" size={16} color={COLORS.text} />{" "}
            Category
          </Text>
          <View style={styles.categoryGrid}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryButton,
                  category === cat.name && styles.categoryButtonActive,
                ]}
                onPress={() => setCategory(cat.name)}
              >
                <Ionicons
                  name={cat.icon}
                  size={20}
                  color={category === cat.name ? COLORS.white : COLORS.text}
                  style={styles.categoryIcon}
                />
                <Text
                  style={[
                    styles.categoryButtonText,
                    category === cat.name && styles.categoryButtonTextActive,
                  ]}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Create;
