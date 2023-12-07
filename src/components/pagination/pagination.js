import PropTypes from 'prop-types';
import './style.css';

function Pagination({pagination, onLoad}) {
  return (
    <div className="Pagination">
      {pagination.list.map((item, index) => {
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
    list: PropTypes.arrayOf(PropTypes.number),
  }),
  onLoad: PropTypes.func,
}

Pagination.defaultTypes = {
  onLoad: () => {}
}

export default Pagination;

