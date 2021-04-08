import React from 'react';
import styled from 'styled-components'
import Title from './elements/Title'
import HomeContentCards from './HomeContentCards'

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 64px 64px 0;
  margin-bottom: 128px;
  box-shadow: 0px 10px 40px #00000029;
  border-radius: 32px;
`

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
        <Container>
          <Title>BEST</Title>
          <HomeContentCards data={dummyData1} />
          <Title>NEW</Title>
          <HomeContentCards data={dummyData2} />
        </Container>
    );
}

export default HomeContents