import { Button, Image, Input } from 'antd'
import React, { ChangeEvent, FC, useState } from 'react'
import { API } from '../../config'
import { CartItem, deleteItem, updateItem } from '../../helpers/cart'

interface Props {
  product: CartItem
  setCart: (arg: CartItem[]) => void
}

// FC: Function Component
const CartItemFC: FC<Props> = ({ product, setCart }) => {
  const [count, setCount] = useState<number>(product.count)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // 获取值
    let count = parseInt(event.target.value)
    // 更新当前数据的数量,并且返回更新后的数据
    const cart = updateItem(product._id, count)
    // 同步给父组件
    setCart(cart)
    setCount(count)
  }

  const handleDelete = () => {
    // 执行删除并返回
    const cart = deleteItem(product._id)
    // 同步给父组件
    setCart(cart)
  }

  return (
    <tr className="ant-table-row">
      <td className="ant-table-cell">
        <Image
          preview={true}
          width={80}
          src={`${API}/product/photo/${product._id}`}
        />
      </td>
      <td className="ant-table-cell">{product.name}</td>
      <td className="ant-table-cell">￥{product.price}</td>
      <td className="ant-table-cell">{product.category.name}</td>
      <td className="ant-table-cell">
        <Input
          type="number"
          min={1}
          max={999}
          value={count}
          onChange={handleChange}
        />
      </td>
      <td className="ant-table-cell">
        <Button type="primary" danger onClick={handleDelete}>
          删除
        </Button>
      </td>
    </tr>
  )
}

export default CartItemFC
