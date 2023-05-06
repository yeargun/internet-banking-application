import HeaderLeft from "components/HeaderLeft/HeaderLeft";
import Feed from "components/Feed/Feed";
import Recommended from "components/Recommended/Recommended";

function FollowingFeedPage() {
  return (
    <>
      <HeaderLeft />
      <Feed />
      <Recommended />
    </>
  );
}

export default FollowingFeedPage;
