const menus = [
    {
        id: '1',
        name: '数据预览',
        icon: 'PieChart',
        children: [
            {
                id: '2',
                name: '数据分析',
                routeName:'DataAnalysis',
            }
        ]
    },
    {
        id: '3',
        name: '用户管理',
        icon: 'User',
        children: [
            {
                id: '4',
                name: '用户列表',
                routeName:'UserList',
            },
            {
                id: '5',
                name: '角色定义',
                routeName:'RoleDefine',
            }
        ]
    },
    {
        id: '6',
        name: '设置',
        icon: 'Setting',
        children: [
            {
                id: '7',
                name: '设置项1',
                routeName:'SettingOne',
            },
            {
                id: '8',
                name: '设置项2',
                routeName:'SettingTwo',
            }
        ]
    },
    {
        id: '6',
        name: '关于项目',
        icon: 'CollectionTag',
        routeName:'About'
    },
    {
        id: '9999',
        name: '菜单DEMO',
        icon: 'Menu',
        children:[
            {
                id: '9998',
                name: '可点击菜单',
                routeName:'Menu1',
            },
            {
                id: '9997',
                name: '嵌套子菜单',
                children:[
                    {
                        id: '9996',
                        name: '嵌套点击1',
                        routeName:'Menu2',
                    },
                    {
                        id: '9995',
                        name: '嵌套点击2',
                        routeName:'Menu3',
                    }
                ],
            },
        ]
    }
]

export default menus