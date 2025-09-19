type Props = React.SVGProps<SVGSVGElement>;

export function StatusIcon(props: Props) {
  return (
    <svg
      height="18"
      viewBox="0 0 18 18"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>status-icon</title>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <path
          d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z"
          fill="currentColor"
          fillOpacity="0.3"
          stroke="none"
        />
        <path d="M16.135 7.74999C15.613 4.74999 13.25 2.38699 10.25 1.86499" />
        <path d="M10.25 16.135C13.25 15.613 15.613 13.25 16.135 10.25" />
        <path
          d="M1.86499 10.25C2.38699 13.25 4.74999 15.613 7.74999 16.135"
          opacity="0.3"
        />
        <path
          d="M7.74999 1.86499C4.74999 2.38699 2.38699 4.74999 1.86499 7.74999"
          opacity="0.3"
        />
        <path d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z" />
      </g>
    </svg>
  );
}
