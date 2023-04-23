import { useState, useCallback, useEffect, useMemo } from "react";
import styled from "styled-components";

interface CarouselProps {
  items: React.ReactNode[];
}

export default function Carousel({ items }: CarouselProps) {
  const itemsLength = useMemo(() => items.length, [items]);
  const keys = useMemo(() => [...Array(itemsLength).keys()], [itemsLength]);
  const [index, setIndex] = useState(keys);

  const [isTicking, setIsTicking] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  const prevClick = useCallback(
    (jump = 1) => {
      if (!isTicking) {
        setIsTicking(true);
        setIndex((prev) => {
          return prev.map((_, i) => prev[(i + jump) % itemsLength]);
        });
      }
    },
    [isTicking, itemsLength]
  );

  const nextClick = useCallback(
    (jump = 1) => {
      if (!isTicking) {
        setIsTicking(true);
        setIndex((prev) => {
          return prev.map(
            (_, i) => prev[(i - jump + itemsLength) % itemsLength]
          );
        });
      }
    },
    [isTicking, itemsLength]
  );

  const handleDotClick = (idx: number) => {
    if (idx < activeIdx) prevClick(activeIdx - idx);
    if (idx > activeIdx) nextClick(idx - activeIdx);
  };

  const isFirstSlide = () => {
    return activeIdx === 0;
  };

  const isLastSlide = () => {
    return activeIdx === itemsLength - 1;
  };

  useEffect(() => {
    if (isTicking) {
      setTimeout(() => setIsTicking(false), 300);
    }
  }, [isTicking]);

  useEffect(() => {
    setActiveIdx((itemsLength - (index[0] % itemsLength)) % itemsLength);
  }, [index, itemsLength]);

  return (
    <Wrapper>
      <div className="carousel__wrap">
        <div className="carousel__inner">
          <div className="carousel__container">
            <ul className="carousel__slide-list">
              {items.map((item, i) => i === activeIdx && <li>{item}</li>)}
            </ul>
          </div>
          <div className="carousel__btn_container">
            <button
              type="button"
              disabled={isFirstSlide()}
              className="carousel__btn carousel__btn--prev"
              onClick={() => prevClick()}
            >
              <i
                className={`carousel__btn-arrow carousel__btn-arrow--left ${
                  isFirstSlide() ? "" : "active"
                }`}
              />
            </button>
            <div className="carousel__dots">
              {items.map((_, i) => (
                <button
                  type="button"
                  // eslint-disable-next-line react/no-array-index-key
                  key={i}
                  aria-label="navigation"
                  onClick={() => handleDotClick(i)}
                  className={i === activeIdx ? "dot active" : "dot"}
                />
              ))}
            </div>
            <button
              type="button"
              className="carousel__btn carousel__btn--next"
              disabled={isLastSlide()}
              onClick={() => nextClick()}
            >
              <i
                className={`carousel__btn-arrow carousel__btn-arrow--right ${
                  isLastSlide() ? "" : "active"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .carousel__wrap {
    display: flex;
    position: relative;
    width: fit-content;
    height: fit-content;
  }

  .carousel__inner {
    position: relative;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .carousel__container {
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  .carousel__slide-list {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .carousel__btn_container {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .carousel__btn {
    background: 0;
    border: 0;
    display: flex;

    &--prev {
      left: 0rem;
    }

    &--next {
      right: -5rem;
    }
  }

  .carousel__btn-arrow {
    border: solid rgba(252, 118, 65, 0.2);
    border-width: 0 0.2rem 0.2rem 0;
    height: 16px;
    width: 16px;
    z-index: 5;
    margin: 0px 26px;

    &--left {
      transform: rotate(135deg);
    }

    &--right {
      transform: rotate(-45deg);
    }

    &.active {
      cursor: pointer;
      border: solid #fc7641;
      border-width: 0 0.2rem 0.2rem 0;
    }
  }

  .carousel__dots {
    display: flex;
    gap: 16px;
    .dot {
      background: transparent;
      border: 1px solid #fc7641;
      border-radius: 50%;
      cursor: pointer;
      width: 16px;
      height: 16px;

      &.active {
        background: #fc7641;
      }
    }
  }
`;
