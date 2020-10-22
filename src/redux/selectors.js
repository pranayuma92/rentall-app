import { createSelector } from 'reselect'
import { includes } from 'lodash'

export const selectStuff = state => state.rent

export const makeSelectStuff = () => createSelector(
    selectStuff,
    stuffs => stuffs.get('stuff')
)

export const makeSelectToken = () => createSelector(
    selectStuff,
    token => token.filter((value, key) => includes(['token', 'isAuthenticated', 'userData'], key))
)

export const makeSelectRequest = () => createSelector(
    selectStuff,
    stuff => stuff.filter((value, key) => includes(['loading', 'error', 'success', 'message'], key))
)