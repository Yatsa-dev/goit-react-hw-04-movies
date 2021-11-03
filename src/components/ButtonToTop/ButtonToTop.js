import s from './ButtonToTop.module.css';

export default function ButtonToTop({ show }) {
  const buttonToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <>
      {/* {show && ( */}
      <button className={s.scrollToTopBtn} onClick={buttonToTop}>
        &#11165;
      </button>
      {/* )} */}
    </>
  );
}
