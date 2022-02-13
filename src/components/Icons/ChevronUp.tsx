import { memo } from 'react';

type Props = React.SVGProps<SVGSVGElement> & {
  title: string;
};

const SvgChevronUp = ({ title, ...rest }: Props) => {
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
  const titleId = title ? 'SvgChevronUp-title' : undefined;
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
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
  );
};

const MemoSvgChevronUp = memo(SvgChevronUp);
export default MemoSvgChevronUp;
