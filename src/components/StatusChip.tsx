import { Text, View } from "react-native";
import { statusColors } from "@/constants/theme";

export const StatusChip = ({ label }: { label: string }) => (
  <View
    className="self-start rounded-full border px-3 py-1.5"
    style={{
      borderColor: `${statusColors[label] || "#7A6BFF"}55`,
      backgroundColor: `${statusColors[label] || "#7A6BFF"}22`
    }}
  >
    <Text className="text-[11px] font-semibold text-white/[0.90]" numberOfLines={1}>
      {label}
    </Text>
  </View>
);
