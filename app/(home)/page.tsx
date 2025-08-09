import { Container } from '@/components/Container';
import { getAllArticles } from '@/lib/articles';
import { Article } from './components/article';
import { Hero } from './components/hero';
import { Newsletter } from './components/newsletter';
import { Resume } from './components/resume';
import { Videos } from './components/videos';

const Home = async () => {
  const articles = await getAllArticles();
  const latestArticles = articles.slice(0, 4);

  return (
    <>
      <Hero />
      <Videos />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {latestArticles.map((article) => (
              <Article article={article} key={article.slug} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Newsletter />
            <Resume />
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
