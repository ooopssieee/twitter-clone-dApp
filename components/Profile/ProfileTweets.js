import Posts from "../Posts"
import { useContext,useEffect } from "react"
import { TwitterContext } from "../../context/TwitterContext"
const style = {
  wrapper: `no-scrollbar`,
  header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
  headerTitle: `text-xl font-bold`,
}

const ProfileTweets = () => {
    const {currentAccount,currentUser}=useContext(TwitterContext);
  
  return (
    <div className={style.wrapper}>
        {currentUser.tweets?.map((tweet,index)=>(
            <Posts
                key={index}
                displayName={currentUser.name === 'Unnamed' ? currentUser.walletAddress : currentUser.name}
                userName={currentUser.walletAddress.slice(0,4)}
                text={tweet.tweet}
                avatar={tweet.profileImage}
                isProfileNFT={tweet.isProfileImageNFT}
                timestamp={tweet.timestamp}
            />
        ))}
    </div>
  )
}

export default ProfileTweets