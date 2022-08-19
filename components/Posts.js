import { format } from "timeago.js";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import {AiOutlineHeart} from 'react-icons/ai';
import { FiShare } from "react-icons/fi";
const style={
    wrapper:`flex p-3 border-b border-[#38444d]`,
    profileImage:`rounded-full h-[40px] w-[40px] object-cover`,
    postMain:`flex-1 px-4`,
    headerDomain:`flex items-center`,
    name:`font-bold  mr-1`,
    verified:`text-[0.8rem]`,
    handleAndTimeAgo:`text-[#8899a6] m1-1`,
    tweet:`my-2`,
    image:`rounded-3x1`,
    footer:`flex justify-between mr-28 mt-4 text-[#8899a6]`,
    footIcon:`rounded-full text-lg p-2`,
}

const Posts = ({
    displayName,
    userName,
    avatar,
    text,
    isProfileNFT,
    timestamp,

}) => {
  return (
    <div className={style.wrapper}>
        <div>
            <img src={avatar} 
            alt={userName} 
            className={isProfileNFT ? `${style.profileImage} smallHex` : style.profileImage}/>
        </div>
        <div className={style.postMain}>
            <div>
                <span className={style.headerDomain}>
                    <span className={style.name}>{displayName}</span>
                    {isProfileNFT && (
                        <span className={style.verified}>
                            <BsFillPatchCheckFill/>
                        </span>
                    )}
                <span className={style.handleAndTimeAgo}>@{userName} . {format(new Date(timestamp))}
                </span>
                </span>
                <div className={style.tweet}>{text}</div>
            </div>
            <div className={style.footer}>
                    <div className={`${style.footIcon} hover:bg-[#1e364a] hover:text-[#1d9bf0] `}>
                        <FaRegComment/>
                    </div>
                    <div className={`${style.footIcon} hover:bg-[#1b393b] hover:text-[#03ba7c]`}>
                        <FaRetweet/>
                    </div>
                    <div className ={`${style.footIcon} hover:text-[#f91c80] hover:bg-[#39243c]`}>
                        <AiOutlineHeart/>
                    </div>
                    <div className ={`${style.footIcon} hover:bg-[#1e364a] hover:text-[#1d9bf0]`}>
                        <FiShare/>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Posts