import React from 'react'
import { Descriptions } from 'antd'
import { isAuth } from '../../helpers/auth'
import { Jwt } from '../../store/models/auth'

const UserInfo = () => {
  const { user } = isAuth() as Jwt
  return (
    <Descriptions title="基本信息" bordered>
      <Descriptions.Item label="昵称">{user.name}</Descriptions.Item>
      <Descriptions.Item label="邮件">{user.email}</Descriptions.Item>
      <Descriptions.Item label="角色">
        {user.role === 1 ? '管理员' : '普通用户'}
      </Descriptions.Item>
    </Descriptions>
  )
}

export default UserInfo
