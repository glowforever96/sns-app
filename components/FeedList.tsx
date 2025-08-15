import { colors } from "@/constants";
import useGetInfinitePosts from "@/hooks/queries/useGetInfinitePosts";
import { useScrollToTop } from "@react-navigation/native";
import { useRef, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import FeedItem from "./FeedItem";

function FeedList() {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfinitePosts();

  // 새로고침 기능
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 탭 눌렀을 때 스크롤 최상단
  const ref = useRef<FlatList | null>(null);
  useScrollToTop(ref);

  // 새로고침
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  // 무한 스크롤 다음 데이터 페칭
  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <FlatList
      ref={ref}
      data={posts?.pages.flat()}
      renderItem={({ item }) => <FeedItem post={item} />}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.contentContainer}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 12,
    backgroundColor: colors.GRAY_200,
    gap: 12,
  },
});

export default FeedList;
