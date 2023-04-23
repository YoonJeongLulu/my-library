import styled, { css } from "styled-components";
import { useRef, useCallback } from "react";

import useOnClickOutside from "hooks/useOnClickOutside";

interface CssProps {
  width: string; // Modal width with unit
  height: string; // Modal height with unit
  position?: "left" | "right" | "center"; // Modal position, default = 'center'
  styles?: React.CSSProperties | undefined; // Container custom css (e.g borderRadius, boxShadow...)
}

interface ModalProps extends CssProps {
  children: React.ReactNode; // Modal content;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>; // Modal open & close controller
}

export default function Modal({
  width,
  height,
  position = "center",
  styles,
  children,
  setOpenModal,
}: ModalProps) {
  const modalRef = useRef(null);

  const handleClickOutside = useCallback(() => {
    setOpenModal(false);
  }, [setOpenModal]);

  useOnClickOutside(modalRef, () => handleClickOutside);

  return (
    <Background>
      <Container
        ref={modalRef}
        width={width}
        height={height}
        position={position}
        style={styles}
      >
        {children}
      </Container>
    </Background>
  );
}

const Background = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 5;
`;

const Container = styled.div<CssProps>`
  position: absolute;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  top: ${({ height }) => `calc((100vh - ${height}) / 2)`};
  box-sizing: border-box;
  background: #ffffff;
  animation: message-bg-show 0.3s;

  ${({ width, position }) => {
    switch (position) {
      case "left":
        return css`
          left: calc((50vw - ${width}) / 2);
        `;
      case "right":
        return css`
          left: calc(50vw + (50vw - ${width}) / 2);
        `;
      default: // 'center'
        return css`
          left: calc((100vw - ${width}) / 2);
        `;
    }
  }}

  @keyframes message-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
