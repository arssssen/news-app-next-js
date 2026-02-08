import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NewsArticle } from './types';
import type { RootState } from '@/app/store';

type SelectedArticleState = {
  article: NewsArticle | null;
};

const initialState: SelectedArticleState = {
  article: null,
};

const selectedArticleSlice = createSlice({
  name: 'selectedArticle',
  initialState,
  reducers: {
    setSelectedArticle(state, action: PayloadAction<NewsArticle>) {
      state.article = action.payload;
    },
    clearSelectedArticle(state) {
      state.article = null;
    },
  },
});

export const { setSelectedArticle, clearSelectedArticle } =
  selectedArticleSlice.actions;

export const selectedArticleReducer = selectedArticleSlice.reducer;

export const selectSelectedArticle = (state: RootState) =>
  state.selectedArticle.article;
