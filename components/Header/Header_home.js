import Image from 'next/image'
import logo from '../../public/img/logo.svg'
import Link from 'next/link'
import { useState } from 'react'

const Header = () => {
  const [account, setAccount] = useState()
  const [isConnected, setIsConnected] = useState(false)

  async function connect() {
    window.ethereum.request({ method: 'eth_requestAccounts' }).then(req => {
      setAccount(req[0])
      setIsConnected(true)
    })
  }

  async function disconnect() {}

  return (
    <header style={{ marginBottom: '4rem' }}>
      {/* <nav class="  dark:bg-gray-800">
        <div class="mx-auto flex max-w-screen-xl items-center justify-between">
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
          <div class="flex space-x-4">
             <a href="#" class="mt-2">
              Home
            </a> 
            {!isConnected ? (
              <button
                type="button"
                class="mr-2 rounded-lg
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
                class="mr-2 rounded-lg
               bg-yellow-400 px-5 py-2.5 text-sm 
               font-medium text-white hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300  
               dark:focus:ring-yellow-900"
                onClick={disconnect}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav> */}
      <div class="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900  w-full z-20 top-0 left-0 ">
  <div class="container flex flex-wrap justify-between items-center mx-auto">
  <a href="#" class="flex items-center">
      {/* <img src="../img/logo.svg" class="mr-3 h-6 sm:h-9" alt="Logo"></img> */}
  </a>
 {/*  <div class="flex md:order-2">
      <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get started</button>
      <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
    </button>
  </div> */}
  {/* <div class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <ul class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <li>
        <a href="#" class="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Home</a>
      </li>
      <li>
        <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
      </li>
      <li>
        <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
      </li>
      <li>
        <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
      </li>
    </ul>
  </div> */}
  <div class="flex md:order-2">
     {/*  <button type="button" class="button-navbar text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Connect</button>
 */}
 
 {!isConnected ? (
             <button type="button" onClick={connect} class="button-navbar text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Connect</button>
 
            ) : (
              <button type="button" onClick={disconnect} class="button-navbar text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Disconnect</button>
 
            )}

 
  </div>
  </div>
  
</div>
    </header>
  )
}

export default Header