# **接口文档**

#### 接口状态码说明

| 状态码 |           说明           |
| :----: | :----------------------: |
|  200   | 请求成功并返回对应的数据 |
|  405   | 没有权限，需要携带token  |
|  500   | 服务器问题，请联系管理员 |

------

# **注册登录**

### **一、用户注册接口**

##### 简要描述

- 用户注册接口

##### 请求URL

- `http://127.0.0.1:3007/api/register`

##### 请求方式

- POST

##### 参数

| 参数名   | 必选 | 类型   | 说明   | 备注                                 |
| :------- | :--- | :----- | ------ | ------------------------------------ |
| username | 是   | string | 用户名 | 4-10位用户名                         |
| password | 是   | string | 密码   | 6-12位密码包含大小写和数字和特殊符号 |

##### 返回示例

```json
  {
    "type": "success",
    "status": 200,
    "message": "注册成功,请登录！"
}
```

------

### 二、用户登录接口

##### 简要描述

- 用户登录接口

##### 请求URL

- `http://127.0.0.1:3007/api/login`

##### 请求方式

- POST

##### 参数

| 参数名   | 必选 | 类型   | 说明   | 备注             |
| :------- | :--- | :----- | ------ | ---------------- |
| username | 是   | string | 用户名 | 数据库中存在用户 |
| password | 是   | string | 密码   | 且验证密码正确   |

##### 返回示例

```json
  {
    "status": 200,
    "message": "登录成功",
    "token": "Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "username": "ndmin",
    "type": "success"
}
```

##### 返回参数说明

|  参数名  |  类型  |   说明    |
| :------: | :----: | :-------: |
|  token   | string | 用户token |
| username | string |  用户名   |

------

# **个人信息列表**

### 一、个人信息获取接口

##### 请求URL

- `http://127.0.0.1:3007/api/my/info`

##### 请求方式

- GET

##### 返回示例

```json
{
    "type": "success",
    "status": 200,
    "message": "获取个人信息成功！",
    "data": {
        "id": 100013,
        "username": "ndmin",
        "nickname": "nickname",
        "email": null,
        "user_pic": "http://127.0.0.1:3007/uploads/user.png",
        "ustatus": 1,
        "privilege": "1,2,4,6,8,9,10,11,12,13"
    }
}
```

##### 返回参数说明

|  参数名   |  类型  |                             说明                             |
| :-------: | :----: | :----------------------------------------------------------: |
|    id     |  int   |                            用户id                            |
| username  | string |                            用户名                            |
| nickname  | string |                             昵称                             |
|   email   | string |                             邮箱                             |
| user_pic  | string |                           用户头像                           |
|  ustatus  |  int   | 用户角色, 0: 超级管理员；1:普通用户 ; 2: 学生管理员; 3: 用户管理员 |
| privilege | string |                           用户权限                           |

------

------

### 二、路由权限获取接口

##### 请求URL

- `http://127.0.0.1:3007/api/my/router`

##### 请求方式

- GET


##### 返回示例

```json
{
    "type": "success",
    "status": 200,
    "message": "获取个人权限成功！",
    "data": [
        {
            "id": 1,
            "parentId": 0,
            "level": 0,
            "path": "/students",
            "name": "学生信息",
            "component": "Home",
            "icon": "fa fa-users",
            "link": "/"
        },
        {
            "id": 2,
            "parentId": 1,
            "level": 1,
            "path": "/students/studentslist",
            "name": "学生列表",
            "component": "StudentList",
            "icon": "fa fa-list",
            "link": "students"
        },
        ...
    ]
}
```

##### 返回参数说明

|  参数名   |  类型  |      说明      |
| :-------: | :----: | :------------: |
|    id     |  int   |       id       |
| parentId  |  int   |    父路由ID    |
|   level   |  int   |    几级菜单    |
|   path    | string |    路由路径    |
|   name    | string |    路由名称    |
| component | string |  引用组件名称  |
|   icon    | string |    路由图标    |
|   link    | string | 引用组件文件夹 |

------

### 三、个人信息更新接口

##### 请求URL

- `http://127.0.0.1:3007/api/my/info`

##### 请求方式

- POST

  ##### 参数

|  参数名  | 必选 |  类型  |   说明   |
| :------: | :--: | :----: | :------: |
|    id    |  是  |  int   |  用户id  |
| username |  是  | string |  用户名  |
| nickname |  是  | string | 用户昵称 |
|  email   |  是  | string | 用户邮箱 |
| user_pic |  是  | string | 用户头像 |

##### 返回示例

```json
{
    "type": "success",
    "status": 200,
    "message": "更新个人信息成功！",
    "data": {
        "id": 100013,
        "username": "ndmin",
        "nickname": "HZ",
        "email": "1570198052@qq.com",
        "user_pic": "http://127.0.0.1:3007/user_avatar/user.png",
        "ustatus": 1,
        "privilege": "1,2,4,6,8,9,10,11,12,13"
    }
}
```

##### 备注

- 更多返回错误代码请看首页的错误代码描述

### 四、个人密码更新接口

##### 请求URL

- `http://127.0.0.1:3007/api/my/pwd`

##### 请求方式

- POST

  ##### 参数

| 参数名 | 必选 |  类型  |  说明  |
| :----: | :--: | :----: | :----: |
| oldPwd |  是  | string | 旧密码 |
| newPwd |  是  | string | 新密码 |

##### 返回示例

```json
{
    "type": "success",
    "status": 200,
    "message": "更新密码成功！"
}
```

##### 备注

- 更多返回错误代码请看首页的错误代码描述

### 五、个人头像更新接口

##### 请求URL

- `http://127.0.0.1:3007/api/my/avatar`

##### 请求方式

- POST

- 结合el-upload组件使用

  ##### 参数

|  参数名  | 必选 |  类型  |   说明   |
| :------: | :--: | :----: | :------: |
|    id    |  是  |  int   |  用户id  |
| username |  是  | string |  用户名  |
| nickname |  否  | string | 用户昵称 |
|  email   |  否  | string | 用户邮箱 |
| user_pic |  否  | string | 用户头像 |

##### 返回示例

```json
{
    type: 'success',
    status: 200,
    message: '更新个人头像成功！',
    srcurl: 'user.png'
}
```

##### 返回参数说明

| 参数名 |  类型  |   说明   |
| :----: | :----: | :------: |
| srcurl | string | 图片名称 |

##### 备注

- 更多返回错误代码请看首页的错误代码描述

# **学生信息列表**

### 一、学生信息获取接口

##### 请求URL

- `http://127.0.0.1:3007/api/student/infos`

- GET

##### 返回示例

```json
{
    "type": "success",
    "status": 200,
    "message": "获取学生信息成功！",
    "data": [
        {
            "id": 1927124102,
            "name": "江宇宁",
            "age": 21,
            "sex": 0,
            "class": 2,
            "state": 2,
            "address": "坑美十五巷294号",
            "phone": "142-8640-7937",
            "time": "2021-10-04",
            "father": "江宇宁",
            "mather": "江宇宁",
            "workstate_C": 1,
            "workstate_Java": 1,
            "workstate_Python": 1
        },
        {
            "id": 1927124104,
            "name": "丁子韬",
            "age": 22,
            "sex": 0,
            "class": 2,
            "state": 0,
            "address": "龙岗区学园一巷294号",
            "phone": "170-1834-3423",
            "time": "2021-01-04",
            "father": "丁子韬",
            "mather": "丁子韬",
            "workstate_C": 0,
            "workstate_Java": 0,
            "workstate_Python": 1
        }],
    "total":2
}
```

##### 返回参数说明

|      参数名      |  类型  |                   说明                    |
| :--------------: | :----: | :---------------------------------------: |
|        id        |  int   |                    id                     |
|       name       | string |                   姓名                    |
|       age        |  int   |                   年龄                    |
|       sex        |  int   |            性别, 1: 男; 0: 女             |
|      number      |  int   |                   学号                    |
|      class       |  int   | 班级, 1: 软件工程; 2: 计算机; 3: 电子信息 |
|      state       |  int   |   状态, 1: 已入学; 2: 未入学; 3: 休学中   |
|     address      | string |                   地址                    |
|      phone       | string |                 手机号码                  |
|       time       | string |                 入学时间                  |
|      father      | string |                 父亲姓名                  |
|      mather      | string |                 母亲姓名                  |
|   workstate_C    |  int   |               C作业完成情况               |
|  workstate_Java  |  int   |             Java作业完成情况              |
| workstate_Python |  int   |            Python作业完成情况             |

------

### 二、学生信息新增接口

##### 请求URL

- `http://127.0.0.1:3007/api/student/info`

##### 请求方式

- POST

  ##### 参数

| 参数名  | 必选 |  类型  |        说明        |
| :-----: | :--: | :----: | :----------------: |
|  name   |  是  | string |        姓名        |
|   age   |  是  |  int   |        年龄        |
|   sex   |  是  |  int   | 性别, 1: 男; 0: 女 |
| father  |  是  | string |      父亲姓名      |
| mather  |  是  | string |      母亲姓名      |
| address |  是  | string |        地址        |
|  time   |  是  | string |      入学时间      |
|  phone  |  是  | string |      手机号码      |

##### 返回示例

```json
{
    "type": "success",
    "status": 200,
    "message": "新增学生信息成功！"
}
```

### 三、学生信息删除接口

##### 请求URL

- `http://127.0.0.1:3007/api/student/info?id=${id}`

##### 请求方式

- DELETE

  ##### 参数

| 参数名 | 必选 | 类型 |  说明  |
| :----: | :--: | :--: | :----: |
|   id   |  是  | int  | 学生id |

##### 返回示例

```json
{
    "type": "success",
    "status": 200,
    "message": "删除学生信息成功！"
}
```

##### 备注

- 更多返回错误代码请看首页的错误代码描述

### 四、学生信息修改接口

##### 请求URL

- `http://127.0.0.1:3007/api/student/info`

##### 请求方式

- PUT

  ##### 参数

| 参数名  | 必选 |  类型  |        说明        |
| :-----: | :--: | :----: | :----------------: |
|   id    |  是  |  int   |         id         |
|  name   |  是  | string |        姓名        |
|   age   |  是  |  int   |        年龄        |
|   sex   |  是  |  int   | 性别, 1: 男; 0: 女 |
| father  |  是  | string |      父亲姓名      |
| mather  |  是  | string |      母亲姓名      |
| address |  是  | string |        地址        |
|  time   |  是  | string |      入学时间      |
|  phone  |  是  | string |      手机号码      |

##### 返回示例

```json
{
    "type": "success",
    "status": 200,
    "message": "修改学生信息成功！",
    "data": {
        "id": 1927124403,
        "name": "张三",
        "age": 20,
        "sex": 1,
        "class": 1,
        "state": 1,
        "address": "湖南",
        "phone": "11100002222",
        "time": "2022-02-01",
        "father": "张三",
        "mather": "张三",
        "workstate_C": 0,
        "workstate_Java": 0,
        "workstate_Python": 0
    }
}
```

### 五、学生信息查找接口

##### 请求URL

- `http://127.0.0.1:3007/api/student/info?name=${name}`

##### 请求方式

- GET

  ##### 参数

| 参数名 | 必选 |  类型  |   说明   |
| :----: | :--: | :----: | :------: |
|  name  |  是  | string | 学生姓名 |

##### 返回示例

```json
{
    "type": "success",
    "status": 200,
    "message": "查找学生信息成功！",
    "data": [
        {
            "id": 1927124102,
            "name": "江宇宁",
            "age": 21,
            "sex": 0,
            "class": 2,
            "state": 2,
            "address": "坑美十五巷294号",
            "phone": "142-8640-7937",
            "time": "2021-10-04",
            "father": "江宇宁",
            "mather": "江宇宁",
            "workstate_C": 1,
            "workstate_Java": 1,
            "workstate_Python": 1
        }
    ],
    "total": 1
}
```

##### 返回参数说明

|      参数名      |  类型  |                   说明                    |
| :--------------: | :----: | :---------------------------------------: |
|        id        |  int   |                    id                     |
|       name       | string |                   姓名                    |
|       age        |  int   |                   年龄                    |
|       sex        |  int   |            性别, 1: 男; 0: 女             |
|      class       |  int   | 班级, 1: 软件工程; 2: 计算机; 3: 电子信息 |
|      state       |  int   |   状态, 1: 已入学; 2: 未入学; 3: 休学中   |
|     address      | string |                   地址                    |
|      phone       | string |                 手机号码                  |
|       time       | string |                 入学时间                  |
|      father      | string |                 父亲姓名                  |
|      mather      | string |                 母亲姓名                  |
|   workstate_C    |  int   |               C作业完成情况               |
|  workstate_Java  |  int   |             Java作业完成情况              |
| workstate_Python |  int   |            Python作业完成情况             |

### 六、作业信息获取接口（分页）

##### 请求URL

- `http://127.0.0.1:3007/api/student/works?page=${page}&size=${size}`

##### 请求方式

- GET

##### 请求参数说明

| 参数名 | 类型 |   说明   |
| :----: | :--: | :------: |
|  page  | int  | 当前页数 |
|  size  | int  | 每页条数 |

##### 返回示例

```json
{
    "type": "success",
    "status": 200,
    "message": "获取作业信息成功！",
    "data": [
        {
            "id": 1927124115,
            "name": "阎云熙",
            "class": 1,
            "workstate_C": 0,
            "workstate_Java": 1,
            "workstate_Python": 1
        },
        {
            "id": 1927124116,
            "name": "彭岚",
            "class": 3,
            "workstate_C": 1,
            "workstate_Java": 0,
            "workstate_Python": 1
        }  ],
    "total":2
}
```

##### 返回参数说明

|      参数名      |  类型  |                   说明                    |
| :--------------: | :----: | :---------------------------------------: |
|        id        |  int   |                  学生id                   |
|       name       | string |                 学生姓名                  |
|      class       |  int   | 班级, 1: 软件工程; 2: 计算机; 3: 电子信息 |
|   workstate_C    |  int   |   C++作业完成情况, 1: 已完成; 2: 未完成   |
|  workstate_Java  |  int   |  Java作业完成情况, 1: 已完成; 2: 未完成   |
| workstate_Python |  int   | Python作业完成情况, 1: 已完成; 2: 未完成  |

##### 备注

- 更多返回错误代码请看首页的错误代码描述

### 七、作业信息修改接口

##### 请求URL

- `http://127.0.0.1:3007/api/student/work`

##### 请求方式

- PUT

##### 请求参数说明

|      参数名      | 类型 |                   说明                   |
| :--------------: | :--: | :--------------------------------------: |
|        id        | int  |                  学生id                  |
|   workstate_C    | int  |  C++作业完成情况, 1: 已完成; 2: 未完成   |
|  workstate_Java  | int  |  Java作业完成情况, 1: 已完成; 2: 未完成  |
| workstate_Python | int  | Python作业完成情况, 1: 已完成; 2: 未完成 |

##### 返回示例

```json
{
    "type": "success",
    "status": 200,
    "message": "修改作业信息成功！",
    "data": {
        "id": 1927124403,
        "name": "张三",
        "class": 1,
        "workstate_C": 0,
        "workstate_Java": 1,
        "workstate_Python": 1
    }
}
```

##### 返回参数说明

|      参数名      |  类型  |                   说明                    |
| :--------------: | :----: | :---------------------------------------: |
|        id        |  int   |                  学生id                   |
|       name       | string |                 学生姓名                  |
|      class       |  int   | 班级, 1: 软件工程; 2: 计算机; 3: 电子信息 |
|   workstate_C    |  int   |   C++作业完成情况, 1: 已完成; 2: 未完成   |
|  workstate_Java  |  int   |  Java作业完成情况, 1: 已完成; 2: 未完成   |
| workstate_Python |  int   | Python作业完成情况, 1: 已完成; 2: 未完成  |

##### 备注

- 更多返回错误代码请看首页的错误代码描述

### 八、作业信息查找接口

##### 请求URL

- `http://127.0.0.1:3007/api/student/work`

##### 请求方式

- GET

##### 请求参数说明

| 参数名 | 类型 |   说明   |
| :----: | :--: | :------: |
|  name  | int  | 学生姓名 |

##### 返回示例

```json
{
    "type": "success",
    "status": 200,
    "message": "查找作业信息成功！",
    "data": [
        {
            "id": 1927124102,
            "name": "江宇宁",
            "class": 2,
            "workstate_C": 1,
            "workstate_Java": 1,
            "workstate_Python": 1
        }
    ],
    "total": 1
}
```

##### 返回参数说明

|      参数名      |  类型  |                   说明                    |
| :--------------: | :----: | :---------------------------------------: |
|        id        |  int   |                  学生id                   |
|       name       | string |                 学生姓名                  |
|      class       |  int   | 班级, 1: 软件工程; 2: 计算机; 3: 电子信息 |
|   workstate_C    |  int   |   C++作业完成情况, 1: 已完成; 2: 未完成   |
|  workstate_Java  |  int   |  Java作业完成情况, 1: 已完成; 2: 未完成   |
| workstate_Python |  int   | Python作业完成情况, 1: 已完成; 2: 未完成  |

##### 备注

- 更多返回错误代码请看首页的错误代码描述

# **视图数据**

### 一、折线图数据获取接口

##### 请求URL

- `http://127.0.0.1:3007/api/view/stack`

##### 请求方式

- GET

##### 返回示例

```json
{
    "type": "success",
    "status": 200,
    "message": "获取折线图数据成功！",
    "data": {
        "legend": ["软件工程","通信工程","电子信息","大数据","计算机技术"],
        "xAxis": ["周一","周二","周三","周四","周五","周六","周日"],
        "series": [
            {
                "id": 1,
                "name": "软件工程",
                "type": "line",
                "stack": "总量",
                "data": [80,83,84,40,44,11,12]
            },
            {
                "id": 2,
                "name": "通信工程",
                "type": "line",
                "stack": "总量",
                "data": [66,34,39,42,45,20,30]
            },
            {
                "id": 3,
                "name": "电子信息",
                "type": "line",
                "stack": "总量",
                "data": [66,65,59,44,33,10,20]
            },
            {
                "id": 4,
                "name": "大数据",
                "type": "line",
                "stack": "总量",
                "data": [33,33,44,55,55,11,23]
            },
            {
                "id": 5,
                "name": "计算机技术",
                "type": "line",
                "stack": "总量",
                "data": [33,55,44,66,77,11,3]
            }
        ]
    }
}
```

##### 返回参数说明

| 参数名 | 类型  |         说明         |
| :----: | :---: | :------------------: |
| legend | array |    图例的数组数据    |
| xAxis  | array |   x轴类目数据数组    |
| series | array | 每项图例具体数据数组 |

##### 备注

- 更多返回错误代码请看首页的错误代码描述

------

### 二、散点图数据获取接口

##### 请求URL

- `http://127.0.0.1:3007/api/view/geo`

##### 请求方式

- GET

  ##### 参数

##### 返回示例

```json
{
    "type": "success",
    "status": 200,
    "message": "获取散点图数据成功！",
    "data": {
        "points": [{ value: [118.8062, 31.9208], itemStyle: { color: '#4ab2e5' } }, ...],
        "linesData": [{ coords: [[118.8062, 31.9208],[119.4543, 25.9222]], lineStyle: { color: '#4ab2e5' } }, ...]
            }
}
```

##### 返回参数说明

**详情可参考echarts官方api**

|  参数名   |  类型  |                  说明                  |
| :-------: | :----: | :------------------------------------: |
|   data    | object | 一个包含地图中散点图和线路图数据的对象 |
|  points   | array  |             散点图数据数组             |
| linesData | array  |              线图数据数组              |

##### 备注

- 更多返回错误代码请看首页的错误代码描述

# 用户信息管理

### 一、用户信息获取接口

##### 请求URL

- `http://127.0.0.1:3007/api/users/infos`

##### 请求方式

- GET

##### 返回示例

```json
{
    "type": "success",
    "status": 200,
    "message": "获取用户信息成功！",
    "data": [
        {
            "id": 100001,
            "username": "admin",
            "nickname": "HZhertz",
            "email": "1570198052@qq.com",
            "user_pic": "http://127.0.0.1:3007/user_avatar/admin100001345e85901063bed1.jpg",
            "ustatus": 0,
            "privilege": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16"
        },
        {
            "id": 100002,
            "username": "gdmin",
            "nickname": "Ddmin",
            "email": "1570189094@qq.com",
            "user_pic": "http://127.0.0.1:3007/user_avatar/gdmin10000222-160G41G45K95.jpg",
            "ustatus": 2,
            "privilege": "8,9,10,11,12,13"
        }],
    "total": 2
}
```

##### 返回参数说明

|  参数名   |  类型  |                             说明                             |
| :-------: | :----: | :----------------------------------------------------------: |
|    id     |  int   |                            用户id                            |
| username  | string |                            用户名                            |
| nickname  | string |                             昵称                             |
|   email   | string |                             邮箱                             |
| user_pic  | string |                           用户头像                           |
|  ustatus  |  int   | 用户角色, 0: 超级管理员；1:普通用户 ; 2: 学生管理员; 3: 用户管理员 |
| privilege | string |                           用户权限                           |

------

------

### 二、用户信息删除接口

##### 请求URL

- `http://127.0.0.1:3007/api/users/info?id=${id}`

##### 请求方式

- DELETE

  ##### 参数

| 参数名 | 必选 | 类型 |  说明  |
| :----: | :--: | :--: | :----: |
|   id   |  是  | int  | 用户id |

##### 返回示例

```json
{
    "type": "success",
    "status": 200,
    "message": "删除用户信息成功！"
}
```

##### 备注

- 更多返回错误代码请看首页的错误代码描述

### 三、用户信息修改接口

##### 请求URL

- `http://127.0.0.1:3007/api/users/info`

##### 请求方式

- PUT

  ##### 参数

|  参数名   | 必选 |  类型  |                             说明                             |
| :-------: | :--: | :----: | :----------------------------------------------------------: |
|    id     |  是  |  int   |                            用户id                            |
| username  |  是  | string |                            用户名                            |
| nickname  |  是  | string |                           用户昵称                           |
|   email   |  是  | string |                           用户邮箱                           |
| user_pic  |  是  | string |                           用户头像                           |
|  ustatus  |  是  |  int   | 用户角色, 0: 超级管理员；1:普通用户 ; 2: 学生管理员; 3: 用户管理员 |
| privilege |  是  | string |                           用户权限                           |

##### 返回示例

```json
{
    "type": "success",
    "status": 200,
    "message": "修改用户信息成功！",
    "data": {
        "id": 100002,
        "username": "gdmin",
        "nickname": "gdmin",
        "email": "1112222444@qq.com",
        "user_pic": "http://127.0.0.1:3007/uploads/user.png",
        "ustatus": 1,
        "privilege": "1,2,4,6,8,9,10,11,12,13"
    }
}
```

##### 返回参数说明

|  参数名   |  类型  |                             说明                             |
| :-------: | :----: | :----------------------------------------------------------: |
|    id     |  int   |                            用户id                            |
| username  | string |                            用户名                            |
| nickname  | string |                             昵称                             |
|   email   | string |                             邮箱                             |
| user_pic  | string |                           用户头像                           |
|  ustatus  |  int   | 用户角色, 0: 超级管理员；1:普通用户 ; 2: 学生管理员; 3: 用户管理员 |
| privilege | string |                           用户权限                           |

##### 备注

- 更多返回错误代码请看首页的错误代码描述

### 四、用户头像修改接口

##### 请求URL

- `http://127.0.0.1:3007/api/users/avatar`

##### 请求方式

- POST

- 结合el-upload组件使用

  ##### 参数

|    参数名    | 必选 |  类型  |                             说明                             |
| :----------: | :--: | :----: | :----------------------------------------------------------: |
|      id      |  是  |  int   |                            用户id                            |
|   username   |  是  | string |                            用户名                            |
|   nickname   |  否  | string |                           用户昵称                           |
|    email     |  否  | string |                           用户邮箱                           |
|   user_pic   |  否  | string |                           用户头像                           |
|   ustatus    |  否  |  int   | 用户角色, 0: 超级管理员；1:普通用户 ; 2: 学生管理员; 3: 用户管理员 |
|  privilege   |  否  | string |                           用户权限                           |
| ustatus_text |  否  | string |                           用户角色                           |

##### 返回示例

```json
{
    type: 'success',
    status: 200,
    message: '修改用户头像成功！',
    srcurl: 'user.png'
}
```

##### 返回参数说明

| 参数名 |  类型  |   说明   |
| :----: | :----: | :------: |
| srcurl | string | 图片名称 |

##### 备注

- 更多返回错误代码请看首页的错误代码描述



### 五、用户权限修改接口

##### 请求URL

- `http://127.0.0.1:3007/api/users/pvg`

##### 请求方式

- PUT

- ##### 参数

|  参数名   | 必选 |  类型  |   说明   |
| :-------: | :--: | :----: | :------: |
|    id     |  是  |  int   |  用户id  |
| privilege |  否  | string | 用户权限 |

##### 返回示例

```json
{
    "type": "success",
    "status": 200,
    "message": "修改用户权限成功！",
    "data": "1,2,3,4,5,6,7,8,9,10"
}
```

### 六、用户信息查找接口

##### 请求URL

- `http://127.0.0.1:3007/api/users/info?username=${username}`

##### 请求方式

- GET

  ##### 参数

|  参数名  | 必选 |  类型  |  说明  |
| :------: | :--: | :----: | :----: |
| username |  是  | string | 用户名 |

##### 返回示例

```json
{
    "type": "success",
    "status": 200,
    "message": "查找用户信息成功！",
    "data": [
        {
            "id": 100001,
            "username": "admin",
            "nickname": "HZhertz",
            "email": "1570198052@qq.com",
            "user_pic": "http://127.0.0.1:3007/user_avatar/admin100001345e85901063bed1.jpg",
            "ustatus": 0,
            "privilege": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16"
        }
    ],
    "total": 1
}
```

##### 返回参数说明

|  参数名   |  类型  |                             说明                             |
| :-------: | :----: | :----------------------------------------------------------: |
|    id     |  int   |                            用户id                            |
| username  | string |                            用户名                            |
| nickname  | string |                             昵称                             |
|   email   | string |                             邮箱                             |
| user_pic  | string |                           用户头像                           |
|  ustatus  |  int   | 用户角色, 0: 超级管理员；1:普通用户 ; 2: 学生管理员; 3: 用户管理员 |
| privilege | string |                           用户权限                           |

##### 备注

- 更多返回错误代码请看首页的错误代码描述

