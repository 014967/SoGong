import React from 'react'
import styled from 'styled-components'
import Text from './elements/Text'
import Logo from './elements/Logo'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: auto;

  height: 320px;
  padding: 32px 64px;
  
  background: ${({ theme }) => theme.color.primary};
`

const Footer = () => {
  return (
    <Container>
      <Text color="background" size="14px">
        사업자 정보:K-SINSA |이용약관:Copyright © 2021 SoGong. All rights reserved.| 대표: 권철
      <br /><br />
      모든 상품의 경우 K-SINSA(이하 "회사")는 판매의 당사자가 아닌 웹 프로젝트로서<br />
      상품, 상품정보, 거래에 대한 책임이 제한될 수 있으므로, 각 상품 페이지에서 구체적인 내용을 확인하시기 바랍니다.
      <br /><br />
      개인정보처리 방침: K-SINSA는 이용자의 ‘동의를 기반으로 개인정보를 수집·이용 및 제공’하고 있으며, ‘이용자의 권리 (개인정보 자기결정권)를 적극적으로 보장’합니다.<br />
      회사는 정보통신서비스제공자가 준수하여야 하는 대한민국의 관계 법령 및 개인정보보호 규정, 가이드라인을 준수하고 있습니다.<br />
      “개인정보처리방침”이란 이용자의 소중한 개인정보를 보호함으로써 이용자가 안심하고 서비스를 이용할 수 있도록 회사가 준수해야 할 지침을 의미합니다.
      </Text>
      <Logo color="background" />
    </Container>
  )
}

export default Footer