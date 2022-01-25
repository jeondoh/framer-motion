import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import {
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
} from "framer-motion";

const Wrapper = styled(motion.div)`
  height: 200vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BiggerBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: grid;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  hover: { rotateZ: 90 },
};

function App() {
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-200, 200], [-360, 360]);
  const gradient = useTransform(
    x,
    [-200, 0, 200],
    [
      "linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))",
      "linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238))",
      "linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))",
    ]
  );
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 3]);
  const biggerBoxRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Wrapper style={{ background: gradient }}>
        <BiggerBox ref={biggerBoxRef}>
          <Box
            style={{ x, rotateZ, scale }}
            drag
            dragSnapToOrigin // 드래그를 놓을 때 중심/원점으로 다시 애니메이션
            dragElastic={0.2} // 제한된 바깥을 벗어날 수 있는 수치(당기는힘)
            dragConstraints={biggerBoxRef} // 드래그 가능 영역에 제약 조건을 적용
            variants={boxVariants}
            whileHover="hover"
          />
        </BiggerBox>
      </Wrapper>
    </>
  );
}

export default App;
