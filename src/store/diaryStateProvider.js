import React, {useReducer, useEffect, useContext} from "react";
import axios from "axios"
import diaryReducers from "../reducers/diaryReducers";
import DiaryContext from "../context/diaryContext";


const DiaryStore = ({children}) => {
    const initialState = {
        diary: [],
        loading: false,
    }
    const [diaryState, diaryDispatch] = useReducer(diaryReducers, initialState)

    const fetch = (data) => {
        let deferred = new Promise(((resolve, reject) => {
            debugger
            diaryDispatch({type: "SET", loading: true})
            axios.post("http://127.0.0.1:3000/api/dair/", data).then((res) => {
                debugger
                if (res.status === 200) {
                    diaryDispatch({type: "SET", loading: false, payload: res.data})
                }
                resolve(res)
            }).catch((err) => {
                diaryDispatch({type: "SET", loading: false})
                reject(err)
            })
        }))
        return deferred
    }

    const create = (data) => {
        let deferred = new Promise(((resolve, reject) => {
            debugger
            axios.post("http://127.0.0.1:3000/api/dair/create", data).then((res) => {
                debugger
                if (res.status === 200) {
                    diaryDispatch({type: "CREATE", loading: false, payload: res.data})
                } else if (res.status === 204) {
                    diaryDispatch({type: "CREATE", loading: false})
                }
                resolve(res)
            }).catch((err) => {
                diaryDispatch({type: "CREATE", loading: false})
                reject(err)
            })
        }))
        return deferred
    }

    return (
        <DiaryContext.Provider value={{
            state: diaryState,
            dispatch: diaryDispatch,
            creatediary: create,
            fetchdiary: fetch
        }}>
            {children}
        </DiaryContext.Provider>
    )
}
export default DiaryStore;
