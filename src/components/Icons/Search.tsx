import { memo } from 'react';

type Props = React.SVGProps<SVGSVGElement> & {
  title: string;
};

const SvgSearch = ({ title, ...rest }: Props) => {
  const props = {
    ...rest,
    height: 24,
    width: 24,
    ...(title
      ? {
          role: 'img',
        }
      : {
          'aria-hidden': true,
        }),
  };
  const titleId = title ? 'SvgSearch-title' : undefined;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
};

const MemoSvgSearch = memo(SvgSearch);
export default MemoSvgSearch;
