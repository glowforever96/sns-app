import AvatarItem from "@/components/AvatarItem";
import FixedBottomCTA from "@/components/FixedBottomCTA";
import Tab from "@/components/Tab";
import { colors } from "@/constants";
import useAuth from "@/hooks/queries/useAuth";
import useGetAvatarItems from "@/hooks/queries/useGetAvatarItems";
import { Profile } from "@/types";
import { useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";
import Toast from "react-native-toast-message";

export default function AvatarScreen() {
  const navigation = useNavigation();
  const { hats, faces, tops, bottoms, hands, skins } = useGetAvatarItems();
  const [activeTab, setActiveTab] = useState(0);
  const pagerRef = useRef<PagerView>(null);
  const { auth, profileMutation } = useAuth();

  const [avatarItem, setAvatarItem] = useState({
    hatId: auth?.hatId ?? "",
    faceId: auth?.faceId ?? "",
    topId: auth?.topId ?? "",
    bottomId: auth?.bottomId ?? "",
    handId: auth?.handId ?? "",
    skinId: auth?.skinId ?? "",
  });

  const getImageId = (url: string) => {
    const filename = url.split("/").pop() ?? "";
    const [id] = filename.split(".");
    return id;
  };

  const handlePressItem = (name: string, item: string) => {
    setAvatarItem((prev) => ({ ...prev, [name]: getImageId(item) }));
  };

  const handlePressTab = (idx: number) => {
    pagerRef.current?.setPage(idx);
    setActiveTab(idx);
  };

  const handleSaveAvatar = () => {
    profileMutation.mutate(avatarItem as Partial<Profile>, {
      onSuccess: () =>
        Toast.show({
          type: "success",
          text1: "저장되었습니다.",
        }),
    });
  };

  console.log(avatarItem);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: colors.ORANGE_200,
      },
    });
  }, [navigation]);

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
              <AvatarItem
                uri={item}
                isSelected={getImageId(item) === avatarItem.hatId}
                onPress={() => handlePressItem("hatId", item)}
              />
            )}
          />
          <FlatList
            data={faces}
            keyExtractor={(_, idx) => String(idx)}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <AvatarItem
                uri={item}
                isSelected={getImageId(item) === avatarItem.faceId}
                onPress={() => handlePressItem("faceId", item)}
              />
            )}
          />
          <FlatList
            data={tops}
            keyExtractor={(_, idx) => String(idx)}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <AvatarItem
                uri={item}
                isSelected={getImageId(item) === avatarItem.topId}
                onPress={() => handlePressItem("topId", item)}
              />
            )}
          />
          <FlatList
            data={bottoms}
            keyExtractor={(_, idx) => String(idx)}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <AvatarItem
                uri={item}
                isSelected={getImageId(item) === avatarItem.bottomId}
                onPress={() => handlePressItem("bottomId", item)}
              />
            )}
          />
          <FlatList
            data={hands}
            keyExtractor={(_, idx) => String(idx)}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <AvatarItem
                uri={item}
                isSelected={getImageId(item) === avatarItem.handId}
                onPress={() => handlePressItem("handId", item)}
              />
            )}
          />
          <FlatList
            data={skins}
            keyExtractor={(_, idx) => String(idx)}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <AvatarItem
                uri={item}
                isSelected={getImageId(item) === avatarItem.skinId}
                onPress={() => handlePressItem("skinId", item)}
              />
            )}
          />
        </PagerView>
      </View>
      <FixedBottomCTA label="저장" onPress={handleSaveAvatar} />
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
