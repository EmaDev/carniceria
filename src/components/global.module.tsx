import styled from 'styled-components';

export const Title = styled.h1`
   font-size: 2.2rem;
   font-weight: 700;
   margin: 1rem;
`;

export const Span = styled.span`
  font-size: 1.6rem;
  font-weight: 700;
  margin: 1rem;
  color:gray;
`;

export const Separator = styled.div`
   width: 95%;
   margin: 1rem auto;
   height: 2px;
   background-color: gray;
`;

export const CategoryButton = styled.button<any>`
   padding: 1rem; 
   margin: .3rem;
   background-color: ${({active}) => active ? '#65815D' : '#404040'};
   border-style:none;
   border-radius: 6px;
   font-size: 1.4rem;
   font-weight: 700;
   color: #fff;
   
   &:hover{
    box-shadow: 1px 1px 5px #1C1B1B;
   }
`;

export const ButtonContainer = styled.div`
  width: 90%; 
  display: flex;
  justify-content:space-between;
  margin: 1rem auto;
`;

export const Button = styled.button`
   width: 90%;
   display:block;
   padding: 1rem; 
   margin: 1rem auto;
   background-color: #D8A133;
   border-style:none;
   border-radius: 6px;
   font-size: 1.6rem;
   font-weight: 700;
   color: #fff;
   text-align:center;

   &:hover{
    background-color: #A77717;
    transition: .5s ease;
   }
`;
export const Input = styled.input`
   border-style: none;
   width: 90%;
   display: block;
   margin: 1rem auto;
   padding: 1rem;
   font-size: 1.6rem;
   font-weight: 700;
   background-color: #fff;
   color: #404040;
   border-radius: 8px;
`; 

export const Table = styled.table`
  margin:auto; 
  overflow-x: auto;
  background-color: #393939;
  border-radius: 8px;
  tr{
    background-color: #404040;
  }
  th{
    font-size: 1.8rem;
    font-weight: 700;
    color: #fff;
    padding: 1rem;
    border-radius: 3px;
  }
  td{
    padding: 1rem .5rem;
    border-radius: 3px;
    
    button{
        display:block;
        margin: 5px auto;
        width: 90%;
    }
  }
`;