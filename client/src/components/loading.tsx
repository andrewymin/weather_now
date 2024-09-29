import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  extraName: string;
};

function Loading(props: Props) {
  return (
    <div className="">
      <Skeleton
        className={`rounded-full ${props.extraName} bg-white bg-opacity-50`}
      />
    </div>
  );
}

export default Loading;
