import PropTypes from 'prop-types';
import './style.css';
import { useEffect, useState } from 'react';
import { paginationList } from '../../utils';

function Pagination({pagination, onLoad}) {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(paginationList(pagination.currentPage, pagination.totalPages));
  }, [pagination])

  return (
    <div className="Pagination">
      {list.map((item, index) => {
        if(item === "...")
          return <div key={index}>{item}</div>

        return <button
                className={pagination.currentPage === item ? "active" : ""}
                onClick={() => onLoad(item)}
                key={index}>{item}</button>
      }
      )}
    </div>
  )
}

Pagination.propsTypes = {
  pagination: PropTypes.shape({
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
  }),
  onLoad: PropTypes.func,
}

Pagination.defaultTypes = {
  onLoad: () => {}
}

export default Pagination;

