/** create by liqiaoqiao 2020-05-13 */

export default {

  namespace: 'task',

  state: {
    listPage: true, //是否为列表页
    selectedDate: new Date().toLocaleDateString(), //选择的日期
    taskIndex: undefined, //当前任务下标
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
        description: '叮咚！上班时间到，记得打卡，不要迟到哟！',
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
    }], //标记列表
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
