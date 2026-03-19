import { Text, View } from "react-native";
import { statusColors } from "@/constants/theme";

export const StatusChip = ({ label }: { label: string }) => (
  <View
    className="self-start rounded-full border px-3 py-1.5"
    style={{
      borderColor: `${statusColors[label] || "#111111"}25`,
      backgroundColor: `${statusColors[label] || "#111111"}12`
    }}
  >
    <Text className="text-[11px] font-semibold text-[#111111]" numberOfLines={1}>
      {label}
    </Text>
  </View>
);
