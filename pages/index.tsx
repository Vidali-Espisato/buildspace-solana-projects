import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import AddressForm from '../components/AddressForm'
import * as web3 from '@solana/web3.js'


const Home: NextPage = () => {
  const [balance, setBalance] = useState(0)
  const [address, setAddress] = useState('')
  const [isExecutable, setIsExecutable] = useState("Nop")

  const addressSubmittedHandler = (address: string) => {

    try {
      setAddress(address)
      const pubKey = new web3.PublicKey(address);
      const connection = new web3.Connection(web3.clusterApiUrl('devnet'))
  
      connection.getBalance(pubKey).then(balance => {
        setBalance(balance / web3.LAMPORTS_PER_SOL)
      })
      connection.getAccountInfo(pubKey).then(info => {
        setIsExecutable(info?.executable ? "Yup" : "Nop")
      })
    } catch (err) {
      setAddress('')
      setBalance(0)
      alert(err)
    }
  }

   const generateKeypair = async () => {
    const ownerKeypair = web3.Keypair.generate()
    const pubKey = ownerKeypair.publicKey
    const secretKey = ownerKeypair.secretKey

    // console.log("keypair", ownerKeypair)
    // console.log("pubKey", pubKey)
    // console.log("secretKey", secretKey)

  }

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        {/* <p>
          Start Your Solana Journey
        </p>
        <AddressForm handler={addressSubmittedHandler} />
        <p>{`Address: ${address}`}</p>
        <p>{`Balance: ${balance} SOL`}</p>
        <p>{`Is it executable? ${ isExecutable }`}</p> */}

        <button onClick={ generateKeypair }>Generate keypair</button>

      </header>
    </div>
  )
}

export default Home
