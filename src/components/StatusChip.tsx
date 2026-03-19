import { Text, View } from "react-native";
import { statusColors } from "@/constants/theme";
import { type } from "@/constants/typography";

export const StatusChip = ({ label }: { label: string }) => (
  <View
    className="self-start rounded-full border px-3 py-1.5"
    style={{
      borderColor: `${statusColors[label] || "#111111"}25`,
      backgroundColor: `${statusColors[label] || "#111111"}12`
    }}
  >
    <Text style={type.chip} className="text-[#111111]" numberOfLines={1}>
      {label}
    </Text>
  </View>
);
