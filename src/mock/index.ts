import Mock from 'mockjs'

// Mock.mock('/api/users', 'get', {
//   'data|10': [
//     {
//       'id|+1': 1,
//       'name': '@cname',
//       'age|18-40': 1,
//       'email': '@email'
//     }
//   ]
// });

// 使用 Mock.mock() 定义接口的返回格式和数据
const data = Mock.mock({
  'data|10': [
    {
      'id|+1': 1,
      name: '@cname',
      'age|18-40': 1,
      email: '@email',
      imageUrl: '@image("350x100","#00ffff","@date")'
    }
  ]
})

interface UserData {
  id: number
  name: string
  age: number
  email: string
  imageUrl: string
}

const users: UserData[] = data.data // 注意使用 data.data 获取生成的数据

export default users
