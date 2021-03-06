import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory , useLocation } from 'react-router';
import Button from './elements/Button';
import {format} from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 64px;
  padding: 0 16px;
  border-bottom: 1px solid ${({ theme }) => theme.color.secondary};
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 64px 32px 0;
    margin-bottom: 64px;
    width: 100%;
    & > * + * {
        margin-top: 64px;
    }
`

const InputContainer = styled.div`
    display: flex;
    max-width: 1094px;
`
const Title = styled.div`
    display: flex;
    align-items: center;
    width: 200px;
    height: 47px;
    font-size: 32px;
    font-family: ${({ theme }) => theme.font.regular};
    color: ${({ theme }) => theme.color.secondary};
`

const Input = styled.input`
    border: 1px solid ${({ theme }) => theme.color.primary};
    &:focus {
        outline: none;
    }
    font-size: 20px;
    font-family: ${({ theme }) => theme.font.light};
    height: 48px;
    width: 894px;
    max-width: 894px;
    padding-left: 8px;
`

const Textarea = styled.textarea`
    border: 1px solid ${({ theme }) => theme.color.primary};
    &:focus {
        outline: none;
    }
    font-size: 20px;
    font-family: ${({ theme }) => theme.font.light};
    height: 640px;
    width: 894px;
    max-width: 894px;
    padding: 8px;
    resize: none;
`

const FileInput = styled.input`
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip:rect(0,0,0,0);
    border: 0;
`

const LabelButton = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 164px;
    height: 48px;
    color: white;
    background: ${(props) => props.theme.color[props.background] || props.theme.color.secondary};
    border: none;
    border-radius: 32px;
    font-size: 20px;
    font-family: ${({ theme }) => theme.font.light};
    cursor: pointer;
    &:focus {
    outline: none;
    }
`
const FileName = styled.div`
    display: flex;
    align-items: center;
    font-size: 16px;
    height: 48px;
    padding-left: 8px;
`

const DateText = styled.div`
    display: flex;
    align-items: center;
    font-size: 24px;
    height: 48px;
    padding: 0 16px 0 8px;
`
const StyledDatePicker = styled(DatePicker)`
    border: 1px solid ${({ theme }) => theme.color.primary};
    font-size: 20px;
    font-family: ${({ theme }) => theme.font.light};
    height: 48px;
    width: 200px;
    padding-left: 8px;
    cursor: pointer;
`
const regDate = date => date.split('.')[0].replace(/-|T/g, '/')

const AlterEventNotice = ({ data, setAlter }) => {
    const history = useHistory();
    const location = useLocation();

    const [startDate, setStartDate] = useState(new Date(regDate(data.date)))
    const [endDate, setEndDate] = useState(new Date(regDate(data.due)))
    const [title, setTitle] = useState(data.title)
    const [description, setDiscription] = useState(data.detail)
    const [priority , setPriority] = useState('1')
    const [imgFile, setImgFile] = useState(null)
    const [imgFileName, setImgFileName] = useState(data.img)
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!title || !description) {
            alert('?????? ?????? ????????? ???????????? ??????????????????.')
            return
        }
        _setEndDate(endDate)

        const stringStartDate = format(startDate.setHours(startDate.getHours() + 9), "yyyy-MM-dd'T'HH:mm:ss")
        const stringEndDate = format(_setEndDate(endDate), "yyyy-MM-dd'T'HH:mm:ss")
        const response = await axios.put(`api/events/${data._id}`, {
            title: title,
            available: true,
            token: false,
            detail: description,
            date: stringStartDate,
            due: stringEndDate,
            bannerNo: priority.label,
        })
        .catch((err) => console.log('error'))
        if (imgFile) {
            const formData = new FormData()
            formData.append('img', imgFile)
            const res = await axios.post(`/eventImg/${response.data._id}`, formData)
            .catch((err) => console.log('error', err))
            // const resImg = await axios.post('/eventImgDel', { imgPaths: ['../src/assets/images/banners/' + data.img] })
            // .catch((err) => console.log('error', err))
            .then(setAlter(null))
        } else {
            setAlter(null)
        }
    }

    const handleTitle = e => {
        setTitle(e.target.value)
    }
    const handleDiscription = e => {
        setDiscription(e.target.value)
    }

    const getImg = e => {
        setImgFile(e.target.files[0])
        setImgFileName(e.target.files[0].name)
    }

    const _setEndDate = (date) => {
        const _endDate = new Date(date)
        _endDate.setHours(23)
        _endDate.setMinutes(59)
        _endDate.setSeconds(59)
        setEndDate(_endDate)
        return _endDate
    }

    return (
        <>
            <Header>
                <Button background ="primary" onClick={handleSubmit}>
                    ??????
                </Button>
            </Header>
            <Container>
                <InputContainer>
                    <Title>??????*</Title>
                    <Input placeholder="?????? ??????" value={title} onChange={handleTitle}></Input>
                </InputContainer>
                <InputContainer>
                    <Title>??????*</Title>
                    <Textarea placeholder="?????? ??????" value={description} onChange={handleDiscription}></Textarea>
                </InputContainer>
                <InputContainer>
                    <Title>?????? ?????????*</Title>
                    <LabelButton for="file_input">????????? ?????????</LabelButton>
                    <FileInput type="file" accept="image/x-png,image/jpeg" id ="file_input" name="img" onChange={getImg} />
                    <FileName>{imgFileName}</FileName>
                </InputContainer>
                <InputContainer>
                    <Title>?????? ??????*</Title>
                    <StyledDatePicker 
                        dateFormat="yyyy/MM/dd"
                        selected={startDate} 
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        onChange={date => setStartDate(date)} />
                    <DateText>??????</DateText>
                    <StyledDatePicker 
                      dateFormat="yyyy/MM/dd"
                        selected={endDate}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        onChange={date => _setEndDate(date)} />
                    <DateText>??????</DateText>
                </InputContainer>
            </Container>
        </>
    ) 
}
export default AlterEventNotice;