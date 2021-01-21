import { Button, Form, Input, message, PageHeader } from 'antd'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { API } from '../../config'
import { isAuth } from '../../helpers/auth'
import { Jwt } from '../../store/models/auth'
import Layout from '../core/Layout'

interface CategoryForm {
  name: string
}

// 如果在这个组件中需要用到代码跳转, props 的约束 extends RouteComponentProps
// 这样的话就可以使用 props.history.push('/xxx/yyyy')跳转了
// 如果还需要约束其他的属性, 继续往里添加即可, 比如: isLeslie
interface RouteProps extends RouteComponentProps<any> {
  isLeslie: boolean
}

const AddCategory = (props: RouteProps) => {
  //   console.info(props.isLeslie)

  // 定义页面状态数据
  const [name, setName] = useState<string>('')
  // 获取本地数据
  const { user, token } = isAuth() as Jwt

  // 执行添加
  useEffect(() => {
    async function addCategory() {
      try {
        // axios.post<{ name: string }>: 指定axios请求的返回值内 data对象 的 数据结构
        const response = await axios.post<{ name: string }>(
          `${API}/category/create/${user._id}`,
          { name: name },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        message.success(`[${response.data.name}]分类添加成功!`)
      } catch (error) {
        message.error(`${error.response.data.error}`)
      }
    }
    // 调用时机: useEffect会在页面进入的时候调用一次.
    if (name) {
      addCategory()
    }
  }, [name])

  const onFinish = (value: CategoryForm) => {
    setName(value.name)
  }

  const onBack = () => {
    props.history.push('/admin/dashboard')
  }
  return (
    <Layout title="添加分类" subTitle="可怜九月初三夜🌙">
      <PageHeader
        className="site-page-header"
        onBack={() => onBack()}
        subTitle="分类添加"
      >
        <Form onFinish={onFinish} style={{ padding: 10 }}>
          <Form.Item name="name" label="分类名称">
            <Input maxLength={20} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              添加分类
            </Button>
          </Form.Item>
        </Form>
      </PageHeader>
    </Layout>
  )
}

export default AddCategory
