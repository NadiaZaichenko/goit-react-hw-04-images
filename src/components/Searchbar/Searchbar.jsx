import { Component } from "react"
import PropTypes from 'prop-types'
import { toast } from "react-toastify"
import { HeaderForm, SearchButton, StyledForm,SearchInput } from 'components/Searchbar/Searchbar.styled'
import {BiSearchAlt} from "react-icons/bi";

export default class Searchbar extends Component {
    state = {
       imagesName : ''
    }

    handleImagesName = (e) => {
      this.setState({imagesName: e.currentTarget.value.toLowerCase()})
    }
    heandleSudmit =(e) => {
      e.preventDefault()
      if(this.state.imagesName.trim() === '') {
        toast.warn("Please, Enter you search");
        return
      }
      this.props.formSubmit(this.state.imagesName)
      this.setState({imagesName: ''})
    }


    render() {
        return (
            <HeaderForm>
             <StyledForm onSubmit={this.heandleSudmit}>
             <SearchButton type="submit">
              <BiSearchAlt size={'100%'} color={'#0e7545'}/>
             </SearchButton>

    <SearchInput
      type="text"
      autoComplete="off"
      value={this.state.imagesName}
      autoFocus
      placeholder="Search images or photos"
      onChange={this.handleImagesName}
    />
  </StyledForm>
</HeaderForm>
        )
    }
}
Searchbar.propTypes = {
  formSubmit: PropTypes.func.isRequired
}