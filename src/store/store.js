import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3030',
  timeout: 10000,
  headers: {"content-type": "application/json"}
});

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      Authenticated: false,
      teams: null,
      user: {
        user_id: null,
        first_name: null,
        last_name: null
      },
    },
    getters: {
      getFullName: state => {
        return state.user.first_name + " " + state.user.last_name;
      },
      getFirstName: state => {
          return state.user.first_name;
      },
      getUserId: state => {
          return state.user.user_id;
      },
      isAuthenticated: state => {
          return state.Authenticated;
      },
    },
    mutations: {
      logout(state) {
        state.Authenticated = false;
        state.user = {
          user_id: null,
          first_name: null,
          last_name: null
        };
        state.teams = null;
      },
      login(state, user) {
        state.Authenticated = true;
        state.user = user
      },
      setTeams(state, teams) {
        state.teams = {
          period_start: '08/14/2020',
          period_end: '08/28/2020',
          reports: [ // 0 or more
            {
              meta: {
                userID: '234',
                fullName: 'Joe Phil',
                totals: {
                  work: 32,
                  pto: 65,
                  upto: 534,
                  admin: 44
                }
              },
              detail: [ // 0 or more
                {
                  date: '08/27/2020',
                  type: 'WORK',
                  clockIn: '3:00 PM',
                  clockOut: '4:00 PM',
                  billableMins: 14,
                  breakTotalMins: 57,
                  breaks: [ // 0 or more
                    {
                      breakStart: '3:30 PM',
                      breakEnd: '3:40 PM',
                      breakMins: 10
                    }
                  ]
  
                }
              ]
            },
            {
              meta: {
                userID: '234',
                fullName: 'Joe Phil1',
                totals: {
                  work: 321,
                  pto: 651,
                  upto: 5341,
                  admin: 441
                }
              },
              detail: [ // 0 or more
                {
                  date: '08/27/2020',
                  type: 'WORK',
                  clockIn: '3:00 PM',
                  clockOut: '4:00 PM',
                  billableMins: 141,
                  breakTotalMins: 571,
                  breaks: [ // 0 or more
                    {
                      breakStart: '3:30 PM',
                      breakEnd: '3:40 PM',
                      breakMins: 10
                    }
                  ]
  
                }
              ]
            }
          ]
        }
      }
    },
    actions: {
    },
    modules: {
    }
})