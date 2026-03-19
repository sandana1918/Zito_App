import { Pressable, Text, View } from "react-native";
import { type } from "@/constants/typography";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onPressAction?: () => void;
}

export const SectionHeader = ({ title, subtitle, actionLabel, onPressAction }: SectionHeaderProps) => (
  <View className="mb-4 flex-row items-start justify-between gap-3">
    <View className="flex-1">
      {subtitle ? (
        <>
          <Text style={type.eyebrow} className="text-black/35">{title}</Text>
          <Text style={type.sectionTitle} className="mt-2 text-[#111111]">{subtitle}</Text>
        </>
      ) : (
        <Text style={type.sectionTitle} className="text-[#111111]">{title}</Text>
      )}
    </View>
    {actionLabel ? (
      <Pressable className="rounded-full border border-black/[0.08] bg-black/[0.03] px-3 py-2" onPress={onPressAction}>
        <Text style={type.eyebrowTight} className="text-[#111111]">{actionLabel}</Text>
      </Pressable>
    ) : null}
  </View>
);
