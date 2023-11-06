import { useLocation } from 'react-router-dom';
import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';


const ShowPath = () => {
  //Extract the path of the last visited pade
  const location = useLocation();
  const currentPath = location.pathname;

  const pageList = currentPath.split("/");
  pageList.shift(); // pops first element

  function getFirstNElements(i) {
    if (i <= pageList.length) {
      return "/" + pageList.slice(0, i + 1).join("/");
    } else {
      return "/" + pageList.join("/");
    }
  }

  return (
    <div role="presentation">
      {
        currentPath == "/" ? (
          <div>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Home
              </Link>
            </Breadcrumbs>
          </div>) : (
          <div>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Home
              </Link>
              {pageList.map((e, i) => {
                return (
                  <Link underline="hover" color="inherit" href={getFirstNElements(i)}>
                    {e}
                  </Link>
                );
              })}
            </Breadcrumbs>
          </div>)
      }
    </div>
  );
}

export default ShowPath;
