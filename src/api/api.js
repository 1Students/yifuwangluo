import axios from 'axios'

axios.defaults.baseURL = 'http://47.99.180.135:8080';


//初始化配置
    //设置api访问基路径
    // axios.defaults.baseURL = 'http://192.168.0.214:8700';
    axios.defaults.baseURL = 'http://47.99.180.135:8080';

    // axios.defaults.headers.common['tokenStr'] = store.state.tokenStr;//这里使用了Vuex中的常量（需要先引入store）
    // axios.defaults.headers.post['Content-Type'] = 'application/json';

    axios.defaults.headers.post['Content-Type'] = 'application/json'
    axios.defaults.withCredentials = true;

    //登录
    export const  loginCheck = params =>{
      return axios.post('/login/phone',params).then(res=>{
        return res
      })
    };
    //登录
    export const  logo = params =>{
      return axios.post('/login/phone',params).then(res=>{
        return res.data
      })
    };
    //注册
  export const  logos = params =>{
  return axios.post('/login/phone',params).then(res=>{
    return res.data
  })
};

    //结算信息
    export const  shops = params =>{
  return axios.get('/user/settlement',params).then(res=>{
    return res.data
  })
};
    //修改结算信息
export const  revise = params =>{
  return axios.post('/user/settlement/own',params).then(res=>{
    return res.data
  })
};
//结算信息列表
export const  shopv = params =>{
  return axios.get('/user/settlement/list',params).then(res=>{
    return res.data
  })
};
//修改密码
export const  prd = params =>{
  return axios.post('/pwd/forget',params).then(res=>{
    return res.data
  })
};
//商户密匙
export const  keys = params =>{
  return axios.get('/user/secret',params).then(res=>{
    return res.data
  })
};
//修改密匙
export const  xukeys = params =>{
  return axios.post('/user/secret',params).then(res=>{
    return res.data
  })
};
//随机生成密匙
export const  shopkeys = params =>{
  return axios.post('/user/secret/random',params).then(res=>{
    return res.data
  })
};
//今日成功成交额
export const  cn = params =>{
  return axios.get('/bill/today',params).then(res=>{
    return res.data
  })
};
//今日成交的笔数
export const  chn = params =>{
  return axios.get('/bill',params).then(res=>{
    return res.data
  })
};
//实验
export const  shiy = params =>{
  return axios.post('/pay/order',params).then(res=>{
    return res.data
  })
};
//钱包
export const  money = params =>{
  return axios.get('/wallet',params).then(res=>{
    return res.data
  })
};
//操作提现

export const  moneys = params =>{
  return axios.post('/wallet',params).then(res=>{
    return res.data
  })
};



















    //合作商信息
    export const  partnerList = params =>{
      return axios.post('/js/partnerList',params).then(res=>{
        return res.data
      })
    };
    //总和
    export const  getTotal = params =>{
      return axios.post('/js/getTotal',params).then(res=>{
        return res.data
      })
    };
    //通道列表
    export const  ChannelList = params =>{
      return axios.post('/js/getChannelList',params).then(res=>{
        return res.data
      })
    };
    //结算详情
    export const  partnerStat = params =>{
      return axios.post('/js/partnerStat',params).then(res=>{
        return res.data
      })
    };
