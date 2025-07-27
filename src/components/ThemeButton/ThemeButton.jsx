import React, { useCallback } from "react"
import { useDispatch } from 'react-redux'
import { setTheme } from "@store/reducers/clientReducer.js"
import "./ThemeButton.scss"

export default React.memo(function ThemeButton() {
    const dispatch = useDispatch()

    const handleClick = useCallback(() => {
        dispatch(setTheme())
    }, [dispatch])

    return (
        <button className="button--toggle-theme" onClick={handleClick}>
            <div className="button--toggle-theme-decoration"></div>
        </button>
    )
})