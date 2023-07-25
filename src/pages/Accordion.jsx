import "../styles/Widget.css";
import PropTypes from 'prop-types';
const Accordion = (props) => {




    return (
        <div className="accordianTab">
          <h5>You may be wondering</h5>
          <div className="accordion accordion-flush" id="accordionFlushExample">
            {props.widgets && props.widgets.map((item, index) => {
                return (
                    <div key={index} className="accordion-item">
              <h2 className="accordion-header" id="flush-headingOne">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target={`#${item.id}`} aria-expanded="false" aria-controls={item.id}>
                  {item.question}
                </button>
              </h2>
              <div id={item.id} className="accordion-collapse collapse" aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                  {item.answer}
                </div>
              </div>
            </div>
                )
            })}
          </div>
        </div>
    );
};

Accordion.propTypes = {
    widgets: PropTypes.any,
  }
export default Accordion;