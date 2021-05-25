import React, { useContext } from 'react'
import styled from 'styled-components'
import theme from '../styles/theme'
import SearchBar from './elements/SearchBar'
import Button from './elements/Button'
import Slider from '@material-ui/core/Slider'
import { withStyles } from '@material-ui/core/styles'
import { ProductListContext } from '../pages/App'

const Container = styled.div`
  display: flex;
`

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const ButtonContainer = styled.div`
  display: flex;
  margin-right: 16px;
  margin-bottom: 8px;
  & > * + * {
    margin-left: 4px;
  }
`

const CategoryButton = styled(Button)`
  background: ${(props) => props.theme.color[props.background] || props.theme.color.secondary};
  width: 100px;
  height: 30px;
  font-size: 14px;
`

const PriceSlider = withStyles({
  root: {
    color: '#DF988F',
    width: '275px',
    marginLeft: '16px'
  }
})(Slider)


const HeaderSearchBar = ({ location, history }) => {

  const { category, setCategory, search, setSearch, startPrice, setStartPrice, endPrice, setEndPrice, setSubmitFlag } = useContext(ProductListContext)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!location.pathname.includes('list'))
      history.push('/list')
    setSubmitFlag(true)
    console.log(category, search, startPrice, endPrice)
  }

  const handleCategory = (cate) => {
    if (cate === category)
      setCategory('ALL')
    else
      setCategory(cate)
  }

  const handlePrice = (e, value) => {
    setStartPrice(value[0])
    setEndPrice(value[1])
  }  
  
  const handleColor = (cate) => category === cate ? 'primary' : 'secondary'

  return (
    <Container>
      <FilterContainer>
        <ButtonContainer>
          <CategoryButton background={handleColor('MEN')} onClick={() => handleCategory('MEN')}>MEN</CategoryButton>
          <CategoryButton background={handleColor('WOMEN')} onClick={() => handleCategory('WOMEN')}>WOMEN</CategoryButton>
          <CategoryButton background={handleColor('KIDS')} onClick={() => handleCategory('KIDS')}>KIDS</CategoryButton>
        </ButtonContainer>
        <PriceSlider 
          value={[startPrice, endPrice]}
          onChange={handlePrice}
          min={0}
          max={200000}
          step={1000}
          valueLabelDisplay="auto"
          // getAriaValueText={valuetext}
        />
      </FilterContainer>
      <SearchBar search={search} setSearch={setSearch} handleSubmit={handleSubmit} />
    </Container>
  )
}

export default HeaderSearchBar