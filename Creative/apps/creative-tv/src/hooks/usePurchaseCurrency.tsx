import { useContract } from '@thirdweb-dev/react'
import { useCallback, useEffect, useState } from 'react'

type PurchaseCurrencyProps = {
  erc20Address: string
  walletAddress: string
}
export const usePurchaseCurrency = ({ erc20Address, walletAddress }: PurchaseCurrencyProps) => {
  const { data: erc20Contract } = useContract(erc20Address)
  const [balance, setBalance] = useState(0)
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    getBalance(walletAddress)
  }, [balance])

  const getBalance = useCallback(async (walletAddress: string) => {
    try {
      setIsFetching(true)
      const balanceBigNumber = await erc20Contract?.call('balanceOf', [walletAddress])
      const decimals = await erc20Contract?.call('decimals', [])
      const bal = balanceBigNumber / 10 ** decimals

      setBalance(bal)
    } catch (err: any) {
      setIsFetching(false)
      setError(err.message)
    }
  }, [])

  return { balance, error, isFetching }
}
