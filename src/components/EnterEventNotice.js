import styled from 'styled-components'
import Button from './elements/Button';

import DatePicker from "react-datepicker";
import {useState} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { Dropdown, Selection } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width:900px;
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 64px;
  padding: 0 16px;
  border-bottom: 1px solid ${({ theme }) => theme.color.secondary};
  justify-content: flex-end;
`
const Table = styled.div`
display : flex;
`
const ImgTitle = styled.div
`
display : flex;
`



const EnterEventNotice =() =>
{

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [title, setTitle] = useState("");
    const [description, setDiscription] = useState("");
    const [ImgFile, setImgFile] = useState(null);
    const [priority , setPriority] = useState("");



    const handleTitle = e =>
    {
        setTitle(e.target.value);
    }
    const handleDiscription = e =>
    {
        setDiscription(e.target.value);
    }

    const getImg = e=>
    {
        setImgFile(e.target.files[0]);
    }

    const submit = async () => {
      const formData = new FormData();
      formData.append('file', ImgFile);
      console.log(ImgFile)
      console.log('~~~~')
      const response = await axios.post('/api/events/image/:id', formData)
      console.log(response)
        // return axios.post("", title, description, formData , startDate, endDate, priority).then(res => {
        //     alert('성공')
        //   }).catch(err => {
        //     alert('실패')
        //   })


    }
    return (
        <Container>
            <Header>
                <Button background ="primary" onClick={submit}>
                    등록하기
                </Button>
            </Header>
            <Table>
            <div>
                <div>제목 *</div>
                <div>설명 *</div>
                <div>배너 이미지*</div>
                <div>진행기간 *</div>
                <div>표시 순서 *</div>
            </div>
            <div>
                <div>
                    <textarea placeholder="제목입력" onChange={handleTitle}></textarea>
                </div>
                <div>
                    <textarea placeholder="설명" onChange={handleDiscription}></textarea>
                </div>
                <ImgTitle>
                    <input type="file" accept="image/x-png,image/jpeg" name ="img" onChange={getImg}/>
                </ImgTitle>
                    <div>
                        <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                        부터
                        <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
                        까지
                    </div>
                <div>
                <Dropdown
                    placeholder="Select an option"
                    className="my-className"
                    options={['1', '2', '3', '4','5','6','7','8','9','10']}
                    value="1"
                    onChange={(value) => setPriority(value)}
                    onSelect={(value) => setPriority(value)} // always fires once a selection happens even if there is no change
                    onClose={(closedBySelection) => console.log('closedBySelection?:', closedBySelection)}
                    onOpen={() => console.log('open!')}
                />
                </div>
            </div>
            </Table>
        </Container>
    )
}

export default EnterEventNotice;