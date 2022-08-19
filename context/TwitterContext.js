import { createContext,useEffect, useState } from "react";
import { useRouter } from "next/router";
import { client } from "../libs/clients";

export const TwitterContext =createContext();
export const TwitterProvider = ({children})=>{
    const [appStatus , setAppStatus] =useState('loading');
    const [currentAccount,setCurrentAccount]=useState('');
    const [tweets,setTweets]=useState([]);
    const[currentUser,setCurrentUser]=useState({});
    const router=useRouter();

    useEffect(()=>{
        checkIfWalletIsConnected()
    },[])

    useEffect(()=>{
        if(!currentAccount&&appStatus=='connected')return
        getCurrentUserDetails(currentAccount)
        fetchTweets()
    },[currentAccount,appStatus])
    const checkIfWalletIsConnected = async()=>{
        if(!window.ethereum)return setAppStatus('noMetaMask')
        try{
            const addressArray=await window.ethereum.request({
                method:'eth_accounts',
            })
            if(addressArray.length > 0){
                //connected
                setAppStatus('connected');
                setCurrentAccount(addressArray[0]);
                createUserAccount(addressArray[0]);
            }else{
                //not connected
                router.push('/');
                setAppStatus('not-connected');
            }
        }catch(err){
            setAppStatus('error');
            console.log(err);

        }
    }
    const connectToWallet= async()=>{
        if(!window.ethereum)return setAppStatus('noMetaMask')
            try{
                setAppStatus('loading');
                const addressArray= await window.ethereum.request({
                    method:'eth_requestAccounts',
                })
                if(addressArray.length>0){
                    setAppStatus('connected');
                    setCurrentAccount(addressArray[0]);
                    createUserAccount(addressArray[0]);
                }else{
                    router.push('/');
                    setAppStatus('not-connected');
                }
            }catch(err){
                setAppStatus('error');
            }
        
    }
    const createUserAccount=async(userWalletAddress=currentAccount)=>{
        if(!window.ethereum) return setAppStatus('noMetaMask')
        try{
            const userDoc={
                _type:'users',
                _id:userWalletAddress,
                name:'Unnamed',
                isProfileImageNft:false,
                profileImage:'https://yt3.ggpht.com/ytc/AKedOLRY9Un_v7Xr9dG1F5NEkqGsGSqwqRz0O3w3r1mI=s900-c-k-c0x00ffffff-no-rj',
                walletAddress:userWalletAddress,
            }
            await client.createIfNotExists(userDoc);
            setAppStatus('connected');
        }catch(err){
            router.push('/');
            setAppStatus('error');
            console.log(err);
        }
    }
    const fetchTweets=async()=>{
         const query = `
      *[_type == "tweets"]{
        "author": author->{name, walletAddress, profileImage, isProfileImageNft},
        tweet,
        timestamp
      }|order(timestamp desc)`
      const sanityResponse=await client.fetch(query);
      setTweets([])
      sanityResponse.forEach(async (items)=>{
        //profileImage
        const newItem={
            tweet:items.tweet,
            timestamp:items.timestamp,
            author:{
                name:items.author.name,
                walletAddress:items.author.walletAddress,
                isProfileImageNft:items.author.isProfileImageNft,
                profileImage:items.author.profileImage,

            },
        }
        setTweets (prevState=>[...prevState,newItem])

      })
       

    }
    const getCurrentUserDetails=async(userAccount=currentAccount)=> {
        if(appStatus!=='connected')return 
          const query = `
      *[_type == "users" && _id == "${userAccount}"]{
        "tweets": tweets[]->{timestamp, tweet}|order(timestamp desc),
        name,
        profileImage,
        isProfileImageNft,
        coverImage,
        walletAddress
      }`

        const response = await client.fetch(query);
        setCurrentUser({
      tweets: response[0].tweets,
      name: response[0].name,
      profileImage: response[0].profileImageUri,
      walletAddress: response[0].walletAddress,
      coverImage: response[0].coverImage,
      isProfileImageNft: response[0].isProfileImageNft,
    })
    }

    return(
        <TwitterContext.Provider value={{appStatus, currentAccount,connectToWallet,fetchTweets,tweets,currentUser,getCurrentUserDetails}}>
        {children}
        </TwitterContext.Provider>
    )
}