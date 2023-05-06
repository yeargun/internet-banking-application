import styles from "../../styles/Post.module.css";

interface Post {
  text: string;
  likes: number;
  reposts: number;
  username: string;
  highlightedComment: string;
}

function Post({ text, likes, reposts, highlightedComment, username }: Post) {
  if (!highlightedComment) highlightedComment = "xd";
  return (
    <div className="postWrapper">
      <div className="postSettings"></div>
      <div className="content">{text}</div>
      <div className="ReactionsWrapper">
        <div className="username">{username}</div>

        <div className="likeCount">{likes}</div>
        <div className="repostCount">{reposts}</div>
        <div className="commentCount">1</div>
        <div className="highlightedComment">{highlightedComment}</div>

        <input type="text" id="comment" name="comment" />
      </div>
    </div>
  );
}

export default Post;
