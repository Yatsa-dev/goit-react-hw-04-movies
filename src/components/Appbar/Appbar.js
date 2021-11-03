import { useEffect, useRef, useMemo, useState } from 'react';
import Navigation from '../Navigation/Navigation';
import ButtonToTop from 'components/ButtonToTop';

import s from './Appbar.module.css';

export default function Appbar() {
  const ref = useRef();
  // const buttonIsShow = useRef(null);
  // const [show, setShow] = useState(null);

  const observer = useMemo(() => {
    return new IntersectionObserver(
      ([entry]) => {
        console.log(entry);
        if (entry.isIntersecting) {
          console.log('It works!');
          // setShow(true);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      },
    );
  });

  useEffect(() => {
    if (ref.current) {
      observer.observe(ref.current);
      // setShow(false);
    }
  }, [observer]);

  return (
    <>
      <header className={s.header} ref={ref}>
        <Navigation />
      </header>
      <ButtonToTop />
      {/* как здесь сделать рендер кнопки по условию */}
    </>
  );
  // }
}
