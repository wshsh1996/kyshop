import type { IMenu } from '@/models/menu'

const apiRouter: IMenu[] = [
  {
    path: '/user',
    name: 'user',
    redirect: '/user/userManage',
    meta: {
      title: '用户',
      icon: 'user',
      permission: ['user']
    },
    children: [
      {
        path: '/user/userManage',
        name: 'userManage',
        component: '/user/userManage/index',
        meta: {
          title: '用户管理',
          permission: ['userManage']
        }
      },
      {
        path: '/user/userLabel',
        name: 'userLabel',
        component: '/user/userLabel/index',
        meta: {
          title: '用户标签',
          permission: ['userLabel']
        }
      }
    ]
  },
  {
    path: '/order',
    name: 'order',
    redirect: '/order/orderManage',
    meta: {
      title: '订单',
      icon: 'order',
      permission: ['order']
    },
    children: [
      {
        path: '/order/orderManage',
        name: 'orderManage',
        component: '/order/orderManage/index',
        meta: {
          title: '订单管理',
          permission: ['orderManage']
        }
      },
      {
        path: '/order/orderSet',
        name: 'orderSet',
        component: '/order/orderSet/index',
        meta: {
          title: '订单配置',
          permission: ['orderSet']
        }
      },
      {
        path: '/order/orderAfter',
        name: 'orderAfter',
        component: '/order/orderAfter/index',
        meta: {
          title: '售后订单',
          permission: ['orderAfter']
        }
      }
    ]
  },
  {
    path: '/product',
    name: 'product',
    redirect: '/product/goodsList',
    meta: {
      title: '商品',
      icon: 'product',
      permission: ['product']
    },
    children: [
      {
        path: '/product/goodsList',
        name: 'goodsList',
        component: '/product/goodsList/goodsList',
        meta: {
          title: '商品管理',
          permission: ['goodsList']
        }
      },
      {
        path: '/product/goodsSort',
        name: 'goodsSort',
        component: '/product/goodsSort/goodsSort',
        meta: {
          title: '商品分类',
          permission: ['goodsSort']
        }
      }
    ]
  },
  {
    path: '/marketing',
    name: 'marketing',
    redirect: '/marketing',
    meta: {
      title: '营销',
      icon: 'marketing',
      permission: ['marketing']
    },
    children: [
      {
        path: '/marketing/coupon',
        name: 'marketing-coupon',
        redirect: '/marketing/coupon/couponList',
        meta: {
          title: '优惠券',
          permission: ['marketing-coupon'],
          pluginSlug: 'coupons'
        },
        children: [
          {
            path: '/marketing/coupon/couponList',
            name: 'couponList',
            component: '/marketing/coupon/couponList/coupon',
            meta: {
              title: '优惠券列表',
              permission: ['couponList']
            }
          }
        ]
      },
      {
        path: '/marketing/creditsManage',
        name: 'creditsManage',
        redirect: '/marketing/creditsManage/creditsGoods',
        meta: {
          title: '积分管理',
          permission: ['creditsManage']
        },
        children: [
          {
            path: '/marketing/creditsManage/creditsGoods',
            name: 'creditsGoods',
            component: '/marketing/creditsManage/creditsGoods/index',
            meta: {
              title: '积分商品',
              permission: ['creditsGoods']
            }
          },
          {
            path: '/marketing/creditsManage/creditsOrder',
            name: 'creditsOrder',
            component: '/marketing/creditsManage/creditsOrder/index',
            meta: {
              title: '积分订单',
              permission: ['creditsOrder']
            }
          },
          {
            path: '/marketing/creditsManage/creditsSet',
            name: 'creditsSet',
            component: '/marketing/creditsManage/creditsSet/index',
            meta: {
              title: '积分配置',
              permission: ['creditsSet']
            }
          }
        ]
      },
      {
        path: '/marketing/teamWorkManage',
        name: 'teamWorkManage',
        redirect: '/marketing/teamWorkManage/teamWorkList',
        meta: {
          title: '拼团管理',
          permission: ['teamWorkManage'],
          pluginSlug: 'groups'
        },
        children: [
          {
            path: '/marketing/teamWorkManage/teamWorkList',
            name: 'teamWorkList',
            component: '/marketing/teamWorkManage/teamWorkList/index',
            meta: {
              title: '拼团列表',
              permission: ['teamWorkList']
            }
          }
        ]
      },
      {
        path: '/marketing/secKillManage',
        name: 'secKillManage',
        redirect: '/marketing/secKillManage/secKillList',
        meta: {
          title: '秒杀管理',
          permission: ['secKillManage'],
          pluginSlug: 'skills'
        },
        children: [
          {
            path: '/marketing/secKillManage/secKillList',
            name: 'secKillList',
            component: '/marketing/secKillManage/secKillList/index',
            meta: {
              title: '秒杀列表',
              permission: ['secKillList']
            }
          }
        ]
      },
      {
        path: '/marketing/vip',
        name: 'vip',
        redirect: '/marketing/vip/vipLevel',
        meta: {
          title: '会员',
          permission: ['vip']
        },
        children: [
          {
            path: '/marketing/vip/vipLevel',
            name: 'vipLevel',
            component: '/marketing/vip/vipLevel/index',
            meta: {
              title: '会员等级',
              permission: ['vipLevel']
            }
          }
        ]
      },
      {
        path: '/marketing/saveValue',
        name: 'saveValue',
        redirect: '/marketing/saveValue/saveType',
        meta: {
          title: '储值',
          permission: ['saveValue']
        },
        children: [
          {
            path: '/marketing/saveValue/saveType',
            name: 'saveType',
            component: '/marketing/saveValue/saveType/index',
            meta: {
              title: '储值类型',
              permission: ['saveType']
            }
          }
        ]
      },
      {
        path: '/marketing/SCRM',
        name: 'SCRM',
        redirect: '/marketing/SCRM/welcome',
        meta: {
          title: '私域SCRM',
          permission: ['SCRM'],
          pluginSlug: 'scrm'
        },
        children: [
          {
            path: '/marketing/SCRM/welcome',
            name: 'welcome',
            component: '/marketing/SCRM/welcome/index',
            meta: {
              title: '欢迎语',
              permission: ['welcome']
            }
          },
          {
            path: '/marketing/SCRM/customerList',
            name: 'customerList',
            component: '/marketing/SCRM/customerList/index',
            meta: {
              title: '客户列表',
              permission: ['customerList']
            }
          },
          {
            path: '/marketing/SCRM/customerGroup',
            name: 'customerGroup',
            component: '/marketing/SCRM/customerGroup/index',
            meta: {
              title: '客户群发',
              permission: ['customerGroup']
            }
          },
          {
            path: '/marketing/SCRM/friendCircle',
            name: 'friendCircle',
            component: '/marketing/SCRM/friendCircle/index',
            meta: {
              title: '朋友圈列表',
              permission: ['friendCircle']
            }
          },
          {
            path: '/marketing/SCRM/customerGroupList',
            name: 'customerGroupList',
            component: '/marketing/SCRM/customerGroupList/index',
            meta: {
              title: '客户群列表',
              permission: ['customerGroupList']
            }
          },
          {
            path: '/marketing/SCRM/employeeList',
            name: 'employeeList',
            component: '/marketing/SCRM/employeeList/index',
            meta: {
              title: '员工列表',
              permission: ['employeeList']
            }
          }
        ]
      },
      {
        path: '/marketing/broadcast',
        name: 'broadcast',
        component: '/marketing/broadcast/index',
        meta: {
          title: '小程序直播',
          permission: ['broadcast']
        }
      }
    ]
  },
  {
    path: '/distribute',
    name: 'distribute',
    redirect: '/distribute/distributeSet',
    meta: {
      title: '分销',
      icon: 'distribute',
      permission: ['distribute']
    },
    children: [
      {
        path: '/distribute/distributeSet',
        name: 'distributeSet',
        component: '/distribute/distributeSet/index',
        meta: {
          title: '分销设置',
          permission: ['distributeSet']
        }
      },
      {
        path: '/distribute/distributeManage',
        name: 'distributeManage',
        component: '/distribute/distributeManage/index',
        meta: {
          title: '分销管理',
          permission: ['distributeManage']
        }
      },
      {
        path: '/distribute/ranking',
        name: 'ranking',
        component: '/distribute/ranking/index',
        meta: {
          title: '分销排行榜',
          permission: ['ranking']
        }
      }
    ]
  },
  {
    path: '/finance',
    name: 'finance',
    redirect: '/finance/cashApply',
    meta: {
      title: '财务',
      icon: 'finance',
      permission: ['finance']
    },
    children: [
      {
        path: '/finance/cashApply',
        name: 'cashApply',
        component: '/finance/cashApply/index',
        meta: {
          title: '提现申请',
          permission: ['cashApply']
        }
      },
      {
        path: '/finance/flashAccount',
        name: 'flashAccount',
        component: '/finance/flashAccount/index',
        meta: {
          title: '资金流水',
          permission: ['flashAccount']
        }
      },
      {
        path: '/finance/statistic',
        name: 'statistic',
        component: '/finance/statistic/index',
        meta: {
          title: '交易统计',
          permission: ['statistic']
        }
      }
    ]
  },
  {
    path: '/decoration',
    name: 'decoration',
    redirect: '/decoration/themeStyle',
    meta: {
      title: '装修',
      icon: 'decorate',
      permission: ['decoration']
    },
    children: [
      {
        path: '/decoration/themeStyle',
        name: 'themeStyle',
        component: '/decoration/themeStyle/index',
        meta: {
          title: '主题风格',
          permission: ['themeStyle']
        }
      },
      {
        path: '/decoration/shopDecoration',
        name: 'shopDecoration',
        component: '/decoration/shopDecoration/index',
        meta: {
          title: '店铺装修',
          permission: ['shopDecoration']
        }
      }
    ]
  },
  {
    path: '/setting',
    name: 'setting',
    redirect: '/setting',
    meta: {
      title: '设置',
      icon: 'set',
      permission: ['setting']
    },
    children: [
      {
        path: '/setting/delivery',
        name: 'delivery',
        component: '/setting/delivery',
        meta: {
          title: '配送设置',
          permission: ['delivery']
        },
        children: [
          {
            path: '/setting/delivery/freightSet',
            name: 'freightSet',
            component: '/setting/delivery/freightSet/index',
            meta: {
              title: '运费设置',
              permission: ['freightSet']
            }
          },
          {
            path: '/setting/delivery/logistics',
            name: 'logistics',
            component: '/setting/delivery/logistics/index',
            meta: {
              title: '物流公司',
              permission: ['logistics']
            }
          },
          {
            path: '/setting/delivery/pickupManage',
            name: 'pickupManage',
            component: '/setting/delivery/pickupManage/index',
            meta: {
              title: '自提点管理',
              permission: ['pickupManage']
            }
          }
        ]
      },
      {
        path: '/setting/logo',
        name: 'logo',
        component: '/setting/logo/index',
        meta: {
          title: 'logo配置',
          permission: ['logo']
        }
      },
      {
        path: '/setting/agreement',
        name: 'agreement',
        component: '/setting/agreement/index',
        meta: {
          title: '协议设置',
          permission: ['agreement']
        }
      },
      {
        path: '/setting/permission',
        name: 'permissionList',
        redirect: '/setting/permission/role',
        meta: {
          title: '权限管理',
          permission: ['permissionList']
        },
        children: [
          {
            path: '/setting/permission/role',
            name: 'role',
            component: '/setting/permission/role/list',
            meta: {
              title: '角色管理',
              permission: ['role']
            }
          },
          {
            path: '/setting/permission/user',
            name: 'Administrator',
            component: '/setting/permission/user/list',
            meta: {
              title: '管理员',
              permission: ['Administrator']
            }
          },
          {
            path: '/setting/permission/permission',
            name: 'permission',
            component: '/setting/permission/permission/list',
            meta: {
              title: '权限管理',
              permission: ['permission']
            }
          }
        ]
      },
      {
        path: '/setting/payment',
        name: 'payment',
        redirect: '/setting/payment/wxPayment',
        meta: {
          title: '支付设置',
          permission: ['payment']
        },
        children: [
          {
            path: '/setting/payment/wxPayment',
            name: 'wxPayment',
            component: '/setting/payment/wxPayment/index',
            meta: {
              title: '微信支付',
              permission: ['wxPayment']
            }
          }
        ]
      },
      {
        path: '/setting/program',
        name: 'program',
        component: '/setting/program/index',
        meta: {
          title: '小程序设置',
          permission: ['program']
        }
      }
    ]
  },
  {
    path: '/application',
    name: 'application',
    component: '/application/index',
    meta: {
      title: '应用中心',
      icon: 'application',
      permission: ['application']
    }
  }
]

export default apiRouter
