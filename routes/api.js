import axios from "axios";
import React, { Component } from "react";
import { Alert } from "react-native";
import { connect } from "react-redux";
import moment, { isMoment } from "moment";
//import Qs from "qs";
//const placesURL = "https://maps.googleapis.com/maps/api/place";
//const geocodeURL = "https://maps.googleapis.com/maps/api/geocode";
//let apiURL = "https://api.metoo.io";
// apiURL = __DEV__ ? 'https://dev.metoo.io' : 'https://api.metoo.io'
//const apiURL = __DEV__ ? "http://192.168.123.150:8000" : "https://api.metoo.io";
const habitURL = "http://192.168.123.150:8001";
const organizerURL = "http://192.168.123.150:8000";
// axios.defaults.headers.common = {
//     ...axios.defaults.headers.common,
//     'Content-Type': 'application/x-www-form-urlencoded'
// }
class OrganizerApi extends Component {
  constructor(props) {
    super(props);
    this.config = (token) => ({
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
    // this.state = {
    //   token: null,
    //   key: null,
    //   user: null,
    //   data: [],
    //   error: false,
    //   refreshing: false,
    //   googleKey: "AIzaSyBdyBubLdxjcJXtjIsUp8vKQZEYOpDRk3M",
    //   // url: __DEV__ ? 'https://dev.metoo.io' : 'https://api.metoo.io',
    //   // url: __DEV__ ? 'http://localhost:8000' : 'https://api.metoo.io',
    //   url: "https://api.metoo.io",
    //   socketUrl:
    //     __DEV__ && false
    //       ? "ws://206.189.185.240:8080"
    //       : "ws://206.189.185.240:8080", // 'ws://sicc.metoo.io:8080',
    // };
  }

  //	url = () => apiURL;
  socketUrl = () => this.state.socketUrl;
  error = (error) => {
    // console.log('api request error', window.__REMOTEDEV__ ? error.response : error)
    throw error;
    return { hasError: true, error: error.response };
  };
  async login(args) {
    const url = organizerURL.concat("/rest_auth/login/");
    try {
      const data = await axios.post(url, {
        username: args.username,
        password: args.password,
      });
      return data.data;
    } catch (error) {
      return this.error(error);
    }
  }
  async register(args) {
    const url = apiURL.concat("/rest_auth/registration/");
    try {
      let data = await axios.post(url, args.fields);
      console.log("registration response", data);
      return data.data;
    } catch (error) {
      return this.error(error);
    }
  }

  async sendRefer(args) {
    const url = apiURL.concat(`/createreferrals/`);
    // console.log('Url: ', url)
    const config = this.config(args.token);
    try {
      const refer = await axios.post(url, { referer: args.referName }, config);
      return refer.data;
    } catch (error) {
      this.error(error);
      // throw error
      return { hasError: true, error: error.response };
    }
  }

  async fetchSpecificProfile(args) {
    try {
      const { data } = await axios.get(
        apiURL.concat(`/accounts/${args.userId}/`),
        this.config(args.token)
      );
      return data;
    } catch (error) {
      console.log("error", error.response);
      // throw error
      return { hasError: true, error: error.response };
    }
  }
  async fetchYourProfile(args) {
    const url = apiURL.concat(`/refreshuser/`);
    const config = this.config(args.token);
    try {
      const user = await axios.get(url, config);
      return user.data;
    } catch (error) {
      return this.error(error);
    }
  }

  async fetchTodos(args) {
    const config = this.config(args.token);
    try {
      const todoEntries = await axios.get(
        organizerURL.concat("/todo/api/entries/"),
        this.config(args.token)
      );
      return todoEntries.data;
    } catch (error) {
      console.log("error", error.response);
    }
  }
  async readTodoEntry(todoId) {
    try {
      const url = organizerURL.concat(`/todo/api/entries/${todoId}/`);
      const done_dt = new Date().toJSON();
      const { todoEntries } = await axios.patch(
        url,
        { done_dt: done_dt },
        this.config(args.token)
      );
      return todoEntries.data;
    } catch (error) {
      console.log("error", error);
    }
  }
  async editTodoEntry(args) {
    try {
      const config = this.config(args.token);
      delete args.token;
      const url = organizerURL.concat(`/todo/api/entries/${args.id}/`);
      const { response } = await axios.patch(url, args, config);
      return response.data;
    } catch (error) {
      console.log("error", error);
    }
  }
  async createTodoEntry(args) {
    try {
      const response = await axios.post(
        organizerURL.concat("/todo/api/entries/"),
        args.formValues,
        this.config(args.token)
      );
      return response.data;
    } catch (error) {
      console.log("error", error.response);
    }
  }
  async fetchJournals(args) {
    try {
      const journalEntries = await axios.get(
        organizerURL.concat("/journal/api/entries/"),
        this.config(args.token)
      );
      return journalEntries.data;
    } catch (error) {
      console.log("error", error.response);
    }
  }
  async editJournalEntry(args) {
    try {
      const config = this.config(args.token);
      delete args.token;
      const url = organizerURL.concat(`/journal/api/entries/${args.id}/`);
      const { journalEntries } = await axios.patch(url, args, config);
      return journalEntries.data;
    } catch (error) {
      console.log("error", error);
    }
  }

  async fetchHabitCompletions(args) {
    try {
      const habitCompletions = await axios.get(
        habitURL.concat(
          `/habits/api/habit_completion/?date=${args.selectedDate}`
        ),
        this.config(args.token)
      );
      return habitCompletions.data;
    } catch (error) {
      console.log("error", error);
    }
  }
  async fetchHabits(args) {
    try {
      const habits = await axios.get(
        habitURL.concat(`/habits/api/habit/?date=${args.selectedDate}`),
        this.config(args.token)
      );
      return habits.data;
    } catch (error) {
      console.log("error", error);
    }
  }
  async editHabit(args) {
    try {
      const config = this.config(args.token);
      const selectedDate = args.selectedDate;
      delete args.token;
      delete args.selectedDate;
      const url = habitURL.concat(
        `/habits/api/habit/${args.id}/?date=${selectedDate}`
      );
      const habits = await axios.patch(url, args, config);
      return habits.data;
    } catch (error) {
      console.log("error", error);
    }
  }
  async deleteHabit(args) {
    try {
      const config = this.config(args.token);
      const url = habitURL.concat(
        `/habits/api/habit/${args.id}/?date=${args.selectedDate}`
      );
      const habits = await axios.delete(url, config);
      return habits.data;
    } catch (error) {
      console.log("error", error);
    }
  }
  async createHabit(args) {
    try {
      const habit = await axios.post(
        habitURL.concat("/habits/api/habit/"),
        args.formValues,
        this.config(args.token)
      );
      return habit.data;
    } catch (error) {
      console.log("error", error.response);
    }
  }

  async completeHabitCompletion(args) {
    try {
      const habit = await axios.patch(
        habitURL.concat(
          `/habits/api/habit_completion/${args.habitCompletionId}/?date=${args.selectedDate}`
        ),
        { did_complete: args.did_complete },
        this.config(args.token)
      );
      return habit.data;
    } catch (error) {
      console.log("error", error);
    }
  }
  async createJournalEntry(args) {
    try {
      const journalEntries = await axios.post(
        organizerURL.concat("/journal/api/entries/"),
        args.formValues,
        this.config(args.token)
      );
      return journalEntries.data;
    } catch (error) {
      console.log("error", error.response);
    }
  }
  async deleteJournalEntry(args) {
    try {
      const journalEntries = await axios.delete(
        organizerURL.concat(`/journal/api/entries/${args.id}`),
        this.config(args.token)
      );
      return journalEntries.data;
    } catch (error) {
      console.log("error", error.response);
    }
  }

  async deleteTodoEntry(args) {
    try {
      const response = await axios.delete(
        organizerURL.concat(`/todo/api/entries/${args.id}/`),
        this.config(args.token)
      );
      return response.data;
    } catch (error) {
      console.log("error", error.response);
    }
  }
  //	async editMetooPost(args) {
  //		try {
  //			const url = apiURL.concat(`/metooposts/${args.id}/`);
  //			const config = this.config(args.token);
  //			const metooResponse = await axios.patch(url, args.info, config);
  //			return metooResponse.data;
  //		} catch (error) {
  //			return this.error(error);
  //		}
  //	}
  //
  //	async submitMetooComment(args) {
  //		try {
  //			const config = this.config(args.token);
  //			const url = apiURL.concat("/metoocomment/");
  //			const data = await axios.post(
  //				url,
  //				{ post: args.postId, content: args.comment, mentioned_accounts: args.mentioned_accounts },
  //				config
  //			);
  //			return data.data;
  //		} catch (error) {
  //			return this.error(error);
  //		}
  //	}
  //	async deleteMetooComment(args) {
  //		try {
  //			const url = apiURL.concat(`/metoocomment/${args.commentId}/`);
  //			const config = this.config(args.token);
  //			const metooResponse = await axios.delete(url, config);
  //			return metooResponse;
  //		} catch (error) {
  //			return this.error(error);
  //		}
  //	}

  async fetchUserFriends(args) {
    try {
      const friends = await axios.get(args.url || url, this.config(args.token));
      return friends.data;
    } catch (error) {
      return this.error(error);
    }
  }
  async fetchPeopleYouMayKnow(args) {
    try {
      const url = apiURL.concat(`/peopleyoumayknow/`);
      const friends = await axios.get(url, this.config(args.token));
      return friends.data;
    } catch (error) {
      return this.error(error);
    }
  }

  async updateAvatar(args) {
    const url = apiURL.concat(`/accounts/${args.userId}/`);
    const config = this.config(args.token);
    try {
      const user = await axios.patch(url, args.formData, config);
      return user.data;
    } catch (error) {
      return this.error(error);
    }
  }
  async postDeviceId(args) {
    const url = apiURL.concat(`/device/${args.type}/`);
    const config = this.config(args.token);
    try {
      const user = await axios.post(
        url,
        { registration_id: args.registration_id },
        config
      );
      return user.data;
    } catch (error) {
      return this.error(error);
    }
  }

  async updateSettings(args) {
    const url = apiURL.concat(`/accounts/${args.userId}/`);
    const config = this.config(args.token);
    try {
      const user = await axios.patch(url, args.info, config);
      return user.data;
    } catch (error) {
      return this.error(error);
    }
  }
}

const organizerApi = new OrganizerApi();
export default organizerApi;
