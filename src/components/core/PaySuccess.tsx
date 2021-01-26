import { Button, Result } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import Layout from './Layout'
import { useLocation } from 'react-router-dom'
import { convertSearchToObject } from '../../utils/convert'

const PaySuccess = () => {
  const location = useLocation()
  const searchObject = convertSearchToObject(location.search)

  return (
    <Layout title="支付完成" subTitle="姑苏城外寒山寺🥝">
      <Result
        status="success"
        title="支付完成"
        subTitle={`Order number:${searchObject.trade_no}`}
        extra={[
          <Button key="continue" type="primary">
            <Link to="/">继续购物</Link>
          </Button>,
        ]}
      />
    </Layout>
  )
}

export default PaySuccess
