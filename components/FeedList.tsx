import { colors } from "@/constants";
import { FlatList, StyleSheet } from "react-native";
import FeedItem from "./FeedItem";

const data = [
  {
    id: 1,
    userId: 1,
    title: "dummy title",
    description:
      "dfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffd",
    createdAt: "",
    author: {
      id: 1,
      nickname: "닉네임",
      imageUri: "",
    },
    imageUris: [],
    likes: [],
    hasVote: false,
    voteCount: 1,
    commentCount: 1,
    viewCount: 1,
  },
  {
    id: 2,
    userId: 1,
    title: "dummy title",
    description:
      "dfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffd",
    createdAt: "",
    author: {
      id: 1,
      nickname: "닉네임",
      imageUri: "",
    },
    imageUris: [],
    likes: [],
    hasVote: false,
    voteCount: 1,
    commentCount: 1,
    viewCount: 1,
  },
  {
    id: 3,
    userId: 1,
    title: "dummy title",
    description:
      "ffdfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffddfdfdfdfdffd",
    createdAt: "",
    author: {
      id: 1,
      nickname: "닉네임",
      imageUri: "",
    },
    imageUris: [],
    likes: [],
    hasVote: false,
    voteCount: 1,
    commentCount: 1,
    viewCount: 1,
  },
];

function FeedList() {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <FeedItem post={item} />}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.contentContainer}
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
