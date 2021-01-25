import React, { FC, useEffect } from 'react'
import { Typography, Checkbox } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory } from '../../store/actions/category.action'
import { AppState } from '../../store/reducers'
import { CategoryState } from '../../store/reducers/category.reducer'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'

const { Title } = Typography

interface Props {
  handleFilter: (arg: string[]) => void
}

const FilterCheckBox: FC<Props> = ({ handleFilter }) => {
  const dispatch = useDispatch()
  const categrory = useSelector<AppState, CategoryState>(
    (state) => state.category
  )
  // 加载分类
  useEffect(() => {
    dispatch(getCategory())
  }, [])

  // 当子组件向父组件传递值的时候
  // 0: 在父组件调用子组件时, 把这个方法作为属性, 参数, 参数类型 / 返回值 返回值类型要声明,便于在子组件约束
  // 1: 声明子组件为 FC 组件 并设置 参数类型 <Props>
  // 2: 使用interface约束参数类型
  // 3: 解构 Props 的属性, 在组件内使用
  const onChange = (checkedValue: CheckboxValueType[]) => {
    handleFilter(checkedValue as string[])
  }

  return (
    <>
      <Title level={4}>按照分类筛选</Title>
      <Checkbox.Group
        className="classBoxFilter"
        onChange={onChange}
        options={categrory.category.result.map((item) => ({
          label: item.name,
          value: item._id,
        }))}
      />
    </>
  )
}

export default FilterCheckBox
