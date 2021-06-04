import React, { useState } from 'react';
import Postcode from 'react-daum-postcode'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import Button from './elements/Button'
import Title from './elements/Title'
import axios from 'axios'
import CheckBox from './elements/CheckBox'

const Container = styled.div`

`;

const ExtraContainer = styled.div`

`
const CheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
  & > * + * {
    margin-left: 8px;
  }
`

const Input = styled.input`
  position: relative;
  width: 400px;
  height: 48px;
  border: solid 1px ${({ theme }) => theme.color.primary};
  background: white;
  font-size: 20px;
  font-family: ${({ theme }) => theme.font.light};
  padding-left: 8px;
  &:focus {
    outline: none;
  }
  margin-bottom: 32px;
`;

const getModalStyle = () => {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '1000px',
    padding: '64px 64px',
    boxShadow: '0px 10px 40px #00000029',
    borderRadius: '32px',
    background: 'white',
  },
}));

const DaumPop = ({ setOpen }) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [phonenumber, setPhonenumber] = useState('')
  const [address, setAddress] = useState('')
  const [extraAddress, setExtraAddress] = useState('')
  const [zonecode, setZonecode] = useState(0)
  const [defaultAddress, setDefaultAddress] = useState(false)

    const handleComplete = (data) => {
      let fullAddress = data.address;
      let extraAddress = ''; 
      
      if (data.addressType === 'R') {
        if (data.bname !== '') {
          extraAddress += data.bname;
        }
        if (data.buildingName !== '') {
          extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
        }
        fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
      }
      setAddress(fullAddress);  // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
      setZonecode(data.zonecode)
    }

    const handleSubmit = async () => {
      if (extraAddress.length === 0 ||
        username.length === 0 ||
        name.length === 0 ||
        phonenumber.length === 0
      ) {
          alert('필수사항을 입력하지 않으셨습니다.')
          return
      }
      const reg = /^\d{3}-\d{3,4}-\d{4}$/ //폰번호
      if (!reg.test(phonenumber)) {
        alert('전화번호 형식에 맞지 않습니다.')
        return
      }
      const { data: res } = await axios.get('/api/delivery')
      if (res.delivery &&
        res.delivery.filter(v => v.deliveryname === name).length > 0
      ) {
        alert('이미 등록된 배송지명입니다.')
        return
      }
      const { data: res2 } = await axios.post('/api/adddelivery', {
        deliveryname: name,
        default: defaultAddress,
        name: username,
        address: address,
        detailaddress: extraAddress,
        zonecode: zonecode,
        phonenumber: phonenumber
      })
        alert('등록되었습니다.')
        setOpen(false)
    }

    return (
        <Container style={modalStyle} className={classes.paper}>
          { address.length === 0 ? 
            <Postcode onComplete={handleComplete} /> :
            <ExtraContainer>
              <Title>배송지 등록</Title>
              <div>{address} ({zonecode})</div><br />
              <div>
                <div>상세 주소</div>
                <Input value={extraAddress} onChange={(e) => setExtraAddress(e.target.value)} />
              </div>
              <div>
                <div>받는 사람</div>
                <Input value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div>
                <div>배송지명</div>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <div>휴대폰번호("-" 포함해서 입력)</div>
                <Input value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} />
              </div>
              <CheckBoxContainer>
                <CheckBox value={defaultAddress} onChange={(e) => setDefaultAddress(e.target.value)} />
                <div>기본 배송지로 등록</div>
              </CheckBoxContainer>
              <div>
                <Button onClick={handleSubmit}>등록</Button>
              </div>
            </ExtraContainer>
          }
        </Container>
    )
}
export default DaumPop;
// {
//   "deliveryname":"우리집1",
//   "name":"홍길동",
//   "address":"서울특별시 ~구 ~동 ~로 100",
//   "detailaddress":"~동 ~호",
//   "zonecode":"12345",
//   "phonenumber":"010-8282-8282"
//   } //예시