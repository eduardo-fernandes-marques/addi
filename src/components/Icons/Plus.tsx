import { memo } from 'react';

type Props = React.SVGProps<SVGSVGElement> & {
  title: string;
};

const SvgPlus = ({ title, ...rest }: Props) => {
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
  const titleId = title ? 'SvgPlus-title' : undefined;
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
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
  );
};

const MemoSvgPlus = memo(SvgPlus);
export default MemoSvgPlus;
