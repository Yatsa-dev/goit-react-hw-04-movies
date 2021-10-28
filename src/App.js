/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-self-compare */
import { useState,useEffect } from 'react';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.module.css';

import fetchApi from 'components/Service-api';
import Container from 'components/Container';
import Searchbar from 'components/Searchbar';


const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function App () {
//   const[status,setStatus] = useState(Status.IDLE);
//   const[query,setQuery] = useState('');

// useEffect(() => {
//  if(!query){
//    return
//  }
//     setStatus(Status.PENDING );
//       fetchApi(query, page)
//       .then(data => data.hits)
//       .then(data => {
//         setImageArr([...imageArr,...data]);
//         setStatus(Status.RESOLVED)
//           if(page!==1) {
//             window.scrollTo({
//             top: document.documentElement.scrollHeight,
//             behavior: 'smooth',
//           })
//         }
//       });
// },[page,query])

// const handleFormSubmit = query =>{
//   setQuery(query);
//   setPage (1);
// };



    return (
      <Container>
        {/* <Searchbar onSubmit={handleFormSubmit} />
        {status === Status.PENDING && <Spinner />}
        <ToastContainer autoClose={2000}/> */}
        </Container>
    );
 }




