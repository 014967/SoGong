import React from 'react'
import styled from 'styled-components'
import Img1 from '../assets/images/banner1.PNG'

const Image = styled.img`
  width: 100%;
`

// ERROR: windows 환경에서는 require의 경로를 인식을 못한다고 함

const BannerContent = ({ img }) => {

  return (
    <div>
      {/* <Image src={require('../assets/images/banner1.PNG')} /> */}
      <Image src={Img1} />
    </div>
  )
}

export default BannerContent