import style from './searchInput.module.css'
import {SearchRounded} from '@material-ui/icons'
const searchInput = ({...rest}) => {


    return (
        <div className = {style.container}>
            <div className = {style.icon}>
                <SearchRounded />
            </div>
            <div className = {style.input}>
                <input {...rest} ></input>
            </div>

        </div>
    )



}

export default searchInput