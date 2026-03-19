import { Text, View } from "react-native";
import { formatDateTime } from "@/utils/format";

export const TimelineItem = ({ label, detail, at, isLast = false }: { label: string; detail: string; at: string; isLast?: boolean }) => (
  <View className="flex-row gap-4">
    <View className="items-center">
      <View className="h-3 w-3 rounded-full bg-[#78A9FF]" />
      {!isLast ? <View className="mt-1 h-14 w-px bg-black/[0.08]" /> : null}
    </View>
    <View className="flex-1 pb-5">
      <Text className="text-[15px] font-semibold text-[#111111]">{label}</Text>
      <Text className="mt-1 text-[13px] leading-5 text-black/55">{detail}</Text>
      <Text className="mt-2 text-[12px] text-black/35">{formatDateTime(at)}</Text>
    </View>
  </View>
);
