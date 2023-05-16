import { useState } from "react"
import PropTypes from 'prop-types'
import { toast } from "react-toastify"
import { HeaderForm, SearchButton, StyledForm,SearchInput } from 'components/Searchbar/Searchbar.styled'
import {BiSearchAlt} from "react-icons/bi";

export const Searchbar = ({formSubmit}) => {

  const [imagesName, setImagesName] = useState('');


   const handleImagesName = (e) => {
      setImagesName(e.currentTarget.value.toLowerCase())
    }
   const heandleSudmit =(e) => {
      e.preventDefault()
      if(imagesName.trim() === '') {
        toast.warn("Please, Enter you search");
        return
      }
     formSubmit(imagesName)
     setImagesName('')
    }

        return (
            <HeaderForm>
             <StyledForm onSubmit={heandleSudmit}>
             <SearchButton type="submit">
              <BiSearchAlt size={'100%'} color={'#0e7545'}/>
             </SearchButton>

    <SearchInput
      type="text"
      autoComplete="off"
      value={imagesName}
      autoFocus
      placeholder="Search images or photos"
      onChange={handleImagesName}
    />
  </StyledForm>
</HeaderForm>
        )
    }

Searchbar.propTypes = {
  formSubmit: PropTypes.func.isRequired
}