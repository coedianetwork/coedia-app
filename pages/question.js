import Editor from '../components/Editor'
import { useContext, useRef, useState, useEffect } from 'react'
import { AppContext } from '../context'
import Image from 'next/image'
import logo from '../public/logos/logo_coedia_light.png'

import {
  createClient,
  STORAGE_KEY,
  authenticate as authenticateMutation,
  getChallenge,
  getDefaultProfile
} from '../api'

import { parseJwt, refreshAuthToken } from '../utils'
import { ethers } from 'ethers'
import { getSigner, baseMetadata } from '../utils'
import { LENS_HUB_CONTRACT_ADDRESS } from '../api'
import LENSHUB from '../abi/lenshub'
import { create } from 'ipfs-http-client'
import { v4 as uuid } from 'uuid'
const projectId = ''
const projectSecret = ''
const authorization = 'Basic ' + window.btoa(projectId + ':' + projectSecret)

const client = create({
  url: 'https://ipfs.infura.io:5001/api/v0',
  headers: {
    authorization
  }
})

const freeCollectModule = '0x23b9467334bEb345aAa6fd1545538F3d54436e96'

export default function Question() {
  // const { profile } = useContext(AppContext);
  const inputRef = useRef(null)
  const [userProfile, setUserProfile] = useState()
  const [address, setAddress] = useState()
  const [isConnected, setIsConnected] = useState(false)
  const [title, setTitle] = useState()
  const [details, setDetails] = useState()

  useEffect(() => {
    refreshAuthToken()
    async function checkConnection() {
      console.log('aca1')
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const addresses = await provider.listAccounts()
      if (addresses.length) {
        console.log('addresses.length ', addresses.length)

        setIsConnected(true)
        setAddress(addresses[0])
        getUserProfile(addresses[0])
      } else {
        setIsConnected(false)
      }
    }
    checkConnection()
    // listenForRouteChangeEvents()
  }, [])

  async function getUserProfile(address) {
    try {
      console.log('aca3 address, ', address)

      const urqlClient = await createClient()
      console.log('aca5 ', urqlClient)

      const response = await urqlClient
        .query(getDefaultProfile, {
          address
        })
        .toPromise()

      setUserProfile(response.data.defaultProfile)
      console.log('pro id:', response.data.defaultProfile)
    } catch (err) {
      console.log('Error: ', err)
    }
  }

  async function connect() {
    try {
      const accounts = await window.ethereum.send('eth_requestAccounts')
      setIsConnected(true)
      const account = accounts.result[0]
      setAddress(account)
      const urqlClient = await createClient()
      const response = await urqlClient
        .query(getChallenge, {
          address: account
        })
        .toPromise()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const signature = await signer.signMessage(response.data.challenge.text)
      const authData = await urqlClient
        .mutation(authenticateMutation, {
          address: account,
          signature
        })
        .toPromise()
      const { accessToken, refreshToken } = authData.data.authenticate
      const accessTokenData = parseJwt(accessToken)
      getUserProfile(account)
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          accessToken,
          refreshToken,
          exp: accessTokenData.exp
        })
      )
    } catch (err) {
      console.log('error: ', err)
    }
  }

  async function uploadToIPFS() {
    const metaData = {
      content: title,
      description: details,
      name: `Question by @${userProfile.handle}`,
      external_url: `https://lenster.xyz/u/${userProfile.handle}`,
      metadata_id: uuid(),
      createdOn: new Date().toISOString(),
      ...baseMetadata
    }
    const added = await client.add(JSON.stringify(metaData))
    const uri = `https://ipfs.infura.io/ipfs/${added.path}`
    return uri
  }

  const handleChange = event => {
    const value = event.target.value
    setTitle(value)
  }

  const handleDetailsChange = event => {
    const value = event.target.value
    setDetails(value)
  }

  async function savePost() {
    const contentURI = await uploadToIPFS()
    const contract = new ethers.Contract(
      LENS_HUB_CONTRACT_ADDRESS,
      LENSHUB,
      getSigner()
    )

    try {
      console.log('profile.id ', userProfile.id)
      const postData = {
        profileId: userProfile.id,
        contentURI,
        collectModule: freeCollectModule,
        collectModuleInitData: ethers.utils.defaultAbiCoder.encode(
          ['bool'],
          [true]
        ),
        referenceModule: '0x0000000000000000000000000000000000000000',
        referenceModuleInitData: []
      }
      const tx = await contract.post(postData)
      await tx.wait()
      setIsModalOpen(false)
    } catch (err) {
      console.log('error: ', err)
    }
  }

  return (
    // <AppContext.Provider
    //   value={{
    //     address,
    //     profile: userProfile
    //   }}
    // >
    <section className="place-self-center bg-white p-2 dark:bg-gray-900 md:p-10 lg:p-20">
      <header style={{ marginBottom: '4rem' }}>
        <nav className="  dark:bg-gray-800">
          <div className="mx-auto flex max-w-screen-xl items-center justify-between">
            <div style={{ width: '15%', height: '15%' }}>
              <Image
                src={logo}
                alt=""
                title=""
                width="100%"
                height="30%"
                layout="responsive"
                objectFit="contain"
              />
            </div>
            <div className="flex space-x-4">
              <a href="#" className="mt-2">
                Home
              </a>
              {!isConnected ? (
                <button
                  type="button"
                  className="mr-2 rounded-lg
               bg-yellow-400 px-5 py-2.5 text-sm 
               font-medium text-white hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300  
               dark:focus:ring-yellow-900"
                  onClick={connect}
                >
                  Log in
                </button>
              ) : (
                <button
                  type="button"
                  className="mr-2 rounded-lg
               bg-yellow-400 px-5 py-2.5 text-sm 
               font-medium text-white hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300  
               dark:focus:ring-yellow-900"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </nav>
      </header>

      <p className="mb-6 text-2xl">Post a question</p>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter a title..."
          id="default-input"
          onChange={handleChange}
          className="block w-full rounded-lg
     border border-gray-100 bg-gray-100 p-2.5 text-sm
      text-gray-900 focus:border-yellow-400 focus:ring-yellow-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        />
      </div>
      <Editor onChange={handleDetailsChange} />
      <button
        type="button"
        className="mr-2 mt-4 mb-2 rounded-lg 
        bg-yellow-300 px-5 py-2.5 text-sm font-medium text-black hover:bg-yellow-200 focus:outline-none
        focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900"
        onClick={savePost}
      >
        Post!
      </button>
      {/* <Footer/> */}
    </section>
    // </AppContext.Provider>
  )
}
