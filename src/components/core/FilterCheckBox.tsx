import React from 'react'
import { Typography, List, Checkbox } from 'antd'

const { Title } = Typography

const categories = [{ name: 'Node' }, { name: 'React' }]

const FilterCheckBox = () => {
  return (
    <>
      <Title level={4}>按照分类筛选</Title>
      <List
        dataSource={categories}
        renderItem={(item) => (
          <List.Item>
            <Checkbox>{item.name}</Checkbox>
          </List.Item>
        )}
      />
    </>
  )
}

export default FilterCheckBox
