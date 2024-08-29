import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ImageSlider({
  setOpen,
  hotel,
  slideNumber,
  setSlideNumber,
}) {
  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === 'l') {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  return (
    <div className="slider">
      <FontAwesomeIcon
        icon={faCircleXmark}
        className="close"
        onClick={() => setOpen(false)}
      />
      <FontAwesomeIcon
        icon={faCircleArrowLeft}
        className="arrow"
        // onClick={() => handleMove('l')}
      />
      <div className={'wrapper'}>
        <img src={hotel.photos[slideNumber]} alt="" className="sliderImg" />
      </div>
      <FontAwesomeIcon
        icon={faCircleArrowRight}
        className="arrow"
        onClick={() => handleMove('r')}
      />
    </div>
  );
}
