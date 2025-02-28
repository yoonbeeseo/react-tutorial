import { candyStore } from "./candyStore"
import { useEffect } from "react"

const Shop = () => {
  const { candies, addCandy } = candyStore()

  useEffect(() => {
    console.log(candies)
  }, [candies])

  return (
    <div>
      <h1>Shop</h1>
      <button onClick={() => addCandy("새로운 캔디")}>새로운 캔디 추가</button>
    </div>
  )
}

export default Shop
