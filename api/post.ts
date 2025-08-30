import { CreatePostDto, CreateVoteDto, Post, VoteOption } from "@/types";
import axiosInstance from "./axios";

async function createPost(body: CreatePostDto) {
  const { data } = await axiosInstance.post("/posts", body);
  return { data };
}

async function getPosts(page = 1): Promise<Post[]> {
  const { data } = await axiosInstance.get(`/posts?page=${page}`);
  return data;
}

async function deletePost(id: number): Promise<number> {
  const { data } = await axiosInstance.delete(`/posts/${id}`);
  return data;
}

async function getPost(id: number): Promise<Post> {
  const { data } = await axiosInstance.get(`/posts/${id}`);
  return data;
}

type RequestUpdatePost = {
  id: number;
  body: CreatePostDto;
};

async function updatePost({ id, body }: RequestUpdatePost): Promise<number> {
  const { data } = await axiosInstance.patch(`/posts/${id}`, body);
  return data;
}

async function createVote({
  postId,
  voteOptionId,
}: CreateVoteDto): Promise<{ postId: number; voteOption: VoteOption }> {
  console.log("createVote API 호출:", { postId, voteOptionId });

  try {
    const { data } = await axiosInstance.post(
      `/posts/${postId}/vote/${voteOptionId}`
    );
    console.log("createVote API 응답 성공:", data);
    return data;
  } catch (error) {
    console.error("createVote API 에러:", error);
    throw error;
  }
}

async function likePost(id: number): Promise<number> {
  const { data } = await axiosInstance.post(`/likes/${id}`);
  return data;
}

export {
  createPost,
  createVote,
  deletePost,
  getPost,
  getPosts,
  likePost,
  updatePost,
};
