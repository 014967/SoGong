import react from 'react'
import {StyleTh , Stylebtn, StyleCB, StyleTB, Bars , PinkBars} from '../styles/NoticeListStyle';
const NoticeList = () =>
{
return (
<>
    <div>
      <StyleTB>
        
        <thead>
        
          <tr>
         
          <StyleCB type="checkbox" />
          <Stylebtn>선택 비활성화</Stylebtn>
          <Stylebtn>선택 활성화</Stylebtn>
          <Stylebtn>선택 삭제</Stylebtn>
          <Stylebtn>정렬하기</Stylebtn>
          <Stylebtn>필터링</Stylebtn>
          <Bars/>
          <Stylebtn>등록</Stylebtn>
          

          
          
          </tr>
        </thead>
        </StyleTB>
        <PinkBars/>
        <StyleTB>
        <thead>
           
          
          <tr>
           <StyleTh>선택</StyleTh>
           <StyleTh>제목</StyleTh>
           <StyleTh>활성화/비활성화</StyleTh>
           <StyleTh>기간</StyleTh>

          </tr>
        </thead>
        
        <tbody>
          <tr>
            <StyleCB type="checkbox"/>
            <td>첫번째 게시글입니다.</td>
            <td>2020-10-25</td>
            <td>6</td>
          </tr>
        
        </tbody>
      </StyleTB>
      </div>
    </>
    
    )
}
    export default NoticeList;