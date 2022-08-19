import SideBar from "../components/SideBar"
import Feed from "../components/Home/Feed"
import Widgets from "../components/Widgets"
import { useContext } from "react";
import { TwitterContext } from "../context/TwitterContext";
import Image from "next/image";
import metamask from '../assets/metamask.png';

const style = {
  wrapper: `flex justify-center h-screen w-screen select-none bg-[#15202b] text-white`,
  content: `max-w-[1400px] w-2/3 flex justify-between`,
  loginContainer: `w-full h-full flex flex-col justify-center items-center pb-48`,
  walletConnectButton: `text-2xl text-black bg-white font-bold mb-[-3rem] mt-[3rem] px-6 py-4 rounded-full cursor-pointer hover:bg-[#d7dbdc]`,
  loginContent: `text-3xl font-bold text-center mt-24`,
}

const  Home = () => {
  const {appStatus,connectToWallet}=useContext(TwitterContext);
  const app = (status = appStatus)=>{
    switch(status){
      case 'connected':
        return userLoggedIn;
      case 'not-connected':
        return noUserFound
      case 'noMetaMask':
        return noMetamaskFound;
      case 'error':
        return error;
      default:  
        return loading;
    }
  }
  const userLoggedIn=(
    <div className={style.content}>
      <SideBar/>
      <Feed/>
      <Widgets/>
      </div>
  )
  const noUserFound = (
    <div>
      <Image src={metamask} width={200} height={200}/>
      <div className={style.walletConnectButton} onClick={()=>connectToWallet()}>Connect Wallet</div>
      <div className={style.loginContent}>Connect to Wallet</div>
    </div>
  )
  const noMetamaskFound=(
    <div>
      <Image src={metamask.png} height={200} width={200}/>
      <div>
        <a>
          target="_blank"
          rel="noreferrer"
          href={'https://metamask.io/download.html'}
        </a>
        You must install Metamask.
      </div>

    </div>
  )
  const error=(
    <div className={style.loginContainer}>
      error
    </div>
  )
  const loading=(
    <div className={style.loginContainer}>
      <div className={style.loginContent}>loading...</div>
    </div>
  )
  return (
    <div className={style.wrapper}>
      {app(appStatus)}
    </div>

  )
}

export default Home
