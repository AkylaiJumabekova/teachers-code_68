import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import axiosApi from '../../axiosApi';

interface ICounterState {
  value: number;
  isLoading: boolean;
  isError: boolean;
}

const initialState: ICounterState = {
  value: 0,
  isLoading: false,
  isError: false,
};

// export const fetchCounterStarted = createAction('counter/fetchStarted');
// export const fetchCounterSuccess = createAction(
//   'counter/fetchSuccess',
//   (value: number) => ({ payload: value })
// );
// export const fetchCounterFailure = createAction('counter/fetchFailure');
//
// export const fetchCounter = async (dispatch: AppDispatch) => {
//   // Thunk
//   try {
//     dispatch(fetchCounterStarted());
//
//     const { data: counter } = await axiosApi.get<number | null>('counter.json');
//     if (counter === null) {
//       dispatch(fetchCounterSuccess(0));
//     } else {
//       dispatch(fetchCounterSuccess(counter));
//     }
//   } catch (e) {
//     dispatch(fetchCounterFailure());
//   }
// };

export const fetchCounter = createAsyncThunk('counter/fetch', async () => {
  const { data: counter } = await axiosApi.get<number | null>('counter.json');
  return counter || 0;
});

export const increaseCounter = createAsyncThunk<
  void,
  void,
  {
    state: RootState;
  }
>('counter/increase', async (_arg, thunkAPI) => {
  const current = thunkAPI.getState().counter.value;
  await axiosApi.put('counter.json', current + 1);
});

export const decreaseCounter = createAsyncThunk<
  void,
  void,
  {
    state: RootState;
  }
>('counter/decrease', async (_arg, thunkAPI) => {
  const current = thunkAPI.getState().counter.value;
  await axiosApi.put('counter.json', current - 1);
});

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increase: (state) => {
      state.value += 1;
    },
    decrease: (state) => {
      if (state.value > 0) {
        state.value -= 1;
      }
    },
    increaseBy: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    decreaseBy: (state, action: PayloadAction<number>) => {
      if (state.value >= action.payload) {
        state.value -= action.payload;
      } else {
        state.value = 0;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCounter.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchCounter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.value = action.payload;
      })
      .addCase(fetchCounter.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(increaseCounter.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(increaseCounter.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(increaseCounter.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(decreaseCounter.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(decreaseCounter.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(decreaseCounter.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export const CounterReducer = counterSlice.reducer;

export const { increase, decrease, increaseBy, decreaseBy } =
  counterSlice.actions;
