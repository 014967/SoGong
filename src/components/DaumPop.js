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
      setAddress(fullAddress);  // e.g. '?????? ????????? ????????????2??? 20 (?????????1???)'
      setZonecode(data.zonecode)
    }

    const handleSubmit = async () => {
      if (extraAddress.length === 0 ||
        username.length === 0 ||
        name.length === 0 ||
        phonenumber.length === 0
      ) {
          alert('??????????????? ???????????? ??????????????????.')
          return
      }
      const reg = /^\d{3}-\d{3,4}-\d{4}$/ //?????????
      if (!reg.test(phonenumber)) {
        alert('???????????? ????????? ?????? ????????????.')
        return
      }
      const { data: res } = await axios.get('/api/delivery')
      if (res.delivery &&
        res.delivery.filter(v => v.deliveryname === name).length > 0
      ) {
        alert('?????? ????????? ?????????????????????.')
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
        alert('?????????????????????.')
        setOpen(false)
    }

    return (
        <Container style={modalStyle} className={classes.paper}>
          { address.length === 0 ? 
            <Postcode onComplete={handleComplete} /> :
            <ExtraContainer>
              <Title>????????? ??????</Title>
              <div>{address} ({zonecode})</div><br />
              <div>
                <div>?????? ??????</div>
                <Input value={extraAddress} onChange={(e) => setExtraAddress(e.target.value)} />
              </div>
              <div>
                <div>?????? ??????</div>
                <Input value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div>
                <div>????????????</div>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <div>???????????????("-" ???????????? ??????)</div>
                <Input value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} />
              </div>
              <CheckBoxContainer>
                <CheckBox value={defaultAddress} onChange={(e) => setDefaultAddress(e.target.value)} />
                <div>?????? ???????????? ??????</div>
              </CheckBoxContainer>
              <div>
                <Button onClick={handleSubmit}>??????</Button>
              </div>
            </ExtraContainer>
          }
        </Container>
    )
}
export default DaumPop;
// {
//   "deliveryname":"?????????1",
//   "name":"?????????",
//   "address":"??????????????? ~??? ~??? ~??? 100",
//   "detailaddress":"~??? ~???",
//   "zonecode":"12345",
//   "phonenumber":"010-8282-8282"
//   } //??????