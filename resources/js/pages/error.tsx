import { Head, Link } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateTitle } from "@/lib/utils";
import { home } from "@/routes";

type Props = {
  statusCode: number;
  title: string;
  message: string;
};

export default function ErrorPage({ statusCode, title, message }: Props) {
  return (
    <>
      <Head>
        <title>{generateTitle(title)}</title>
      </Head>
      <div className="flex items-center justify-center p-4 px-8 min-h-screen">
        <Card className="max-w-md mx-auto w-full text-center">
          <CardHeader>
            <CardTitle>
              <h1 className="font-bold text-2xl text-red-600">
                {statusCode} - {title}
              </h1>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{message}</p>
            <Link
              href={home()}
              className="underline underline-offset-4 mt-2 block"
            >
              Back to home
            </Link>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
