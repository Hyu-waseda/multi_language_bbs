export interface CommentData {
  commentID: number;
  threadID: number;
  userID: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  userName: string;
  image_path: string | null; // Updated to be optional and nullable
}
