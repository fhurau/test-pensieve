import React, { useState } from "react";
import Table from "react-bootstrap/table";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import {SummaryData} from "../fakeData/data"
import Pagination from "./pagination";



const SummaryTable = () => {
  const navigate = useNavigate()
  const total = SummaryData.length

  const [search, setSearch] = React.useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = SummaryData?.slice(firstPostIndex, lastPostIndex);

  return (
    <div>
      <div className="mb-3 row justify-content-between ">
        <Form.Group className="col-3">
          <Form.Control
            className="rounded-pill border-0 text-light bg-dark text-center"
            type="search"
            placeholder="Search by Device Id/Type"
            aria-label="Search"
            onChange={(e)=>{setSearch(e.target.value)}}
            aria-describedby="search-addon"
          />
        </Form.Group>
        <div className="d-flex justify-content-end">
        <Pagination
          totalPosts={SummaryData?.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
      </div>
      <Table responsive="sm">
        <thead>
          <tr className="text-light">
            <th></th>
            <th>Device ID</th>
            <th>Device Type</th>
            <th>Time Stamp</th>
            <th>Location</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.filter(((item)=>{
            if(search == ""){
              return item
            }else if(item.deviceId.toLocaleLowerCase().includes(search.toLocaleLowerCase())){
              return item
            }else if(item.deviceType.toLocaleLowerCase().includes(search.toLocaleLowerCase())){
              return item
            }
          })).map((item, index) => (
            <tr key={index} className="text-light">
              <td></td>
              <td>{item.deviceId}</td>
              <td> {item.deviceType} </td>
              <td> {item.coordinate[item.coordinate.length-1]?.timeStamp} </td>
              <td> {item.coordinate[item.coordinate.length-1]?.location}</td>
              <td className="text-end">
                <button
                  onClick={()=>navigate(`/detail/${index}`)}
                  className="text-decoration-none text-black hover bg-black"
                >
                  see detail <BsArrowRight className="text-white" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SummaryTable;
