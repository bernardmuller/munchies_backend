import MainUtiltityButton from 'components/buttons/main-util-button/MainUtilityButton';
import BlueHero from 'components/hero/hero/BlueHero';
import { useMealsData } from 'hooks/mealsHooks';
import HeroCard from '../../components/cards/hero-card/HeroCard';
import PageHeader from '../../components/headers/page-header/PageHeader';
import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import NavBar from '../../components/navbar/navbar/NavBar';
import BasicMealSlider from '../../components/sliders/basic-slider/BasicSlider';
import { NextPageWithLayout } from '../page';

const Home: NextPageWithLayout = () => {
  const { data, isLoading } = useMealsData();
  if (isLoading) return <div>Loading...</div>;
  return (
    <section className="flex flex-col gap-8 overflow-hidden">
      <BlueHero size="sm" />
      <PageHeader
        heading="Hey User"
        image={
          'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80'
        }
        onProfileClick={() => {}}
      />

      <HeroCard
        heading="Your current menu"
        onClick={() => {}}
        data={{
          image:
            'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=710&q=80',
          author: 'Firstname Lastname',
          name: '01 - 07 October Menu',
          description: '6 Ingredients - 06 December 2022',
        }}
      />

      <BasicMealSlider meals={data} heading="Your Meals" onMealClicked={() => {}} />
    </section>
  );
};

export default Home;

Home.getLayout = page => {
  return (
    <PrimaryLayout>
      <div className="px-4">{page}</div>
      <MainUtiltityButton />
      <NavBar />
    </PrimaryLayout>
  );
};
