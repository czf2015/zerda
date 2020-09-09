export const routes = {
    home: {
        id: 'home',
        name: '首页',
        link: '/',
        level: 1,
        next: {
            activity: {
                id: 'home/activity',
                name: '活动管理',
                link: '/home/activity',
                level: 2,
                next: {
                    list: {
                        id: 'home/activity/list',
                        name: '活动列表',
                        link: '/home/activity/list',
                        level: 3,
                        next: {
                            details: {
                                id: 'home/activity/list/details',
                                name: '活动详情',
                                link: '/home/activity/list/details',
                                level: 4,
                            }
                        }
                    }
                }
            }
        }
    },
    other: {
        id: 'other',
        name: '其他',
        link: '/',
        level: 1,
        next: {
            activity: {
                id: 'other/activity',
                name: '活动管理',
                link: '/other/activity',
                level: 2,
                next: {
                    list: {
                        id: 'other/activity/list',
                        name: '活动列表',
                        link: '/other/activity/list',
                        level: 3,
                        next: {
                            details: {
                                id: 'other/activity/list/details',
                                name: '活动详情',
                                link: '/other/activity/list/details',
                                level: 4,
                            },
                            other4: {
                                id: 'other/activity/other3/other4',
                                name: '活动详情',
                                link: '/other/activity/other3/other4',
                                level: 4,
                            }
                        }
                    },
                    other3: {
                        id: 'other/activity/other3',
                        name: '活动列表',
                        link: '/other/activity/other3',
                        level: 3,
                        next: {
                            details: {
                                id: 'other/activity/other3/details',
                                name: '活动详情',
                                link: '/other/activity/other3/details',
                                level: 4,
                            }
                        }
                    }
                }
            },
            other2: {
                id: 'other/other2',
                name: '活动管理',
                link: '/other/other2',
                level: 2,
                next: {
                    list: {
                        id: 'other/other2/list',
                        name: '活动列表',
                        link: '/other/other2/list',
                        level: 3,
                        next: {
                            details: {
                                id: 'other/other2/list/details',
                                name: '活动详情',
                                link: '/other/other2/list/details',
                                level: 4,
                            }
                        }
                    }
                }
            }
        }
    },
}