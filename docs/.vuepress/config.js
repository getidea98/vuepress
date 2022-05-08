module.exports = {
    title: 'getidea98',
    description: '个人博客',
    themeConfig: {
        logo: 'https://cn.vuejs.org/images/logo.svg',
        base: '/blog/',
        nav: [
            {
                text: 'Java',
                link: '/computerLearningNotes/Java/ArrayList/'
            },
            {
                text: '设计模式',
                link: '/DesignPattern'
            },
            {
                text: '计算机基础',
                link: '/computerBase/Linux'
            },
            {
                text: '读书笔记',
                ariaLabel: 'Language Menu',
                items: [
                    { text: 'Java并发编程的艺术', link: '/studyBook/TheArtOfJavaConcurrentProgramming/' }
                ]
            }
        ]
    },
    plugins: ['@vuepress/back-to-top','vuepress-plugin-auto-sidebar'],
    lastUpdated: 'Last Updated',
}