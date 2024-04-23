export default [
  {
    title: '基础组件',
    components: [
      {
        icon: 'icon-lunbotu',
        name: '轮播图',
        config: {
          name: 'Banner',
          title: '轮播图组件',
          bind: {
            lists: [
              {
                id: 1,
                img: '',
                title: '',
                link: ''
              }
            ],
            indicatorDots: true,
            radius: true,
            paddingLR: 0,
            marginTop: 0
          }
        }
      },
      {
        icon: 'icon-shangpinliebiao',
        name: '商品列表',
        config: {
          name: 'GoodsList',
          title: '商品列表',
          bind: {
            category: {
              categoryIds: [],
              img: []
            },
            count: 2,
            priceColor: '#ff0000',
            layout: 'list',
            template: 'auto',
            showName: true,
            showOriginalPrice: true,
            showPrice: true,
            backgroundColor: '#ffffff',
            backgroundRadius: false,
            contentRadius: true,
            paddingLR: 0,
            marginTop: 0
          }
        }
      },
      {
        icon: 'icon-daohang',
        name: '导航组',
        config: {
          name: 'NavList',
          title: '导航组',
          bind: {
            list: [
              { img: '', title: '今日推荐', link: '' },
              { img: '', title: '热门榜单', link: '' },
              { img: '', title: '首发新品', link: '' },
              { img: '', title: '促销单品', link: '' },
              { img: '', title: '文章列表', link: '' },
              { img: '', title: '精品推荐', link: '' }
            ],
            preSize: 3,
            radius: true
          }
        }
      },
      {
        icon: 'icon-preview',
        name: '搜索框',
        config: {
          name: 'Search',
          title: '搜索框',
          bind: {
            showIcon: false,
            backgroundColor: {
              from: '#ffffff',
              to: '#000000'
            },
            radius: true,
            textAlign: 'left'
          }
        }
      },
      {
        icon: 'icon-cuxiaoliebiao',
        name: '促销列表',
        config: {
          name: 'Promotion',
          title: '促销列表',
          bind: {
            lists: [{ title: '首发新品', des: '最新出炉', categoryId: '' }], // 板块
            count: 2, // 商品数量
            showName: true, // 显示名称
            showOriginalPrice: true, // 显示原价
            showPrice: true, // 显示价格
            titlePosition: 'left', // 标题位置 left center right
            priceColor: '#ff0000', // 价格颜色
            marginTop: 0 // 页面间距
          }
        }
      },
      {
        icon: 'icon-tupianmofang',
        name: '图片魔方',
        config: {
          name: 'PictureCube',
          title: '图片魔方',
          bind: {
            layout: 1, // 样式 1 2 3 4 5 6
            list: [{ id: 1, img: '', link: '' }], // 布局
            backgroundColor: '#ffffff', // 魔方背景颜色
            radius: true, // 魔方是否圆角
            paddingLR: 0, // 魔方左右间距
            marginTop: 0 // 魔方页面间距
          }
        }
      }
    ],
    class: 'base'
  },
  {
    title: '营销组件',
    components: [
      {
        icon: 'icon-miaosha',
        name: '秒杀',
        config: {
          name: 'Skill',
          title: '秒杀',
          bind: {
            icon: 'https://pro.crmeb.net/static/images/spike-icon-002.gif'
          }
        }
      },
      {
        icon: 'icon-youhuiquan',
        name: '优惠券',
        config: {
          name: 'Coupon',
          title: '优惠券',
          bind: {
            themeColor: '#FF0000'
          }
        }
      },
      {
        icon: 'icon-youmian',
        name: '活动魔方',
        config: {
          name: 'Cube',
          title: '活动魔方',
          bind: {
            title: '促销标题',
            desc: '促销简介',
            backgroundColor: '#ffe5e3',
            titleColor: '#ff0000',
            tagBackgroundColor: '#ff0000',
            marginTop: 0,
            list: [
              {
                title: '今日推荐',
                desc: '店主诚意推荐 品质商品',
                img: '',
                link: '',
                btn_background: 'linear-gradient(90deg, #4bc4ff, #207eff 100%)'
              },
              {
                title: '热门榜单',
                desc: '店主诚意推荐 品质商品',
                img: '',
                link: '',
                btn_background: 'linear-gradient(90deg,#ff9043,#ff531d 100%)'
              },
              {
                title: '首发新品',
                desc: '店主诚意推荐 品质商品',
                img: '',
                link: '',
                btn_background: 'linear-gradient(90deg,#96e187,#48ce2c 100%)'
              },
              {
                title: '促销单品',
                desc: '店主诚意推荐 品质商品',
                img: '',
                link: '',
                btn_background: 'linear-gradient(90deg,#ffc560,#ff9c00 100%)'
              }
            ]
          }
        }
      },
      {
        icon: 'icon-pintuan',
        name: '拼团',
        config: {
          name: 'Group',
          title: '拼团',
          bind: {
            icon: 'https://pro.crmeb.net/static/images/group02.gif',
            showPrice: true,
            showBtn: true,
            showTitle: true,
            showNumber: true,
            showGroupTag: true
          }
        }
      },
      {
        icon: 'icon-short_video',
        name: '短视频',
        config: {
          name: 'ShortVideo',
          title: '短视频',
          bind: {
            paddingLR: 0,
            marginTop: 0
          }
        }
      },
      {
        icon: 'icon-zhi_bo',
        name: '直播',
        config: {
          name: 'Broadcast',
          title: '直播',
          bind: {
            img: [],
            previewImg: [],
            paddingLR: 0,
            marginTop: 0
          }
        }
      }
    ],
    class: 'market'
  },
  {
    title: '工具组件',
    components: [
      {
        icon: 'icon-zaixiankefu',
        name: '在线客服',
        config: {
          name: 'Customer',
          title: '客服',
          bind: {
            icon: ''
          }
        }
      },
      {
        icon: 'icon-wenben',
        name: '标题',
        config: {
          name: 'CustomText',
          title: '标题',
          bind: {
            text: '标题',
            link: '',
            backgroundColor: '#fff',
            color: '#000',
            textAlign: 'left',
            textStyle: 'normal',
            textSize: 12
          }
        }
      },
      {
        icon: 'icon-fuwenben',
        name: '富文本',
        config: {
          name: 'CustomRich',
          title: '富文本',
          bind: {
            content: '<div></div>',
            backgroundColor: '#FF0000'
          }
        }
      },
      {
        icon: 'icon-fuzhukongbai',
        name: '辅助空白',
        config: {
          name: 'Blank',
          title: '辅助空白',
          bind: {
            backgroundColor: '#ffffff', // 背景颜色
            height: 10 // 组件高度 1 - 100px
          }
        }
      }
    ],
    class: 'tool'
  }
]
