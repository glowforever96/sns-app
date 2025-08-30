import { colors } from "@/constants";
import useAuth from "@/hooks/queries/useAuth";
import useCreateVote from "@/hooks/queries/useCreateVote";
import { PostVote } from "@/types";
import { Feather } from "@expo/vector-icons";
import { Fragment, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "./CustomButton";
import VoteOption from "./VoteOption";

interface VoteProps {
  postId: number;
  postVotes: PostVote[];
  voteCount: number;
}

export default function Vote({ postId, postVotes, voteCount }: VoteProps) {
  const { auth } = useAuth();
  const [selectedVoteId, setSelectedVoteId] = useState<number>();
  const createVote = useCreateVote();

  const handleVote = () => {
    console.log(selectedVoteId);
    createVote.mutate({ postId: postId, voteOptionId: Number(selectedVoteId) });
  };

  return (
    <View style={styles.container}>
      <View style={styles.label}>
        <Text style={styles.labelTitle}>투표</Text>
        <View style={styles.labelCount}>
          <Feather name="user" size={14} color={colors.BLACK} />
          <Text style={styles.labelCountText}>{voteCount}명 참여</Text>
        </View>
      </View>
      {postVotes.map((vote) => {
        const voteUserIds = vote.options.flatMap((option) =>
          option.userVotes.map((userVote) => userVote.userId)
        );
        const isVoted = voteUserIds.includes(Number(auth.id));
        return (
          <Fragment key={vote.id}>
            {vote.options.map((option) => {
              return (
                <VoteOption
                  key={option.id}
                  isVoted={isVoted}
                  isSelected={selectedVoteId === option.id}
                  onSelectOption={() => setSelectedVoteId(Number(option.id))}
                  option={option}
                  totalCount={voteCount}
                />
              );
            })}
            {!isVoted && (
              <CustomButton
                label="투표하기"
                disabled={!selectedVoteId}
                onPress={handleVote}
              />
            )}
          </Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.GRAY_300,
    borderRadius: 8,
    padding: 16,
    gap: 15,
  },
  label: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  labelTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.ORANGE_600,
  },
  labelCount: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  labelCountText: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
