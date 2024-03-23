import AnimationWrapper from "../common/page-animation";
import InPageNavigation from "../components/inpage-navigation.component";

const HomePage = () => {
  return (
    <AnimationWrapper>
      {/* flex justify-center */}
      <section className="h-cover gap-10">
        {/* latest blogs */}

        <div className="w-full"></div>

        <InPageNavigation
          routes={["home", "trending blogs"]}
          defaultHidden={["trending blogs"]}
        >
          <h1>Latest Blogs Here</h1>

          <h1>Trending Blogs Here</h1>
        </InPageNavigation>

        {/* filters and trending blogs */}

        <div></div>
      </section>
    </AnimationWrapper>
  );
};

export default HomePage;
