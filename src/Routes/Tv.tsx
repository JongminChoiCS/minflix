import styled from "styled-components";
import { useQuery } from "react-query";

import {
  getTvlatest,
  getTvpopular,
  getTvTopRated,
  IGetShowResult,
} from "../api";
import { makeImgagePath } from "../utils";

import { TvShowSlider, TvModal } from "../Components/index";

// styled
import {
  Wrapper,
  Loader,
  Title,
  MoviInfo,
  Overview,
  MainMovie,
} from "../styled/MainBanner";

import { Slider, SliderTitle } from "../styled/MainConent";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";

const TV = () => {
  const history = useNavigate();
  const bigMovieMatch: PathMatch<string> | null = useMatch("/minflix/tv/:tvId");

  const { isLoading: isLoadingPopular, data: popularData } =
    useQuery<IGetShowResult>(["TvShow", "Tvpopular"], getTvpopular);

  const { isLoading: isLoadingTvTopRated, data: tvTopRatedData } =
    useQuery<IGetShowResult>(["TvShow", "TvTopRated"], getTvTopRated);

  const { isLoading: isLoadingTvlatest, data: tvlatestData } =
    useQuery<IGetShowResult>(["TvShow", "Tvlatest"], getTvlatest);

  const loading = isLoadingPopular || isLoadingTvTopRated || isLoadingTvlatest;

  // 영화 리스트 상세정보
  const onBoxClicked = (tvId: number) => {
    history(`/minflix/tv/${tvId}`);
  };

  return (
    <Wrapper>
      {loading ? (
        <Loader>Loading ...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImgagePath(
              popularData?.results[0].backdrop_path || ""
            )}
          >
            <Title>{popularData?.results[0].name}</Title>
            <MoviInfo>
              <span>First broadcast</span>
              {popularData?.results[0].first_air_date}
              <span>Rate</span>⭐ {popularData?.results[0].vote_average} 점
              <span>Languate</span>
              {popularData?.results[0].original_language.toUpperCase()}
            </MoviInfo>
            <Overview>{popularData?.results[0].overview}</Overview>
            <MainMovie
              onClick={() => {
                const id = popularData?.results[0].id;
                if (id === undefined) return;
                onBoxClicked(id);
              }}
            >
              Details
            </MainMovie>
          </Banner>
          <Slider>
            <SliderTitle>New Tv Show</SliderTitle>
            <TvShowSlider tvshow={tvlatestData?.results!} />
          </Slider>
          <Slider>
            <SliderTitle>Popular Tv Show</SliderTitle>
            <TvShowSlider tvshow={popularData?.results!} />
          </Slider>
          <Slider>
            <SliderTitle>Best Rate Tv Show</SliderTitle>
            <TvShowSlider tvshow={tvTopRatedData?.results!} />
          </Slider>
          <TvModal modal={bigMovieMatch?.params.tvId!} />
        </>
      )}
    </Wrapper>
  );
};

export const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

export default TV;
