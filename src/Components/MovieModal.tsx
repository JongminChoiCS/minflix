import { AnimatePresence, useViewportScroll } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { makeImgagePath } from "../utils";

import { getMovieDetail, IGetMovieDetail } from "../api";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import {
  BigCover,
  BigImg,
  BigMain,
  BigMovie,
  BigOverbiew,
  BigText,
  BigTitle,
  Overlay,
} from "../styled/MainConent";

interface IModal {
  modal: string;
}

// 영화 List click modal창 on/off animations
const itemVariants = {
  hidden: { opacity: 0 },
  active: {
    opacity: 1,
    transition: {
      duration: 1,
      type: "tween",
    },
  },
};

const Modal = ({ modal }: IModal) => {
  const [modalData, setModalData] = useState<IGetMovieDetail>();
  const { scrollY } = useViewportScroll();
  const history = useNavigate();

  const onOverlayClick = () => history("/minflix"); // home으로 이동

  const { data: detail } = useQuery<IGetMovieDetail>(
    ["search", "detail"],
    () => getMovieDetail(modal),
    { enabled: !!modal }
  );

  useEffect(() => {
    setModalData(detail);
  }, [detail]);

  return (
    <AnimatePresence>
      {modal && (
        <>
          <Overlay
            variants={itemVariants}
            onClick={onOverlayClick}
            initial="hidden"
            animate="active"
            transition={{ type: "tween", duration: 1 }}
          />

          <BigMovie layoutId={modal} style={{ top: scrollY.get() + 200 }}>
            {modalData && (
              <>
                <BigCover
                  style={{
                    backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImgagePath(
                      modalData.backdrop_path,
                      "w500"
                    )})`,
                  }}
                />
                <BigMain>
                  <BigTitle>{modalData.title}</BigTitle>
                  <BigText>
                    <span>Release Date</span>
                    {modalData.release_date}
                    <span>Rate</span>⭐ {modalData.vote_average}
                    <span>Language</span>
                    {modalData.original_language.toUpperCase()}
                  </BigText>
                  <BigImg
                    style={{
                      backgroundImage: `url(${makeImgagePath(
                        modalData.poster_path,
                        "w200"
                      )})`,
                    }}
                  />
                </BigMain>
                <BigOverbiew>{modalData.overview}</BigOverbiew>
              </>
            )}
          </BigMovie>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
