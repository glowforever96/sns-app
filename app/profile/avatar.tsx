import AvatarItem from "@/components/AvatarItem";
import FixedBottomCTA from "@/components/FixedBottomCTA";
import Tab from "@/components/Tab";
import useGetAvatarItems from "@/hooks/queries/useGetAvatarItems";
import { useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";

export default function AvatarScreen() {
  const { hats, faces, tops, bottoms, hands, skins } = useGetAvatarItems();
  const [activeTab, setActiveTab] = useState(0);
  const pagerRef = useRef<PagerView>(null);

  const handlePressTab = (idx: number) => {
    pagerRef.current?.setPage(idx);
    setActiveTab(idx);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.tabContainer}>
          {["모자", "얼굴", "상의", "하의", "손", "피부"].map((tab, idx) => (
            <Tab
              key={idx}
              isActive={activeTab === idx}
              onPress={() => handlePressTab(idx)}
            >
              {tab}
            </Tab>
          ))}
        </View>
        <PagerView
          ref={pagerRef}
          style={styles.pagerView}
          initialPage={0}
          onPageSelected={(e) => setActiveTab(e.nativeEvent.position)}
        >
          <FlatList
            data={hats}
            keyExtractor={(_, idx) => String(idx)}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <AvatarItem uri={item} isSelected={false} />
            )}
          />
          <FlatList
            data={faces}
            keyExtractor={(_, idx) => String(idx)}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <AvatarItem uri={item} isSelected={false} />
            )}
          />
          <FlatList
            data={tops}
            keyExtractor={(_, idx) => String(idx)}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <AvatarItem uri={item} isSelected={false} />
            )}
          />
          <FlatList
            data={bottoms}
            keyExtractor={(_, idx) => String(idx)}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <AvatarItem uri={item} isSelected={false} />
            )}
          />
          <FlatList
            data={hands}
            keyExtractor={(_, idx) => String(idx)}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <AvatarItem uri={item} isSelected={false} />
            )}
          />
          <FlatList
            data={skins}
            keyExtractor={(_, idx) => String(idx)}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <AvatarItem uri={item} isSelected={false} />
            )}
          />
        </PagerView>
      </View>
      <FixedBottomCTA label="저장" onPress={() => {}} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
  },
  listContainer: {
    paddingBottom: 120,
    marginTop: 10,
    alignItems: "center",
  },
  pagerView: {
    flex: 1,
  },
});
