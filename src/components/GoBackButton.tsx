import { Link, LinkProps } from 'expo-router';

type GoBackButtonProps = LinkProps<string> &{
    title: string
}

export function GoBackButton({ title, ...rest }: GoBackButtonProps) {
  return (
    <Link className="text-slate-300 text-center text-base font-body" {...rest}>
      {title}
    </Link>
  );
}
