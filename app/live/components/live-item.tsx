export const LiveItem = ({
  data,
}: {
  data: {
    url: string | null;
    _title: string;
    location: string;
    year: number;
  };
}) => (
  <>
    <div className="flex items-center gap-1.5">
      <h3 className="font-semibold tracking-tight">{data._title}</h3>
    </div>
    <p className="text-muted-foreground text-sm">
      {data.location} &bull; {data.year}
    </p>
  </>
);
