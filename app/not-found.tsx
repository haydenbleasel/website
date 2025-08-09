import { Button } from '@/components/button';
import { Container } from '@/components/container';

const NotFound = () => (
  <Container className="flex h-full items-center pt-16 sm:pt-32">
    <div className="flex flex-col items-center">
      <p className="font-semibold text-base text-zinc-400 dark:text-zinc-500">
        404
      </p>
      <h1 className="mt-4 font-bold text-4xl text-zinc-800 tracking-tight sm:text-5xl dark:text-zinc-100">
        Page not found
      </h1>
      <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <Button className="mt-4" href="/" variant="secondary">
        Go back home
      </Button>
    </div>
  </Container>
);

export default NotFound;
