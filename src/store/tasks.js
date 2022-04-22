import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as api from "../utils/api"

export const initialState = {
  text: '',
  loaded: false,
  tasks: [],
  filter: 0
}

export const fetchTasks = createAsyncThunk('tasks/fetch', (_, { getState }) => {
  if (!getState().tasks.loaded) {
    return api.getTasks()
  }
  return Promise.reject()
})

export const add = createAsyncThunk('tasks/add', async (_, { getState, requestId }) => {
  const state = getState()
  const task = { ...state.tasks.tasks.find(t => t.id === requestId) }
  delete task.id

  const doc = await api.addTask(task)
  return doc.id
})

export const remove = createAsyncThunk('tasks/remove', (task) => {
  return api.removeTask(task.id)
}, {
  getPendingMeta: ({ arg }, { getState }) => ({ index: getState().tasks.tasks.findIndex(t => t.id === arg.id) })
})

export const toggle = createAsyncThunk('tasks/toggle', (task) => {
  return api.updateTask(task.id, { finished: !task.finished })
})

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    type: (state, action) => ({ ...state, text: action.payload }),
    filter: (state, action) => ({ ...state, filter: action.payload }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload
        state.loaded = true
      })
      .addCase(add.pending, (state, action) => {
        const task = { text: state.text, finished: false, id: action.meta.requestId }

        state.tasks.push(task)
        state.text = ''
      })
      .addCase(add.fulfilled, (state, action) => {
        const task = state.tasks.find(t => t.id === action.meta.requestId)
        task.id = action.payload
      })
      .addCase(add.rejected, (state, action) => {
        const index = state.tasks.findIndex(t => t.id === action.meta.requestId)
        if (index > -1) {
          state.tasks.splice(index, 1)
        }
      })
      .addCase(remove.pending, (state, action) => {
        const index = state.tasks.findIndex(t => t.id === action.meta.arg.id)
        if (index > -1) {
          state.tasks.splice(index, 1)
        }
      })
      .addCase(remove.rejected, (state, action) => {
        state.tasks.splice(action.meta.index, 0, action.meta.arg)
      })
      .addCase(toggle.pending, (state, action) => {
        const task = state.tasks.find(t => t.id === action.meta.arg.id)
        task.finished = !task.finished
      })
      .addCase(toggle.rejected, (state, action) => {
        const task = state.tasks.find(t => t.id === action.meta.arg.id)
        task.finished = action.meta.arg.finished
      })
  }
})

export const { type, filter } = tasksSlice.actions
