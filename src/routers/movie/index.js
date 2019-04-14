export default {
    path: '/movie',
    name: 'movie',
    component: () => import('@/views/Movie'),
    children: [
        {
            path: 'city',
            name: 'city',
            component: () => import('@/components/City')
        },
        {
            path: 'playing',
            name: 'playing',
            component: () => import('@/components/Playing')
        },
        {
            path: 'coming',
            name: 'coming',
            component: () => import('@/components/Coming')
        },
        {
            path: 'search',
            name: 'search',
            component: () => import('@/components/Search')
        },
        {
            path: '/movie',
            redirect: 'city'
        },
    ]
}