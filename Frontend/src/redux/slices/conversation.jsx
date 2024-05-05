import { createSlice } from "@reduxjs/toolkit";
const user_id = window.localStorage.getItem("user_id")
import { faker } from "@faker-js/faker";

const initialState = {
    direct_chat: {
        conversations: [],
        current_conversation: null,
        current_messages: []
    },
    group_chat: {},
}

const slice = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        fetchDirectConversations(state, action) {

            const list = action.payload.conversations.map((el) => {
                const this_user = el.participants.find(
                    (elm) => elm._id.toString() !== user_id
                );

                return {
                    id: el._id,
                    user_id: this_user._id,
                    name: `${this_user.firstName} ${this_user.lastName}`,
                    online: this_user.status === "Online",
                    img: faker.image.avatar(),
                    msg: faker.music.songName(),
                    time: "9:36",
                    unread: 0,
                    pinned: false,
                }
            })

            state.direct_chat.conversations = list;
        },
        updateDirectConversation(state, action) {
            // data = {}
            // list.map((el) => el.id === data._id ? data : el );
            const this_conversation = action.payload.conversation;
            state.direct_chat.conversations = state.direct_chat.conversations.map((el) => {
                if (el.id !== this_conversation._id) {
                    return el;
                } else {
                    const user = this_conversation.participants.find((elm) => elm._id.toString() !== user_id);
                    return {
                        this_conversation: el._id,
                        user_id: user._id,
                        name: `${user.firstName} ${user.lastName}`,
                        online: user.status === "Online",
                        img: faker.image.avatar(),
                        msg: faker.music.songName(),
                        time: "9:36",
                        unread: 0,
                        pinned: false,
                    }
                }
            })
        },
        addDirectConversation(state, action) {
            // list.push(data)
            const this_conversation = action.payload.conversation;
            const user = this_conversation.participants.find((elm) => elm._id.toString() !== user_id);
            state.direct_chat.conversations.push({
                this_conversation: el._id,
                user_id: user._id,
                name: `${user.firstName} ${user.lastName}`,
                online: user.status === "Online",
                img: faker.image.avatar(),
                msg: faker.music.songName(),
                time: "9:36",
                unread: 0,
                pinned: false,
            })

        }
    },
})

export const { fetchDirectConversations, updateDirectConversation, addDirectConversation } = slice.actions;
export default slice.reducer;

export const FetchDirectConversations = ({ conversations }) => {
    return async (dispatch, getState) => {
        dispatch(fetchDirectConversations({ conversations }))
    }
}

export const AddDirectConversation = ({ conversations }) => {
    return async (dispatch, getState) => {
        dispatch(addDirectConversation({ conversations }))
    }
}

export const UpdateDirectConversation = ({ conversations }) => {
    return async (dispatch, getState) => {
        dispatch(updateDirectConversation({ conversations }))
    }
}

