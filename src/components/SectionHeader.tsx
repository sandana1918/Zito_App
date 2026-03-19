import { Pressable, Text, View } from "react-native";

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
          <Text className="text-[12px] uppercase tracking-[2px] text-black/35">{title}</Text>
          <Text className="mt-2 text-[18px] font-semibold leading-7 text-[#111111]">{subtitle}</Text>
        </>
      ) : (
        <Text className="text-[22px] font-semibold tracking-[-0.3px] text-[#111111]">{title}</Text>
      )}
    </View>
    {actionLabel ? (
      <Pressable className="rounded-full border border-black/[0.08] bg-black/[0.03] px-3 py-2" onPress={onPressAction}>
        <Text className="text-[12px] font-semibold uppercase tracking-[1.2px] text-[#111111]">{actionLabel}</Text>
      </Pressable>
    ) : null}
  </View>
);
