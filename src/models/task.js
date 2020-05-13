
export default {

  namespace: 'task',

  state: {
    listPage: true,
    selectedDate: new Date().toLocaleDateString(),
    taskIndex: undefined,
    taskList: [
      {
        taskName: '吃饭',
        time: 1589340659000,
        description: '吃饭时间到，今天也要好好吃饭呦！',
        sign: 2,
      },
      {
        taskName: '打卡',
        time: 1589340659000,
        description: '叮咚！上班时间到，记得打卡，不要吃到哟！',
        sign: 3,
      },
    ], //任务列表
    taskRecord: {}, //任务详情
    colorList: [{
      color: 'red',
      value: 0
    }, {
      color: 'green',
      value: 1
    }, {
      color: 'blue',
      value: 2
    }, {
      color: 'gray',
      value: 3
    }],
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {

  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
