import React from 'react';
import styled from 'styled-components'
import Title from './elements/Title'
import ContentsWrapper from './elements/ContentsWrapper'
import HomeContentCards from './HomeContentCards'

const dummyData1 = [
  {
    img: '',
    title: 'Product Sample 1',
    desc: 'product sample product sample product sample product sample product sample'
  },
  {
    img: '',
    title: 'Product Sample 2',
    desc: 'product sample product sample product sample product sample product sample'
  },
  {
    img: '',
    title: 'Product Sample 3',
    desc: 'product sample product sample product sample product sample product sample'
  },
  {
    img: '',
    title: 'Product Sample 4',
    desc: 'product sample product sample product sample product sample product sample'
  },
]

const dummyData2 = [
  {
    img: '',
    title: 'Product Sample 1',
    desc: 'product sample product sample product sample product sample product sample'
  },
  {
    img: '',
    title: 'Product Sample 2',
    desc: 'product sample product sample product sample product sample product sample'
  }
]

const HomeContents = () => {
    return (
        <ContentsWrapper>
          <Title>BEST</Title>
          <HomeContentCards data={dummyData1} />
          <Title>NEW</Title>
          <HomeContentCards data={dummyData2} />
        </ContentsWrapper>
    );
}

export default HomeContents