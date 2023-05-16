import { InfinitySpin } from 'react-loader-spinner'
import {StyledLoader} from './Loader.styled'

export const Loader = () => {
    return <>
    <StyledLoader>
    <InfinitySpin 
        width='200'
         color="#4fa94d"/>
    </StyledLoader>
    </>

}
